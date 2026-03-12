"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionDecodeDto = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const transaction_action_1 = require("../../transaction-action/entities/transaction.action");
class TransactionDecodeDto {
    constructor(init) {
        this.action = new transaction_action_1.TransactionAction();
        this.data = '';
        this.receiver = '';
        this.sender = '';
        this.value = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: transaction_action_1.TransactionAction, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TransactionDecodeDto.prototype, "action", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TransactionDecodeDto.prototype, "data", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TransactionDecodeDto.prototype, "receiver", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TransactionDecodeDto.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TransactionDecodeDto.prototype, "value", void 0);
exports.TransactionDecodeDto = TransactionDecodeDto;
//# sourceMappingURL=transaction.decode.dto.js.map