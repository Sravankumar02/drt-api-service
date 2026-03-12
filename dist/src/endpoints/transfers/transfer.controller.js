"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const query_pagination_1 = require("../../common/entities/query.pagination");
const sort_order_1 = require("../../common/entities/sort.order");
const transaction_1 = require("../transactions/entities/transaction");
const transaction_detailed_1 = require("../transactions/entities/transaction.detailed");
const transaction_filter_1 = require("../transactions/entities/transaction.filter");
const transaction_status_1 = require("../transactions/entities/transaction.status");
const transactions_query_options_1 = require("../transactions/entities/transactions.query.options");
const transfer_service_1 = require("./transfer.service");
const parse_array_options_1 = require("@sravankumar02/sdk-nestjs-common/lib/pipes/entities/parse.array.options");
const timestamp_parse_pipe_1 = require("../../utils/timestamp.parse.pipe");
let TransferController = class TransferController {
    constructor(transferService) {
        this.transferService = transferService;
    }
    async getAccountTransfers(from, size, receiver, sender, token, functions, senderShard, receiverShard, miniBlockHash, hashes, status, before, after, round, order, fields, relayer, isRelayed, isScCall, withScamInfo, withUsername, withBlockInfo, withLogs, withOperations, withActionTransferValue, withTxsOrder, withRefunds) {
        const options = transactions_query_options_1.TransactionQueryOptions.applyDefaultOptions(size, new transactions_query_options_1.TransactionQueryOptions({ withScamInfo, withUsername, withBlockInfo, withLogs, withOperations, withActionTransferValue, withTxsOrder }));
        return await this.transferService.getTransfers(new transaction_filter_1.TransactionFilter({
            senders: sender,
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
            order,
            relayer,
            isRelayed,
            round,
            withRefunds,
            isScCall,
        }), new query_pagination_1.QueryPagination({ from, size }), options, fields);
    }
    async getAccountTransfersCount(sender, receiver, token, senderShard, receiverShard, miniBlockHash, hashes, status, functions, before, after, round, relayer, isRelayed, isScCall, withRefunds) {
        return await this.transferService.getTransfersCount(new transaction_filter_1.TransactionFilter({
            senders: sender,
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
            relayer,
            isRelayed,
            round,
            withRefunds,
            isScCall,
        }));
    }
    async getAccountTransfersCountAlternative(sender, receiver, token, senderShard, receiverShard, miniBlockHash, hashes, status, functions, before, after, round, relayer, isRelayed, isScCall, withRefunds) {
        return await this.transferService.getTransfersCount(new transaction_filter_1.TransactionFilter({
            senders: sender,
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
            round,
            relayer,
            isRelayed,
            withRefunds,
            isScCall,
        }));
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/transfers"),
    (0, swagger_1.ApiOperation)({ summary: 'Value transfers', description: 'Returns both transfers triggerred by a user account (type = Transaction), as well as transfers triggerred by smart contracts (type = SmartContractResult), thus providing a full picture of all in/out value transfers for a given account' }),
    (0, sdk_nestjs_common_1.ApplyComplexity)({ target: transaction_detailed_1.TransactionDetailed }),
    (0, swagger_1.ApiOkResponse)({ type: [transaction_1.Transaction] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Search by multiple sender addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'token', description: 'Identifier of the token', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transfer hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transaction (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sort order (asc/desc)', required: false, enum: sort_order_1.SortOrder }),
    (0, swagger_1.ApiQuery)({ name: 'fields', description: 'List of fields to filter by', required: false, isArray: true, style: 'form', explode: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Round number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter transfers by function name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'relayer', description: 'Filter by relayer address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isRelayed', description: 'Returns relayed transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'isScCall', description: 'Returns sc call transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withScamInfo', description: 'Returns scam information', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withUsername', description: 'Integrates username in assets for all addresses present in the transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withBlockInfo', description: 'Returns sender / receiver block details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withLogs', description: 'Return logs for transfers. When "withLogs" parameter is applied, complexity estimation is 200', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withOperations', description: 'Return operations for transfers. When "withOperations" parameter is applied, complexity estimation is 200', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withActionTransferValue', description: 'Returns value in USD and REWA for transferred tokens within the action attribute', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withTxsOrder', description: 'Sort transactions by execution order from block', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withRefunds', description: 'Include refund transactions', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(3, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(4, (0, common_1.Query)('token')),
    tslib_1.__param(5, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(6, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(7, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(8, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(9, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(10, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(11, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(12, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(13, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(14, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__param(15, (0, common_1.Query)('fields', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(16, (0, common_1.Query)('relayer', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(17, (0, common_1.Query)('isRelayed', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(18, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(19, (0, common_1.Query)('withScamInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(20, (0, common_1.Query)('withUsername', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(21, (0, common_1.Query)('withBlockInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(22, (0, common_1.Query)('withLogs', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(23, (0, common_1.Query)('withOperations', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(24, (0, common_1.Query)('withActionTransferValue', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(25, (0, common_1.Query)('withTxsOrder', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(26, (0, common_1.Query)('withRefunds', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Array, Array, String, Array, Number, Number, String, Array, String, Number, Number, Number, String, Array, String, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], TransferController.prototype, "getAccountTransfers", null);
tslib_1.__decorate([
    (0, common_1.Get)("/transfers/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Account transfer count', description: 'Return total count of tranfers triggerred by a user account (type = Transaction), as well as transfers triggerred by smart contracts (type = SmartContractResult)' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Search by multiple sender addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'token', description: 'Identifier of the token', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transfer hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transaction (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter transfers by function name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Round number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'relayer', description: 'Filter by the relayer address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isRelayed', description: 'Returns relayed transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'isScCall', description: 'Returns sc call transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withRefunds', description: 'Include refund transactions', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(1, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(2, (0, common_1.Query)('token')),
    tslib_1.__param(3, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(6, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(7, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(8, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(9, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(10, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(11, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(12, (0, common_1.Query)('relayer', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(13, (0, common_1.Query)('isRelayed', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(14, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(15, (0, common_1.Query)('withRefunds', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Array, String, Number, Number, String, Array, String, Array, Number, Number, Number, String, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], TransferController.prototype, "getAccountTransfersCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/transfers/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(1, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(2, (0, common_1.Query)('token')),
    tslib_1.__param(3, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(6, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(7, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(8, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(9, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(10, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(11, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(12, (0, common_1.Query)('relayer', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(13, (0, common_1.Query)('isRelayed', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(14, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(15, (0, common_1.Query)('withRefunds', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Array, String, Number, Number, String, Array, String, Array, Number, Number, Number, String, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], TransferController.prototype, "getAccountTransfersCountAlternative", null);
TransferController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('transfers'),
    tslib_1.__metadata("design:paramtypes", [transfer_service_1.TransferService])
], TransferController);
exports.TransferController = TransferController;
//# sourceMappingURL=transfer.controller.js.map