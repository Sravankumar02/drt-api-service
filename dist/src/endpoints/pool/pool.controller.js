"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pool_service_1 = require("./pool.service");
const query_pagination_1 = require("../../common/entities/query.pagination");
const transaction_in_pool_dto_1 = require("./entities/transaction.in.pool.dto");
const transaction_type_1 = require("../transactions/entities/transaction.type");
const pool_filter_1 = require("./entities/pool.filter");
const parse_array_options_1 = require("@sravankumar02/sdk-nestjs-common/lib/pipes/entities/parse.array.options");
let PoolController = class PoolController {
    constructor(poolService) {
        this.poolService = poolService;
    }
    async getTransactionPool(from, size, sender, receiver, senderShard, receiverShard, type, functions) {
        return await this.poolService.getPool(new query_pagination_1.QueryPagination({ from, size }), new pool_filter_1.PoolFilter({
            sender: sender,
            receiver: receiver,
            senderShard: senderShard,
            receiverShard: receiverShard,
            type: type,
            functions: functions,
        }));
    }
    async getTransactionPoolCount(sender, receiver, senderShard, receiverShard, type) {
        return await this.poolService.getPoolCount(new pool_filter_1.PoolFilter({
            sender: sender,
            receiver: receiver,
            senderShard: senderShard,
            receiverShard: receiverShard,
            type: type,
        }));
    }
    async getTransactionPoolCountAlternative(sender, receiver, type) {
        return await this.poolService.getPoolCount(new pool_filter_1.PoolFilter({ sender, receiver, type }));
    }
    async getTransactionFromPool(txHash) {
        const transaction = await this.poolService.getTransactionFromPool(txHash);
        if (transaction === undefined) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        return transaction;
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/pool"),
    (0, swagger_1.ApiOperation)({ summary: 'Transactions pool', description: 'Returns the transactions that are currently in the memory pool.' }),
    (0, swagger_1.ApiOkResponse)({ type: transaction_in_pool_dto_1.TransactionInPool, isArray: true }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Search in transaction pool by a specific sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search in transaction pool by a specific receiver', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'The shard of the sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'The shard of the receiver', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Search in transaction pool by type', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter transactions by function name', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressAndMetachainPipe)),
    tslib_1.__param(3, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(4, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(6, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumPipe(transaction_type_1.TransactionType))),
    tslib_1.__param(7, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Number, Number, String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], PoolController.prototype, "getTransactionPool", null);
tslib_1.__decorate([
    (0, common_1.Get)("/pool/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Transactions pool count', description: 'Returns the number of transactions that are currently in the memory pool.' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Returns the number of transactions with a specific sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search in transaction pool by a specific receiver', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'The shard of the sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'The shard of the receiver', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Returns the number of transactions with a specific type', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressAndMetachainPipe)),
    tslib_1.__param(1, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(2, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumPipe(transaction_type_1.TransactionType))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Number, String]),
    tslib_1.__metadata("design:returntype", Promise)
], PoolController.prototype, "getTransactionPoolCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/pool/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressAndMetachainPipe)),
    tslib_1.__param(1, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(2, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumPipe(transaction_type_1.TransactionType))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], PoolController.prototype, "getTransactionPoolCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)("/pool/:txhash"),
    (0, swagger_1.ApiOperation)({ summary: 'Transaction from pool', description: 'Returns a transaction from the memory pool.' }),
    (0, swagger_1.ApiOkResponse)({ type: transaction_in_pool_dto_1.TransactionInPool }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Transaction not found' }),
    tslib_1.__param(0, (0, common_1.Param)('txhash', sdk_nestjs_common_1.ParseTransactionHashPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PoolController.prototype, "getTransactionFromPool", null);
PoolController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('pool'),
    tslib_1.__metadata("design:paramtypes", [pool_service_1.PoolService])
], PoolController);
exports.PoolController = PoolController;
//# sourceMappingURL=pool.controller.js.map