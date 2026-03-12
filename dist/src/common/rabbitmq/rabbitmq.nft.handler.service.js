"use strict";
var RabbitMqNftHandlerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqNftHandlerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nft_service_1 = require("../../endpoints/nfts/nft.service");
const process_nft_settings_1 = require("../../endpoints/process-nfts/entities/process.nft.settings");
const nft_worker_service_1 = require("../../queue.worker/nft.worker/nft.worker.service");
const cache_info_1 = require("../../utils/cache.info");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const indexer_service_1 = require("../indexer/indexer.service");
const nft_sub_type_1 = require("../../endpoints/nfts/entities/nft.sub.type");
const common_2 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let RabbitMqNftHandlerService = RabbitMqNftHandlerService_1 = class RabbitMqNftHandlerService {
    constructor(nftWorkerService, nftService, indexerService, cachingService, clientProxy) {
        this.nftWorkerService = nftWorkerService;
        this.nftService = nftService;
        this.indexerService = indexerService;
        this.cachingService = cachingService;
        this.clientProxy = clientProxy;
        this.logger = new sdk_nestjs_common_1.OriginLogger(RabbitMqNftHandlerService_1.name);
    }
    async getCollectionType(collectionIdentifier) {
        var _a;
        const type = (_a = this.cachingService.getLocal(cache_info_1.CacheInfo.CollectionType(collectionIdentifier).key)) !== null && _a !== void 0 ? _a : await this.getCollectionTypeRaw(collectionIdentifier);
        if (!type) {
            return null;
        }
        this.cachingService.setLocal(cache_info_1.CacheInfo.CollectionType(collectionIdentifier).key, type, cache_info_1.CacheInfo.CollectionType(collectionIdentifier).ttl);
        return type;
    }
    async getCollectionTypeRaw(collectionIdentifier) {
        const collection = await this.indexerService.getCollection(collectionIdentifier);
        if (!collection) {
            return undefined;
        }
        return collection.type;
    }
    async handleNftUpdateAttributesEvent(event) {
        const identifier = this.getNftIdentifier(event.topics);
        const attributes = sdk_nestjs_common_1.BinaryUtils.base64Decode(event.topics[3]);
        this.logger.log(`Detected 'DCDTNFTUpdateAttributes' event for NFT with identifier '${identifier}' and attributes '${attributes}'`);
        const nft = await this.nftService.getSingleNft(identifier);
        if (!nft) {
            this.logger.log(`Could not fetch NFT details for NFT with identifier '${identifier}'`);
            return false;
        }
        nft.attributes = attributes;
        try {
            const isDynamicNft = this.isDynamicNftType(nft.subType);
            if (isDynamicNft) {
                this.logger.log(`Processing dynamic NFT with identifier '${identifier}', forcing refresh of metadata and media`);
                await this.nftWorkerService.addProcessNftQueueJob(nft, new process_nft_settings_1.ProcessNftSettings({
                    forceRefreshMetadata: true,
                    forceRefreshMedia: true,
                    forceRefreshThumbnail: true,
                }));
            }
            else {
                await this.nftWorkerService.addProcessNftQueueJob(nft, new process_nft_settings_1.ProcessNftSettings({ forceRefreshMetadata: true }));
            }
        }
        catch (error) {
            this.logger.error(`An unhandled error occurred when processing NFT update attributes event for NFT with identifier '${identifier}'`);
            this.logger.error(error);
        }
        finally {
            return true;
        }
    }
    isDynamicNftType(subType) {
        if (subType) {
            return [
                nft_sub_type_1.NftSubType.DynamicNonFungibleDCDT,
                nft_sub_type_1.NftSubType.DynamicSemiFungibleDCDT,
                nft_sub_type_1.NftSubType.DynamicMetaDCDT,
            ].includes(subType);
        }
        return false;
    }
    async handleNftCreateEvent(event) {
        const identifier = this.getNftIdentifier(event.topics);
        const collectionIdentifier = identifier.split('-').slice(0, 2).join('-');
        const collectionType = await this.getCollectionType(collectionIdentifier);
        this.logger.log(`Detected 'DCDTNFTCreate' event for NFT with identifier '${identifier}' and collection type '${collectionType}'`);
        await new Promise(resolve => setTimeout(resolve, 5000));
        const nft = await this.nftService.getSingleNft(identifier);
        if (!nft) {
            this.logger.log(`Could not fetch NFT details for NFT with identifier '${identifier}'`);
            return false;
        }
        try {
            const isDynamicNft = this.isDynamicNftType(nft.subType);
            if (isDynamicNft) {
                this.logger.log(`Processing dynamic NFT creation with identifier '${identifier}', forcing full refresh`);
                await this.nftWorkerService.addProcessNftQueueJob(nft, new process_nft_settings_1.ProcessNftSettings({
                    uploadAsset: true,
                    forceRefreshMetadata: true,
                    forceRefreshMedia: true,
                    forceRefreshThumbnail: true,
                }));
                return true;
            }
            const needsProcessing = await this.nftWorkerService.needsProcessing(nft, new process_nft_settings_1.ProcessNftSettings());
            if (needsProcessing) {
                await this.nftWorkerService.addProcessNftQueueJob(nft, new process_nft_settings_1.ProcessNftSettings({ uploadAsset: true }));
            }
            return true;
        }
        catch (error) {
            this.logger.error(`An unhandled error occurred when processing NFT Create event for NFT with identifier '${identifier}'`);
            this.logger.error(error);
            return false;
        }
    }
    async handleNftBurnEvent(event) {
        const identifier = this.getNftIdentifier(event.topics);
        this.logger.log(`Detected 'DCDTNFTBurn' event for NFT with identifier '${identifier}'`);
        try {
            const cacheKey = `nft:${identifier}`;
            await this.cachingService.delete(cacheKey);
            this.clientProxy.emit('deleteCacheKeys', [cacheKey]);
            this.logger.log(`Cache invalidated for NFT with identifier '${identifier}' across all instances`);
            return true;
        }
        catch (error) {
            this.logger.error(`An unhandled error occurred when processing NFT Burn event for NFT with identifier '${identifier}'`);
            this.logger.error(error);
            return false;
        }
    }
    async handleNftMetadataEvent(event) {
        const identifier = this.getNftIdentifier(event.topics);
        this.logger.log(`Detected '${event.identifier}' event for NFT with identifier '${identifier}'`);
        const nft = await this.nftService.getSingleNft(identifier);
        if (!nft) {
            this.logger.log(`Could not fetch NFT details for NFT with identifier '${identifier}'`);
            return false;
        }
        try {
            await this.nftWorkerService.addProcessNftQueueJob(nft, new process_nft_settings_1.ProcessNftSettings({
                forceRefreshMetadata: true,
                forceRefreshMedia: true,
            }));
            return true;
        }
        catch (error) {
            this.logger.error(`An unhandled error occurred when processing '${event.identifier}' event for NFT with identifier '${identifier}'`);
            this.logger.error(error);
            return false;
        }
    }
    async handleNftModifyCreatorEvent(event) {
        const identifier = this.getNftIdentifier(event.topics);
        this.logger.log(`Detected 'DCDTModifyCreator' event for NFT with identifier '${identifier}'`);
        try {
            const cacheKey = `nft:${identifier}`;
            await this.cachingService.delete(cacheKey);
            this.clientProxy.emit('deleteCacheKeys', [cacheKey]);
            this.logger.log(`Cache invalidated for NFT with identifier '${identifier}' across all instances`);
            return true;
        }
        catch (error) {
            this.logger.error(`An unhandled error occurred when processing NFT ModifyCreator event for NFT with identifier '${identifier}'`);
            this.logger.error(error);
            return false;
        }
    }
    getNftIdentifier(topics) {
        const collection = sdk_nestjs_common_1.BinaryUtils.base64Decode(topics[0]);
        const nonce = sdk_nestjs_common_1.BinaryUtils.base64ToHex(topics[1]);
        return `${collection}-${nonce}`;
    }
};
RabbitMqNftHandlerService = RabbitMqNftHandlerService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(4, (0, common_2.Inject)('PUBSUB_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [nft_worker_service_1.NftWorkerService,
        nft_service_1.NftService,
        indexer_service_1.IndexerService,
        sdk_nestjs_cache_1.CacheService,
        microservices_1.ClientProxy])
], RabbitMqNftHandlerService);
exports.RabbitMqNftHandlerService = RabbitMqNftHandlerService;
//# sourceMappingURL=rabbitmq.nft.handler.service.js.map