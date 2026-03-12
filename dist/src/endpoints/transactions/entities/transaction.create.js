"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionCreate = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class TransactionCreate {
    constructor(init) {
        this.chainId = '';
        this.data = '';
        this.gasLimit = 0;
        this.gasPrice = 0;
        this.nonce = 0;
        this.receiver = '';
        this.receiverUsername = undefined;
        this.sender = '';
        this.senderUsername = undefined;
        this.signature = '';
        this.value = '';
        this.version = 0;
        this.options = undefined;
        this.guardian = undefined;
        this.guardianSignature = undefined;
        this.relayer = undefined;
        this.relayerSignature = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionCreate.prototype, "chainId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionCreate.prototype, "data", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], TransactionCreate.prototype, "gasLimit", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], TransactionCreate.prototype, "gasPrice", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], TransactionCreate.prototype, "nonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionCreate.prototype, "receiver", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Object)
], TransactionCreate.prototype, "receiverUsername", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionCreate.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Object)
], TransactionCreate.prototype, "senderUsername", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionCreate.prototype, "signature", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionCreate.prototype, "value", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], TransactionCreate.prototype, "version", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], TransactionCreate.prototype, "options", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionCreate.prototype, "guardian", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionCreate.prototype, "guardianSignature", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionCreate.prototype, "relayer", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionCreate.prototype, "relayerSignature", void 0);
exports.TransactionCreate = TransactionCreate;
//# sourceMappingURL=transaction.create.js.map