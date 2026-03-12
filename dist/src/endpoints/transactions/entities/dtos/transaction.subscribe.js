"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionSubscribePayload = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const transaction_status_1 = require("../transaction.status");
const sort_order_1 = require("../../../../common/entities/sort.order");
class TransactionSubscribePayload {
    constructor() {
        this.from = 0;
        this.size = 25;
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(transaction_status_1.TransactionStatus),
    tslib_1.__metadata("design:type", String)
], TransactionSubscribePayload.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(sort_order_1.SortOrder),
    tslib_1.__metadata("design:type", String)
], TransactionSubscribePayload.prototype, "order", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], TransactionSubscribePayload.prototype, "isRelayed", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], TransactionSubscribePayload.prototype, "isScCall", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], TransactionSubscribePayload.prototype, "withScResults", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], TransactionSubscribePayload.prototype, "withRelayedScresults", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], TransactionSubscribePayload.prototype, "withOperations", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], TransactionSubscribePayload.prototype, "withLogs", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], TransactionSubscribePayload.prototype, "withScamInfo", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], TransactionSubscribePayload.prototype, "withUsername", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], TransactionSubscribePayload.prototype, "withBlockInfo", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], TransactionSubscribePayload.prototype, "withActionTransferValue", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsIn)([0], { message: 'from can only be 0' }),
    tslib_1.__metadata("design:type", Number)
], TransactionSubscribePayload.prototype, "from", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'minimum size is 1' }),
    (0, class_validator_1.Max)(50, { message: 'maximum size is 50' }),
    tslib_1.__metadata("design:type", Number)
], TransactionSubscribePayload.prototype, "size", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], TransactionSubscribePayload.prototype, "fields", void 0);
exports.TransactionSubscribePayload = TransactionSubscribePayload;
//# sourceMappingURL=transaction.subscribe.js.map