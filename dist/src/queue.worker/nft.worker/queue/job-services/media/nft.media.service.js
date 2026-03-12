"use strict";
var NftMediaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftMediaService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../../../../common/api-config/api.config.service");
const cache_info_1 = require("../../../../../utils/cache.info");
const persistence_service_1 = require("../../../../../common/persistence/persistence.service");
const media_mime_type_1 = require("../../../../../endpoints/nfts/entities/media.mime.type");
const nft_media_1 = require("../../../../../endpoints/nfts/entities/nft.media");
const token_helpers_1 = require("../../../../../utils/token.helpers");
const microservices_1 = require("@nestjs/microservices");
const sdk_nestjs_common_2 = require("@sravankumar02/sdk-nestjs-common");
const caching_utils_1 = require("../../../../../utils/caching.utils");
let NftMediaService = NftMediaService_1 = class NftMediaService {
    constructor(cachingService, apiService, apiConfigService, persistenceService, clientProxy) {
        this.cachingService = cachingService;
        this.apiService = apiService;
        this.apiConfigService = apiConfigService;
        this.persistenceService = persistenceService;
        this.clientProxy = clientProxy;
        this.logger = new sdk_nestjs_common_2.OriginLogger(NftMediaService_1.name);
        this.IPFS_REQUEST_TIMEOUT = sdk_nestjs_common_1.Constants.oneSecond() * 30 * 1000;
        this.NFT_THUMBNAIL_PREFIX = `${this.apiConfigService.getExternalMediaUrl()}/nfts/asset`;
        this.NFT_THUMBNAIL_DEFAULT = `${this.apiConfigService.getMediaUrl()}/nfts/thumbnail/default.png`;
    }
    async getMedia(identifier) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.NftMedia(identifier).key, async () => await this.persistenceService.getMedia(identifier), cache_info_1.CacheInfo.NftMedia(identifier).ttl);
    }
    async refreshMedia(nft) {
        const mediaRaw = await this.getMediaRaw(nft);
        if (!mediaRaw) {
            return undefined;
        }
        await this.persistenceService.setMedia(nft.identifier, mediaRaw);
        await this.cachingService.set(cache_info_1.CacheInfo.NftMedia(nft.identifier).key, mediaRaw, cache_info_1.CacheInfo.NftMedia(nft.identifier).ttl);
        this.clientProxy.emit('refreshCacheKey', {
            key: cache_info_1.CacheInfo.NftMedia(nft.identifier).key,
            ttl: cache_info_1.CacheInfo.NftMedia(nft.identifier).ttl,
        });
        return mediaRaw;
    }
    async getMediaRaw(nft) {
        if (!nft.uris) {
            return null;
        }
        const mediaArray = [];
        for (const uri of nft.uris) {
            if (!uri) {
                continue;
            }
            let fileProperties = null;
            try {
                const cacheIdentifier = `${nft.identifier}-${token_helpers_1.TokenHelpers.getUrlHash(uri)}`;
                fileProperties = await caching_utils_1.CachingUtils.executeOptimistic({
                    cachingService: this.cachingService,
                    description: `Fetching media for nft with identifier '${nft.identifier}' and uri '${uri}'`,
                    key: cache_info_1.CacheInfo.PendingMediaGet(cacheIdentifier).key,
                    ttl: cache_info_1.CacheInfo.PendingMediaGet(cacheIdentifier).ttl,
                    action: async () => await this.getFileProperties(uri),
                });
            }
            catch (error) {
                this.logger.error(`Unexpected error when fetching media for nft with identifier '${nft.identifier}' and uri '${uri}'`);
                this.logger.error(error);
            }
            if (!fileProperties) {
                this.logger.log(`Empty file properties for NFT with identifier '${nft.identifier}'`);
                continue;
            }
            if (!this.isContentTypeAccepted(fileProperties.contentType)) {
                this.logger.log(`Content type '${fileProperties.contentType}' not accepted for NFT with identifier '${nft.identifier}'`);
                continue;
            }
            const nftMedia = new nft_media_1.NftMedia();
            nftMedia.url = token_helpers_1.TokenHelpers.computeNftUri(sdk_nestjs_common_1.BinaryUtils.base64Decode(uri), this.NFT_THUMBNAIL_PREFIX);
            nftMedia.originalUrl = sdk_nestjs_common_1.BinaryUtils.base64Decode(uri);
            if (this.isFileSizeAccepted(fileProperties.contentLength)) {
                nftMedia.thumbnailUrl = `${this.apiConfigService.getExternalMediaUrl()}/nfts/thumbnail/${nft.collection}-${token_helpers_1.TokenHelpers.getUrlHash(nftMedia.url)}`;
            }
            else {
                this.logger.log(`File size '${fileProperties.contentLength}' not accepted for NFT with identifier '${nft.identifier}'`);
                nftMedia.thumbnailUrl = this.NFT_THUMBNAIL_DEFAULT;
            }
            nftMedia.fileType = fileProperties.contentType;
            nftMedia.fileSize = fileProperties.contentLength;
            mediaArray.push(nftMedia);
        }
        return mediaArray;
    }
    getUrl(nftUri, prefix) {
        const url = sdk_nestjs_common_1.BinaryUtils.base64Decode(nftUri);
        return token_helpers_1.TokenHelpers.computeNftUri(url, prefix);
    }
    async getFileProperties(uri) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.NftMediaProperties(uri).key, async () => await this.getFilePropertiesRaw(uri), cache_info_1.CacheInfo.NftMediaProperties(uri).ttl);
    }
    async getFilePropertiesRaw(uri) {
        var _a;
        return (_a = await this.getFilePropertiesFromHeaders(uri, this.NFT_THUMBNAIL_PREFIX)) !== null && _a !== void 0 ? _a : await this.getFilePropertiesFromHeaders(uri, this.apiConfigService.getIpfsUrl());
    }
    async getFilePropertiesFromHeaders(uri, prefix) {
        const url = this.getUrl(uri, prefix);
        if (url.endsWith('.json')) {
            return null;
        }
        const response = await this.apiService.head(url, { timeout: this.IPFS_REQUEST_TIMEOUT });
        if (response.status !== common_1.HttpStatus.OK) {
            this.logger.error(`Unexpected http status code '${response.status}' while fetching file properties from url '${url}'`);
            return null;
        }
        const { headers } = response;
        const contentType = headers['content-type'];
        const contentLength = Number(headers['content-length']);
        return { contentType, contentLength };
    }
    isContentTypeAccepted(contentType) {
        const baseContentType = contentType.split(';')[0].trim();
        return Object.values(media_mime_type_1.MediaMimeTypeEnum).includes(baseContentType);
    }
    isFileSizeAccepted(fileSize) {
        return fileSize <= 64 * 1024 * 1024;
    }
};
NftMediaService = NftMediaService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(4, (0, common_1.Inject)('PUBSUB_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        sdk_nestjs_http_1.ApiService,
        api_config_service_1.ApiConfigService,
        persistence_service_1.PersistenceService,
        microservices_1.ClientProxy])
], NftMediaService);
exports.NftMediaService = NftMediaService;
//# sourceMappingURL=nft.media.service.js.map