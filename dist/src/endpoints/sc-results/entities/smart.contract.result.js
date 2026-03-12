"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractResult = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
const account_assets_1 = require("../../../common/assets/entities/account.assets");
const transaction_action_1 = require("../../transactions/transaction-action/entities/transaction.action");
const transaction_log_1 = require("../../transactions/entities/transaction.log");
class SmartContractResult {
    constructor(init) {
        this.hash = '';
        this.timestamp = 0;
        this.nonce = 0;
        this.gasLimit = 0;
        this.gasPrice = 0;
        this.value = '';
        this.sender = '';
        this.receiver = '';
        this.senderAssets = undefined;
        this.receiverAssets = undefined;
        this.relayedValue = '';
        this.data = '';
        this.prevTxHash = '';
        this.originalTxHash = '';
        this.callType = '';
        this.miniBlockHash = undefined;
        this.logs = undefined;
        this.returnMessage = undefined;
        this.action = undefined;
        this.function = undefined;
        this.status = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], SmartContractResult.prototype, "hash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], SmartContractResult.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], SmartContractResult.prototype, "nonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], SmartContractResult.prototype, "gasLimit", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], SmartContractResult.prototype, "gasPrice", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], SmartContractResult.prototype, "value", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], SmartContractResult.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], SmartContractResult.prototype, "receiver", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: account_assets_1.AccountAssets, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], SmartContractResult.prototype, "senderAssets", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: account_assets_1.AccountAssets, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], SmartContractResult.prototype, "receiverAssets", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    tslib_1.__metadata("design:type", String)
], SmartContractResult.prototype, "relayedValue", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], SmartContractResult.prototype, "data", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], SmartContractResult.prototype, "prevTxHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], SmartContractResult.prototype, "originalTxHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], SmartContractResult.prototype, "callType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], SmartContractResult.prototype, "miniBlockHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: transaction_log_1.TransactionLog, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], SmartContractResult.prototype, "logs", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], SmartContractResult.prototype, "returnMessage", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: transaction_action_1.TransactionAction, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], SmartContractResult.prototype, "action", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], SmartContractResult.prototype, "function", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], SmartContractResult.prototype, "status", void 0);
exports.SmartContractResult = SmartContractResult;
//# sourceMappingURL=smart.contract.result.js.map