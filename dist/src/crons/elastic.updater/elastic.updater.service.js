"use strict";
var ElasticUpdaterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticUpdaterService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const JsonDiff = tslib_1.__importStar(require("json-diff"));
const assets_service_1 = require("../../common/assets/assets.service");
const nft_service_1 = require("../../endpoints/nfts/nft.service");
const tiny_async_pool_1 = tslib_1.__importDefault(require("tiny-async-pool"));
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const indexer_service_1 = require("../../common/indexer/indexer.service");
let ElasticUpdaterService = ElasticUpdaterService_1 = class ElasticUpdaterService {
    constructor(assetsService, indexerService, nftService, persistenceService) {
        this.assetsService = assetsService;
        this.indexerService = indexerService;
        this.nftService = nftService;
        this.persistenceService = persistenceService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(ElasticUpdaterService_1.name);
    }
    async handleUpdateAssets() {
        const allAssets = await this.assetsService.getAllTokenAssets();
        for (const key of Object.keys(allAssets)) {
            const elasticAssets = await this.indexerService.getAssetsForToken(key);
            if (elasticAssets === null) {
                this.logger.log(`Could not find token with identifier '${key}' when updating assets in elastic`);
                continue;
            }
            const githubAssets = allAssets[key];
            if (!elasticAssets || JsonDiff.diff(githubAssets, elasticAssets)) {
                this.logger.log(`Updating assets for token with identifier '${key}'`);
                await this.indexerService.setAssetsForToken(key, githubAssets);
            }
        }
    }
    async handleUpdateTokenExtraDetails() {
        await this.indexerService.getAllTokensMetadata(async (items) => {
            const whitelistStorageItems = items.map((item) => {
                var _a;
                return ({
                    identifier: item.identifier,
                    uris: (_a = item.data) === null || _a === void 0 ? void 0 : _a.uris,
                    isWhitelistedStorage: item.api_isWhitelistedStorage,
                });
            });
            await this.updateIsWhitelistedStorageForTokens(whitelistStorageItems);
            const mediaItems = items.map((item) => ({
                identifier: item.identifier,
                media: item.api_media,
            }));
            await this.updateMediaForTokens(mediaItems);
            const metadataItems = items.map((item) => ({
                identifier: item.identifier,
                metadata: item.api_metadata,
            }));
            await this.updateMetadataForTokens(metadataItems);
        });
    }
    async updateMetadataForTokens(items) {
        const indexedItems = items.toRecord(item => item.identifier);
        const metadataResult = await sdk_nestjs_common_1.BatchUtils.batchGet(items, item => item.identifier, async (elements) => await this.persistenceService.batchGetMetadata(elements.map(x => x.identifier)), 100);
        const itemsToUpdate = [];
        for (const identifier of Object.keys(metadataResult)) {
            const item = indexedItems[identifier];
            if (!item) {
                continue;
            }
            const currentMetadata = metadataResult[identifier];
            const actualMetadata = item.metadata;
            if (JsonDiff.diff(currentMetadata, actualMetadata)) {
                itemsToUpdate.push({
                    identifier: identifier,
                    metadata: currentMetadata,
                });
            }
        }
        await (0, tiny_async_pool_1.default)(5, itemsToUpdate, async (item) => await this.updateMetadataForToken(item.identifier, item.metadata));
    }
    async updateMediaForTokens(items) {
        const indexedItems = items.toRecord(item => item.identifier);
        const mediaResult = await sdk_nestjs_common_1.BatchUtils.batchGet(items, item => item.identifier, async (elements) => await this.persistenceService.batchGetMedia(elements.map(x => x.identifier)), 100);
        const itemsToUpdate = [];
        for (const identifier of Object.keys(mediaResult)) {
            const item = indexedItems[identifier];
            if (!item) {
                continue;
            }
            const currentMedia = mediaResult[identifier];
            const actualMedia = item.media;
            if (JsonDiff.diff(currentMedia, actualMedia)) {
                itemsToUpdate.push({
                    identifier: identifier,
                    media: currentMedia,
                });
            }
        }
        await (0, tiny_async_pool_1.default)(5, itemsToUpdate, async (item) => await this.updateMediaForToken(item.identifier, item.media));
    }
    async updateIsWhitelistedStorageForTokens(items) {
        const itemsToUpdate = [];
        for (const item of items) {
            const computedIsWhitelistedStorage = this.nftService.isWhitelistedStorage(item.uris);
            const actualIsWhitelistedStorage = item.isWhitelistedStorage;
            if (computedIsWhitelistedStorage !== actualIsWhitelistedStorage) {
                const itemToUpdate = {
                    identifier: item.identifier,
                    isWhitelistedStorage: computedIsWhitelistedStorage,
                };
                itemsToUpdate.push(itemToUpdate);
            }
        }
        await (0, tiny_async_pool_1.default)(5, itemsToUpdate, async (item) => await this.updateIsWhitelistedStorageForToken(item.identifier, item.isWhitelistedStorage));
    }
    async updateIsWhitelistedStorageForToken(identifier, isWhitelistedStorage) {
        try {
            this.logger.log(`Setting api_isWhitelistedStorage for token with identifier '${identifier}'`);
            await this.indexerService.setIsWhitelistedStorageForToken(identifier, isWhitelistedStorage);
        }
        catch (error) {
            this.logger.error(`Unexpected error when updating isWhitelistedStorage for token with identifier '${identifier}'`);
        }
    }
    async updateMediaForToken(identifier, media) {
        try {
            this.logger.log(`Setting api_media for token with identifier '${identifier}'`);
            await this.indexerService.setMediaForToken(identifier, media);
        }
        catch (error) {
            this.logger.error(`Unexpected error when updating media for token with identifier '${identifier}'`);
        }
    }
    async updateMetadataForToken(identifier, metadata) {
        try {
            this.logger.log(`Setting api_metadata for token with identifier '${identifier}'`);
            await this.indexerService.setMetadataForToken(identifier, metadata);
        }
        catch (error) {
            this.logger.error(`Unexpected error when updating metadata for token with identifier '${identifier}'`);
        }
    }
};
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_1AM),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Elastic updater: Update assets', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ElasticUpdaterService.prototype, "handleUpdateAssets", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Elastic updater: Update tokens isWhitelisted, media, metadata', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ElasticUpdaterService.prototype, "handleUpdateTokenExtraDetails", null);
ElasticUpdaterService = ElasticUpdaterService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => 'PersistenceService'))),
    tslib_1.__metadata("design:paramtypes", [assets_service_1.AssetsService,
        indexer_service_1.IndexerService,
        nft_service_1.NftService, Object])
], ElasticUpdaterService);
exports.ElasticUpdaterService = ElasticUpdaterService;
//# sourceMappingURL=elastic.updater.service.js.map