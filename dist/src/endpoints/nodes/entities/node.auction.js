"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeAuction = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class NodeAuction {
    constructor(init) {
        this.identity = '';
        this.name = '';
        this.description = '';
        this.avatar = '';
        this.provider = '';
        this.bls = '';
        this.stake = '';
        this.owner = '';
        this.distribution = {};
        this.auctionTopUp = '';
        this.qualifiedStake = '';
        this.auctionValidators = 0;
        this.qualifiedAuctionValidators = 0;
        this.droppedValidators = 0;
        this.dangerZoneValidators = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], NodeAuction.prototype, "identity", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], NodeAuction.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, default: 0, required: false }),
    tslib_1.__metadata("design:type", String)
], NodeAuction.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    tslib_1.__metadata("design:type", String)
], NodeAuction.prototype, "avatar", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    tslib_1.__metadata("design:type", String)
], NodeAuction.prototype, "provider", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], NodeAuction.prototype, "bls", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], NodeAuction.prototype, "stake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], NodeAuction.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", Object)
], NodeAuction.prototype, "distribution", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], NodeAuction.prototype, "auctionTopUp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], NodeAuction.prototype, "qualifiedStake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], NodeAuction.prototype, "auctionValidators", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], NodeAuction.prototype, "qualifiedAuctionValidators", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], NodeAuction.prototype, "droppedValidators", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], NodeAuction.prototype, "dangerZoneValidators", void 0);
exports.NodeAuction = NodeAuction;
//# sourceMappingURL=node.auction.js.map