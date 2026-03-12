"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sort_order_1 = require("../../common/entities/sort.order");
const transaction_status_1 = require("../transactions/entities/transaction.status");
const transaction_service_1 = require("../transactions/transaction.service");
const token_account_1 = require("./entities/token.account");
const token_detailed_1 = require("./entities/token.detailed");
const token_service_1 = require("./token.service");
const token_roles_1 = require("./entities/token.roles");
const dcdt_supply_1 = require("../dcdt/entities/dcdt.supply");
const transaction_1 = require("../transactions/entities/transaction");
const token_sort_1 = require("./entities/token.sort");
const sort_tokens_1 = require("../../common/entities/sort.tokens");
const transfer_service_1 = require("../transfers/transfer.service");
const query_pagination_1 = require("../../common/entities/query.pagination");
const token_filter_1 = require("./entities/token.filter");
const transaction_filter_1 = require("../transactions/entities/transaction.filter");
const transactions_query_options_1 = require("../transactions/entities/transactions.query.options");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const transaction_detailed_1 = require("../transactions/entities/transaction.detailed");
const entities_1 = require("../../common/indexer/entities");
const parse_array_options_1 = require("@sravankumar02/sdk-nestjs-common/lib/pipes/entities/parse.array.options");
const moa_pair_type_1 = require("../moa/entities/moa.pair.type");
const token_assets_price_source_type_1 = require("../../common/assets/entities/token.assets.price.source.type");
const timestamp_parse_pipe_1 = require("../../utils/timestamp.parse.pipe");
let TokenController = class TokenController {
    constructor(tokenService, transactionService, transferService) {
        this.tokenService = tokenService;
        this.transactionService = transactionService;
        this.transferService = transferService;
    }
    async getTokens(from, size, type, search, name, identifier, identifiers, sort, order, includeMetaDCDT, moaPairType, priceSource) {
        return await this.tokenService.getTokens(new query_pagination_1.QueryPagination({ from, size }), new token_filter_1.TokenFilter({ type, search, name, identifier, identifiers, includeMetaDCDT, sort, order, moaPairType, priceSource }));
    }
    async getTokenCount(search, name, type, identifier, identifiers, includeMetaDCDT, moaPairType, priceSource) {
        return await this.tokenService.getTokenCount(new token_filter_1.TokenFilter({ type, search, name, identifier, identifiers, includeMetaDCDT, moaPairType, priceSource }));
    }
    async getTokenCountAlternative(search, name, type, identifier, identifiers, includeMetaDCDT, moaPairType, priceSource) {
        return await this.tokenService.getTokenCount(new token_filter_1.TokenFilter({ type, search, name, identifier, identifiers, includeMetaDCDT, moaPairType, priceSource }));
    }
    async getToken(identifier, denominated) {
        const supplyOptions = { denominated };
        const token = await this.tokenService.getToken(identifier, supplyOptions);
        if (token === undefined) {
            throw new common_1.NotFoundException('Token not found');
        }
        return token;
    }
    async getTokenSupply(identifier, denominated) {
        const isToken = await this.tokenService.isToken(identifier);
        if (!isToken) {
            throw new common_1.HttpException('Token not found', common_1.HttpStatus.NOT_FOUND);
        }
        const getSupplyResult = await this.tokenService.getTokenSupply(identifier, { denominated });
        if (!getSupplyResult) {
            throw new common_1.NotFoundException('Token not found');
        }
        return getSupplyResult;
    }
    async getTokenAccounts(identifier, from, size) {
        const isToken = await this.tokenService.isToken(identifier);
        if (!isToken) {
            throw new common_1.HttpException('Token not found', common_1.HttpStatus.NOT_FOUND);
        }
        const accounts = await this.tokenService.getTokenAccounts(new query_pagination_1.QueryPagination({ from, size }), identifier);
        if (!accounts) {
            throw new common_1.NotFoundException('Token not found');
        }
        return accounts;
    }
    async getTokenAccountsCount(identifier) {
        const isToken = await this.tokenService.isToken(identifier);
        if (!isToken) {
            throw new common_1.HttpException('Token not found', common_1.HttpStatus.NOT_FOUND);
        }
        const count = await this.tokenService.getTokenAccountsCount(identifier);
        if (count === undefined) {
            throw new common_1.NotFoundException('Token not found');
        }
        return count;
    }
    async getTokenTransactions(identifier, from, size, sender, receiver, senderShard, receiverShard, miniBlockHash, hashes, status, functions, before, after, round, order, fields, isScCall, withScResults, withOperations, withLogs, withScamInfo, withUsername, withBlockInfo, withActionTransferValue, withRelayedScresults) {
        const options = transactions_query_options_1.TransactionQueryOptions.applyDefaultOptions(size, { withScResults, withOperations, withLogs, withScamInfo, withUsername, withBlockInfo, withActionTransferValue });
        const isToken = await this.tokenService.isToken(identifier);
        if (!isToken) {
            throw new common_1.NotFoundException('Token not found');
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
            isScCall,
            withRelayedScresults,
        });
        transaction_filter_1.TransactionFilter.validate(transactionFilter, size);
        return await this.transactionService.getTransactions(transactionFilter, new query_pagination_1.QueryPagination({ from, size }), options, undefined, fields);
    }
    async getTokenTransactionsCount(identifier, sender, receiver, senderShard, receiverShard, miniBlockHash, hashes, status, before, after, round, withRelayedScresults, isScCall) {
        const isToken = await this.tokenService.isToken(identifier);
        if (!isToken) {
            throw new common_1.NotFoundException('Token not found');
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
            isScCall,
        }));
    }
    async getTokenRoles(identifier) {
        const isToken = await this.tokenService.isToken(identifier);
        if (!isToken) {
            throw new common_1.HttpException('Token not found', common_1.HttpStatus.NOT_FOUND);
        }
        const roles = await this.tokenService.getTokenRoles(identifier);
        if (!roles) {
            throw new common_1.HttpException('Token roles not found', common_1.HttpStatus.NOT_FOUND);
        }
        return roles;
    }
    async getTokenRolesForAddress(identifier, address) {
        const isToken = await this.tokenService.isToken(identifier);
        if (!isToken) {
            throw new common_1.NotFoundException('Token not found');
        }
        const roles = await this.tokenService.getTokenRolesForIdentifierAndAddress(identifier, address);
        if (!roles) {
            throw new common_1.NotFoundException('Token not found');
        }
        return roles;
    }
    async getTokenTransfers(identifier, from, size, sender, receiver, senderShard, receiverShard, miniBlockHash, hashes, status, functions, before, after, round, fields, order, isScCall, withScamInfo, withUsername, withBlockInfo, withActionTransferValue) {
        const isToken = await this.tokenService.isToken(identifier);
        if (!isToken) {
            throw new common_1.NotFoundException('Token not found');
        }
        const options = transactions_query_options_1.TransactionQueryOptions.applyDefaultOptions(size, { withScamInfo, withUsername, withBlockInfo, withActionTransferValue });
        return await this.transferService.getTransfers(new transaction_filter_1.TransactionFilter({
            senders: sender,
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
            isScCall,
        }), new query_pagination_1.QueryPagination({ from, size }), options, fields);
    }
    async getTokenTransfersCount(identifier, sender, receiver, senderShard, receiverShard, miniBlockHash, hashes, status, functions, before, after, round, isScCall) {
        const isToken = await this.tokenService.isToken(identifier);
        if (!isToken) {
            throw new common_1.NotFoundException('Token not found');
        }
        return await this.transferService.getTransfersCount(new transaction_filter_1.TransactionFilter({
            senders: sender,
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
            round,
            isScCall,
        }));
    }
    async getAccountTransfersCountAlternative(identifier, sender, receiver, senderShard, receiverShard, miniBlockHash, hashes, status, functions, before, after, round, isScCall) {
        const isToken = await this.tokenService.isToken(identifier);
        if (!isToken) {
            throw new common_1.NotFoundException('Token not found');
        }
        return await this.transferService.getTransfersCount(new transaction_filter_1.TransactionFilter({
            senders: sender,
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
            round,
            isScCall,
        }));
    }
    async getTokenLogoPng(identifier, response) {
        const isToken = await this.tokenService.isToken(identifier);
        if (!isToken) {
            throw new common_1.NotFoundException('Token not found');
        }
        const url = await this.tokenService.getLogoPng(identifier);
        if (url === undefined) {
            throw new common_1.NotFoundException('Assets not found');
        }
        response.redirect(url);
    }
    async getTokenLogoSvg(identifier, response) {
        const isToken = await this.tokenService.isToken(identifier);
        if (!isToken) {
            throw new common_1.NotFoundException('Token not found');
        }
        const url = await this.tokenService.getLogoSvg(identifier);
        if (url === undefined) {
            throw new common_1.NotFoundException('Assets not found');
        }
        response.redirect(url);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/tokens"),
    (0, swagger_1.ApiOperation)({ summary: 'Tokens', description: 'Returns all tokens available on the blockchain' }),
    (0, swagger_1.ApiOkResponse)({ type: [token_detailed_1.TokenDetailed] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Token type', required: false, enum: entities_1.TokenType }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', description: 'Search by token name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifier', description: 'Search by token identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifiers', description: 'Search by multiple token identifiers, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'sort', description: 'Sorting criteria', required: false, enum: sort_tokens_1.SortTokens }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sorting order (asc / desc)', required: false, enum: sort_order_1.SortOrder }),
    (0, swagger_1.ApiQuery)({ name: 'includeMetaDCDT', description: 'Include MetaDCDTs in response', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'moaPairType', description: 'Token Moa Pair', required: false, enum: moa_pair_type_1.MoaPairType }),
    (0, swagger_1.ApiQuery)({ name: 'priceSource', description: 'Token Price Source', required: false, enum: token_assets_price_source_type_1.TokenAssetsPriceSourceType }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumPipe(entities_1.TokenType))),
    tslib_1.__param(3, (0, common_1.Query)('search')),
    tslib_1.__param(4, (0, common_1.Query)('name')),
    tslib_1.__param(5, (0, common_1.Query)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__param(6, (0, common_1.Query)('identifiers', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(7, (0, common_1.Query)('sort', new sdk_nestjs_common_1.ParseEnumPipe(token_sort_1.TokenSort))),
    tslib_1.__param(8, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__param(9, (0, common_1.Query)('includeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(10, (0, common_1.Query)('moaPairType', new sdk_nestjs_common_1.ParseEnumArrayPipe(moa_pair_type_1.MoaPairType))),
    tslib_1.__param(11, (0, common_1.Query)('priceSource', new sdk_nestjs_common_1.ParseEnumPipe(token_assets_price_source_type_1.TokenAssetsPriceSourceType))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, Array, String, String, Boolean, Array, String]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getTokens", null);
tslib_1.__decorate([
    (0, common_1.Get)("/tokens/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Tokens count', description: 'Return total number of tokens available on blockchain' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', description: 'Search by token name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Token type', required: false, enum: entities_1.TokenType }),
    (0, swagger_1.ApiQuery)({ name: 'identifier', description: 'Search by token identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifiers', description: 'Search by multiple token identifiers, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'includeMetaDCDT', description: 'Include MetaDCDTs in response', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'moaPairType', description: 'Token Moa Pair', required: false, enum: moa_pair_type_1.MoaPairType }),
    (0, swagger_1.ApiQuery)({ name: 'priceSource', description: 'Token Price Source', required: false, enum: token_assets_price_source_type_1.TokenAssetsPriceSourceType }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__param(1, (0, common_1.Query)('name')),
    tslib_1.__param(2, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumPipe(entities_1.TokenType))),
    tslib_1.__param(3, (0, common_1.Query)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__param(4, (0, common_1.Query)('identifiers', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(5, (0, common_1.Query)('includeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(6, (0, common_1.Query)('moaPairType', new sdk_nestjs_common_1.ParseEnumArrayPipe(moa_pair_type_1.MoaPairType))),
    tslib_1.__param(7, (0, common_1.Query)('priceSource', new sdk_nestjs_common_1.ParseEnumPipe(token_assets_price_source_type_1.TokenAssetsPriceSourceType))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, Array, Boolean, Array, String]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getTokenCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/tokens/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__param(1, (0, common_1.Query)('name')),
    tslib_1.__param(2, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumPipe(entities_1.TokenType))),
    tslib_1.__param(3, (0, common_1.Query)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__param(4, (0, common_1.Query)('identifiers', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(5, (0, common_1.Query)('includeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(6, (0, common_1.Query)('moaPairType', new sdk_nestjs_common_1.ParseEnumArrayPipe(moa_pair_type_1.MoaPairType))),
    tslib_1.__param(7, (0, common_1.Query)('priceSource', new sdk_nestjs_common_1.ParseEnumPipe(token_assets_price_source_type_1.TokenAssetsPriceSourceType))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, Array, Boolean, Array, String]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getTokenCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)('/tokens/:identifier'),
    (0, swagger_1.ApiOperation)({ summary: 'Token', description: 'Returns token details based on a specific token identifier' }),
    (0, swagger_1.ApiQuery)({ name: 'denominated', description: 'Return results denominated', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: token_detailed_1.TokenDetailed }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token not found' }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__param(1, (0, common_1.Query)('denominated', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getToken", null);
tslib_1.__decorate([
    (0, common_1.Get)('/tokens/:identifier/supply'),
    (0, swagger_1.ApiOperation)({ summary: 'Token supply', description: 'Returns general supply information for a specific token' }),
    (0, swagger_1.ApiQuery)({ name: 'denominated', description: 'Return results denominated', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: dcdt_supply_1.DcdtSupply }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token not found' }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__param(1, (0, common_1.Query)('denominated', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getTokenSupply", null);
tslib_1.__decorate([
    (0, common_1.Get)("/tokens/:identifier/accounts"),
    (0, swagger_1.ApiOperation)({ summary: 'Token accounts', description: 'Returns a list of accounts that hold a specific token' }),
    (0, swagger_1.ApiOkResponse)({ type: [token_account_1.TokenAccount] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token not found' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)("size", new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getTokenAccounts", null);
tslib_1.__decorate([
    (0, common_1.Get)("/tokens/:identifier/accounts/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Token accounts count', description: 'Returns the total number of accounts that hold a specific token' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token not found' }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getTokenAccountsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/tokens/:identifier/transactions"),
    (0, swagger_1.ApiOperation)({ summary: 'Token transactions', description: `Returns a list of transactions for a specific token.` }),
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
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Filter by round number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sort order (asc/desc)', required: false, enum: sort_order_1.SortOrder }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isScCall', description: 'Returns sc call transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withScResults', description: 'Return scResults for transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withOperations', description: 'Return operations for transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withLogs', description: 'Return logs for transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withScamInfo', description: 'Returns scam information', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withUsername', description: 'Integrates username in assets for all addresses present in the transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withBlockInfo', description: 'Returns sender / receiver block details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withActionTransferValue', description: 'Returns value in USD and REWA for transferred tokens within the action attribute', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withRelayedScresults', description: 'If set to true, will include smart contract results that resemble relayed transactions', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
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
    tslib_1.__param(15, (0, common_1.Query)('fields', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(16, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(17, (0, common_1.Query)('withScResults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(18, (0, common_1.Query)('withOperations', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(19, (0, common_1.Query)('withLogs', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(20, (0, common_1.Query)('withScamInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(21, (0, common_1.Query)('withUsername', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(22, (0, common_1.Query)('withBlockInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(23, (0, common_1.Query)('withActionTransferValue', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(24, (0, common_1.Query)('withRelayedScresults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String, Array, Number, Number, String, Array, String, Array, Number, Number, Number, String, Array, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getTokenTransactions", null);
tslib_1.__decorate([
    (0, common_1.Get)("/tokens/:identifier/transactions/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Token transactions count', description: 'Returns the total number of transactions for a specific token' }),
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
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Filter by round number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isScCall', description: 'Returns sc call transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withRelayedScresults', description: 'If set to true, will include smart contract results that resemble relayed transactions', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
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
    tslib_1.__param(12, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array, Number, Number, String, Array, String, Number, Number, Number, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getTokenTransactionsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/tokens/:identifier/roles"),
    (0, swagger_1.ApiOperation)({ summary: 'Token roles', description: 'Returns a list of accounts that can perform various actions on a specific token', deprecated: true }),
    (0, swagger_1.ApiOkResponse)({ type: [token_roles_1.TokenRoles] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token not found' }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getTokenRoles", null);
tslib_1.__decorate([
    (0, common_1.Get)("/tokens/:identifier/roles/:address"),
    (0, swagger_1.ApiOperation)({ summary: 'Token address roles', description: 'Returns roles details for a specific address of a given token', deprecated: true }),
    (0, swagger_1.ApiOkResponse)({ type: token_roles_1.TokenRoles }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token not found' }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__param(1, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getTokenRolesForAddress", null);
tslib_1.__decorate([
    (0, common_1.Get)("/tokens/:identifier/transfers"),
    (0, swagger_1.ApiOperation)({ summary: 'Token value transfers', description: 'Returns both transfers triggerred by a user account (type = Transaction), as well as transfers triggerred by smart contracts (type = SmartContractResult), thus providing a full picture of all in/out value transfers for a given account' }),
    (0, swagger_1.ApiOkResponse)({ type: [transaction_1.Transaction] }),
    (0, sdk_nestjs_common_1.ApplyComplexity)({ target: transaction_detailed_1.TransactionDetailed }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Address of the transfer sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transfer hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transaction (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter transfers by function name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sort order (asc/desc)', required: false, enum: sort_order_1.SortOrder }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Filter by round number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'fields', description: 'List of fields to filter by', required: false, isArray: true, style: 'form', explode: false }),
    (0, swagger_1.ApiQuery)({ name: 'isScCall', description: 'Returns sc call transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withScamInfo', description: 'Returns scam information', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withUsername', description: 'Integrates username in assets for all addresses present in the transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withBlockInfo', description: 'Returns sender / receiver block details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withActionTransferValue', description: 'Returns value in USD and REWA for transferred tokens within the action attribute', required: false }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressArrayPipe)),
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
    tslib_1.__param(14, (0, common_1.Query)('fields', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(15, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__param(16, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(17, (0, common_1.Query)('withScamInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(18, (0, common_1.Query)('withUsername', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(19, (0, common_1.Query)('withBlockInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(20, (0, common_1.Query)('withActionTransferValue', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, Array, Array, Number, Number, String, Array, String, Array, Number, Number, Number, Array, String, Boolean, Boolean, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getTokenTransfers", null);
tslib_1.__decorate([
    (0, common_1.Get)("/tokens/:identifier/transfers/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Account transfer count', description: 'Return total count of transfers triggerred by a user account (type = Transaction), as well as transfers triggerred by smart contracts (type = SmartContractResult)' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Address of the transfer sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transfer hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transaction (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter transfers by function name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Filter by round number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isScCall', description: 'Returns sc call transactions details', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__param(1, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(2, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(3, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(6, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(7, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(8, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(9, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(10, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(11, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(12, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array, Array, Number, Number, String, Array, String, Array, Number, Number, Number, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getTokenTransfersCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/tokens/:identifier/transfers/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__param(1, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(2, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(3, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(6, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(7, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(8, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(9, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(10, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(11, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(12, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array, Array, Number, Number, String, Array, String, Array, Number, Number, Number, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getAccountTransfersCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)('/tokens/:identifier/logo/png'),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getTokenLogoPng", null);
tslib_1.__decorate([
    (0, common_1.Get)('/tokens/:identifier/logo/svg'),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TokenController.prototype, "getTokenLogoSvg", null);
TokenController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('tokens'),
    tslib_1.__metadata("design:paramtypes", [token_service_1.TokenService,
        transaction_service_1.TransactionService,
        transfer_service_1.TransferService])
], TokenController);
exports.TokenController = TokenController;
//# sourceMappingURL=token.controller.js.map