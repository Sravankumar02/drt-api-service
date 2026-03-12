"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionDetailed = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const smart_contract_result_1 = require("../../sc-results/entities/smart.contract.result");
const transaction_1 = require("./transaction");
const transaction_receipt_1 = require("./transaction.receipt");
const transaction_log_1 = require("./transaction.log");
const transaction_operation_1 = require("./transaction.operation");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
class TransactionDetailed extends transaction_1.Transaction {
    constructor(init) {
        super();
        this.results = undefined;
        this.receipt = undefined;
        this.price = undefined;
        this.logs = undefined;
        this.operations = [];
        this.senderBlockHash = undefined;
        this.senderBlockNonce = undefined;
        this.receiverBlockHash = undefined;
        this.receiverBlockNonce = undefined;
        this.inTransit = undefined;
        this.relayedVersion = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: smart_contract_result_1.SmartContractResult, isArray: true }),
    (0, sdk_nestjs_common_1.ComplexityEstimation)({ group: "details", value: 200, alternatives: ["withScResults"] }),
    tslib_1.__metadata("design:type", Object)
], TransactionDetailed.prototype, "results", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: transaction_receipt_1.TransactionReceipt, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TransactionDetailed.prototype, "receipt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TransactionDetailed.prototype, "price", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: transaction_log_1.TransactionLog, nullable: true }),
    (0, sdk_nestjs_common_1.ComplexityEstimation)({ group: "details", value: 200, alternatives: ["withLogs"] }),
    tslib_1.__metadata("design:type", Object)
], TransactionDetailed.prototype, "logs", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: transaction_operation_1.TransactionOperation, isArray: true }),
    (0, sdk_nestjs_common_1.ComplexityEstimation)({ group: "details", value: 200, alternatives: ["withOperations"] }),
    tslib_1.__metadata("design:type", Array)
], TransactionDetailed.prototype, "operations", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    (0, sdk_nestjs_common_1.ComplexityEstimation)({ group: "blockInfo", value: 200, alternatives: ["withBlockInfo"] }),
    tslib_1.__metadata("design:type", Object)
], TransactionDetailed.prototype, "senderBlockHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    (0, sdk_nestjs_common_1.ComplexityEstimation)({ group: "blockInfo", value: 200, alternatives: ["withBlockInfo"] }),
    tslib_1.__metadata("design:type", Object)
], TransactionDetailed.prototype, "senderBlockNonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    (0, sdk_nestjs_common_1.ComplexityEstimation)({ group: "blockInfo", value: 200, alternatives: ["withBlockInfo"] }),
    tslib_1.__metadata("design:type", Object)
], TransactionDetailed.prototype, "receiverBlockHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    (0, sdk_nestjs_common_1.ComplexityEstimation)({ group: "blockInfo", value: 200, alternatives: ["withBlockInfo"] }),
    tslib_1.__metadata("design:type", Object)
], TransactionDetailed.prototype, "receiverBlockNonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TransactionDetailed.prototype, "inTransit", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TransactionDetailed.prototype, "relayedVersion", void 0);
exports.TransactionDetailed = TransactionDetailed;
//# sourceMappingURL=transaction.detailed.js.map