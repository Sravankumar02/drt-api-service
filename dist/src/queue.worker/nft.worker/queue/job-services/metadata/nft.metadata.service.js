"use strict";
var NftMetadataService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftMetadataService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const cache_info_1 = require("../../../../../utils/cache.info");
const persistence_service_1 = require("../../../../../common/persistence/persistence.service");
const nft_type_1 = require("../../../../../endpoints/nfts/entities/nft.type");
const nft_extendedattributes_service_1 = require("../../../../../endpoints/nfts/nft.extendedattributes.service");
const microservices_1 = require("@nestjs/microservices");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const caching_utils_1 = require("../../../../../utils/caching.utils");
let NftMetadataService = NftMetadataService_1 = class NftMetadataService {
    constructor(nftExtendedAttributesService, persistenceService, cachingService, clientProxy) {
        this.nftExtendedAttributesService = nftExtendedAttributesService;
        this.persistenceService = persistenceService;
        this.cachingService = cachingService;
        this.clientProxy = clientProxy;
        this.logger = new sdk_nestjs_common_1.OriginLogger(NftMetadataService_1.name);
    }
    async getOrRefreshMetadata(nft) {
        if (!nft.attributes || nft.type === nft_type_1.NftType.MetaDCDT) {
            return undefined;
        }
        const metadata = await this.getMetadata(nft);
        if (!metadata) {
            return await this.refreshMetadata(nft);
        }
        return metadata;
    }
    async getMetadata(nft) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.NftMetadata(nft.identifier).key, async () => await this.persistenceService.getMetadata(nft.identifier), cache_info_1.CacheInfo.NftMetadata(nft.identifier).ttl);
    }
    async refreshMetadata(nft) {
        let metadataRaw = await this.getMetadataRaw(nft);
        if (!metadataRaw) {
            metadataRaw = {};
        }
        await this.persistenceService.setMetadata(nft.identifier, metadataRaw);
        await this.cachingService.set(cache_info_1.CacheInfo.NftMetadata(nft.identifier).key, metadataRaw, cache_info_1.CacheInfo.NftMetadata(nft.identifier).ttl);
        this.clientProxy.emit('refreshCacheKey', {
            key: cache_info_1.CacheInfo.NftMetadata(nft.identifier).key,
            ttl: cache_info_1.CacheInfo.NftMetadata(nft.identifier).ttl,
        });
        return metadataRaw;
    }
    async getMetadataRaw(nft) {
        if (!nft.attributes) {
            return null;
        }
        try {
            const nftMetadata = await caching_utils_1.CachingUtils.executeOptimistic({
                cachingService: this.cachingService,
                description: `Fetching metadata for nft with identifier '${nft.identifier}' and attributes '${nft.attributes}'`,
                key: cache_info_1.CacheInfo.PendingMetadataGet(nft.identifier).key,
                ttl: cache_info_1.CacheInfo.PendingMetadataGet(nft.identifier).ttl,
                action: async () => await this.nftExtendedAttributesService.tryGetExtendedAttributesFromBase64EncodedAttributes(nft.attributes),
            });
            return nftMetadata !== null && nftMetadata !== void 0 ? nftMetadata : null;
        }
        catch (error) {
            this.logger.error(error);
            this.logger.error(`Error when fetching metadata for nft with identifier '${nft.identifier}'`);
            throw error;
        }
    }
};
NftMetadataService = NftMetadataService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(3, (0, common_1.Inject)('PUBSUB_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [nft_extendedattributes_service_1.NftExtendedAttributesService,
        persistence_service_1.PersistenceService,
        sdk_nestjs_cache_1.CacheService,
        microservices_1.ClientProxy])
], NftMetadataService);
exports.NftMetadataService = NftMetadataService;
//# sourceMappingURL=nft.metadata.service.js.map