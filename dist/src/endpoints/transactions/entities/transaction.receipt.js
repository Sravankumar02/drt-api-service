"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionReceipt = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class TransactionReceipt {
    constructor(init) {
        this.value = '';
        this.sender = '';
        this.data = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionReceipt.prototype, "value", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionReceipt.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionReceipt.prototype, "data", void 0);
exports.TransactionReceipt = TransactionReceipt;
//# sourceMappingURL=transaction.receipt.js.map