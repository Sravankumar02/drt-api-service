"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const account_assets_1 = require("../../../common/assets/entities/account.assets");
const scam_info_dto_1 = require("../../../common/entities/scam-info.dto");
const transaction_type_1 = require("./transaction.type");
const transaction_action_1 = require("../transaction-action/entities/transaction.action");
class Transaction {
    constructor(init) {
        this.txHash = '';
        this.gasLimit = undefined;
        this.gasPrice = undefined;
        this.gasUsed = undefined;
        this.miniBlockHash = undefined;
        this.nonce = undefined;
        this.receiver = '';
        this.receiverUsername = '';
        this.receiverAccount = undefined;
        this.receiverAssets = undefined;
        this.receiverShard = 0;
        this.round = undefined;
        this.epoch = undefined;
        this.sender = '';
        this.senderUsername = '';
        this.senderAccount = undefined;
        this.senderAssets = undefined;
        this.senderShard = 0;
        this.signature = undefined;
        this.status = '';
        this.value = '';
        this.fee = undefined;
        this.timestamp = 0;
        this.timestampMs = 0;
        this.data = undefined;
        this.function = undefined;
        this.action = undefined;
        this.scamInfo = undefined;
        this.type = undefined;
        this.originalTxHash = undefined;
        this.pendingResults = undefined;
        this.guardianAddress = undefined;
        this.guardianSignature = undefined;
        this.isRelayed = undefined;
        this.relayer = undefined;
        this.relayerSignature = undefined;
        this.isScCall = undefined;
        Object.assign(this, init);
    }
    getDate() {
        if (this.timestamp) {
            return new Date(this.timestamp * 1000);
        }
        return undefined;
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "txHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "gasLimit", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "gasPrice", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "gasUsed", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "miniBlockHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "nonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "receiver", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "receiverUsername", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: account_assets_1.AccountAssets, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "receiverAssets", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Transaction.prototype, "receiverShard", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "round", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "epoch", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "senderUsername", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: account_assets_1.AccountAssets, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "senderAssets", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Transaction.prototype, "senderShard", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "signature", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "value", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "fee", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Transaction.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Transaction.prototype, "timestampMs", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "data", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "function", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: transaction_action_1.TransactionAction, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "action", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: scam_info_dto_1.ScamInfo, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "scamInfo", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: transaction_type_1.TransactionType, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "originalTxHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "pendingResults", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "guardianAddress", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "guardianSignature", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "isRelayed", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "relayer", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "relayerSignature", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "isScCall", void 0);
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map