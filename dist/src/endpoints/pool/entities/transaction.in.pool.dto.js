"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionInPool = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const transaction_type_1 = require("../../transactions/entities/transaction.type");
class TransactionInPool {
    constructor(init) {
        this.txHash = '';
        this.sender = '';
        this.receiver = '';
        this.receiverUsername = '';
        this.guardian = '';
        this.guardianSignature = '';
        this.nonce = 0;
        this.value = '';
        this.data = '';
        this.gasPrice = 0;
        this.gasLimit = 0;
        this.senderShard = 0;
        this.receiverShard = 0;
        this.signature = '';
        this.function = '';
        this.type = transaction_type_1.TransactionType.Transaction;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "6dc737fcb21e6f599c557f6001f78ae1f073241d1bd9b488b02f86c5131d477c" }),
    tslib_1.__metadata("design:type", String)
], TransactionInPool.prototype, "txHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "drt17rc0pu8s7rc0pu8s7rc0pu8s7rc0pu8s7rc0pu8s7rc0pu8s7rcqa2qg80" }),
    tslib_1.__metadata("design:type", String)
], TransactionInPool.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "drt1an4xpn58j7ymd58m2jznr32t0vmas75egrdfa8mta6fzvqn9tkxqgwmt5d" }),
    tslib_1.__metadata("design:type", String)
], TransactionInPool.prototype, "receiver", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "alice.numbat" }),
    tslib_1.__metadata("design:type", String)
], TransactionInPool.prototype, "receiverUsername", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "drt17rc0pu8s7rc0pu8s7rc0pu8s7rc0pu8s7rc0pu8s7rc0pu8s7rcqa2qg80" }),
    tslib_1.__metadata("design:type", String)
], TransactionInPool.prototype, "guardian", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "0228618b6339c5eaf71ed1a8cd71df010ccd0369a29d957c37d53b0409408161726dd97e10ac7836996f666ffd636a797b9b9abecbd276971376fb3479b48203" }),
    tslib_1.__metadata("design:type", String)
], TransactionInPool.prototype, "guardianSignature", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 37 }),
    tslib_1.__metadata("design:type", Number)
], TransactionInPool.prototype, "nonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "83499410000000000000000" }),
    tslib_1.__metadata("design:type", String)
], TransactionInPool.prototype, "value", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "dGV4dA==" }),
    tslib_1.__metadata("design:type", String)
], TransactionInPool.prototype, "data", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1000000000 }),
    tslib_1.__metadata("design:type", Number)
], TransactionInPool.prototype, "gasPrice", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 50000 }),
    tslib_1.__metadata("design:type", Number)
], TransactionInPool.prototype, "gasLimit", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 0 }),
    tslib_1.__metadata("design:type", Number)
], TransactionInPool.prototype, "senderShard", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1 }),
    tslib_1.__metadata("design:type", Number)
], TransactionInPool.prototype, "receiverShard", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "0228618b6339c5eaf71ed1a8cd71df010ccd0369a29d957c37d53b0409408161726dd97e10ac7836996f666ffd636a797b9b9abecbd276971376fb3479b48203" }),
    tslib_1.__metadata("design:type", String)
], TransactionInPool.prototype, "signature", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, example: 'composeTasks', required: false }),
    tslib_1.__metadata("design:type", String)
], TransactionInPool.prototype, "function", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "SmartContractResult" }),
    tslib_1.__metadata("design:type", String)
], TransactionInPool.prototype, "type", void 0);
exports.TransactionInPool = TransactionInPool;
//# sourceMappingURL=transaction.in.pool.dto.js.map