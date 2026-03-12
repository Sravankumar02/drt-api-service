"use strict";
var ProcessNftsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessNftsService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const cache_info_1 = require("../../utils/cache.info");
const nft_worker_service_1 = require("../../queue.worker/nft.worker/nft.worker.service");
const tiny_async_pool_1 = tslib_1.__importDefault(require("tiny-async-pool"));
const account_service_1 = require("../accounts/account.service");
const collection_service_1 = require("../collections/collection.service");
const nft_service_1 = require("../nfts/nft.service");
const process_nft_settings_1 = require("./entities/process.nft.settings");
const sdk_nestjs_common_2 = require("@sravankumar02/sdk-nestjs-common");
let ProcessNftsService = ProcessNftsService_1 = class ProcessNftsService {
    constructor(apiConfigService, nftWorkerService, nftService, collectionService, accountService, cachingService) {
        this.apiConfigService = apiConfigService;
        this.nftWorkerService = nftWorkerService;
        this.nftService = nftService;
        this.collectionService = collectionService;
        this.accountService = accountService;
        this.cachingService = cachingService;
        this.logger = new sdk_nestjs_common_2.OriginLogger(ProcessNftsService_1.name);
    }
    async process(processNftRequest) {
        const settings = process_nft_settings_1.ProcessNftSettings.fromRequest(processNftRequest);
        if (processNftRequest.collection) {
            return await this.processCollection(processNftRequest.collection, settings);
        }
        else if (processNftRequest.identifier) {
            const processed = await this.processNft(processNftRequest.identifier, settings);
            const result = {};
            result[processNftRequest.identifier] = processed;
            return result;
        }
        else {
            throw new Error('Provide an identifier or a collection to generate thumbnails for');
        }
    }
    async processWithOwnerCheck(address, processNftRequest) {
        var _a;
        const collectionOrIdentifier = (_a = processNftRequest.identifier) !== null && _a !== void 0 ? _a : processNftRequest.collection;
        if (!collectionOrIdentifier) {
            throw new Error('No collection or identifier has been provided');
        }
        const generateRetries = await this.cachingService.incrementRemote(cache_info_1.CacheInfo.GenerateThumbnails(collectionOrIdentifier).key);
        if (generateRetries > ProcessNftsService_1.MAXIMUM_PROCESS_RETRIES) {
            throw new Error('Thumbnails have already been generated');
        }
        const collection = collectionOrIdentifier.split('-').slice(0, 2).join('-');
        const isCollectionOwner = await this.isCollectionOwner(address, collection);
        if (!isCollectionOwner) {
            throw new Error(`Provided address '${address}' is not collection owner`);
        }
        const result = await this.process(processNftRequest);
        return result;
    }
    async processCollection(collection, settings) {
        const nfts = await this.nftService.getNfts({ from: 0, size: 10000 }, { collection });
        const results = await (0, tiny_async_pool_1.default)(this.apiConfigService.getPoolLimit(), nfts, async (nft) => await this.nftWorkerService.addProcessNftQueueJob(nft, settings));
        const result = {};
        for (const [index, nft] of nfts.entries()) {
            result[nft.identifier] = results[index];
        }
        return result;
    }
    async processNft(identifier, settings) {
        const nft = await this.nftService.getSingleNft(identifier);
        if (!nft) {
            this.logger.error(`Could not get details for nft with identifier '${identifier}'`);
            return false;
        }
        return await this.nftWorkerService.addProcessNftQueueJob(nft, settings);
    }
    async isCollectionOwner(address, collection) {
        if (this.apiConfigService.getSecurityAdmins().includes(address)) {
            return true;
        }
        const collectionOwner = await this.getCollectionNonScOwner(collection);
        return address === collectionOwner;
    }
    async getCollectionNonScOwner(collection) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.CollectionNonScOwner(collection).key, async () => await this.getCollectionNonScOwnerRaw(collection), cache_info_1.CacheInfo.CollectionNonScOwner(collection).ttl);
    }
    async getCollectionNonScOwnerRaw(collection) {
        const nftCollection = await this.collectionService.getNftCollection(collection);
        if (!nftCollection) {
            throw new Error(`NFT Collection with identifier '${collection}' not found`);
        }
        if (!nftCollection.owner) {
            throw new Error(`NFT Collection with identifier '${collection}' does not have any owner`);
        }
        let collectionOwner = nftCollection.owner;
        let currentDepth = 0;
        while (sdk_nestjs_common_1.AddressUtils.isSmartContractAddress(collectionOwner) && currentDepth < ProcessNftsService_1.MAX_DEPTH) {
            const account = await this.accountService.getAccount(collectionOwner);
            if (!account) {
                throw new Error(`Could not fetch account details for address '${collectionOwner}'`);
            }
            currentDepth++;
            collectionOwner = account.ownerAddress;
        }
        if (sdk_nestjs_common_1.AddressUtils.isSmartContractAddress(collectionOwner)) {
            throw new Error(`Collection owner '${collectionOwner}' should not be smart contract`);
        }
        return collectionOwner;
    }
};
ProcessNftsService.MAX_DEPTH = 10;
ProcessNftsService.MAXIMUM_PROCESS_RETRIES = 2;
ProcessNftsService = ProcessNftsService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        nft_worker_service_1.NftWorkerService,
        nft_service_1.NftService,
        collection_service_1.CollectionService,
        account_service_1.AccountService,
        sdk_nestjs_cache_1.CacheService])
], ProcessNftsService);
exports.ProcessNftsService = ProcessNftsService;
//# sourceMappingURL=process.nfts.service.js.map