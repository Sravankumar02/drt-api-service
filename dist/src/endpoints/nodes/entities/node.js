"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
const node_status_1 = require("./node.status");
const node_type_1 = require("./node.type");
const identity_1 = require("../../identities/entities/identity");
class Node {
    constructor(init) {
        this.bls = '';
        this.name = '';
        this.version = '';
        this.rating = 0;
        this.tempRating = 0;
        this.ratingModifier = 0;
        this.shard = undefined;
        this.type = undefined;
        this.status = undefined;
        this.online = false;
        this.nonce = 0;
        this.instances = 0;
        this.owner = '';
        this.identity = undefined;
        this.provider = '';
        this.issues = [];
        this.stake = '';
        this.topUp = '';
        this.locked = '';
        this.leaderFailure = 0;
        this.leaderSuccess = 0;
        this.validatorFailure = 0;
        this.validatorIgnoredSignatures = 0;
        this.validatorSuccess = 0;
        this.position = 0;
        this.auctioned = undefined;
        this.auctionPosition = undefined;
        this.auctionTopUp = undefined;
        this.auctionQualified = undefined;
        this.fullHistory = undefined;
        this.syncProgress = undefined;
        this.remainingUnBondPeriod = undefined;
        this.isInDangerZone = undefined;
        this.epochsLeft = undefined;
        this.qualifiedStake = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Node.prototype, "bls", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Node.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, default: 0 }),
    tslib_1.__metadata("design:type", String)
], Node.prototype, "version", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Node.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Node.prototype, "tempRating", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Node.prototype, "ratingModifier", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Node.prototype, "shard", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: node_type_1.NodeType, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Node.prototype, "type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: node_status_1.NodeStatus, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Node.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Node.prototype, "online", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Node.prototype, "nonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Node.prototype, "instances", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Node.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Node.prototype, "identity", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Node.prototype, "provider", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    tslib_1.__metadata("design:type", Array)
], Node.prototype, "issues", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], Node.prototype, "stake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], Node.prototype, "topUp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], Node.prototype, "locked", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Node.prototype, "leaderFailure", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, default: 15 }),
    tslib_1.__metadata("design:type", Number)
], Node.prototype, "leaderSuccess", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Node.prototype, "validatorFailure", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Node.prototype, "validatorIgnoredSignatures", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, default: 10000 }),
    tslib_1.__metadata("design:type", Number)
], Node.prototype, "validatorSuccess", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Node.prototype, "position", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Node.prototype, "auctioned", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Node.prototype, "auctionPosition", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Node.prototype, "auctionTopUp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Node.prototype, "auctionQualified", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Node.prototype, "fullHistory", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Node.prototype, "syncProgress", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 10 }),
    tslib_1.__metadata("design:type", Object)
], Node.prototype, "remainingUnBondPeriod", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, example: false }),
    tslib_1.__metadata("design:type", Object)
], Node.prototype, "isInDangerZone", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 15 }),
    tslib_1.__metadata("design:type", Object)
], Node.prototype, "epochsLeft", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: identity_1.Identity, nullable: true, required: false }),
    tslib_1.__metadata("design:type", identity_1.Identity)
], Node.prototype, "identityInfo", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, default: 0 }),
    tslib_1.__metadata("design:type", String)
], Node.prototype, "qualifiedStake", void 0);
exports.Node = Node;
//# sourceMappingURL=node.js.map