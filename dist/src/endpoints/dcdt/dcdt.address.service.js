"use strict";
var DcdtAddressService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DcdtAddressService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const gateway_component_request_1 = require("../../common/gateway/entities/gateway.component.request");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const protocol_service_1 = require("../../common/protocol/protocol.service");
const token_helpers_1 = require("../../utils/token.helpers");
const dcdt_data_source_1 = require("./entities/dcdt.data.source");
const dcdt_service_1 = require("./dcdt.service");
const gateway_nft_1 = require("../nfts/entities/gateway.nft");
const nft_account_1 = require("../nfts/entities/nft.account");
const nft_type_1 = require("../nfts/entities/nft.type");
const nft_extendedattributes_service_1 = require("../nfts/nft.extendedattributes.service");
const nft_collection_with_roles_1 = require("../collections/entities/nft.collection.with.roles");
const collection_service_1 = require("../collections/collection.service");
const collection_roles_1 = require("../tokens/entities/collection.roles");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const sdk_nestjs_monitoring_1 = require("@sravankumar02/sdk-nestjs-monitoring");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const trie_operations_timeout_error_1 = require("./exceptions/trie.operations.timeout.error");
const cache_info_1 = require("../../utils/cache.info");
const assets_service_1 = require("../../common/assets/assets.service");
let DcdtAddressService = DcdtAddressService_1 = class DcdtAddressService {
    constructor(apiConfigService, dcdtService, indexerService, gatewayService, cachingService, metricsService, protocolService, nftExtendedAttributesService, collectionService, assetsService) {
        this.apiConfigService = apiConfigService;
        this.dcdtService = dcdtService;
        this.indexerService = indexerService;
        this.gatewayService = gatewayService;
        this.cachingService = cachingService;
        this.metricsService = metricsService;
        this.protocolService = protocolService;
        this.nftExtendedAttributesService = nftExtendedAttributesService;
        this.collectionService = collectionService;
        this.assetsService = assetsService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(DcdtAddressService_1.name);
        this.pendingRequestsDictionary = {};
        this.NFT_THUMBNAIL_PREFIX = this.apiConfigService.getExternalMediaUrl() + '/nfts/asset';
    }
    async getNftsForAddress(address, filter, pagination, source, options) {
        if (filter.identifiers && filter.identifiers.length === 1) {
            return await this.getNftsForAddressFromGatewayWithElasticFallback(address, filter, pagination, options);
        }
        if (source === dcdt_data_source_1.DcdtDataSource.elastic || sdk_nestjs_common_1.AddressUtils.isSmartContractAddress(address)) {
            return await this.getNftsForAddressFromElastic(address, filter, pagination, options);
        }
        return await this.getNftsForAddressFromGatewayWithElasticFallback(address, filter, pagination, options);
    }
    async getNftCountForAddressFromElastic(address, filter) {
        return await this.indexerService.getNftCountForAddress(address, filter);
    }
    async getCollectionCountForAddressFromElastic(address, filter) {
        return await this.indexerService.getCollectionCountForAddress(address, filter);
    }
    async getNftsForAddressFromElastic(address, filter, pagination, options) {
        var _a, _b, _c, _d, _e;
        const dcdts = await this.indexerService.getNftsForAddress(address, filter, pagination);
        const gatewayNfts = [];
        for (const dcdt of dcdts) {
            const isToken = dcdt.tokenNonce === undefined;
            const nft = new gateway_nft_1.GatewayNft();
            if (isToken) {
                nft.balance = dcdt.balance;
                nft.tokenIdentifier = dcdt.token;
            }
            else {
                nft.attributes = (_a = dcdt.data) === null || _a === void 0 ? void 0 : _a.attributes;
                nft.balance = dcdt.balance;
                nft.creator = (_b = dcdt.data) === null || _b === void 0 ? void 0 : _b.creator;
                nft.name = (_c = dcdt.data) === null || _c === void 0 ? void 0 : _c.name;
                nft.nonce = dcdt.tokenNonce;
                nft.royalties = (_d = dcdt.data) === null || _d === void 0 ? void 0 : _d.royalties;
                nft.tokenIdentifier = dcdt.identifier;
                nft.uris = (_e = dcdt.data) === null || _e === void 0 ? void 0 : _e.uris;
                nft.timestamp = dcdt.timestamp;
            }
            gatewayNfts.push(nft);
        }
        const nfts = Object.values(gatewayNfts).map(x => x).filter(x => x.tokenIdentifier.split('-').length === 3);
        const nftAccounts = await this.mapToNftAccount(nfts, address, pagination, options);
        return nftAccounts;
    }
    async getCollectionsForAddress(address, filter, pagination) {
        const tokenCollections = await this.indexerService.getNftCollections(pagination, filter, address);
        const indexedCollections = {};
        for (const collection of tokenCollections) {
            indexedCollections[collection.token] = collection;
        }
        const accountCollections = await this.collectionService.buildCollectionsFromElasticData(tokenCollections);
        const collectionsWithRoles = [];
        for (const accountCollection of accountCollections) {
            const indexedCollection = indexedCollections[accountCollection.collection];
            if (indexedCollection) {
                accountCollection.timestamp = indexedCollection.timestamp;
                accountCollection.subType = indexedCollection.type;
                const collectionWithRoles = sdk_nestjs_http_1.ApiUtils.mergeObjects(new nft_collection_with_roles_1.NftCollectionWithRoles(), accountCollection);
                if (indexedCollection.roles) {
                    if (!indexedCollection.roles['DCDTTransferRole']) {
                        collectionWithRoles.canTransfer = true;
                    }
                    const addressRoles = new collection_roles_1.CollectionRoles();
                    if (collectionWithRoles.canTransfer === false) {
                        addressRoles.canTransfer = false;
                    }
                    for (const role of Object.keys(indexedCollection.roles)) {
                        const addresses = indexedCollection.roles[role].distinct();
                        if (addresses.includes(address)) {
                            token_helpers_1.TokenHelpers.setCollectionRole(addressRoles, role);
                        }
                    }
                    collectionWithRoles.role = addressRoles;
                    const clonedRoles = new collection_roles_1.CollectionRoles(collectionWithRoles.role);
                    delete clonedRoles.roles;
                    delete clonedRoles.canTransfer;
                    Object.assign(collectionWithRoles, clonedRoles);
                }
                collectionsWithRoles.push(collectionWithRoles);
            }
        }
        for (const collection of collectionsWithRoles) {
            if (collection.type === nft_type_1.NftType.NonFungibleDCDT) {
                delete collection.canAddQuantity;
            }
            if (collection.timestamp === 0) {
                delete accountCollection.timestamp;
            }
        }
        return collectionsWithRoles;
    }
    async applyRolesToAccountCollections(address, collections) {
        const rolesResult = await this.gatewayService.getAddressDcdtRoles(address);
        const roles = rolesResult.roles;
        for (const collection of collections) {
            const role = roles[collection.collection];
            collection.role.canCreate = role ? role.includes('DCDTRoleNFTCreate') : false;
            collection.role.canBurn = role ? role.includes('DCDTRoleNFTBurn') : false;
            collection.role.canUpdateAttributes = role ? role.includes('DCDTRoleNFTUpdateAttributes') : false;
            collection.role.canAddUri = role ? role.includes('DCDTRoleNFTAddURI') : false;
            collection.role.canTransfer = role ? role.includes('DCDTTransferRole') : false;
            if (collection.type === nft_type_1.NftType.SemiFungibleDCDT) {
                collection.role.canAddQuantity = role ? role.includes('DCDTRoleNFTAddQuantity') : false;
            }
            if (collection.timestamp === 0) {
                delete collection.timestamp;
            }
        }
    }
    async getNftsForAddressFromGatewayWithElasticFallback(address, filter, pagination, options) {
        const isTrieTimeout = await this.cachingService.get(cache_info_1.CacheInfo.AddressDcdtTrieTimeout(address).key);
        if (isTrieTimeout) {
            return await this.getNftsForAddressFromElastic(address, filter, pagination, options);
        }
        try {
            return await this.getNftsForAddressFromGateway(address, filter, pagination, options);
        }
        catch (error) {
            if (error instanceof trie_operations_timeout_error_1.TrieOperationsTimeoutError) {
                await this.cachingService.set(cache_info_1.CacheInfo.AddressDcdtTrieTimeout(address).key, true, cache_info_1.CacheInfo.AddressDcdtTrieTimeout(address).ttl);
                return await this.getNftsForAddressFromElastic(address, filter, pagination, options);
            }
            throw error;
        }
    }
    async getNftsForAddressFromGateway(address, filter, pagination, options) {
        let dcdts = {};
        if (filter.identifiers && filter.identifiers.length === 1) {
            const identifier = filter.identifiers[0];
            const collection = identifier.split('-').slice(0, 2).join('-');
            const nonceHex = identifier.split('-')[2];
            const nonceNumeric = sdk_nestjs_common_1.BinaryUtils.hexToNumber(nonceHex);
            let result;
            try {
                result = await this.gatewayService.get(`address/${address}/nft/${collection}/nonce/${nonceNumeric}`, gateway_component_request_1.GatewayComponentRequest.addressNftByNonce);
            }
            catch (error) {
                if (error.response.error.includes('account was not found')) {
                    return [];
                }
                throw error;
            }
            if (!result || !result.tokenData || result.tokenData.balance === '0') {
                return [];
            }
            result.tokenData.tokenIdentifier = identifier;
            dcdts[identifier] = result.tokenData;
        }
        else {
            dcdts = await this.getAllDcdtsForAddressFromGateway(address);
        }
        const nfts = Object.values(dcdts).map(x => x).filter(x => x.tokenIdentifier.split('-').length === 3);
        const collator = new Intl.Collator('en', { sensitivity: 'base' });
        nfts.sort((a, b) => collator.compare(a.tokenIdentifier, b.tokenIdentifier));
        const nftAccounts = await this.mapToNftAccount(nfts, address, pagination, options);
        return this.filterDcdtsForAddressFromGateway(filter, pagination, nftAccounts);
    }
    async mapToNftAccount(nfts, address, pagination, options) {
        var _a;
        const nftAccounts = [];
        for (const dataSourceNft of nfts) {
            const nft = new nft_account_1.NftAccount();
            nft.identifier = dataSourceNft.tokenIdentifier;
            nft.collection = dataSourceNft.tokenIdentifier.split('-').slice(0, 2).join('-');
            nft.nonce = dataSourceNft.nonce;
            nft.creator = dataSourceNft.creator;
            nft.royalties = Number(dataSourceNft.royalties) / 100;
            nft.uris = dataSourceNft.uris ? dataSourceNft.uris.filter((x) => x) : [];
            nft.name = dataSourceNft.name;
            nft.timestamp = dataSourceNft.timestamp;
            nft.hash = (_a = token_helpers_1.TokenHelpers.getNftProof(dataSourceNft.hash)) !== null && _a !== void 0 ? _a : '';
            if (nft.uris && nft.uris.length > 0) {
                try {
                    nft.url = token_helpers_1.TokenHelpers.computeNftUri(sdk_nestjs_common_1.BinaryUtils.base64Decode(nft.uris[0]), this.NFT_THUMBNAIL_PREFIX);
                }
                catch (error) {
                    this.logger.error(error);
                }
            }
            nft.isWhitelistedStorage = nft.url.startsWith(this.NFT_THUMBNAIL_PREFIX);
            nft.attributes = dataSourceNft.attributes;
            if (dataSourceNft.attributes) {
                nft.tags = this.nftExtendedAttributesService.getTags(dataSourceNft.attributes);
            }
            const collectionDetails = await this.dcdtService.getDcdtTokenProperties(nft.collection);
            if (collectionDetails) {
                nft.type = collectionDetails.type;
                nft.subType = collectionDetails.subType;
                if (nft.type === nft_type_1.NftType.MetaDCDT) {
                    const assets = await this.assetsService.getTokenAssets(nft.collection);
                    if (assets && assets.name) {
                        nft.name = assets.name;
                    }
                    nft.decimals = collectionDetails.decimals;
                    delete nft.royalties;
                    delete nft.uris;
                }
                if (!nft.name) {
                    nft.name = collectionDetails.name;
                }
            }
            nft.balance = dataSourceNft.balance;
            nftAccounts.push(nft);
        }
        if (address && pagination) {
            await this.batchFetchReceivedAtTimestamps(nftAccounts, address, options);
        }
        return nftAccounts;
    }
    async batchFetchReceivedAtTimestamps(nftAccounts, address, options) {
        try {
            if (!options || !options.withReceivedAt || nftAccounts.length === 0) {
                return;
            }
            const identifiers = nftAccounts.map(nft => nft.identifier);
            const identifierToTimestamp = await this.indexerService.getAccountNftReceivedTimestamps(address, identifiers);
            for (const nft of nftAccounts) {
                if (identifierToTimestamp[nft.identifier]) {
                    nft.receivedAt = identifierToTimestamp[nft.identifier];
                }
            }
        }
        catch (error) {
            this.logger.error('Error in batchFetchReceivedAtTimestamps', error);
        }
    }
    async getAllDcdtsForAddressFromGatewayRaw(address) {
        const dcdtResult = await this.gatewayService.get(`address/${address}/dcdt`, gateway_component_request_1.GatewayComponentRequest.addressDcdt, async (error) => {
            var _a, _b;
            const errorMessage = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error;
            if (errorMessage) {
                if (errorMessage.includes('account was not found')) {
                    return true;
                }
                if (errorMessage.includes('trie operations timeout')) {
                    throw new trie_operations_timeout_error_1.TrieOperationsTimeoutError();
                }
            }
            return false;
        });
        if (!dcdtResult) {
            return {};
        }
        return dcdtResult.dcdts;
    }
    async getAllDcdtsForAddressFromGateway(address) {
        let pendingRequest = this.pendingRequestsDictionary[address];
        if (pendingRequest) {
            const result = await pendingRequest;
            this.metricsService.incrementPendingApiHit('Gateway.AccountDcdts');
            return result;
        }
        const cachedValue = this.cachingService.getLocal(`address:${address}:dcdts`);
        if (cachedValue) {
            this.metricsService.incrementCachedApiHit('Gateway.AccountDcdts');
            return cachedValue;
        }
        pendingRequest = this.getAllDcdtsForAddressFromGatewayRaw(address);
        this.pendingRequestsDictionary[address] = pendingRequest;
        let dcdts;
        try {
            dcdts = await pendingRequest;
        }
        finally {
            delete this.pendingRequestsDictionary[address];
        }
        const ttl = await this.protocolService.getSecondsRemainingUntilNextRound();
        this.cachingService.setLocal(`address:${address}:dcdts`, dcdts, ttl);
        return dcdts;
    }
    filterDcdtsForAddressFromGateway(filter, pagination, nfts) {
        var _a, _b;
        if (filter.search) {
            const searchLower = filter.search.toLowerCase();
            nfts = nfts.filter(x => x.name.toLowerCase().includes(searchLower) || x.identifier.toLowerCase().includes(searchLower));
        }
        if (filter.identifiers) {
            nfts = nfts.filter(x => { var _a; return (_a = filter.identifiers) === null || _a === void 0 ? void 0 : _a.includes(x.identifier); });
        }
        if (filter.type) {
            const nftTypes = (_a = filter.type) !== null && _a !== void 0 ? _a : [];
            nfts = nfts.filter(x => nftTypes.includes(x.type));
        }
        if (filter.subType) {
            const nftSubTypes = (_b = filter.subType) !== null && _b !== void 0 ? _b : [];
            nfts = nfts.filter(x => nftSubTypes.includes(x.subType));
        }
        if (filter.collection) {
            nfts = nfts.filter(x => x.collection === filter.collection);
        }
        if (filter.name) {
            const searchedNameLower = filter.name.toLowerCase();
            nfts = nfts.filter(x => x.name.toLowerCase().includes(searchedNameLower));
        }
        if (filter.collections) {
            const collectionsArray = filter.collections;
            nfts = nfts.filter(x => collectionsArray.includes(x.collection));
        }
        if (filter.tags) {
            const tagsArray = filter.tags;
            nfts = nfts.filter(nft => tagsArray.filter(tag => nft.tags.includes(tag)).length === tagsArray.length);
        }
        if (filter.creator) {
            nfts = nfts.filter(x => x.creator === filter.creator);
        }
        if (filter.hasUris === true) {
            nfts = nfts.filter(x => x.uris && x.uris.length > 0);
        }
        else if (filter.hasUris === false) {
            nfts = nfts.filter(x => x.uris && x.uris.length === 0);
        }
        if (filter.includeFlagged !== true) {
            nfts = nfts.filter(x => !x.scamInfo);
        }
        if (filter.excludeMetaDCDT === true) {
            nfts = nfts.filter(x => x.type.in(nft_type_1.NftType.NonFungibleDCDT, nft_type_1.NftType.SemiFungibleDCDT));
        }
        const { from, size } = pagination;
        nfts = nfts.slice(from, from + size);
        return nfts;
    }
};
DcdtAddressService = DcdtAddressService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(8, (0, common_1.Inject)((0, common_1.forwardRef)(() => collection_service_1.CollectionService))),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        dcdt_service_1.DcdtService,
        indexer_service_1.IndexerService,
        gateway_service_1.GatewayService,
        sdk_nestjs_cache_1.CacheService,
        sdk_nestjs_monitoring_1.MetricsService,
        protocol_service_1.ProtocolService,
        nft_extendedattributes_service_1.NftExtendedAttributesService,
        collection_service_1.CollectionService,
        assets_service_1.AssetsService])
], DcdtAddressService);
exports.DcdtAddressService = DcdtAddressService;
//# sourceMappingURL=dcdt.address.service.js.map