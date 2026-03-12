"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionPool = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class TransactionPool {
    constructor(init) {
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Transaction hash', example: '39098e005c9f53622e9c8a946f9141d7c29a5da3bc38e07e056b549fa017ae1b' }),
    tslib_1.__metadata("design:type", String)
], TransactionPool.prototype, "txHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Sender bech32 address', example: 'drt1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q6pec6c' }),
    tslib_1.__metadata("design:type", String)
], TransactionPool.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Receiver bech32 address', example: 'drt1qga7ze0l03chfgru0a32wxqf2226nzrxnyhzer9lmudqhjgy7ycq0wn4su' }),
    tslib_1.__metadata("design:type", String)
], TransactionPool.prototype, "receiver", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Transaction value', example: 1000000000000000000 }),
    tslib_1.__metadata("design:type", Number)
], TransactionPool.prototype, "value", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Nonce details', example: 100 }),
    tslib_1.__metadata("design:type", Number)
], TransactionPool.prototype, "nonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Transaction data', example: 'TEST==', required: false }),
    tslib_1.__metadata("design:type", String)
], TransactionPool.prototype, "data", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Transaction gas price', example: 1000000000 }),
    tslib_1.__metadata("design:type", Number)
], TransactionPool.prototype, "gasPrice", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Transaction gas limit', example: 50000 }),
    tslib_1.__metadata("design:type", Number)
], TransactionPool.prototype, "gasLimit", void 0);
exports.TransactionPool = TransactionPool;
//# sourceMappingURL=transaction.pool.js.map