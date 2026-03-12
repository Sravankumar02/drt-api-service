"use strict";
var NftService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const query_pagination_1 = require("../../common/entities/query.pagination");
const token_helpers_1 = require("../../utils/token.helpers");
const nft_1 = require("./entities/nft");
const nft_filter_1 = require("./entities/nft.filter");
const nft_owner_1 = require("./entities/nft.owner");
const nft_type_1 = require("./entities/nft.type");
const dcdt_service_1 = require("../dcdt/dcdt.service");
const assets_service_1 = require("../../common/assets/assets.service");
const nft_metadata_service_1 = require("../../queue.worker/nft.worker/queue/job-services/metadata/nft.metadata.service");
const nft_media_service_1 = require("../../queue.worker/nft.worker/queue/job-services/media/nft.media.service");
const cache_info_1 = require("../../utils/cache.info");
const dcdt_address_service_1 = require("../dcdt/dcdt.address.service");
const persistence_service_1 = require("../../common/persistence/persistence.service");
const moa_token_service_1 = require("../moa/moa.token.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const locked_asset_service_1 = require("../../common/locked-asset/locked-asset.service");
const collection_account_1 = require("../collections/entities/collection.account");
const nft_rank_algorithm_1 = require("../../common/assets/entities/nft.rank.algorithm");
const nft_rarity_1 = require("./entities/nft.rarity");
const nft_rarities_1 = require("./entities/nft.rarities");
const sort_collection_nfts_1 = require("../collections/entities/sort.collection.nfts");
const scam_info_dto_1 = require("../../common/entities/scam-info.dto");
const nft_sub_type_1 = require("./entities/nft.sub.type");
const concurrency_utils_1 = require("../../utils/concurrency.utils");
let NftService = NftService_1 = class NftService {
    constructor(apiConfigService, indexerService, dcdtService, assetsService, cachingService, nftMetadataService, nftMediaService, persistenceService, dcdtAddressService, moaTokenService, lockedAssetService) {
        this.apiConfigService = apiConfigService;
        this.indexerService = indexerService;
        this.dcdtService = dcdtService;
        this.assetsService = assetsService;
        this.cachingService = cachingService;
        this.nftMetadataService = nftMetadataService;
        this.nftMediaService = nftMediaService;
        this.persistenceService = persistenceService;
        this.dcdtAddressService = dcdtAddressService;
        this.moaTokenService = moaTokenService;
        this.lockedAssetService = lockedAssetService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(NftService_1.name);
        this.NFT_THUMBNAIL_PREFIX = this.apiConfigService.getExternalMediaUrl() + '/nfts/asset';
        this.DEFAULT_MEDIA = [
            {
                url: this.nftMediaService.NFT_THUMBNAIL_DEFAULT,
                originalUrl: this.nftMediaService.NFT_THUMBNAIL_DEFAULT,
                thumbnailUrl: this.nftMediaService.NFT_THUMBNAIL_DEFAULT,
                fileType: 'image/png',
                fileSize: 29512,
            },
        ];
    }
    async getNfts(queryPagination, filter, queryOptions) {
        if (this.isCacheableNftList(filter, queryOptions)) {
            const cacheInfo = cache_info_1.CacheInfo.Nfts(queryPagination);
            return await this.cachingService.getOrSet(cacheInfo.key, () => this.fetchAndProcessNfts(queryPagination, filter, queryOptions), cacheInfo.ttl);
        }
        return await this.fetchAndProcessNfts(queryPagination, filter, queryOptions);
    }
    async fetchAndProcessNfts(queryPagination, filter, queryOptions) {
        const { from, size } = queryPagination;
        const nfts = await this.getNftsInternal({ from, size }, filter);
        await Promise.all([
            this.conditionallyApplyAssetsAndTicker(nfts, undefined, queryOptions),
            this.conditionallyApplyOwners(nfts, queryOptions),
            this.conditionallyApplySupply(nfts, queryOptions),
            this.batchProcessNfts(nfts),
        ]);
        await this.batchApplyUnlockFields(nfts);
        return nfts;
    }
    async batchProcessNfts(nfts, fields) {
        await Promise.all([
            this.batchApplyMedia(nfts, fields),
            this.batchApplyMetadata(nfts, fields),
        ]);
    }
    async conditionallyApplyAssetsAndTicker(nfts, fields, queryOptions) {
        var _a;
        if (fields && fields.includesNone(['ticker', 'assets'])) {
            return;
        }
        const allAssets = await this.assetsService.getAllTokenAssets();
        if ((queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.withAssets) === false) {
            return;
        }
        for (const nft of nfts) {
            nft.assets = (_a = allAssets[nft.identifier]) !== null && _a !== void 0 ? _a : allAssets[nft.collection];
            if (nft.assets) {
                nft.ticker = nft.collection.split('-')[0];
            }
            else {
                nft.ticker = nft.collection;
            }
        }
    }
    async conditionallyApplyOwners(nfts, queryOptions) {
        if (!(queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.withOwner)) {
            return;
        }
        const nftsIdentifiers = nfts
            .filter(x => x.type === nft_type_1.NftType.NonFungibleDCDT)
            .map(x => x.identifier);
        if (nftsIdentifiers.length === 0) {
            return;
        }
        const ownerMap = await this.getOwnersBulk(nftsIdentifiers);
        for (const nft of nfts) {
            if (nft.type === nft_type_1.NftType.NonFungibleDCDT && ownerMap[nft.identifier]) {
                nft.owner = ownerMap[nft.identifier];
            }
        }
    }
    async conditionallyApplySupply(nfts, queryOptions) {
        if (!(queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.withSupply)) {
            return;
        }
        const supplyNfts = nfts.filter(nft => nft.type.in(nft_type_1.NftType.SemiFungibleDCDT, nft_type_1.NftType.MetaDCDT));
        if (supplyNfts.length > 0) {
            await this.batchApplySupply(supplyNfts);
        }
    }
    async batchApplyUnlockFields(nfts, fields) {
        if (fields && fields.includesNone(['unlockSchedule', 'unlockEpoch'])) {
            return;
        }
        await Promise.all(nfts.map(nft => this.applyUnlockFields(nft, fields)));
    }
    async applyNftOwner(nft) {
        if (nft.type === nft_type_1.NftType.NonFungibleDCDT) {
            const accountsDcdt = await this.getAccountDcdtByIdentifier(nft.identifier);
            if (accountsDcdt.length > 0) {
                nft.owner = accountsDcdt[0].address;
            }
        }
    }
    async batchApplySupply(nfts, fields) {
        if (fields && !fields.includes('supply')) {
            return;
        }
        await this.cachingService.batchApplyAll(nfts, nft => cache_info_1.CacheInfo.TokenSupply(nft.identifier).key, nft => this.dcdtService.getTokenSupply(nft.identifier), (nft, value) => nft.supply = value.totalSupply, cache_info_1.CacheInfo.TokenSupply('').ttl);
    }
    async getOwnersBulk(identifiers, chunkSize = 512, concurrencyLimit = 4) {
        if (identifiers.length === 0) {
            return {};
        }
        const chunks = sdk_nestjs_common_1.BatchUtils.splitArrayIntoChunks(identifiers.distinct(), chunkSize);
        const results = await concurrency_utils_1.ConcurrencyUtils.executeWithConcurrencyLimit(chunks, async (chunk) => await this.getAccountDcdtByIdentifiers(chunk, { from: 0, size: chunk.length }), concurrencyLimit, 'NftService.getOwnersBulk');
        const ownerMap = {};
        for (const chunkResult of results) {
            for (const accountDcdt of chunkResult !== null && chunkResult !== void 0 ? chunkResult : []) {
                ownerMap[accountDcdt.identifier] = accountDcdt.address;
            }
        }
        return ownerMap;
    }
    async batchApplyMedia(nfts, fields) {
        if (fields && !fields.includes('media')) {
            return;
        }
        await this.cachingService.batchApply(nfts, nft => cache_info_1.CacheInfo.NftMedia(nft.identifier).key, async (nfts) => {
            const getMediaResults = await this.persistenceService.batchGetMedia(nfts.map((nft) => nft.identifier));
            return sdk_nestjs_common_1.RecordUtils.mapKeys(getMediaResults, identifier => cache_info_1.CacheInfo.NftMedia(identifier).key);
        }, (nft, media) => nft.media = media, cache_info_1.CacheInfo.NftMedia('').ttl);
        for (const nft of nfts) {
            if (token_helpers_1.TokenHelpers.needsDefaultMedia(nft)) {
                nft.media = this.DEFAULT_MEDIA;
            }
            this.applyRedirectMedia(nft);
        }
    }
    async batchApplyMetadata(nfts, fields) {
        if (fields && !fields.includes('metadata')) {
            return;
        }
        await this.cachingService.batchApply(nfts, nft => cache_info_1.CacheInfo.NftMetadata(nft.identifier).key, async (nfts) => {
            const getMetadataResults = await this.persistenceService.batchGetMetadata(nfts.map((nft) => nft.identifier));
            return sdk_nestjs_common_1.RecordUtils.mapKeys(getMetadataResults, identifier => cache_info_1.CacheInfo.NftMetadata(identifier).key);
        }, (nft, metadata) => nft.metadata = metadata, cache_info_1.CacheInfo.NftMetadata('').ttl);
    }
    async processNft(nft) {
        await Promise.all([
            this.applyMedia(nft),
            this.applyMetadata(nft),
        ]);
        if (token_helpers_1.TokenHelpers.needsDefaultMedia(nft)) {
            nft.media = this.DEFAULT_MEDIA;
        }
    }
    async applyAssetsAndTicker(token, fields) {
        var _a;
        if (fields && fields.includesNone(['ticker', 'assets'])) {
            return;
        }
        token.assets = (_a = await this.assetsService.getTokenAssets(token.identifier)) !== null && _a !== void 0 ? _a : await this.assetsService.getTokenAssets(token.collection);
        if (token.assets) {
            token.ticker = token.collection.split('-')[0];
        }
        else {
            token.ticker = token.collection;
        }
    }
    async getSingleNft(identifier) {
        const nfts = await this.getNftsInternal(new query_pagination_1.QueryPagination({ from: 0, size: 1 }), new nft_filter_1.NftFilter(), identifier);
        if (!sdk_nestjs_common_1.TokenUtils.isNft(identifier)) {
            return undefined;
        }
        if (nfts.length === 0) {
            return undefined;
        }
        const nft = sdk_nestjs_http_1.ApiUtils.mergeObjects(new nft_1.Nft(), nfts[0]);
        if (nft.identifier.toLowerCase() !== identifier.toLowerCase()) {
            return undefined;
        }
        const types = [
            nft_type_1.NftType.SemiFungibleDCDT,
            nft_type_1.NftType.MetaDCDT,
            nft_sub_type_1.NftSubType.DynamicSemiFungibleDCDT,
            nft_sub_type_1.NftSubType.DynamicMetaDCDT,
        ];
        await Promise.all([
            (async () => {
                if (nft.type && types.includes(nft.type)) {
                    await this.applySupply(nft);
                }
            })(),
            this.applyAssetsAndTicker(nft),
            this.processNft(nft),
            (async () => {
                await this.applyNftOwner(nft);
                await this.applyNftAttributes(nft);
            })(),
        ]);
        await this.applyUnlockFields(nft);
        return nft;
    }
    async applyUnlockFields(nft, fields) {
        if (fields && fields.includesNone(['unlockSchedule', 'unlockEpoch'])) {
            return;
        }
        if (!nft.attributes) {
            return;
        }
        try {
            nft.unlockSchedule = await this.lockedAssetService.getLkmoaUnlockSchedule(nft.identifier, nft.attributes);
        }
        catch (error) {
            this.logger.error(`An error occurred while applying unlock schedule for NFT with identifier '${nft.identifier}' and attributes '${nft.attributes}'`);
            this.logger.error(error);
        }
        try {
            nft.unlockEpoch = await this.lockedAssetService.getXmoaUnlockEpoch(nft.identifier, nft.attributes);
        }
        catch (error) {
            this.logger.error(`An error occurred while applying unlock epoch for NFT with identifier '${nft.identifier}' and attributes '${nft.attributes}'`);
            this.logger.error(error);
        }
    }
    async applyNftAttributes(nft) {
        if (!nft.owner) {
            return;
        }
        let attributes = nft.attributes;
        if (!attributes || attributes.length === 0) {
            const nftsForAddress = await this.dcdtAddressService.getNftsForAddress(nft.owner, new nft_filter_1.NftFilter({ identifiers: [nft.identifier] }), new query_pagination_1.QueryPagination({
                from: 0,
                size: 1,
            }));
            if (nftsForAddress.length === 0) {
                return;
            }
            attributes = nftsForAddress[0].attributes;
        }
        nft.attributes = attributes;
    }
    async applyMedia(nft) {
        var _a;
        nft.media = (_a = await this.nftMediaService.getMedia(nft.identifier)) !== null && _a !== void 0 ? _a : undefined;
        this.applyRedirectMedia(nft);
    }
    async applyMetadata(nft) {
        var _a;
        nft.metadata = (_a = await this.nftMetadataService.getMetadata(nft)) !== null && _a !== void 0 ? _a : undefined;
    }
    async isNft(identifier) {
        if (identifier.split('-').length !== 3) {
            return false;
        }
        const nfts = await this.getNftsInternal(new query_pagination_1.QueryPagination({ from: 0, size: 1 }), new nft_filter_1.NftFilter(), identifier);
        return nfts.length > 0;
    }
    async getNftOwners(identifier, pagination) {
        const isNft = await this.isNft(identifier);
        if (!isNft) {
            return undefined;
        }
        const accountsDcdt = await this.getAccountDcdtByIdentifier(identifier, pagination);
        return accountsDcdt.map((dcdt) => {
            const owner = new nft_owner_1.NftOwner();
            owner.address = dcdt.address;
            owner.balance = dcdt.balance;
            return owner;
        });
    }
    async getCollectionOwners(identifier, pagination) {
        const accountsDcdt = await this.getAccountDcdtByIdentifier(identifier, pagination);
        return accountsDcdt.map((dcdt) => new collection_account_1.CollectionAccount({
            address: dcdt.address,
            balance: dcdt.balance,
        }));
    }
    async getNftsInternal(pagination, filter, identifier) {
        var _a;
        if (filter.sort && filter.sort === sort_collection_nfts_1.SortCollectionNfts.rank && filter.collection) {
            const assets = await this.assetsService.getTokenAssets(filter.collection);
            filter.sort = this.getNftRankElasticKey(this.getNftRankAlgorithmFromAssets(assets));
        }
        const elasticNfts = await this.indexerService.getNfts(pagination, filter, identifier);
        const nfts = [];
        for (const elasticNft of elasticNfts) {
            const nft = new nft_1.Nft();
            nft.identifier = elasticNft.identifier;
            nft.collection = elasticNft.token;
            nft.nonce = parseInt('0x' + nft.identifier.split('-')[2]);
            nft.timestamp = elasticNft.timestamp;
            if (elasticNft.nft_scamInfoType && elasticNft.nft_scamInfoType !== 'none') {
                nft.scamInfo = new scam_info_dto_1.ScamInfo({
                    type: elasticNft.nft_scamInfoType,
                    info: elasticNft.nft_scamInfoDescription,
                });
            }
            await this.applyExtendedAttributes(nft, elasticNft);
            const elasticNftData = elasticNft.data;
            if (elasticNftData) {
                nft.name = elasticNftData.name;
                nft.hash = (_a = token_helpers_1.TokenHelpers.getNftProof(elasticNftData.hash)) !== null && _a !== void 0 ? _a : '';
                nft.creator = elasticNftData.creator;
                nft.royalties = elasticNftData.royalties ? elasticNftData.royalties / 100 : undefined;
                nft.attributes = elasticNftData.attributes;
                if (elasticNftData.uris) {
                    nft.uris = elasticNftData.uris;
                }
                if (elasticNftData.tags) {
                    nft.tags = elasticNftData.tags;
                }
                if (nft.uris && nft.uris.length > 0) {
                    try {
                        nft.url = token_helpers_1.TokenHelpers.computeNftUri(sdk_nestjs_common_1.BinaryUtils.base64Decode(nft.uris[0]), this.NFT_THUMBNAIL_PREFIX);
                    }
                    catch (error) {
                        this.logger.error(error);
                    }
                }
                nft.isWhitelistedStorage = elasticNft.data.whiteListedStorage;
            }
            nfts.push(nft);
        }
        for (const nft of nfts) {
            const collectionProperties = await this.dcdtService.getDcdtTokenProperties(nft.collection);
            if (collectionProperties) {
                if (!nft.name) {
                    nft.name = collectionProperties.name;
                }
                nft.type = collectionProperties.type;
                nft.subType = collectionProperties.subType;
                if (nft.type === nft_type_1.NftType.MetaDCDT) {
                    nft.decimals = collectionProperties.decimals;
                    delete nft.royalties;
                }
            }
        }
        return nfts;
    }
    isWhitelistedStorage(uris) {
        if (!uris || uris.length === 0) {
            return false;
        }
        let url = '';
        try {
            url = token_helpers_1.TokenHelpers.computeNftUri(sdk_nestjs_common_1.BinaryUtils.base64Decode(uris[0]), this.NFT_THUMBNAIL_PREFIX);
        }
        catch (error) {
            this.logger.error(`Error when computing uri from '${uris[0]}'`);
            this.logger.error(error);
            return false;
        }
        return url.startsWith(this.NFT_THUMBNAIL_PREFIX);
    }
    async getNftOwnersCount(identifier) {
        const owners = await this.cachingService.getOrSet(cache_info_1.CacheInfo.NftOwnersCount(identifier).key, async () => await this.getNftOwnersCountRaw(identifier), cache_info_1.CacheInfo.NftOwnersCount(identifier).ttl);
        if (owners === null) {
            return undefined;
        }
        return owners;
    }
    async getNftOwnersCountRaw(identifier) {
        const isNft = await this.isNft(identifier);
        if (!isNft) {
            return null;
        }
        return await this.indexerService.getNftOwnersCount(identifier);
    }
    async getNftCount(filter) {
        if (this.isCacheableNftCount(filter)) {
            return await this.cachingService.getOrSet(cache_info_1.CacheInfo.NftsCount.key, async () => await this.indexerService.getNftCount(filter), cache_info_1.CacheInfo.NftsCount.ttl);
        }
        return await this.indexerService.getNftCount(filter);
    }
    async getNftsForAddress(address, queryPagination, filter, fields, queryOptions, source) {
        let nfts = await this.dcdtAddressService.getNftsForAddress(address, filter, queryPagination, source, queryOptions);
        await Promise.all(nfts.map(async (nft) => {
            await this.applyAssetsAndTicker(nft, fields);
            await this.applyPriceUsd(nft, fields);
        }));
        if (queryOptions && queryOptions.withSupply) {
            const supplyNfts = nfts.filter(nft => nft.type.in(nft_type_1.NftType.SemiFungibleDCDT, nft_type_1.NftType.MetaDCDT));
            await this.batchApplySupply(supplyNfts, fields);
        }
        await this.batchProcessNfts(nfts, fields);
        if (this.apiConfigService.isNftExtendedAttributesEnabled() && (!fields || fields.includesSome(['score', 'rank', 'isNsfw', 'scamInfo']))) {
            const internalNfts = await this.getNftsInternalByIdentifiers(nfts.map(x => x.identifier));
            const indexedInternalNfts = internalNfts.toRecord(x => x.identifier);
            for (const nft of nfts) {
                const indexedNft = indexedInternalNfts[nft.identifier];
                if (indexedNft) {
                    nft.score = indexedNft.score;
                    nft.rank = indexedNft.rank;
                    nft.isNsfw = indexedNft.isNsfw;
                    const scamInfo = indexedNft.scamInfo;
                    if (scamInfo) {
                        nft.scamInfo = new scam_info_dto_1.ScamInfo({
                            type: scamInfo.type,
                            info: scamInfo.info,
                        });
                    }
                }
            }
        }
        nfts = this.applyScamFilter(nfts, filter);
        await Promise.all(nfts.map(nft => this.applyUnlockFields(nft, fields)));
        return nfts;
    }
    async getNftsInternalByIdentifiers(identifiers) {
        const chunks = sdk_nestjs_common_1.BatchUtils.splitArrayIntoChunks(identifiers, 512);
        const results = await concurrency_utils_1.ConcurrencyUtils.executeWithConcurrencyLimit(chunks, async (chunk) => await this.getNftsInternal(new query_pagination_1.QueryPagination({ from: 0, size: chunk.length }), new nft_filter_1.NftFilter({ identifiers: chunk })), 4, 'NftService.getNftsInternalByIdentifiers');
        return results.flat();
    }
    async applyPriceUsd(nft, fields) {
        if (fields && fields.includesNone(['price', 'valueUsd'])) {
            return;
        }
        if (nft.type !== nft_type_1.NftType.MetaDCDT) {
            return;
        }
        try {
            const prices = await this.moaTokenService.getMoaPrices();
            const price = prices[nft.collection];
            if (price) {
                nft.price = price.price;
                nft.valueUsd = price.price * sdk_nestjs_common_1.NumberUtils.denominateString(nft.balance, nft.decimals);
            }
        }
        catch (error) {
            this.logger.error(`Unable to apply price on MetaDCDT with identifier '${nft.identifier}'`);
            this.logger.error(error);
        }
    }
    applyScamFilter(nfts, filter) {
        if (filter.scamType) {
            nfts = nfts.filter(nft => { var _a; return ((_a = nft.scamInfo) === null || _a === void 0 ? void 0 : _a.type) === filter.scamType; });
        }
        if (filter.isScam !== undefined) {
            if (filter.isScam) {
                nfts = nfts.filter(nft => nft.scamInfo && nft.scamInfo.type);
            }
            else {
                nfts = nfts.filter(nft => !nft.scamInfo || !nft.scamInfo.type);
            }
        }
        return nfts;
    }
    async getNftCountForAddress(address, filter) {
        return await this.dcdtAddressService.getNftCountForAddressFromElastic(address, filter);
    }
    async getNftForAddress(address, identifier, fields) {
        const filter = new nft_filter_1.NftFilter();
        filter.identifiers = [identifier];
        if (!sdk_nestjs_common_1.TokenUtils.isNft(identifier)) {
            return undefined;
        }
        const nfts = await this.getNftsForAddress(address, new query_pagination_1.QueryPagination({ from: 0, size: 1 }), filter, fields);
        if (nfts.length === 0) {
            return undefined;
        }
        return nfts[0];
    }
    async applySupply(nft) {
        const { totalSupply } = await this.dcdtService.getTokenSupply(nft.identifier);
        nft.supply = totalSupply;
    }
    async getNftSupply(identifier) {
        if (identifier.split('-').length !== 3) {
            return undefined;
        }
        const nfts = await this.getNftsInternal(new query_pagination_1.QueryPagination({ from: 0, size: 1 }), new nft_filter_1.NftFilter(), identifier);
        if (nfts.length === 0) {
            return undefined;
        }
        const supply = await this.dcdtService.getTokenSupply(identifier);
        return supply.totalSupply;
    }
    async getAccountDcdtByIdentifier(identifier, pagination) {
        return await this.getAccountDcdtByIdentifiers([identifier], pagination);
    }
    async getAccountDcdtByIdentifiers(identifiers, pagination) {
        return await this.indexerService.getAccountDcdtByIdentifiers(identifiers, pagination);
    }
    async getAccountDcdtByCollection(identifier, pagination) {
        return await this.indexerService.getAccountsDcdtByCollection([identifier], pagination);
    }
    getNftProofHash(nft) {
        const hashField = sdk_nestjs_common_1.BinaryUtils.base64Decode(nft.hash);
        if (nft.type !== nft_type_1.NftType.MetaDCDT || !hashField.startsWith('proof:')) {
            return undefined;
        }
        return hashField.split('proof:')[1];
    }
    getNftRarity(elasticNft, algorithm) {
        const score = elasticNft[this.getNftScoreElasticKey(algorithm)];
        const rank = elasticNft[this.getNftRankElasticKey(algorithm)];
        if (!score && !rank) {
            return undefined;
        }
        return new nft_rarity_1.NftRarity({ score, rank });
    }
    async applyExtendedAttributes(nft, elasticNft) {
        const collectionAssets = await this.assetsService.getTokenAssets(nft.collection);
        const algorithm = this.getNftRankAlgorithmFromAssets(collectionAssets);
        nft.score = elasticNft[this.getNftScoreElasticKey(algorithm)];
        nft.rank = elasticNft[this.getNftRankElasticKey(algorithm)];
        nft.rarities = new nft_rarities_1.NftRarities({
            trait: this.getNftRarity(elasticNft, nft_rank_algorithm_1.NftRankAlgorithm.trait),
            statistical: this.getNftRarity(elasticNft, nft_rank_algorithm_1.NftRankAlgorithm.statistical),
            jaccardDistances: this.getNftRarity(elasticNft, nft_rank_algorithm_1.NftRankAlgorithm.jaccardDistances),
            openRarity: this.getNftRarity(elasticNft, nft_rank_algorithm_1.NftRankAlgorithm.openRarity),
            custom: this.getNftRarity(elasticNft, nft_rank_algorithm_1.NftRankAlgorithm.custom),
        });
        if (elasticNft.nft_nsfw_mark !== undefined) {
            nft.isNsfw = elasticNft.nft_nsfw_mark >= this.apiConfigService.getNftExtendedAttributesNsfwThreshold();
        }
    }
    getNftRankAlgorithmFromAssets(assets) {
        var _a;
        return (_a = assets === null || assets === void 0 ? void 0 : assets.preferredRankAlgorithm) !== null && _a !== void 0 ? _a : nft_rank_algorithm_1.NftRankAlgorithm.openRarity;
    }
    getNftRankElasticKey(algorithm) {
        return `nft_rank_${algorithm}`;
    }
    getNftScoreElasticKey(algorithm) {
        return `nft_score_${algorithm}`;
    }
    applyRedirectMedia(nft) {
        if (!nft.media || !Array.isArray(nft.media) || nft.media.length === 0) {
            return;
        }
        try {
            const network = this.apiConfigService.getNetwork();
            const defaultMediaUrl = `https://${network === 'mainnet' ? '' : `${network}-`}media.numbat.com`;
            const defaultApiMediaUrl = `https://${network === 'mainnet' ? '' : `${network}-`}api.dharitri.org/media`;
            for (const media of nft.media) {
                if (media.url) {
                    media.url = sdk_nestjs_http_1.ApiUtils.replaceUri(media.url, defaultMediaUrl, this.apiConfigService.getMediaUrl());
                    media.url = sdk_nestjs_http_1.ApiUtils.replaceUri(media.url, defaultApiMediaUrl, this.apiConfigService.getMediaUrl());
                }
                if (media.thumbnailUrl) {
                    media.thumbnailUrl = sdk_nestjs_http_1.ApiUtils.replaceUri(media.thumbnailUrl, defaultMediaUrl, this.apiConfigService.getMediaUrl());
                    media.thumbnailUrl = sdk_nestjs_http_1.ApiUtils.replaceUri(media.thumbnailUrl, defaultApiMediaUrl, this.apiConfigService.getMediaUrl());
                }
            }
        }
        catch (error) {
            this.logger.error(`Error when applying redirect media for NFT with identifier '${nft.identifier}'`);
            this.logger.error(error);
        }
    }
    isDefaultNftFilter(filter) {
        return !filter.search &&
            !(filter.identifiers && filter.identifiers.length > 0) &&
            !(filter.type && filter.type.length > 0) &&
            !(filter.subType && filter.subType.length > 0) &&
            !filter.collection &&
            !(filter.collections && filter.collections.length > 0) &&
            !(filter.tags && filter.tags.length > 0) &&
            !filter.name &&
            !filter.creator &&
            filter.hasUris === undefined &&
            filter.includeFlagged === undefined &&
            filter.before === undefined &&
            filter.after === undefined &&
            filter.nonceBefore === undefined &&
            filter.nonceAfter === undefined &&
            filter.isWhitelistedStorage === undefined &&
            filter.isNsfw === undefined &&
            filter.isScam === undefined &&
            filter.scamType === undefined &&
            !filter.traits &&
            filter.excludeMetaDCDT === undefined &&
            filter.sort === undefined &&
            filter.order === undefined;
    }
    isCacheableNftList(filter, queryOptions) {
        const hasHeavyOptions = (queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.withOwner) || (queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.withSupply);
        return !hasHeavyOptions && this.isDefaultNftFilter(filter);
    }
    isCacheableNftCount(filter) {
        return this.isDefaultNftFilter(filter);
    }
};
NftService = NftService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(8, (0, common_1.Inject)((0, common_1.forwardRef)(() => dcdt_address_service_1.DcdtAddressService))),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        indexer_service_1.IndexerService,
        dcdt_service_1.DcdtService,
        assets_service_1.AssetsService,
        sdk_nestjs_cache_1.CacheService,
        nft_metadata_service_1.NftMetadataService,
        nft_media_service_1.NftMediaService,
        persistence_service_1.PersistenceService,
        dcdt_address_service_1.DcdtAddressService,
        moa_token_service_1.MoaTokenService,
        locked_asset_service_1.LockedAssetService])
], NftService);
exports.NftService = NftService;
//# sourceMappingURL=nft.service.js.map