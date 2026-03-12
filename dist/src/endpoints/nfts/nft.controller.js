"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftController = void 0;
const tslib_1 = require("tslib");
const nft_supply_1 = require("./entities/nft.supply");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nft_media_service_1 = require("../../queue.worker/nft.worker/queue/job-services/media/nft.media.service");
const nft_1 = require("./entities/nft");
const nft_filter_1 = require("./entities/nft.filter");
const nft_owner_1 = require("./entities/nft.owner");
const nft_type_1 = require("./entities/nft.type");
const nft_service_1 = require("./nft.service");
const query_pagination_1 = require("../../common/entities/query.pagination");
const nft_query_options_1 = require("./entities/nft.query.options");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const transaction_detailed_1 = require("../transactions/entities/transaction.detailed");
const transaction_status_1 = require("../transactions/entities/transaction.status");
const sort_order_1 = require("../../common/entities/sort.order");
const transactions_query_options_1 = require("../transactions/entities/transactions.query.options");
const transaction_service_1 = require("../transactions/transaction.service");
const transaction_filter_1 = require("../transactions/entities/transaction.filter");
const transaction_1 = require("../transactions/entities/transaction");
const scam_type_enum_1 = require("../../common/entities/scam-type.enum");
const transfer_service_1 = require("../transfers/transfer.service");
const nft_sub_type_1 = require("./entities/nft.sub.type");
const timestamp_parse_pipe_1 = require("../../utils/timestamp.parse.pipe");
let NftController = class NftController {
    constructor(nftService, nftMediaService, transactionService, transferService) {
        this.nftService = nftService;
        this.nftMediaService = nftMediaService;
        this.transactionService = transactionService;
        this.transferService = transferService;
    }
    async getNfts(from, size, search, identifiers, type, subType, collection, collections, name, tags, creator, isWhitelistedStorage, hasUris, isNsfw, isScam, scamType, traits, before, after, withOwner, withSupply) {
        return await this.nftService.getNfts(new query_pagination_1.QueryPagination({ from, size }), new nft_filter_1.NftFilter({
            search,
            identifiers,
            type,
            subType,
            collection,
            collections,
            name,
            tags,
            creator,
            hasUris,
            isWhitelistedStorage,
            isNsfw,
            isScam,
            scamType,
            traits,
            before,
            after,
        }), new nft_query_options_1.NftQueryOptions({ withOwner, withSupply }));
    }
    async getNftCount(search, identifiers, type, subType, collection, collections, name, tags, creator, isWhitelistedStorage, hasUris, isNsfw, traits, before, after, isScam, scamType) {
        return await this.nftService.getNftCount(new nft_filter_1.NftFilter({
            search,
            identifiers,
            type,
            subType,
            collection,
            collections,
            name,
            tags,
            creator,
            isWhitelistedStorage,
            hasUris,
            isNsfw,
            traits,
            before,
            after,
            isScam,
            scamType,
        }));
    }
    async getNftCountAlternative(search, identifiers, type, subType, collection, collections, name, tags, creator, isWhitelistedStorage, hasUris, isNsfw, traits, before, after, isScam, scamType) {
        return await this.nftService.getNftCount(new nft_filter_1.NftFilter({ search, identifiers, type, subType, collection, collections, name, tags, creator, isWhitelistedStorage, hasUris, isNsfw, traits, before, after, isScam, scamType }));
    }
    async getNft(identifier) {
        const token = await this.nftService.getSingleNft(identifier);
        if (token === undefined) {
            throw new common_1.HttpException('NFT not found', common_1.HttpStatus.NOT_FOUND);
        }
        return token;
    }
    async resolveNftThumbnail(identifier, response) {
        const nfts = await this.nftService.getNftsInternal(new query_pagination_1.QueryPagination({ from: 0, size: 1 }), new nft_filter_1.NftFilter(), identifier);
        if (nfts.length === 0) {
            throw new common_1.NotFoundException('NFT not found');
        }
        const media = await this.nftMediaService.getMedia(nfts[0].identifier);
        if (!media || media.length === 0) {
            response.redirect(this.nftService.DEFAULT_MEDIA[0].thumbnailUrl);
        }
        else {
            response.redirect(media[0].thumbnailUrl);
        }
    }
    async getNftSupply(identifier) {
        const totalSupply = await this.nftService.getNftSupply(identifier);
        if (!totalSupply) {
            throw new common_1.NotFoundException();
        }
        return { supply: totalSupply };
    }
    async getNftAccounts(identifier, from, size) {
        const owners = await this.nftService.getNftOwners(identifier, new query_pagination_1.QueryPagination({ from, size }));
        if (owners === undefined) {
            throw new common_1.HttpException('NFT not found', common_1.HttpStatus.NOT_FOUND);
        }
        return owners;
    }
    async getNftAccountsCount(identifier) {
        const ownersCount = await this.nftService.getNftOwnersCount(identifier);
        if (ownersCount === undefined) {
            throw new common_1.HttpException('NFT not found', common_1.HttpStatus.NOT_FOUND);
        }
        return ownersCount;
    }
    async getNftTransactions(identifier, from, size, sender, receiver, senderShard, receiverShard, miniBlockHash, hashes, status, functions, before, after, order, withScResults, withOperations, withLogs, withScamInfo, withUsername, withRelayedScresults) {
        const options = transactions_query_options_1.TransactionQueryOptions.applyDefaultOptions(size, { withScResults, withOperations, withLogs, withScamInfo, withUsername });
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
            withRelayedScresults,
        });
        transaction_filter_1.TransactionFilter.validate(transactionFilter, size);
        return await this.transactionService.getTransactions(transactionFilter, new query_pagination_1.QueryPagination({ from, size }), options);
    }
    async getNftTransactionsCount(identifier, sender, receiver, senderShard, receiverShard, miniBlockHash, hashes, status, before, after, withRelayedScresults) {
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
            withRelayedScresults,
        }));
    }
    async getNftTransfers(identifier, from, size, sender, receiver, senderShard, receiverShard, miniBlockHash, hashes, status, functions, before, after, order, withScResults, withOperations, withLogs, withScamInfo, withUsername) {
        const options = transactions_query_options_1.TransactionQueryOptions.applyDefaultOptions(size, { withScResults, withOperations, withLogs, withScamInfo, withUsername });
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
        }), new query_pagination_1.QueryPagination({ from, size }), options);
    }
    async getNftTransfersCount(identifier, sender, receiver, senderShard, receiverShard, miniBlockHash, hashes, status, before, after) {
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
        }));
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/nfts"),
    (0, swagger_1.ApiOperation)({ summary: 'Global NFTs', description: 'Returns a list of Non-Fungible / Semi-Fungible / MetaDCDT tokens available on blockchain' }),
    (0, swagger_1.ApiOkResponse)({ type: [nft_1.Nft] }),
    (0, sdk_nestjs_common_1.ApplyComplexity)({ target: nft_1.Nft }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifiers', description: 'Search by token identifiers, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Filter by type (NonFungibleDCDT/SemiFungibleDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'subType', description: 'Filter by subType', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'collection', description: 'Get all tokens by token collection', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'collections', description: 'Get all tokens by token collections, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', description: 'Get all nfts by name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'tags', description: 'Filter by one or more comma-separated tags', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'creator', description: 'Return all NFTs associated with a given creator', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isWhitelistedStorage', description: 'Return all NFTs that are whitelisted in storage', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'hasUris', description: 'Return all NFTs that have one or more uris', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'isNsfw', description: 'Filter by NSFW status', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'isScam', description: 'Filter by scam status', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'scamType', description: 'Filter by type (scam/potentialScam)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'traits', description: 'Filter NFTs by traits. Key-value format (<key1>:<value1>;<key2>:<value2>)', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Return all NFTs before given timestamp or timestampMs', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'Return all NFTs after given timestamp or timestampMs', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'withOwner', description: 'Return owner where type = NonFungibleDCDT', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withSupply', description: 'Return supply where type = SemiFungibleDCDT', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('search')),
    tslib_1.__param(3, (0, common_1.Query)('identifiers', sdk_nestjs_common_1.ParseNftArrayPipe)),
    tslib_1.__param(4, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_type_1.NftType))),
    tslib_1.__param(5, (0, common_1.Query)('subType', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_sub_type_1.NftSubType))),
    tslib_1.__param(6, (0, common_1.Query)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__param(7, (0, common_1.Query)('collections', sdk_nestjs_common_1.ParseCollectionArrayPipe)),
    tslib_1.__param(8, (0, common_1.Query)('name')),
    tslib_1.__param(9, (0, common_1.Query)('tags', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(10, (0, common_1.Query)('creator', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(11, (0, common_1.Query)('isWhitelistedStorage', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(12, (0, common_1.Query)('hasUris', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(13, (0, common_1.Query)('isNsfw', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(14, (0, common_1.Query)('isScam', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(15, (0, common_1.Query)('scamType', new sdk_nestjs_common_1.ParseEnumPipe(scam_type_enum_1.ScamType))),
    tslib_1.__param(16, (0, common_1.Query)('traits', sdk_nestjs_common_1.ParseRecordPipe)),
    tslib_1.__param(17, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(18, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(19, (0, common_1.Query)('withOwner', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(20, (0, common_1.Query)('withSupply', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Array, Array, Array, String, Array, String, Array, String, Boolean, Boolean, Boolean, Boolean, String, Object, Number, Number, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], NftController.prototype, "getNfts", null);
tslib_1.__decorate([
    (0, common_1.Get)("/nfts/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Global NFT count', description: 'Returns the total number of Non-Fungible / Semi-Fungible / MetaDCDT tokens' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifiers', description: 'Search by token identifiers, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Filter by type (NonFungibleDCDT/SemiFungibleDCDT/MetaDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'subType', description: 'Filter by subType', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'collection', description: 'Get all tokens by token collection', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'collections', description: 'Get all tokens by token collections, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', description: 'Get all nfts by name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'tags', description: 'Filter by one or more comma-separated tags', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'creator', description: 'Return all NFTs associated with a given creator', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isWhitelistedStorage', description: 'Return all NFTs that are whitelisted in storage', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'hasUris', description: 'Return all NFTs that have one or more uris', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'isNsfw', description: 'Filter by NSFW status', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'traits', description: 'Filter NFTs by traits. Key-value format (<key1>:<value1>;<key2>:<value2>)', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Return all NFTs before given timestamp or timestampMs', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'Return all NFTs after given timestamp or timestampMs', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'isScam', description: 'Filter by scam status', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'scamType', description: 'Filter by type (scam/potentialScam)', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__param(1, (0, common_1.Query)('identifiers', sdk_nestjs_common_1.ParseNftArrayPipe)),
    tslib_1.__param(2, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_type_1.NftType))),
    tslib_1.__param(3, (0, common_1.Query)('subType', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_sub_type_1.NftSubType))),
    tslib_1.__param(4, (0, common_1.Query)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__param(5, (0, common_1.Query)('collections', sdk_nestjs_common_1.ParseCollectionArrayPipe)),
    tslib_1.__param(6, (0, common_1.Query)('name')),
    tslib_1.__param(7, (0, common_1.Query)('tags', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(8, (0, common_1.Query)('creator', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(9, (0, common_1.Query)('isWhitelistedStorage', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(10, (0, common_1.Query)('hasUris', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(11, (0, common_1.Query)('isNsfw', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(12, (0, common_1.Query)('traits', sdk_nestjs_common_1.ParseRecordPipe)),
    tslib_1.__param(13, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(14, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(15, (0, common_1.Query)('isScam', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(16, (0, common_1.Query)('scamType', new sdk_nestjs_common_1.ParseEnumPipe(scam_type_enum_1.ScamType))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array, Array, Array, String, Array, String, Array, String, Boolean, Boolean, Boolean, Object, Number, Number, Boolean, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NftController.prototype, "getNftCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/nfts/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__param(1, (0, common_1.Query)('identifiers', sdk_nestjs_common_1.ParseNftArrayPipe)),
    tslib_1.__param(2, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_type_1.NftType))),
    tslib_1.__param(3, (0, common_1.Query)('subType', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_sub_type_1.NftSubType))),
    tslib_1.__param(4, (0, common_1.Query)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__param(5, (0, common_1.Query)('collections', sdk_nestjs_common_1.ParseCollectionArrayPipe)),
    tslib_1.__param(6, (0, common_1.Query)('name')),
    tslib_1.__param(7, (0, common_1.Query)('tags', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(8, (0, common_1.Query)('creator', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(9, (0, common_1.Query)('isWhitelistedStorage', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(10, (0, common_1.Query)('hasUris', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(11, (0, common_1.Query)('isNsfw', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(12, (0, common_1.Query)('traits', sdk_nestjs_common_1.ParseRecordPipe)),
    tslib_1.__param(13, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(14, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(15, (0, common_1.Query)('isScam', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(16, (0, common_1.Query)('scamType', new sdk_nestjs_common_1.ParseEnumPipe(scam_type_enum_1.ScamType))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array, Array, Array, String, Array, String, Array, String, Boolean, Boolean, Boolean, Object, Number, Number, Boolean, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NftController.prototype, "getNftCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)('/nfts/:identifier'),
    (0, swagger_1.ApiOperation)({ summary: 'NFT details', description: 'Returns the details of an Non-Fungible / Semi-Fungible / MetaDCDT token for a given identifier' }),
    (0, swagger_1.ApiOkResponse)({ type: nft_1.Nft }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token not found' }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseNftPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NftController.prototype, "getNft", null);
tslib_1.__decorate([
    (0, common_1.Get)('/nfts/:identifier/thumbnail'),
    (0, swagger_1.ApiOperation)({ summary: 'NFT thumbnail', description: 'Returns nft thumbnail' }),
    (0, swagger_1.ApiOkResponse)({ type: nft_1.Nft }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'NFT thumbnail not found' }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseNftPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NftController.prototype, "resolveNftThumbnail", null);
tslib_1.__decorate([
    (0, common_1.Get)('/nfts/:identifier/supply'),
    (0, swagger_1.ApiOperation)({ summary: 'NFT supply', description: 'Returns Non-Fungible / Semi-Fungible / MetaDCDT token supply details' }),
    (0, swagger_1.ApiOkResponse)({ type: nft_supply_1.NftSupply }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token not found' }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseNftPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NftController.prototype, "getNftSupply", null);
tslib_1.__decorate([
    (0, common_1.Get)('/nfts/:identifier/accounts'),
    (0, swagger_1.ApiOperation)({ summary: 'NFT accounts', description: 'Returns a list of addresses that hold balances for a specific Non-Fungible / Semi-Fungible / MetaDCDT token' }),
    (0, swagger_1.ApiOkResponse)({ type: [nft_owner_1.NftOwner] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token not found' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseNftPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], NftController.prototype, "getNftAccounts", null);
tslib_1.__decorate([
    (0, common_1.Get)('/nfts/:identifier/accounts/count'),
    (0, swagger_1.ApiOperation)({ summary: 'NFT accounts count', description: 'Returns number of addresses that hold balances for a specific Non-Fungible / Semi-Fungible / MetaDCDT token' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseNftPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NftController.prototype, "getNftAccountsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/nfts/:identifier/transactions"),
    (0, swagger_1.ApiOperation)({ summary: 'NFT transactions', description: `Returns a list of transactions for a NonFungibleDCDT or SemiFungibleDCDT.` }),
    (0, sdk_nestjs_common_1.ApplyComplexity)({ target: transaction_detailed_1.TransactionDetailed }),
    (0, swagger_1.ApiOkResponse)({ type: [transaction_1.Transaction] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token not found' }),
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
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sort order (asc/desc)', required: false, enum: sort_order_1.SortOrder }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withScResults', description: 'Return scResults for transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withOperations', description: 'Return operations for transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withLogs', description: 'Return logs for transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withScamInfo', description: 'Returns scam information', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withUsername', description: 'Integrates username in assets for all addresses present in the transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withRelayedScresults', description: 'If set to true, will include smart contract results that resemble relayed transactions', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseNftPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(4, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(5, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(6, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(7, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(8, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(9, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(10, (0, common_1.Query)('function', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(11, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(12, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(13, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__param(14, (0, common_1.Query)('withScResults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(15, (0, common_1.Query)('withOperations', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(16, (0, common_1.Query)('withLogs', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(17, (0, common_1.Query)('withScamInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(18, (0, common_1.Query)('withUsername', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(19, (0, common_1.Query)('withRelayedScresults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String, Array, Number, Number, String, Array, String, Array, Number, Number, String, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], NftController.prototype, "getNftTransactions", null);
tslib_1.__decorate([
    (0, common_1.Get)("/nfts/:identifier/transactions/count"),
    (0, swagger_1.ApiOperation)({ summary: 'NFT transactions count', description: 'Returns the total number of transactions for a specific NonFungibleDCDT or SemiFungibleDCDT' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token not found' }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Address of the transaction sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transaction hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transaction (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withRelayedScresults', description: 'If set to true, will include smart contract results that resemble relayed transactions', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseNftPipe)),
    tslib_1.__param(1, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(2, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(3, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(6, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(7, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(8, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(9, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(10, (0, common_1.Query)('withRelayedScresults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array, Number, Number, String, Array, String, Number, Number, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], NftController.prototype, "getNftTransactionsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/nfts/:identifier/transfers"),
    (0, swagger_1.ApiOperation)({ summary: 'NFT transfers', description: `Returns a list of transfers for a NonFungibleDCDT or SemiFungibleDCDT.` }),
    (0, sdk_nestjs_common_1.ApplyComplexity)({ target: transaction_detailed_1.TransactionDetailed }),
    (0, swagger_1.ApiOkResponse)({ type: [transaction_1.Transaction] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token not found' }),
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
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sort order (asc/desc)', required: false, enum: sort_order_1.SortOrder }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withScResults', description: 'Return scResults for transfers', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withOperations', description: 'Return operations for transfers', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withLogs', description: 'Return logs for transfers', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withScamInfo', description: 'Returns scam information', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withUsername', description: 'Integrates username in assets for all addresses present in the transfers', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseNftPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(4, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(5, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(6, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(7, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(8, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(9, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(10, (0, common_1.Query)('function', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(11, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(12, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(13, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__param(14, (0, common_1.Query)('withScResults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(15, (0, common_1.Query)('withOperations', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(16, (0, common_1.Query)('withLogs', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(17, (0, common_1.Query)('withScamInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(18, (0, common_1.Query)('withUsername', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String, Array, Number, Number, String, Array, String, Array, Number, Number, String, Boolean, Boolean, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], NftController.prototype, "getNftTransfers", null);
tslib_1.__decorate([
    (0, common_1.Get)("/nfts/:identifier/transfers/count"),
    (0, swagger_1.ApiOperation)({ summary: 'NFT transfers count', description: 'Returns the total number of transfers for a specific NonFungibleDCDT or SemiFungibleDCDT' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token not found' }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Address of the transfers sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transfers hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transfers (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseNftPipe)),
    tslib_1.__param(1, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(2, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(3, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(6, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(7, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(8, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(9, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array, Number, Number, String, Array, String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], NftController.prototype, "getNftTransfersCount", null);
NftController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('nfts'),
    tslib_1.__metadata("design:paramtypes", [nft_service_1.NftService,
        nft_media_service_1.NftMediaService,
        transaction_service_1.TransactionService,
        transfer_service_1.TransferService])
], NftController);
exports.NftController = NftController;
//# sourceMappingURL=nft.controller.js.map