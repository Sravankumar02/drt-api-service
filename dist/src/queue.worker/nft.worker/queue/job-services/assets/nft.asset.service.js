"use strict";
var NftAssetService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftAssetService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_2 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../../../../common/api-config/api.config.service");
const cache_info_1 = require("../../../../../utils/cache.info");
const caching_utils_1 = require("../../../../../utils/caching.utils");
const token_helpers_1 = require("../../../../../utils/token.helpers");
const aws_service_1 = require("../thumbnails/aws.service");
let NftAssetService = NftAssetService_1 = class NftAssetService {
    constructor(apiService, awsService, apiConfigService, cachingService) {
        this.apiService = apiService;
        this.awsService = awsService;
        this.apiConfigService = apiConfigService;
        this.cachingService = cachingService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(NftAssetService_1.name);
        this.API_TIMEOUT_MILLISECONDS = sdk_nestjs_common_2.Constants.oneSecond() * 30 * 1000;
        this.STANDARD_PATH = 'nfts/asset';
    }
    async uploadAsset(identifier, fileUrl, fileType) {
        const cacheIdentifier = `${identifier}-${token_helpers_1.TokenHelpers.getUrlHash(fileUrl)}`;
        try {
            const mediaUrl = token_helpers_1.TokenHelpers.computeNftUri(fileUrl, this.apiConfigService.getMediaUrl() + '/nfts/asset');
            const fileResult = await caching_utils_1.CachingUtils.executeOptimistic({
                cachingService: this.cachingService,
                description: `Uploading assets to S3 for NFT with identifier '${identifier}', file url '${fileUrl}'`,
                key: cache_info_1.CacheInfo.PendingUploadAsset(cacheIdentifier).key,
                ttl: cache_info_1.CacheInfo.PendingUploadAsset(cacheIdentifier).ttl,
                action: async () => await this.apiService.get(mediaUrl, { responseType: 'arraybuffer', timeout: this.API_TIMEOUT_MILLISECONDS }),
            });
            const file = fileResult.data;
            const fileName = token_helpers_1.TokenHelpers.computeNftUri(fileUrl, '');
            const filePath = `${this.STANDARD_PATH}${fileName}`;
            await this.awsService.uploadToS3(filePath, file, fileType);
        }
        catch (error) {
            this.logger.error(error);
            this.logger.error(`An unhandled error occurred while uploading assets for NFT with identifier '${identifier}', file url '${fileUrl}'`);
        }
    }
    async isAssetUploaded(media) {
        var _a;
        try {
            const prefix = ((_a = this.apiConfigService.getMediaInternalUrl()) !== null && _a !== void 0 ? _a : this.apiConfigService.getMediaUrl()) + '/nfts/asset';
            const url = token_helpers_1.TokenHelpers.computeNftUri(media.originalUrl, prefix);
            const response = await this.apiService.head(url, undefined, async (error) => {
                var _a;
                const status = (_a = error.response) === null || _a === void 0 ? void 0 : _a.status;
                if ([common_1.HttpStatus.FOUND, common_1.HttpStatus.NOT_FOUND, common_1.HttpStatus.FORBIDDEN].includes(status)) {
                    return true;
                }
                return false;
            });
            return response !== undefined;
        }
        catch (error) {
            return false;
        }
    }
};
NftAssetService = NftAssetService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_http_1.ApiService,
        aws_service_1.AWSService,
        api_config_service_1.ApiConfigService,
        sdk_nestjs_cache_1.CacheService])
], NftAssetService);
exports.NftAssetService = NftAssetService;
//# sourceMappingURL=nft.asset.service.js.map