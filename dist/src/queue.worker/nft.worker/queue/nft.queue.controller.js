"use strict";
var _a, _b, _c, _d;
var NftQueueController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftQueueController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const configuration_1 = tslib_1.__importDefault(require("../../../../config/configuration"));
const microservices_1 = require("@nestjs/microservices");
const api_config_service_1 = require("../../../common/api-config/api.config.service");
const cache_info_1 = require("../../../utils/cache.info");
const nft_service_1 = require("../../../endpoints/nfts/nft.service");
const nft_message_1 = require("./entities/nft.message");
const nft_media_service_1 = require("./job-services/media/nft.media.service");
const nft_metadata_service_1 = require("./job-services/metadata/nft.metadata.service");
const generate_thumbnail_result_1 = require("./job-services/thumbnails/entities/generate.thumbnail.result");
const nft_thumbnail_service_1 = require("./job-services/thumbnails/nft.thumbnail.service");
const nft_asset_service_1 = require("./job-services/assets/nft.asset.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
let NftQueueController = NftQueueController_1 = class NftQueueController {
    constructor(nftMetadataService, nftMediaService, nftThumbnailService, nftService, nftAssetService, clientProxy, apiConfigService) {
        this.nftMetadataService = nftMetadataService;
        this.nftMediaService = nftMediaService;
        this.nftThumbnailService = nftThumbnailService;
        this.nftService = nftService;
        this.nftAssetService = nftAssetService;
        this.clientProxy = clientProxy;
        this.logger = new sdk_nestjs_common_1.OriginLogger(NftQueueController_1.name);
        this.RETRY_LIMIT = apiConfigService.getNftProcessMaxRetries();
    }
    getAttempt(msg) {
        const headers = msg.properties.headers;
        let attempt = 0;
        if (headers['x-death']) {
            const currentXDeath = headers['x-death'][0];
            if (currentXDeath) {
                attempt = currentXDeath.count;
            }
        }
        return attempt;
    }
    getProcessNftActivatedSettings(settings) {
        const result = [];
        if (settings.forceRefreshMedia) {
            result.push('forceRefreshMedia');
        }
        if (settings.forceRefreshMetadata) {
            result.push('forceRefreshMetadata');
        }
        if (settings.forceRefreshThumbnail) {
            result.push('forceRefreshThumbnail');
        }
        if (settings.skipRefreshThumbnail) {
            result.push('skipRefreshThumbnail');
        }
        if (settings.uploadAsset) {
            result.push('uploadAsset');
        }
        return result;
    }
    async onNftCreated(data, context) {
        var _a;
        const channel = context.getChannelRef();
        const message = context.getMessage();
        const attempt = this.getAttempt(message);
        if (attempt >= this.RETRY_LIMIT) {
            this.logger.log(`NFT ${data.identifier} reached maximum number of retries (${this.RETRY_LIMIT})! Removed from retry exchange!`);
            channel.ack(message);
            return;
        }
        this.logger.log(`Started Processing NFT with identifier '${data.identifier}' and flags ${this.getProcessNftActivatedSettings(data.settings).join(', ')}`);
        sdk_nestjs_common_1.ContextTracker.assign({ origin: `Process NFT '${data.identifier}'` });
        try {
            const nft = await this.nftService.getSingleNft(data.identifier);
            if (!nft) {
                throw new Error(`Could not fetch details for NFT with identifier '${data.identifier}'`);
            }
            const settings = data.settings;
            nft.metadata = await this.nftMetadataService.getMetadata(nft);
            if (nft.metadata && settings.forceRefreshMetadata) {
                const oldMetadata = nft.metadata;
                this.logger.log(`Started Refreshing metadata for NFT with identifier '${nft.identifier}'`);
                nft.metadata = await this.nftMetadataService.refreshMetadata(nft);
                const newMetadata = nft.metadata;
                if (newMetadata) {
                    this.logger.log(`Completed Refreshing metadata for NFT with identifier. Old: '${JSON.stringify(oldMetadata)}', New: '${JSON.stringify(newMetadata)}'`);
                }
                else {
                    this.logger.log(`Completed Refreshing metadata for NFT with identifier. Old: '${JSON.stringify(oldMetadata)}', New is empty`);
                }
                this.clientProxy.emit('deleteCacheKeys', [cache_info_1.CacheInfo.NftMetadata(nft.identifier).key]);
            }
            else if (!nft.metadata) {
                nft.metadata = await this.nftMetadataService.refreshMetadata(nft);
            }
            nft.media = (_a = await this.nftMediaService.getMedia(nft.identifier)) !== null && _a !== void 0 ? _a : undefined;
            if (settings.forceRefreshMedia || !nft.media) {
                this.logger.log(`Started Refreshing media for NFT with identifier '${nft.identifier}'`);
                nft.media = await this.nftMediaService.refreshMedia(nft);
                this.logger.log(`Completed Refreshing media for NFT with identifier '${nft.identifier}'`);
            }
            if (nft.media && settings.uploadAsset) {
                for (const media of nft.media) {
                    const isAssetUploaded = await this.nftAssetService.isAssetUploaded(media);
                    if (!isAssetUploaded) {
                        this.logger.log(`Started Uploading asset for NFT with identifier '${nft.identifier}', original url '${media.originalUrl}' and file type '${media.fileType}'`);
                        await this.nftAssetService.uploadAsset(nft.identifier, media.originalUrl, media.fileType);
                        this.logger.log(`Completed Uploading asset for NFT with identifier '${nft.identifier}', original url '${media.originalUrl}' and file type '${media.fileType}'`);
                    }
                    else {
                        this.logger.log(`Asset already uploaded for NFT with identifier '${nft.identifier}' and media url '${media.url}'`);
                    }
                }
            }
            if (nft.media && !settings.skipRefreshThumbnail) {
                const mediaItems = nft.media.filter(x => x.thumbnailUrl !== this.nftMediaService.NFT_THUMBNAIL_DEFAULT);
                await Promise.all(mediaItems.map(media => this.generateThumbnail(nft, media, settings.forceRefreshThumbnail)));
            }
            this.logger.log(`Completed Processing NFT with identifier '${data.identifier}' and flags ${this.getProcessNftActivatedSettings(data.settings).join(', ')}`);
            channel.ack(message);
        }
        catch (error) {
            this.logger.error(`Unexpected error when processing NFT with identifier '${data.identifier}'`);
            this.logger.error(error);
            channel.reject(message, false);
        }
    }
    async generateThumbnail(nft, media, forceRefresh = false) {
        let result;
        try {
            result = await this.nftThumbnailService.generateThumbnail(nft, media.url.trim(), media.fileType, forceRefresh);
        }
        catch (error) {
            this.logger.error(`An unhandled exception occurred when generating thumbnail for nft with identifier '${nft.identifier}' and url '${media.url}'`);
            this.logger.error(error);
            throw error;
        }
        if (result === generate_thumbnail_result_1.GenerateThumbnailResult.couldNotExtractThumbnail) {
            throw new Error(`Could not extract thumbnail for for nft with identifier '${nft.identifier}' and url '${media.url}'`);
        }
    }
};
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)({ cmd: (_d = (_c = (_b = (_a = (0, configuration_1.default)()) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.processNfts) === null || _c === void 0 ? void 0 : _c.nftQueueName) !== null && _d !== void 0 ? _d : 'api-process-nfts' }),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__param(1, (0, microservices_1.Ctx)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [nft_message_1.NftMessage, microservices_1.RmqContext]),
    tslib_1.__metadata("design:returntype", Promise)
], NftQueueController.prototype, "onNftCreated", null);
NftQueueController = NftQueueController_1 = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__param(5, (0, common_1.Inject)('PUBSUB_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [nft_metadata_service_1.NftMetadataService,
        nft_media_service_1.NftMediaService,
        nft_thumbnail_service_1.NftThumbnailService,
        nft_service_1.NftService,
        nft_asset_service_1.NftAssetService,
        microservices_1.ClientProxy,
        api_config_service_1.ApiConfigService])
], NftQueueController);
exports.NftQueueController = NftQueueController;
//# sourceMappingURL=nft.queue.controller.js.map