"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_elastic_1 = require("@sravankumar02/sdk-nestjs-elastic");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const query_pagination_1 = require("../../common/entities/query.pagination");
const sort_order_1 = require("../../common/entities/sort.order");
const transaction_decode_dto_1 = require("./entities/dtos/transaction.decode.dto");
const transaction_1 = require("./entities/transaction");
const transaction_create_1 = require("./entities/transaction.create");
const transaction_detailed_1 = require("./entities/transaction.detailed");
const transaction_filter_1 = require("./entities/transaction.filter");
const transaction_send_result_1 = require("./entities/transaction.send.result");
const transaction_status_1 = require("./entities/transaction.status");
const transactions_query_options_1 = require("./entities/transactions.query.options");
const transaction_service_1 = require("./transaction.service");
const parse_array_options_1 = require("@sravankumar02/sdk-nestjs-common/lib/pipes/entities/parse.array.options");
const ppu_metadata_1 = require("./entities/ppu.metadata");
const timestamp_parse_pipe_1 = require("../../utils/timestamp.parse.pipe");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    getTransactions(from, size, sender, receiver, relayer, token, senderShard, receiverShard, miniBlockHash, hashes, status, functions, condition, before, after, round, order, fields, withScResults, withOperations, withLogs, withScamInfo, withUsername, withBlockInfo, isRelayed, isScCall, withActionTransferValue, withRelayedScresults) {
        const options = transactions_query_options_1.TransactionQueryOptions.applyDefaultOptions(size, { withScResults, withOperations, withLogs, withScamInfo, withUsername, withBlockInfo, withActionTransferValue });
        const transactionFilter = new transaction_filter_1.TransactionFilter({
            sender,
            receivers: receiver,
            token,
            functions,
            senderShard,
            receiverShard,
            miniBlockHash,
            hashes,
            status,
            before,
            after,
            condition,
            order,
            relayer,
            isRelayed,
            isScCall,
            round,
            withRelayedScresults: withRelayedScresults,
        });
        transaction_filter_1.TransactionFilter.validate(transactionFilter, size);
        return this.transactionService.getTransactions(transactionFilter, new query_pagination_1.QueryPagination({ from, size }), options, undefined, fields);
    }
    getTransactionCount(sender, receiver, token, senderShard, receiverShard, miniBlockHash, hashes, status, functions, condition, before, after, round, relayer, isRelayed, isScCall, withRelayedScresults) {
        return this.transactionService.getTransactionCount(new transaction_filter_1.TransactionFilter({
            sender,
            receivers: receiver,
            token,
            senderShard,
            receiverShard,
            miniBlockHash,
            hashes,
            status,
            functions,
            before,
            after,
            condition,
            relayer,
            isRelayed,
            isScCall,
            round,
            withRelayedScresults: withRelayedScresults,
        }));
    }
    getTransactionCountAlternative(sender, receiver, token, senderShard, receiverShard, miniBlockHash, hashes, status, functions, condition, before, after, round, relayer, isRelayed, isScCall, withRelayedScresults) {
        return this.transactionService.getTransactionCount(new transaction_filter_1.TransactionFilter({
            sender,
            receivers: receiver,
            token,
            senderShard,
            receiverShard,
            miniBlockHash,
            hashes,
            status,
            functions,
            before,
            after,
            condition,
            isRelayed,
            relayer,
            round,
            isScCall,
            withRelayedScresults: withRelayedScresults,
        }));
    }
    async getTransaction(txHash, fields, withActionTransferValue) {
        const transaction = await this.transactionService.getTransaction(txHash, fields, withActionTransferValue);
        if (transaction === null) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        return transaction;
    }
    async createTransaction(transaction) {
        if (!transaction.sender) {
            throw new common_1.BadRequestException('Sender must be provided');
        }
        if (!transaction.receiver) {
            throw new common_1.BadRequestException('Receiver must be provided');
        }
        if (!transaction.signature) {
            throw new common_1.BadRequestException('Signature must be provided');
        }
        const result = await this.transactionService.createTransaction(transaction);
        if (typeof result === 'string' || result instanceof String) {
            throw new common_1.BadRequestException(result);
        }
        return result;
    }
    async decodeTransaction(transaction) {
        if (!transaction.sender) {
            throw new common_1.BadRequestException('Sender must be provided');
        }
        if (!transaction.receiver) {
            throw new common_1.BadRequestException('Receiver must be provided');
        }
        return await this.transactionService.decodeTransaction(transaction);
    }
    async getPpuByShardId(shardId) {
        const ppuMetadata = await this.transactionService.getPpuByShardId(shardId);
        if (ppuMetadata === null) {
            throw new common_1.NotFoundException(`Price per unit data for shard ${shardId} not found`);
        }
        return ppuMetadata;
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/transactions"),
    (0, swagger_1.ApiOperation)({ summary: 'Transaction list', description: 'Returns a list of transactions available on the blockchain.' }),
    (0, sdk_nestjs_common_1.ApplyComplexity)({ target: transaction_detailed_1.TransactionDetailed }),
    (0, swagger_1.ApiOkResponse)({ type: [transaction_1.Transaction] }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Address of the transaction sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'token', description: 'Identifier of the token', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transaction hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transaction (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter transactions by function name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Round number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sort order (asc/desc)', required: false, enum: sort_order_1.SortOrder }),
    (0, swagger_1.ApiQuery)({ name: 'fields', description: 'List of fields to filter by', required: false, isArray: true, style: 'form', explode: false }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'condition', description: 'Condition for elastic search queries', required: false, deprecated: true }),
    (0, swagger_1.ApiQuery)({ name: 'withScResults', description: 'Return results for transactions. When "withScResults" parameter is applied, complexity estimation is 200', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withOperations', description: 'Return operations for transactions. When "withOperations" parameter is applied, complexity estimation is 200', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withLogs', description: 'Return logs for transactions. When "withLogs" parameter is applied, complexity estimation is 200', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withScamInfo', description: 'Returns scam information', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withUsername', description: 'Integrates username in assets for all addresses present in the transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withBlockInfo', description: 'Returns sender / receiver block details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'relayer', description: 'Search by a relayer address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isRelayed', description: 'Returns relayed transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'isScCall', description: 'Returns sc call transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withActionTransferValue', description: 'Returns value in USD and REWA for transferred tokens within the action attribute', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withRelayedScresults', description: 'If set to true, will include smart contract results that resemble relayed transactions', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressAndMetachainPipe)),
    tslib_1.__param(3, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(4, (0, common_1.Query)('relayer', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(5, (0, common_1.Query)('token')),
    tslib_1.__param(6, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(7, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(8, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(9, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(10, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(11, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(12, (0, common_1.Query)('condition')),
    tslib_1.__param(13, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(14, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(15, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(16, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__param(17, (0, common_1.Query)('fields', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(18, (0, common_1.Query)('withScResults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(19, (0, common_1.Query)('withOperations', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(20, (0, common_1.Query)('withLogs', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(21, (0, common_1.Query)('withScamInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(22, (0, common_1.Query)('withUsername', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(23, (0, common_1.Query)('withBlockInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(24, (0, common_1.Query)('isRelayed', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(25, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(26, (0, common_1.Query)('withActionTransferValue', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(27, (0, common_1.Query)('withRelayedScresults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Array, String, String, Number, Number, String, Array, String, Array, String, Number, Number, Number, String, Array, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", void 0)
], TransactionController.prototype, "getTransactions", null);
tslib_1.__decorate([
    (0, common_1.Get)("/transactions/count"),
    (0, swagger_1.ApiOperation)({ summary: "Transactions count", description: 'Returns the total number of transactions' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Address of the transaction sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'token', description: 'Identifier of the token', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transaction hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transaction (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'condition', description: 'Condition for elastic search queries', required: false, deprecated: true }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter transactions by function name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Round number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isRelayed', description: 'Returns relayed transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'isScCall', description: 'Returns sc call transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'relayer', description: 'Filter by a relayer address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withRelayedScresults', description: 'If set to true, will include smart contract results that resemble relayed transactions', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressAndMetachainPipe)),
    tslib_1.__param(1, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(2, (0, common_1.Query)('token')),
    tslib_1.__param(3, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(6, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(7, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(8, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(9, (0, common_1.Query)('condition')),
    tslib_1.__param(10, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(11, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(12, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(13, (0, common_1.Query)('relayer', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(14, (0, common_1.Query)('isRelayed', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(15, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(16, (0, common_1.Query)('withRelayedScresults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array, String, Number, Number, String, Array, String, Array, String, Number, Number, Number, String, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransactionCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/transactions/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressAndMetachainPipe)),
    tslib_1.__param(1, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(2, (0, common_1.Query)('token')),
    tslib_1.__param(3, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(6, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(7, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(8, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(9, (0, common_1.Query)('condition')),
    tslib_1.__param(10, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(11, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(12, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(13, (0, common_1.Query)('relayer', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(14, (0, common_1.Query)('isRelayed', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(15, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(16, (0, common_1.Query)('withRelayedScresults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array, String, Number, Number, String, Array, String, Array, String, Number, Number, Number, String, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransactionCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)('/transactions/:txHash'),
    (0, swagger_1.ApiOperation)({ summary: 'Transaction details', description: 'Return transaction details for a given transaction hash' }),
    (0, swagger_1.ApiOkResponse)({ type: transaction_detailed_1.TransactionDetailed }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Transaction not found' }),
    (0, swagger_1.ApiQuery)({ name: 'fields', description: 'List of fields to filter by', required: false, isArray: true, style: 'form', explode: false }),
    (0, swagger_1.ApiQuery)({ name: 'withActionTransferValue', description: 'Returns value in USD and REWA for transferred tokens within the action attribute', required: false }),
    tslib_1.__param(0, (0, common_1.Param)('txHash', sdk_nestjs_common_1.ParseTransactionHashPipe)),
    tslib_1.__param(1, (0, common_1.Query)('fields', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(2, (0, common_1.Query)('withActionTransferValue', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransaction", null);
tslib_1.__decorate([
    (0, common_1.Post)('/transactions'),
    (0, swagger_1.ApiOperation)({ summary: 'Send transaction', description: 'Posts a signed transaction on the blockchain' }),
    (0, swagger_1.ApiCreatedResponse)({ type: transaction_send_result_1.TransactionSendResult }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [transaction_create_1.TransactionCreate]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "createTransaction", null);
tslib_1.__decorate([
    (0, common_1.Post)('/transactions/decode'),
    (0, swagger_1.ApiOperation)({ summary: 'Decode transaction', description: 'Decodes transaction action, given a minimum set of transaction details' }),
    (0, swagger_1.ApiCreatedResponse)({ type: transaction_decode_dto_1.TransactionDecodeDto }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [transaction_decode_dto_1.TransactionDecodeDto]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "decodeTransaction", null);
tslib_1.__decorate([
    (0, common_1.Get)('/transactions/ppu/:shardId'),
    (0, swagger_1.ApiOperation)({ summary: 'Price per unit by shard', description: 'Returns price per unit metadata for a specific shard' }),
    (0, swagger_1.ApiOkResponse)({ type: ppu_metadata_1.PpuMetadata }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Price per unit data for shard not found' }),
    tslib_1.__param(0, (0, common_1.Param)('shardId', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "getPpuByShardId", null);
TransactionController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('transactions'),
    tslib_1.__metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map