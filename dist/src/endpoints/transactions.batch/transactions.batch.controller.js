"use strict";
var TransactionsBatchController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsBatchController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const transaction_batch_simplified_1 = require("./entities/transaction.batch.simplified");
const transactions_batch_service_1 = require("./transactions.batch.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
let TransactionsBatchController = TransactionsBatchController_1 = class TransactionsBatchController {
    constructor(transactionsBatchService) {
        this.transactionsBatchService = transactionsBatchService;
        this.logger = new common_1.Logger(TransactionsBatchController_1.name);
    }
    async startTransactionBatch(batch, headers) {
        const transactionBatch = this.transactionsBatchService.convertToTransactionBatch(batch);
        const address = transactionBatch.groups[0].items[0].transaction.tx.sender;
        const existingBatch = await this.transactionsBatchService.getTransactionBatch(address, transactionBatch.id);
        if (existingBatch) {
            const message = `Duplicate batch detected with id '${transactionBatch.id}' for address ${address}`;
            this.logger.log(message);
            throw new common_1.HttpException(message, common_1.HttpStatus.BAD_REQUEST);
        }
        if (transactionBatch.groups.selectMany(x => x.items).some(x => x.transaction.tx.sender !== address)) {
            const message = `Sender for all transactions should be '${address}'`;
            this.logger.log(message);
            throw new common_1.HttpException(message, common_1.HttpStatus.BAD_REQUEST);
        }
        const sourceIp = headers['x-forwarded-for'] || headers['x-real-ip'];
        const startedBatch = await this.transactionsBatchService.startTransactionBatch(transactionBatch, sourceIp);
        return this.transactionsBatchService.convertFromTransactionBatch(startedBatch);
    }
    async getTransactionBatch(address, batchId) {
        const batch = await this.transactionsBatchService.getTransactionBatch(address, batchId);
        if (!batch) {
            throw new common_1.HttpException('Transaction batch not found', common_1.HttpStatus.NOT_FOUND);
        }
        return this.transactionsBatchService.convertFromTransactionBatch(batch);
    }
    async getTransactionBatches(address) {
        const batches = await this.transactionsBatchService.getTransactionBatches(address);
        return batches.map(batch => this.transactionsBatchService.convertFromTransactionBatch(batch));
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('/batch'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Headers)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [transaction_batch_simplified_1.TransactionBatchSimplified, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionsBatchController.prototype, "startTransactionBatch", null);
tslib_1.__decorate([
    (0, common_1.Get)('/batch/:address/:id'),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionsBatchController.prototype, "getTransactionBatch", null);
tslib_1.__decorate([
    (0, common_1.Get)('/batch/:address'),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionsBatchController.prototype, "getTransactionBatches", null);
TransactionsBatchController = TransactionsBatchController_1 = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [transactions_batch_service_1.TransactionsBatchService])
], TransactionsBatchController);
exports.TransactionsBatchController = TransactionsBatchController;
//# sourceMappingURL=transactions.batch.controller.js.map