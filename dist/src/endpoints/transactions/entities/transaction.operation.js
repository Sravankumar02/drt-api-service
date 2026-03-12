"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionOperation = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const account_assets_1 = require("../../../common/assets/entities/account.assets");
const dcdt_type_1 = require("../../dcdt/entities/dcdt.type");
const transaction_operation_action_1 = require("./transaction.operation.action");
const transaction_operation_type_1 = require("./transaction.operation.type");
class TransactionOperation {
    constructor(init) {
        this.id = '';
        this.action = transaction_operation_action_1.TransactionOperationAction.none;
        this.type = transaction_operation_type_1.TransactionOperationType.none;
        this.identifier = '';
        this.ticker = '';
        this.sender = '';
        this.receiver = '';
        this.senderAssets = undefined;
        this.receiverAssets = undefined;
        this.additionalData = [];
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TransactionOperation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: transaction_operation_action_1.TransactionOperationAction, default: transaction_operation_action_1.TransactionOperationAction.none }),
    tslib_1.__metadata("design:type", String)
], TransactionOperation.prototype, "action", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: transaction_operation_type_1.TransactionOperationType, default: transaction_operation_type_1.TransactionOperationType.none }),
    tslib_1.__metadata("design:type", String)
], TransactionOperation.prototype, "type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: dcdt_type_1.DcdtType, required: false }),
    tslib_1.__metadata("design:type", String)
], TransactionOperation.prototype, "dcdtType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    tslib_1.__metadata("design:type", String)
], TransactionOperation.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    tslib_1.__metadata("design:type", String)
], TransactionOperation.prototype, "ticker", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    tslib_1.__metadata("design:type", String)
], TransactionOperation.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    tslib_1.__metadata("design:type", String)
], TransactionOperation.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    tslib_1.__metadata("design:type", String)
], TransactionOperation.prototype, "value", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false }),
    tslib_1.__metadata("design:type", Number)
], TransactionOperation.prototype, "valueUSD", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TransactionOperation.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TransactionOperation.prototype, "receiver", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: account_assets_1.AccountAssets, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], TransactionOperation.prototype, "senderAssets", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: account_assets_1.AccountAssets, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], TransactionOperation.prototype, "receiverAssets", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Number)
], TransactionOperation.prototype, "decimals", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", String)
], TransactionOperation.prototype, "data", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", Array)
], TransactionOperation.prototype, "additionalData", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", String)
], TransactionOperation.prototype, "message", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", String)
], TransactionOperation.prototype, "svgUrl", void 0);
exports.TransactionOperation = TransactionOperation;
//# sourceMappingURL=transaction.operation.js.map