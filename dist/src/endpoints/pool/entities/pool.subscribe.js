"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolSubscribePayload = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const transaction_type_1 = require("../../transactions/entities/transaction.type");
class PoolSubscribePayload {
    constructor() {
        this.from = 0;
        this.size = 25;
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(transaction_type_1.TransactionType),
    tslib_1.__metadata("design:type", String)
], PoolSubscribePayload.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsIn)([0], { message: 'from can only be 0' }),
    tslib_1.__metadata("design:type", Number)
], PoolSubscribePayload.prototype, "from", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'minimum size is 1' }),
    (0, class_validator_1.Max)(50, { message: 'maximum size is 50' }),
    tslib_1.__metadata("design:type", Number)
], PoolSubscribePayload.prototype, "size", void 0);
exports.PoolSubscribePayload = PoolSubscribePayload;
//# sourceMappingURL=pool.subscribe.js.map