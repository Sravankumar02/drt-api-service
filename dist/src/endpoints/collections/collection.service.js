"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const query_pagination_1 = require("../../common/entities/query.pagination");
const dcdt_service_1 = require("../dcdt/dcdt.service");
const collection_filter_1 = require("./entities/collection.filter");
const nft_collection_1 = require("./entities/nft.collection");
const nft_type_1 = require("../nfts/entities/nft.type");
const assets_service_1 = require("../../common/assets/assets.service");
const vm_query_service_1 = require("../vm.query/vm.query.service");
const cache_info_1 = require("../../utils/cache.info");
const dcdt_address_service_1 = require("../dcdt/dcdt.address.service");
const collection_roles_1 = require("../tokens/entities/collection.roles");
const token_helpers_1 = require("../../utils/token.helpers");
const nft_collection_account_1 = require("./entities/nft.collection.account");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const persistence_service_1 = require("../../common/persistence/persistence.service");
const nft_rank_algorithm_1 = require("../../common/assets/entities/nft.rank.algorithm");
const nft_collection_detailed_1 = require("./entities/nft.collection.detailed");
const collection_logo_1 = require("./entities/collection.logo");
const scam_info_dto_1 = require("../../common/entities/scam-info.dto");
const nft_type_2 = require("../../common/indexer/entities/nft.type");
const concurrency_utils_1 = require("../../utils/concurrency.utils");
let CollectionService = class CollectionService {
    constructor(apiConfigService, indexerService, dcdtService, assetsService, vmQueryService, cachingService, dcdtAddressService, persistenceService) {
        this.apiConfigService = apiConfigService;
        this.indexerService = indexerService;
        this.dcdtService = dcdtService;
        this.assetsService = assetsService;
        this.vmQueryService = vmQueryService;
        this.cachingService = cachingService;
        this.dcdtAddressService = dcdtAddressService;
        this.persistenceService = persistenceService;
    }
    async isCollection(identifier) {
        const collection = await this.indexerService.getCollection(identifier);
        return collection !== undefined;
    }
    async getNftCollections(pagination, filter) {
        if (this.isCacheableCollectionFilter(filter)) {
            return await this.cachingService.getOrSet(cache_info_1.CacheInfo.Collections(pagination).key, () => this.fetchAndProcessCollections(pagination, filter), cache_info_1.CacheInfo.Collections(pagination).ttl);
        }
        return await this.fetchAndProcessCollections(pagination, filter);
    }
    async fetchAndProcessCollections(pagination, filter) {
        const tokenCollections = await this.indexerService.getNftCollections(pagination, filter);
        return await this.processNftCollections(tokenCollections);
    }
    isCacheableCollectionFilter(filter) {
        return !filter.collection &&
            !(filter.identifiers && filter.identifiers.length > 0) &&
            !(filter.type && filter.type.length > 0) &&
            !(filter.subType && filter.subType.length > 0) &&
            !filter.search &&
            !filter.owner &&
            filter.before === undefined &&
            filter.after === undefined &&
            filter.canCreate === undefined &&
            filter.canBurn === undefined &&
            filter.canAddQuantity === undefined &&
            filter.canUpdateAttributes === undefined &&
            filter.canAddUri === undefined &&
            filter.canTransferRole === undefined &&
            filter.excludeMetaDCDT === undefined &&
            filter.sort === undefined &&
            filter.order === undefined;
    }
    async getNftCollectionsByIds(identifiers) {
        const tokenCollections = await this.indexerService.getNftCollectionsByIds(identifiers);
        return await this.processNftCollections(tokenCollections);
    }
    async processNftCollections(tokenCollections) {
        const collectionsIdentifiers = tokenCollections.map((collection) => collection.token);
        const collectionsAssets = await this.batchGetCollectionsAssets(collectionsIdentifiers);
        const nftCollections = [];
        for (const esCollection of tokenCollections) {
            const identifierParts = esCollection.token.split('-');
            const ticker = identifierParts[0];
            const collectionBase = identifierParts.slice(0, 2).join('-');
            const assets = collectionsAssets[esCollection.token];
            const props = esCollection.properties;
            const isMetaDCDT = esCollection.type === nft_type_2.NftType.MetaDCDT || esCollection.type === nft_type_2.NftType.DynamicMetaDCDT;
            const nftCollection = new nft_collection_1.NftCollection({
                name: esCollection.name,
                collection: collectionBase,
                ticker: ticker,
                owner: esCollection.currentOwner,
                assets: assets,
                canFreeze: props === null || props === void 0 ? void 0 : props.canFreeze,
                canWipe: props === null || props === void 0 ? void 0 : props.canWipe,
                canPause: props === null || props === void 0 ? void 0 : props.canPause,
                canTransferNftCreateRole: props === null || props === void 0 ? void 0 : props.canTransferNFTCreateRole,
                canChangeOwner: props === null || props === void 0 ? void 0 : props.canChangeOwner,
                canUpgrade: props === null || props === void 0 ? void 0 : props.canUpgrade,
                canAddSpecialRoles: props === null || props === void 0 ? void 0 : props.canAddSpecialRoles,
                decimals: isMetaDCDT ? esCollection.numDecimals : undefined,
            });
            nftCollection.ticker = nftCollection.assets ? ticker : nftCollection.collection;
            this.applyPropertiesToCollectionFromElasticSearch(nftCollection, esCollection);
            nftCollections.push(nftCollection);
        }
        return nftCollections;
    }
    applyPropertiesToCollectionFromElasticSearch(nftCollection, indexedCollection) {
        switch (indexedCollection.type) {
            case nft_type_2.NftType.NonFungibleDCDT:
            case nft_type_2.NftType.NonFungibleDCDTv2:
            case nft_type_2.NftType.DynamicNonFungibleDCDT:
                nftCollection.type = nft_type_1.NftType.NonFungibleDCDT;
                break;
            case nft_type_2.NftType.MetaDCDT:
            case nft_type_2.NftType.DynamicMetaDCDT:
                nftCollection.type = nft_type_1.NftType.MetaDCDT;
                break;
            case nft_type_2.NftType.SemiFungibleDCDT:
            case nft_type_2.NftType.DynamicSemiFungibleDCDT:
                nftCollection.type = nft_type_1.NftType.SemiFungibleDCDT;
                break;
        }
        nftCollection.subType = indexedCollection.type;
        nftCollection.timestamp = indexedCollection.timestamp;
        if (nftCollection.type.in(nft_type_1.NftType.NonFungibleDCDT, nft_type_1.NftType.SemiFungibleDCDT, nft_type_1.NftType.MetaDCDT)) {
            nftCollection.isVerified = indexedCollection.api_isVerified;
            nftCollection.nftCount = indexedCollection.api_nftCount;
            nftCollection.holderCount = indexedCollection.api_holderCount;
            if (indexedCollection.nft_scamInfoType && indexedCollection.nft_scamInfoType !== 'none') {
                nftCollection.scamInfo = new scam_info_dto_1.ScamInfo({
                    type: indexedCollection.nft_scamInfoType,
                    info: indexedCollection.nft_scamInfoDescription,
                });
            }
        }
    }
    async buildCollectionsFromElasticData(esCollections) {
        return await this.processNftCollections(esCollections);
    }
    async applyPropertiesToCollections(collectionsIdentifiers) {
        const nftCollections = [];
        const [collectionsProperties, collectionsAssets] = await Promise.all([
            this.batchGetCollectionsProperties(collectionsIdentifiers),
            this.batchGetCollectionsAssets(collectionsIdentifiers),
        ]);
        for (const collectionIdentifier of collectionsIdentifiers) {
            const collectionProperties = collectionsProperties[collectionIdentifier];
            if (!collectionProperties) {
                continue;
            }
            const identifierParts = collectionIdentifier.split('-');
            const ticker = identifierParts[0];
            const collectionBase = identifierParts.slice(0, 2).join('-');
            const assets = collectionsAssets[collectionIdentifier];
            const nftCollection = new nft_collection_1.NftCollection({
                type: collectionProperties.type,
                name: collectionProperties.name,
                collection: collectionBase,
                ticker: ticker,
                canFreeze: collectionProperties.canFreeze,
                canWipe: collectionProperties.canWipe,
                canPause: collectionProperties.canPause,
                canTransferNftCreateRole: collectionProperties.canTransferNFTCreateRole,
                canChangeOwner: collectionProperties.canChangeOwner,
                canUpgrade: collectionProperties.canUpgrade,
                canAddSpecialRoles: collectionProperties.canAddSpecialRoles,
                owner: collectionProperties.owner,
                assets: assets,
                decimals: collectionProperties.type === nft_type_1.NftType.MetaDCDT ? collectionProperties.decimals : undefined,
            });
            nftCollection.ticker = nftCollection.assets ? collectionIdentifier.split('-')[0] : nftCollection.collection;
            nftCollections.push(nftCollection);
        }
        return nftCollections;
    }
    async batchGetCollectionsProperties(identifiers) {
        const result = {};
        const chunks = this.splitIntoChunks(identifiers, 300);
        const chunkResults = await concurrency_utils_1.ConcurrencyUtils.executeWithConcurrencyLimit(chunks, async (chunk) => {
            if (this.apiConfigService.getCollectionPropertiesFromGateway()) {
                return await this.getCollectionProperties(chunk);
            }
            return await this.getDcdtProperties(chunk);
        }, 4, 'CollectionService.batchGetCollectionsProperties');
        for (const chunkResult of chunkResults) {
            Object.assign(result, chunkResult);
        }
        return result;
    }
    async batchGetCollectionsAssets(identifiers) {
        const collectionsAssets = {};
        const allAssets = await this.assetsService.getAllTokenAssets();
        const chunks = this.splitIntoChunks(identifiers, 300);
        await concurrency_utils_1.ConcurrencyUtils.executeWithConcurrencyLimit(chunks, async (chunk) => {
            await this.cachingService.batchApplyAll(chunk, identifier => cache_info_1.CacheInfo.DcdtAssets(identifier).key, identifier => Promise.resolve(allAssets[identifier]), (identifier, properties) => collectionsAssets[identifier] = properties, cache_info_1.CacheInfo.DcdtAssets('').ttl);
        }, 4, 'CollectionService.batchGetCollectionsAssets');
        return collectionsAssets;
    }
    async getNftCollectionCount(filter) {
        if (this.isCacheableCollectionFilter(filter)) {
            return await this.cachingService.getOrSet(cache_info_1.CacheInfo.CollectionsCount.key, async () => await this.indexerService.getNftCollectionCount(filter), cache_info_1.CacheInfo.CollectionsCount.ttl);
        }
        return await this.indexerService.getNftCollectionCount(filter);
    }
    async getNftCollectionRanks(identifier) {
        const elasticCollection = await this.indexerService.getCollection(identifier);
        if (!elasticCollection) {
            return undefined;
        }
        const assets = await this.assetsService.getTokenAssets(identifier);
        if (!assets) {
            return undefined;
        }
        if (assets.preferredRankAlgorithm !== nft_rank_algorithm_1.NftRankAlgorithm.custom) {
            return undefined;
        }
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.CollectionRanksForIdentifier(identifier).key, async () => await this.assetsService.getCollectionRanks(identifier), cache_info_1.CacheInfo.CollectionRanksForIdentifier(identifier).ttl);
    }
    async getNftCollection(identifier) {
        const elasticCollection = await this.indexerService.getCollection(identifier);
        if (!elasticCollection) {
            return undefined;
        }
        if (!sdk_nestjs_common_1.TokenUtils.isCollection(identifier)) {
            return undefined;
        }
        if (!Object.values(nft_type_2.NftType).includes(elasticCollection.type)) {
            return undefined;
        }
        const [collection] = await this.buildCollectionsFromElasticData([elasticCollection]);
        if (!collection) {
            return undefined;
        }
        const collectionDetailed = sdk_nestjs_http_1.ApiUtils.mergeObjects(new nft_collection_detailed_1.NftCollectionDetailed(), collection);
        collectionDetailed.traits = await this.getCollectionTraitsCached(identifier);
        await this.applyCollectionRoles(collectionDetailed, elasticCollection);
        return collectionDetailed;
    }
    async applyCollectionRoles(collection, elasticCollection) {
        var _a;
        collection.roles = await this.getCollectionRolesCached(elasticCollection.token, elasticCollection);
        const isTransferProhibitedByDefault = ((_a = collection.roles) === null || _a === void 0 ? void 0 : _a.some(x => x.canTransfer === true)) === true;
        collection.canTransfer = !isTransferProhibitedByDefault;
        if (collection.canTransfer) {
            for (const role of collection.roles) {
                role.canTransfer = undefined;
            }
        }
    }
    getNftCollectionRoles(elasticCollection) {
        return this.getNftCollectionRolesFromElasticResponse(elasticCollection);
    }
    async getNftCollectionRolesFromGateway(elasticCollection) {
        return await this.getNftCollectionRolesFromDcdtContract(elasticCollection.token);
    }
    getNftCollectionRolesFromElasticResponse(elasticCollection) {
        if (!elasticCollection.roles) {
            return [];
        }
        const allRoles = [];
        for (const role of Object.keys(elasticCollection.roles)) {
            const addresses = elasticCollection.roles[role].distinct();
            for (const address of addresses) {
                const foundAddressRoles = allRoles.find((addressRole) => addressRole.address === address);
                if (foundAddressRoles) {
                    token_helpers_1.TokenHelpers.setCollectionRole(foundAddressRoles, role);
                    continue;
                }
                const addressRole = new collection_roles_1.CollectionRoles();
                addressRole.address = address;
                token_helpers_1.TokenHelpers.setCollectionRole(addressRole, role);
                allRoles.push(addressRole);
            }
        }
        return allRoles;
    }
    async getNftCollectionRolesFromDcdtContract(identifier) {
        const collectionRolesEncoded = await this.vmQueryService.vmQuery(this.apiConfigService.getDcdtContractAddress(), 'getSpecialRoles', undefined, [sdk_nestjs_common_1.BinaryUtils.stringToHex(identifier)]);
        if (!collectionRolesEncoded) {
            return [];
        }
        const allRoles = [];
        for (const rolesForAddressEncoded of collectionRolesEncoded) {
            const rolesForAddressDecoded = sdk_nestjs_common_1.BinaryUtils.base64Decode(rolesForAddressEncoded);
            const components = rolesForAddressDecoded.split(':');
            const roleForAddress = new collection_roles_1.CollectionRoles();
            roleForAddress.address = components[0];
            const roles = components[1].split(',');
            for (const role of roles) {
                token_helpers_1.TokenHelpers.setCollectionRole(roleForAddress, role);
            }
            allRoles.push(roleForAddress);
        }
        return allRoles;
    }
    async getCollectionForAddressWithRole(address, collection) {
        const filter = { collection };
        const collections = await this.dcdtAddressService.getCollectionsForAddress(address, filter, new query_pagination_1.QueryPagination({ from: 0, size: 1 }));
        if (collections.length === 0) {
            return undefined;
        }
        return collections[0];
    }
    async getCollectionsWithRolesForAddress(address, filter, pagination) {
        return await this.dcdtAddressService.getCollectionsForAddress(address, filter, pagination);
    }
    async getCollectionCountForAddress(address, filter) {
        if (this.isDefaultAddressCollectionFilter(filter)) {
            return await this.cachingService.getOrSet(cache_info_1.CacheInfo.CollectionCountForAddress(address).key, () => this.computeCollectionCountForAddress(address, filter), cache_info_1.CacheInfo.CollectionCountForAddress(address).ttl);
        }
        return await this.computeCollectionCountForAddress(address, filter);
    }
    async computeCollectionCountForAddress(address, filter) {
        const collections = await this.getCollectionsForAddress(address, filter, new query_pagination_1.QueryPagination({ from: 0, size: 10000 }));
        return collections.length;
    }
    async getCollectionForAddress(address, identifier) {
        if (!sdk_nestjs_common_1.TokenUtils.isCollection(identifier)) {
            return undefined;
        }
        const collections = await this.getCollectionsForAddress(address, new collection_filter_1.CollectionFilter({ collection: identifier }), new query_pagination_1.QueryPagination({ from: 0, size: 1 }));
        const collection = collections.find(x => x.collection === identifier);
        if (!collection) {
            return undefined;
        }
        return collection;
    }
    async getCollectionsForAddress(address, filter, pagination) {
        if (this.isDefaultAddressCollectionFilter(filter)) {
            const cacheInfo = cache_info_1.CacheInfo.CollectionsForAddress(address, pagination);
            return await this.cachingService.getOrSet(cacheInfo.key, () => this.fetchCollectionsForAddress(address, filter, pagination), cacheInfo.ttl);
        }
        return await this.fetchCollectionsForAddress(address, filter, pagination);
    }
    async fetchCollectionsForAddress(address, filter, pagination) {
        const collectionsRaw = await this.indexerService.getCollectionsForAddress(address, filter, pagination);
        if (collectionsRaw.length === 0) {
            return [];
        }
        const identifiers = collectionsRaw.map((x) => x.collection);
        const collections = await this.getNftCollectionsByIds(identifiers);
        const collectionMap = new Map();
        for (const collection of collections) {
            collectionMap.set(collection.collection, collection);
        }
        const accountCollections = [];
        for (const raw of collectionsRaw) {
            const collection = collectionMap.get(raw.collection);
            if (collection) {
                const accountCollection = sdk_nestjs_http_1.ApiUtils.mergeObjects(new nft_collection_account_1.NftCollectionAccount(), collection);
                accountCollection.count = raw.count;
                accountCollections.push(accountCollection);
            }
        }
        return accountCollections;
    }
    isDefaultAddressCollectionFilter(filter) {
        return !filter.search &&
            !(filter.type && filter.type.length > 0) &&
            !(filter.subType && filter.subType.length > 0) &&
            !filter.excludeMetaDCDT &&
            !filter.collection;
    }
    async getCollectionCountForAddressWithRoles(address, filter) {
        if (this.isDefaultAddressCollectionFilter(filter)) {
            return await this.cachingService.getOrSet(cache_info_1.CacheInfo.CollectionRolesCountForAddress(address).key, () => this.dcdtAddressService.getCollectionCountForAddressFromElastic(address, filter), cache_info_1.CacheInfo.CollectionRolesCountForAddress(address).ttl);
        }
        return await this.dcdtAddressService.getCollectionCountForAddressFromElastic(address, filter);
    }
    async getCollectionLogo(identifier) {
        const assets = await this.assetsService.getTokenAssets(identifier);
        if (!assets) {
            return;
        }
        return new collection_logo_1.CollectionLogo({ pngUrl: assets.pngUrl, svgUrl: assets.svgUrl });
    }
    async getLogoPng(identifier) {
        const collectionLogo = await this.getCollectionLogoCached(identifier);
        if (!collectionLogo) {
            return;
        }
        return collectionLogo.pngUrl;
    }
    async getLogoSvg(identifier) {
        const collectionLogo = await this.getCollectionLogoCached(identifier);
        if (!collectionLogo) {
            return;
        }
        return collectionLogo.svgUrl;
    }
    async getCollectionProperties(identifiers) {
        const collectionsProperties = {};
        await this.cachingService.batchApplyAll(identifiers, identifier => cache_info_1.CacheInfo.CollectionProperties(identifier).key, identifier => this.dcdtService.getCollectionProperties(identifier), (identifier, properties) => collectionsProperties[identifier] = properties, cache_info_1.CacheInfo.CollectionProperties('').ttl);
        return collectionsProperties;
    }
    async getDcdtProperties(identifiers) {
        const collectionsProperties = {};
        await this.cachingService.batchApplyAll(identifiers, identifier => cache_info_1.CacheInfo.DcdtProperties(identifier).key, identifier => this.dcdtService.getDcdtTokenProperties(identifier), (identifier, properties) => collectionsProperties[identifier] = properties, cache_info_1.CacheInfo.DcdtProperties('').ttl);
        return collectionsProperties;
    }
    splitIntoChunks(items, chunkSize) {
        if (chunkSize <= 0) {
            return [items];
        }
        const chunks = [];
        for (let i = 0; i < items.length; i += chunkSize) {
            chunks.push(items.slice(i, i + chunkSize));
        }
        return chunks;
    }
    async getCollectionTraitsCached(identifier) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.CollectionTraits(identifier).key, async () => { var _a; return (_a = await this.persistenceService.getCollectionTraits(identifier)) !== null && _a !== void 0 ? _a : []; }, cache_info_1.CacheInfo.CollectionTraits(identifier).ttl);
    }
    async getCollectionRolesCached(identifier, elasticCollection) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.CollectionRoles(identifier).key, async () => await this.getNftCollectionRolesFromGateway(elasticCollection), cache_info_1.CacheInfo.CollectionRoles(identifier).ttl);
    }
    async getCollectionLogoCached(identifier) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.CollectionLogo(identifier).key, async () => await this.getCollectionLogo(identifier), cache_info_1.CacheInfo.CollectionLogo(identifier).ttl);
    }
};
CollectionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => dcdt_address_service_1.DcdtAddressService))),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        indexer_service_1.IndexerService,
        dcdt_service_1.DcdtService,
        assets_service_1.AssetsService,
        vm_query_service_1.VmQueryService,
        sdk_nestjs_cache_1.CacheService,
        dcdt_address_service_1.DcdtAddressService,
        persistence_service_1.PersistenceService])
], CollectionService);
exports.CollectionService = CollectionService;
//# sourceMappingURL=collection.service.js.map