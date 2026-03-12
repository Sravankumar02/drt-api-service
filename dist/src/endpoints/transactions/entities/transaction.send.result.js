"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionSendResult = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class TransactionSendResult {
    constructor(init) {
        this.receiver = '';
        this.receiverShard = 0;
        this.sender = '';
        this.senderShard = 0;
        this.status = '';
        this.txHash = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TransactionSendResult.prototype, "receiver", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], TransactionSendResult.prototype, "receiverShard", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TransactionSendResult.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], TransactionSendResult.prototype, "senderShard", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TransactionSendResult.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TransactionSendResult.prototype, "txHash", void 0);
exports.TransactionSendResult = TransactionSendResult;
//# sourceMappingURL=transaction.send.result.js.map