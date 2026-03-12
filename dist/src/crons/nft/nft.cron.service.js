"use strict";
var NftCronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftCronService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const nft_metadata_error_code_1 = require("../../endpoints/nfts/entities/nft.metadata.error.code");
const nft_extendedattributes_service_1 = require("../../endpoints/nfts/nft.extendedattributes.service");
const nft_service_1 = require("../../endpoints/nfts/nft.service");
const process_nft_settings_1 = require("../../endpoints/process-nfts/entities/process.nft.settings");
const nft_worker_service_1 = require("../../queue.worker/nft.worker/nft.worker.service");
let NftCronService = NftCronService_1 = class NftCronService {
    constructor(nftWorkerService, nftService, apiConfigService, nftExtendedAttributesService) {
        this.nftWorkerService = nftWorkerService;
        this.nftService = nftService;
        this.apiConfigService = apiConfigService;
        this.nftExtendedAttributesService = nftExtendedAttributesService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(NftCronService_1.name);
    }
    async triggerProcessFailedMetadata() {
        if (!this.apiConfigService.getIsProcessNftsFlagActive()) {
            return;
        }
        await sdk_nestjs_common_1.Locker.lock('Process failed metadata for NFTs minted in the last 10 minutes', async () => {
            const thirtyMinutesAgo = Math.floor(Date.now() / 1000) - (sdk_nestjs_common_1.Constants.oneMinute() * 30);
            const tenMinutesAgo = Math.floor(Date.now() / 1000) - (sdk_nestjs_common_1.Constants.oneMinute() * 10);
            await this.processNfts(thirtyMinutesAgo, tenMinutesAgo, async (nft) => {
                const needsRefreshMetadata = this.needsMetadataRefresh(nft);
                if (needsRefreshMetadata) {
                    await this.nftWorkerService.addProcessNftQueueJob(nft, new process_nft_settings_1.ProcessNftSettings({ forceRefreshMetadata: true }));
                }
                return needsRefreshMetadata;
            });
        }, true);
    }
    async triggerProcessNftsForLast24Hours() {
        if (!this.apiConfigService.getIsProcessNftsFlagActive()) {
            return;
        }
        await sdk_nestjs_common_1.Locker.lock('Process NFTs minted in the last 24 hours', async () => {
            const dayBefore = Math.floor(Date.now() / 1000) - sdk_nestjs_common_1.Constants.oneDay();
            const tenMinutesAgo = Math.floor(Date.now() / 1000) - (sdk_nestjs_common_1.Constants.oneMinute() * 10);
            await this.processNfts(dayBefore, tenMinutesAgo, async (nft) => {
                const needsUploadAsset = await this.nftWorkerService.needsProcessing(nft, new process_nft_settings_1.ProcessNftSettings({ uploadAsset: true }));
                if (needsUploadAsset) {
                    await this.nftWorkerService.addProcessNftQueueJob(nft, new process_nft_settings_1.ProcessNftSettings({ uploadAsset: true }));
                }
                const needsRefreshMetadata = this.needsMetadataRefresh(nft);
                if (needsRefreshMetadata) {
                    await this.nftWorkerService.addProcessNftQueueJob(nft, new process_nft_settings_1.ProcessNftSettings({ forceRefreshMetadata: true }));
                }
                const needsRefreshMedia = this.needsMediaRefresh(nft);
                if (needsRefreshMedia) {
                    await this.nftWorkerService.addProcessNftQueueJob(nft, new process_nft_settings_1.ProcessNftSettings({ forceRefreshMedia: true }));
                }
                return needsUploadAsset || needsRefreshMetadata || needsRefreshMedia;
            });
        }, true);
    }
    async triggerProcessNftsForLastYear() {
        if (!this.apiConfigService.getIsProcessNftsFlagActive()) {
            return;
        }
        const tenMinutesAgo = Math.floor(Date.now() / 1000) - (sdk_nestjs_common_1.Constants.oneMinute() * 10);
        await sdk_nestjs_common_1.Locker.lock('Process NFTs without media / metadata', async () => {
            await this.processNfts(undefined, tenMinutesAgo, async (nft) => {
                const needsProcessing = this.needsMediaFetch(nft) || this.needsMetadataFetch(nft);
                if (needsProcessing) {
                    await this.nftWorkerService.addProcessNftQueueJob(nft, new process_nft_settings_1.ProcessNftSettings());
                }
                return needsProcessing;
            });
        }, true);
    }
    needsMediaRefresh(nft) {
        return nft.uris && nft.uris.length > 0 && (!nft.media || nft.media.length === 0);
    }
    needsMetadataRefresh(nft) {
        if (!nft.attributes) {
            return false;
        }
        if (nft.metadata &&
            Object.keys(nft.metadata).length > 0 &&
            (!nft.metadata.error || !nft.metadata.error.code.in(nft_metadata_error_code_1.NftMetadataErrorCode.notFound, nft_metadata_error_code_1.NftMetadataErrorCode.timeout))) {
            return false;
        }
        try {
            const metadataLink = this.nftExtendedAttributesService.getMetadataFromBase64EncodedAttributes(nft.attributes);
            if (!metadataLink) {
                return false;
            }
        }
        catch (error) {
            this.logger.error(`An unhandled exception occurred when parsing metadata from attributes for NFT with identifier '${nft.identifier}'`);
            this.logger.error(error);
            return false;
        }
        return true;
    }
    needsMetadataFetch(nft) {
        if (nft.metadata || !nft.attributes) {
            return false;
        }
        try {
            const metadataLink = this.nftExtendedAttributesService.getMetadataFromBase64EncodedAttributes(nft.attributes);
            if (!metadataLink) {
                return false;
            }
        }
        catch (error) {
            this.logger.error(`An unhandled exception occurred when parsing metadata from attributes for NFT with identifier '${nft.identifier}'`);
            this.logger.error(error);
            return false;
        }
        return true;
    }
    needsMediaFetch(nft) {
        return nft.uris && nft.uris.length > 0 && !nft.media;
    }
    async processNfts(after, before, handler) {
        var _a;
        const nftIdentifiers = new Set();
        let totalProcessedNfts = 0;
        let totalNfts = 0;
        const allNftCount = await this.nftService.getNftCount({ before, after });
        while (true) {
            let nfts = await this.nftService.getNfts({ from: 0, size: 10000 }, { before, after });
            nfts = nfts.sortedDescending(x => { var _a; return (_a = x.timestamp) !== null && _a !== void 0 ? _a : 0; });
            for (const [index, nft] of nfts.entries()) {
                if (index % 100 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 10));
                }
                if (nft.identifier && !nftIdentifiers.has(nft.identifier)) {
                    try {
                        const neededProcessing = await handler(nft);
                        if (neededProcessing) {
                            totalProcessedNfts++;
                        }
                        totalNfts++;
                        nftIdentifiers.add(nft.identifier);
                    }
                    catch (error) {
                        this.logger.error(`Failure when determining whether the NFT with the identifier '${nft.identifier}' needs processing`);
                        this.logger.error(error);
                    }
                }
            }
            this.logger.log(`Completed processing ${totalNfts} / ${allNftCount} NFTs`);
            if (nfts.length < 10000) {
                break;
            }
            before = (_a = nfts[nfts.length - 1].timestamp) !== null && _a !== void 0 ? _a : 0;
        }
        this.logger.log(`Total processed NFTs: ${totalProcessedNfts}`);
    }
};
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_MINUTES),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NftCronService.prototype, "triggerProcessFailedMetadata", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NftCronService.prototype, "triggerProcessNftsForLast24Hours", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_2AM),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NftCronService.prototype, "triggerProcessNftsForLastYear", null);
NftCronService = NftCronService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [nft_worker_service_1.NftWorkerService,
        nft_service_1.NftService,
        api_config_service_1.ApiConfigService,
        nft_extendedattributes_service_1.NftExtendedAttributesService])
], NftCronService);
exports.NftCronService = NftCronService;
//# sourceMappingURL=nft.cron.service.js.map