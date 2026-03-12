"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nft_collection_1 = require("./entities/nft.collection");
const nft_type_1 = require("../nfts/entities/nft.type");
const collection_service_1 = require("./collection.service");
const nft_1 = require("../nfts/entities/nft");
const nft_service_1 = require("../nfts/nft.service");
const nft_filter_1 = require("../nfts/entities/nft.filter");
const nft_query_options_1 = require("../nfts/entities/nft.query.options");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const query_pagination_1 = require("../../common/entities/query.pagination");
const collection_filter_1 = require("./entities/collection.filter");
const collection_account_1 = require("./entities/collection.account");
const transaction_detailed_1 = require("../transactions/entities/transaction.detailed");
const transaction_1 = require("../transactions/entities/transaction");
const transaction_status_1 = require("../transactions/entities/transaction.status");
const sort_order_1 = require("../../common/entities/sort.order");
const transactions_query_options_1 = require("../transactions/entities/transactions.query.options");
const transaction_service_1 = require("../transactions/transaction.service");
const transaction_filter_1 = require("../transactions/entities/transaction.filter");
const nft_rank_1 = require("../../common/assets/entities/nft.rank");
const sort_collection_nfts_1 = require("./entities/sort.collection.nfts");
const nft_collection_detailed_1 = require("./entities/nft.collection.detailed");
const sort_collections_1 = require("./entities/sort.collections");
const parse_array_options_1 = require("@sravankumar02/sdk-nestjs-common/lib/pipes/entities/parse.array.options");
const transfer_service_1 = require("../transfers/transfer.service");
const nft_sub_type_1 = require("../nfts/entities/nft.sub.type");
const timestamp_parse_pipe_1 = require("../../utils/timestamp.parse.pipe");
let CollectionController = class CollectionController {
    constructor(collectionService, nftService, transactionService, transferService) {
        this.collectionService = collectionService;
        this.nftService = nftService;
        this.transactionService = transactionService;
        this.transferService = transferService;
    }
    async getNftCollections(from, size, search, identifiers, type, subType, creator, before, after, canCreate, canBurn, canAddQuantity, canUpdateAttributes, canAddUri, canTransferRole, excludeMetaDCDT, sort, order) {
        return await this.collectionService.getNftCollections(new query_pagination_1.QueryPagination({ from, size }), new collection_filter_1.CollectionFilter({
            search,
            type,
            subType,
            identifiers,
            canCreate: canCreate !== null && canCreate !== void 0 ? canCreate : creator,
            before,
            after,
            canBurn,
            canAddQuantity,
            canUpdateAttributes,
            canAddUri,
            canTransferRole,
            excludeMetaDCDT,
            sort,
            order,
        }));
    }
    async getCollectionCount(search, type, subType, creator, before, after, canCreate, canBurn, canAddQuantity, canUpdateAttributes, canAddUri, canTransferRole, excludeMetaDCDT) {
        return await this.collectionService.getNftCollectionCount(new collection_filter_1.CollectionFilter({
            search,
            type,
            subType,
            canCreate: canCreate !== null && canCreate !== void 0 ? canCreate : creator,
            before,
            after,
            canBurn,
            canAddQuantity,
            canUpdateAttributes,
            canAddUri,
            canTransferRole,
            excludeMetaDCDT,
        }));
    }
    async getCollectionCountAlternative(search, type, creator, before, after, canCreate, canBurn, canAddQuantity, canUpdateAttributes, canAddUri, canTransferRole, excludeMetaDCDT) {
        return await this.collectionService.getNftCollectionCount(new collection_filter_1.CollectionFilter({
            search,
            type,
            canCreate: canCreate !== null && canCreate !== void 0 ? canCreate : creator,
            before,
            after,
            canBurn,
            canAddQuantity,
            canUpdateAttributes,
            canAddUri,
            canTransferRole,
            excludeMetaDCDT,
        }));
    }
    async getNftCollection(collection) {
        const nftCollection = await this.collectionService.getNftCollection(collection);
        if (nftCollection === undefined) {
            throw new common_1.HttpException('Collection not found', common_1.HttpStatus.NOT_FOUND);
        }
        return nftCollection;
    }
    async getNftCollectionRanks(collection) {
        const ranks = await this.collectionService.getNftCollectionRanks(collection);
        if (ranks === undefined) {
            throw new common_1.HttpException('Ranks for collection not found', common_1.HttpStatus.NOT_FOUND);
        }
        return ranks;
    }
    async getNfts(collection, from, size, search, identifiers, name, tags, creator, isWhitelistedStorage, hasUris, isNsfw, traits, nonceBefore, nonceAfter, withOwner, withSupply, withAssets, sort, order) {
        const isCollection = await this.collectionService.isCollection(collection);
        if (!isCollection) {
            throw new common_1.HttpException('Collection not found', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.nftService.getNfts(new query_pagination_1.QueryPagination({ from, size }), new nft_filter_1.NftFilter({ search, identifiers, collection, name, tags, creator, hasUris, isWhitelistedStorage, isNsfw, traits, nonceBefore, nonceAfter, sort, order }), new nft_query_options_1.NftQueryOptions({ withOwner, withSupply, withAssets }));
    }
    async getNftCount(collection, search, identifiers, name, tags, creator, isWhitelistedStorage, hasUris, traits, nonceBefore, nonceAfter) {
        const isCollection = await this.collectionService.isCollection(collection);
        if (!isCollection) {
            throw new common_1.HttpException('Collection not found', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.nftService.getNftCount(new nft_filter_1.NftFilter({ search, identifiers, collection, name, tags, creator, isWhitelistedStorage, hasUris, traits, nonceBefore, nonceAfter }));
    }
    async getNftAccounts(identifier, from, size) {
        const owners = await this.nftService.getCollectionOwners(identifier, new query_pagination_1.QueryPagination({ from, size }));
        if (!owners) {
            throw new common_1.HttpException('Collection not found', common_1.HttpStatus.NOT_FOUND);
        }
        return owners;
    }
    async getCollectionTransactions(identifier, from, size, sender, receiver, senderShard, receiverShard, miniBlockHash, hashes, status, functions, before, after, round, order, withScResults, withOperations, withLogs, withScamInfo, withUsername, withRelayedScresults) {
        const options = transactions_query_options_1.TransactionQueryOptions.applyDefaultOptions(size, { withScResults, withOperations, withLogs, withScamInfo, withUsername });
        const isCollection = await this.collectionService.isCollection(identifier);
        if (!isCollection) {
            throw new common_1.HttpException('Collection not found', common_1.HttpStatus.NOT_FOUND);
        }
        const transactionFilter = new transaction_filter_1.TransactionFilter({
            sender,
            receivers: receiver,
            token: identifier,
            functions,
            senderShard,
            receiverShard,
            miniBlockHash,
            hashes,
            status,
            before,
            after,
            order,
            round,
            withRelayedScresults,
        });
        transaction_filter_1.TransactionFilter.validate(transactionFilter, size);
        return await this.transactionService.getTransactions(transactionFilter, new query_pagination_1.QueryPagination({ from, size }), options);
    }
    async getCollectionTransactionsCount(identifier, sender, receiver, senderShard, receiverShard, miniBlockHash, hashes, status, before, after, round, withRelayedScresults) {
        const isCollection = await this.collectionService.isCollection(identifier);
        if (!isCollection) {
            throw new common_1.HttpException('Collection not found', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.transactionService.getTransactionCount(new transaction_filter_1.TransactionFilter({
            sender,
            receivers: receiver,
            token: identifier,
            senderShard,
            receiverShard,
            miniBlockHash,
            hashes,
            status,
            before,
            after,
            round,
            withRelayedScresults,
        }));
    }
    async getCollectionTransfers(identifier, from, size, sender, receiver, senderShard, receiverShard, miniBlockHash, hashes, status, functions, before, after, round, order, withScResults, withOperations, withLogs, withScamInfo, withUsername) {
        const options = transactions_query_options_1.TransactionQueryOptions.applyDefaultOptions(size, { withScResults, withOperations, withLogs, withScamInfo, withUsername });
        const isCollection = await this.collectionService.isCollection(identifier);
        if (!isCollection) {
            throw new common_1.HttpException('Collection not found', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.transferService.getTransfers(new transaction_filter_1.TransactionFilter({
            sender,
            receivers: receiver,
            token: identifier,
            functions,
            senderShard,
            receiverShard,
            miniBlockHash,
            hashes,
            status,
            before,
            after,
            order,
            round,
        }), new query_pagination_1.QueryPagination({ from, size }), options);
    }
    async getCollectionTransfersCount(identifier, functions, sender, receiver, senderShard, receiverShard, miniBlockHash, hashes, status, before, after, round) {
        const isCollection = await this.collectionService.isCollection(identifier);
        if (!isCollection) {
            throw new common_1.HttpException('Collection not found', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.transferService.getTransfersCount(new transaction_filter_1.TransactionFilter({
            sender,
            receivers: receiver,
            token: identifier,
            senderShard,
            receiverShard,
            miniBlockHash,
            hashes,
            status,
            before,
            after,
            functions,
            round,
        }));
    }
    async getCollectionLogoPng(identifier, response) {
        const isCollection = await this.collectionService.isCollection(identifier);
        if (!isCollection) {
            throw new common_1.NotFoundException('Collection not found');
        }
        const url = await this.collectionService.getLogoPng(identifier);
        if (url === undefined) {
            throw new common_1.NotFoundException('Assets not found');
        }
        response.redirect(url);
    }
    async getTokenLogoSvg(identifier, response) {
        const isCollection = await this.collectionService.isCollection(identifier);
        if (!isCollection) {
            throw new common_1.NotFoundException('Collection not found');
        }
        const url = await this.collectionService.getLogoSvg(identifier);
        if (url === undefined) {
            throw new common_1.NotFoundException('Assets not found');
        }
        response.redirect(url);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/collections"),
    (0, swagger_1.ApiOperation)({ summary: 'Collections', description: 'Returns non-fungible/semi-fungible/meta-dcdt collections' }),
    (0, swagger_1.ApiOkResponse)({ type: [nft_collection_1.NftCollection] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifiers', description: 'Search by collection identifiers, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Filter by type (NonFungibleDCDT/SemiFungibleDCDT/MetaDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'subType', description: 'Filter by type (NonFungibleDCDTv2/DynamicNonFungibleDCDT/DynamicSemiFungibleDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'creator', description: 'Filter collections where the given address has a creator role', required: false, deprecated: true }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Return all collections before given timestamp or timestampMs', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'Return all collections after given timestamp or timestampMs', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'canCreate', description: 'Filter by address with canCreate role', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canBurn', description: 'Filter by address with canBurn role', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canAddQuantity', description: 'Filter by address with canAddQuantity role', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canUpdateAttributes', description: 'Filter by address with canUpdateAttributes role', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canAddUri', description: 'Filter by address with canAddUri role', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canTransferRole', description: 'Filter by address with canTransferRole role', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'excludeMetaDCDT', description: 'Do not include collections of type "MetaDCDT" in the response', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'sort', description: 'Sorting criteria', required: false, enum: sort_collections_1.SortCollections }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sorting order (asc / desc)', required: false, enum: sort_order_1.SortOrder }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('search')),
    tslib_1.__param(3, (0, common_1.Query)('identifiers', sdk_nestjs_common_1.ParseCollectionArrayPipe)),
    tslib_1.__param(4, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_type_1.NftType))),
    tslib_1.__param(5, (0, common_1.Query)('subType', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_sub_type_1.NftSubType))),
    tslib_1.__param(6, (0, common_1.Query)('creator', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(7, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(8, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(9, (0, common_1.Query)('canCreate', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(10, (0, common_1.Query)('canBurn', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(11, (0, common_1.Query)('canAddQuantity', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(12, (0, common_1.Query)('canUpdateAttributes', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(13, (0, common_1.Query)('canAddUri', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(14, (0, common_1.Query)('canTransferRole', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(15, (0, common_1.Query)('excludeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(16, (0, common_1.Query)('sort', new sdk_nestjs_common_1.ParseEnumPipe(sort_collections_1.SortCollections))),
    tslib_1.__param(17, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Array, Array, Array, String, Number, Number, String, String, String, String, String, String, Boolean, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], CollectionController.prototype, "getNftCollections", null);
tslib_1.__decorate([
    (0, common_1.Get)("/collections/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Collection count', description: 'Returns non-fungible/semi-fungible/meta-dcdt collection count' }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Filter by type (NonFungibleDCDT/SemiFungibleDCDT/MetaDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'creator', description: 'Filter collections where the given address has a creator role', required: false, deprecated: true }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Return all collections before given timestamp or timestampMs', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'Return all collections after given timestamp or timestampMs', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'canCreate', description: 'Filter by address with canCreate role', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canBurn', description: 'Filter by address with canBurn role', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canAddQuantity', description: 'Filter by address with canAddQuantity role', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canUpdateAttributes', description: 'Filter by address with canUpdateAttributes role', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canAddUri', description: 'Filter by address with canAddUri role', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canTransferRole', description: 'Filter by address with canTransferRole role', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'excludeMetaDCDT', description: 'Do not include collections of type "MetaDCDT" in the response', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'subType', description: 'Filter by type (NonFungibleDCDTv2/DynamicNonFungibleDCDT/DynamicSemiFungibleDCDT)', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__param(1, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_type_1.NftType))),
    tslib_1.__param(2, (0, common_1.Query)('subType', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_sub_type_1.NftSubType))),
    tslib_1.__param(3, (0, common_1.Query)('creator', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(4, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(5, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(6, (0, common_1.Query)('canCreate', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(7, (0, common_1.Query)('canBurn', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(8, (0, common_1.Query)('canAddQuantity', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(9, (0, common_1.Query)('canUpdateAttributes', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(10, (0, common_1.Query)('canAddUri', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(11, (0, common_1.Query)('canTransferRole', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(12, (0, common_1.Query)('excludeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array, Array, String, Number, Number, String, String, String, String, String, String, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], CollectionController.prototype, "getCollectionCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/collections/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__param(1, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_type_1.NftType))),
    tslib_1.__param(2, (0, common_1.Query)('creator', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(3, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(4, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(5, (0, common_1.Query)('canCreate', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(6, (0, common_1.Query)('canBurn', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(7, (0, common_1.Query)('canAddQuantity', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(8, (0, common_1.Query)('canUpdateAttributes', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(9, (0, common_1.Query)('canAddUri', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(10, (0, common_1.Query)('canTransferRole', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(11, (0, common_1.Query)('excludeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array, String, Number, Number, String, String, String, String, String, String, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], CollectionController.prototype, "getCollectionCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)('/collections/:collection'),
    (0, swagger_1.ApiOperation)({ summary: 'Collection details', description: 'Returns non-fungible/semi-fungible/meta-dcdt collection details' }),
    (0, swagger_1.ApiOkResponse)({ type: nft_collection_detailed_1.NftCollectionDetailed }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token collection not found' }),
    tslib_1.__param(0, (0, common_1.Param)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CollectionController.prototype, "getNftCollection", null);
tslib_1.__decorate([
    (0, common_1.Get)('/collections/:collection/ranks'),
    (0, swagger_1.ApiOperation)({ summary: 'Collection ranks', description: 'Returns NFT ranks in case the custom ranking preferred algorithm was set' }),
    (0, swagger_1.ApiOkResponse)({ type: nft_rank_1.NftRank, isArray: true }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token collection not found' }),
    tslib_1.__param(0, (0, common_1.Param)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CollectionController.prototype, "getNftCollectionRanks", null);
tslib_1.__decorate([
    (0, common_1.Get)("/collections/:collection/nfts"),
    (0, swagger_1.ApiOperation)({ summary: 'Collection NFTs', description: 'Returns non-fungible/semi-fungible/meta-dcdt tokens that belong to a collection' }),
    (0, swagger_1.ApiOkResponse)({ type: [nft_1.Nft] }),
    (0, sdk_nestjs_common_1.ApplyComplexity)({ target: nft_1.Nft }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token collection not found' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifiers', description: 'Search by token identifiers, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', description: 'Get all nfts by name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'tags', description: 'Filter by one or more comma-separated tags', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'creator', description: 'Return all NFTs associated with a given creator', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isWhitelistedStorage', description: 'Return all NFTs that are whitelisted in storage', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'hasUris', description: 'Return all NFTs that have one or more uris', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'isNsfw', description: 'Filter by NSFW status', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'traits', description: 'Filter NFTs by traits. Key-value format (<key1>:<value1>;<key2>:<value2>)', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'nonceBefore', description: 'Return all NFTs with given nonce before the given number', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'nonceAfter', description: 'Return all NFTs with given nonce after the given number', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'withOwner', description: 'Return owner where type = NonFungibleDCDT', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withSupply', description: 'Return supply where type = SemiFungibleDCDT', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withAssets', description: 'Return assets information (defaults to true)', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'sort', description: 'Sorting criteria', required: false, enum: sort_collection_nfts_1.SortCollectionNfts }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sorting order (asc / desc)', required: false, enum: sort_order_1.SortOrder }),
    tslib_1.__param(0, (0, common_1.Param)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('search')),
    tslib_1.__param(4, (0, common_1.Query)('identifiers', sdk_nestjs_common_1.ParseNftArrayPipe)),
    tslib_1.__param(5, (0, common_1.Query)('name')),
    tslib_1.__param(6, (0, common_1.Query)('tags', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(7, (0, common_1.Query)('creator', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(8, (0, common_1.Query)('isWhitelistedStorage', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(9, (0, common_1.Query)('hasUris', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(10, (0, common_1.Query)('isNsfw', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(11, (0, common_1.Query)('traits', sdk_nestjs_common_1.ParseRecordPipe)),
    tslib_1.__param(12, (0, common_1.Query)('nonceBefore', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(13, (0, common_1.Query)('nonceAfter', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(14, (0, common_1.Query)('withOwner', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(15, (0, common_1.Query)('withSupply', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(16, (0, common_1.Query)('withAssets', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(17, (0, common_1.Query)('sort', new sdk_nestjs_common_1.ParseEnumPipe(sort_collection_nfts_1.SortCollectionNfts))),
    tslib_1.__param(18, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String, Array, String, Array, String, Boolean, Boolean, Boolean, Object, Number, Number, Boolean, Boolean, Boolean, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], CollectionController.prototype, "getNfts", null);
tslib_1.__decorate([
    (0, common_1.Get)("/collections/:collection/nfts/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Collection NFT count', description: 'Returns non-fungible/semi-fungible/meta-dcdt token count that belong to a collection' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token collection not found' }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifiers', description: 'Search by token identifiers, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', description: 'Get all nfts by name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'tags', description: 'Filter by one or more comma-separated tags', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'creator', description: 'Return all NFTs associated with a given creator', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isWhitelistedStorage', description: 'Return all NFTs that are whitelisted in storage', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'hasUris', description: 'Return all NFTs that have one or more uris', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'traits', description: 'Filter NFTs by traits. Key-value format (<key1>:<value1>;<key2>:<value2>)', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'nonceBefore', description: 'Return all NFTs with given nonce before the given number', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'nonceAfter', description: 'Return all NFTs with given nonce after the given number', required: false, type: Number }),
    tslib_1.__param(0, (0, common_1.Param)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__param(1, (0, common_1.Query)('search')),
    tslib_1.__param(2, (0, common_1.Query)('identifiers', sdk_nestjs_common_1.ParseNftArrayPipe)),
    tslib_1.__param(3, (0, common_1.Query)('name')),
    tslib_1.__param(4, (0, common_1.Query)('tags', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(5, (0, common_1.Query)('creator', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(6, (0, common_1.Query)('isWhitelistedStorage', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(7, (0, common_1.Query)('hasUris', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(8, (0, common_1.Query)('traits', sdk_nestjs_common_1.ParseRecordPipe)),
    tslib_1.__param(9, (0, common_1.Query)('nonceBefore', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(10, (0, common_1.Query)('nonceAfter', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array, String, Array, String, Boolean, Boolean, Object, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], CollectionController.prototype, "getNftCount", null);
tslib_1.__decorate([
    (0, common_1.Get)('/collections/:identifier/accounts'),
    (0, swagger_1.ApiOperation)({ summary: 'Collection accounts', description: 'Returns a list of addresses and balances for a specific collection' }),
    (0, swagger_1.ApiOkResponse)({ type: [collection_account_1.CollectionAccount] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Collection not found' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], CollectionController.prototype, "getNftAccounts", null);
tslib_1.__decorate([
    (0, common_1.Get)("/collections/:collection/transactions"),
    (0, swagger_1.ApiOperation)({ summary: 'Collection transactions', description: `Returns a list of transactions for a specific collection.` }),
    (0, sdk_nestjs_common_1.ApplyComplexity)({ target: transaction_detailed_1.TransactionDetailed }),
    (0, swagger_1.ApiOkResponse)({ type: [transaction_1.Transaction] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Collection not found' }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Address of the transaction sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transaction hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transaction (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter transactions by function name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Filter by round number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sort order (asc/desc)', required: false, enum: sort_order_1.SortOrder }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withScResults', description: 'Return scResults for transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withOperations', description: 'Return operations for transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withLogs', description: 'Return logs for transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withScamInfo', description: 'Returns scam information', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withUsername', description: 'Integrates username in assets for all addresses present in the transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withRelayedScresults', description: 'If set to true, will include smart contract results that resemble relayed transactions', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Param)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(4, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(5, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(6, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(7, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(8, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(9, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(10, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(11, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(12, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(13, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(14, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__param(15, (0, common_1.Query)('withScResults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(16, (0, common_1.Query)('withOperations', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(17, (0, common_1.Query)('withLogs', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(18, (0, common_1.Query)('withScamInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(19, (0, common_1.Query)('withUsername', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(20, (0, common_1.Query)('withRelayedScresults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String, Array, Number, Number, String, Array, String, Array, Number, Number, Number, String, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], CollectionController.prototype, "getCollectionTransactions", null);
tslib_1.__decorate([
    (0, common_1.Get)("/collections/:collection/transactions/count"),
    (0, swagger_1.ApiOperation)({ summary: 'NFT transactions count', description: 'Returns the total number of transactions for a specific collection' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Collection not found' }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Address of the transaction sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transaction hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transaction (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Filter by round number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withRelayedScresults', description: 'If set to true, will include smart contract results that resemble relayed transactions', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Param)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__param(1, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(2, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(3, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(6, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(7, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(8, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(9, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(10, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(11, (0, common_1.Query)('withRelayedScresults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array, Number, Number, String, Array, String, Number, Number, Number, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], CollectionController.prototype, "getCollectionTransactionsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/collections/:collection/transfers"),
    (0, swagger_1.ApiOperation)({ summary: 'Collection transactions', description: `Returns a list of transactions for a specific collection.` }),
    (0, sdk_nestjs_common_1.ApplyComplexity)({ target: transaction_detailed_1.TransactionDetailed }),
    (0, swagger_1.ApiOkResponse)({ type: [transaction_1.Transaction] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Collection not found' }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Address of the transfer sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transaction hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transaction (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter transactions by function name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Filter by round number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sort order (asc/desc)', required: false, enum: sort_order_1.SortOrder }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withScResults', description: 'Return scResults for transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withOperations', description: 'Return operations for transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withLogs', description: 'Return logs for transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withScamInfo', description: 'Returns scam information', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withUsername', description: 'Integrates username in assets for all addresses present in the transactions', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Param)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(4, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(5, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(6, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(7, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(8, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(9, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(10, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(11, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(12, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(13, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(14, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__param(15, (0, common_1.Query)('withScResults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(16, (0, common_1.Query)('withOperations', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(17, (0, common_1.Query)('withLogs', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(18, (0, common_1.Query)('withScamInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(19, (0, common_1.Query)('withUsername', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String, Array, Number, Number, String, Array, String, Array, Number, Number, Number, String, Boolean, Boolean, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], CollectionController.prototype, "getCollectionTransfers", null);
tslib_1.__decorate([
    (0, common_1.Get)("/collections/:collection/transfers/count"),
    (0, swagger_1.ApiOperation)({ summary: 'NFT transfers count', description: 'Returns the total number of transfers for a specific collection' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Collection not found' }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Address of the transfer sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transfer hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transfer (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter transfers by function name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Filter by round number', required: false }),
    tslib_1.__param(0, (0, common_1.Param)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__param(1, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(2, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(3, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(4, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(6, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(7, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(8, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(9, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(10, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(11, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array, String, Array, Number, Number, String, Array, String, Number, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], CollectionController.prototype, "getCollectionTransfersCount", null);
tslib_1.__decorate([
    (0, common_1.Get)('/collections/:identifier/logo/png'),
    (0, swagger_1.ApiOperation)({ summary: 'Collection png logo', description: 'Returns collection PNG logo ', deprecated: true }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CollectionController.prototype, "getCollectionLogoPng", null);
tslib_1.__decorate([
    (0, common_1.Get)('/collections/:identifier/logo/svg'),
    (0, swagger_1.ApiOperation)({ summary: 'Collection png logo', description: 'Returns collection SVG logo ', deprecated: true }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CollectionController.prototype, "getTokenLogoSvg", null);
CollectionController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('collections'),
    tslib_1.__metadata("design:paramtypes", [collection_service_1.CollectionService,
        nft_service_1.NftService,
        transaction_service_1.TransactionService,
        transfer_service_1.TransferService])
], CollectionController);
exports.CollectionController = CollectionController;
//# sourceMappingURL=collection.controller.js.map