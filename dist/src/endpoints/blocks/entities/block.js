"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const swagger_1 = require("@nestjs/swagger");
const identity_1 = require("../../identities/entities/identity");
const block_proof_1 = require("./block.proof");
class Block {
    constructor(init) {
        this.hash = '';
        this.epoch = 0;
        this.nonce = 0;
        this.prevHash = '';
        this.proposer = '';
        this.proposerIdentity = undefined;
        this.pubKeyBitmap = '';
        this.round = 0;
        this.shard = 0;
        this.size = 0;
        this.sizeTxs = 0;
        this.stateRootHash = '';
        this.timestamp = 0;
        this.txCount = 0;
        this.gasConsumed = 0;
        this.gasRefunded = 0;
        this.gasPenalized = 0;
        this.maxGasLimit = 0;
        this.scheduledRootHash = undefined;
        this.previousHeaderProof = undefined;
        this.reserved = '';
        this.proof = undefined;
        Object.assign(this, init);
    }
    static mergeWithElasticResponse(newBlock, blockRaw) {
        var _a;
        blockRaw.shard = blockRaw.shardId;
        if (blockRaw.gasProvided) {
            blockRaw.gasConsumed = blockRaw.gasProvided;
        }
        if ((_a = blockRaw.scheduledData) === null || _a === void 0 ? void 0 : _a.rootHash) {
            blockRaw.maxGasLimit = blockRaw.maxGasLimit * 2;
        }
        return sdk_nestjs_http_1.ApiUtils.mergeObjects(newBlock, blockRaw);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Block.prototype, "hash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Block.prototype, "epoch", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Block.prototype, "nonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Block.prototype, "prevHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Block.prototype, "proposer", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: identity_1.Identity, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Block.prototype, "proposerIdentity", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Block.prototype, "pubKeyBitmap", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Block.prototype, "round", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Block.prototype, "shard", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Block.prototype, "size", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Block.prototype, "sizeTxs", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Block.prototype, "stateRootHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Block.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Number)
], Block.prototype, "timestampMs", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Block.prototype, "txCount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Block.prototype, "gasConsumed", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Block.prototype, "gasRefunded", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Block.prototype, "gasPenalized", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Block.prototype, "maxGasLimit", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Block.prototype, "scheduledRootHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: block_proof_1.BlockProofDto, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Block.prototype, "previousHeaderProof", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Block.prototype, "reserved", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: block_proof_1.BlockProofDto, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Block.prototype, "proof", void 0);
exports.Block = Block;
//# sourceMappingURL=block.js.map