"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalStake = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
class GlobalStake {
    constructor(init) {
        this.totalValidators = 0;
        this.activeValidators = 0;
        this.totalObservers = 0;
        this.queueSize = 0;
        this.totalStaked = '';
        this.minimumAuctionQualifiedTopUp = undefined;
        this.minimumAuctionQualifiedStake = undefined;
        this.auctionValidators = undefined;
        this.nakamotoCoefficient = undefined;
        this.dangerZoneValidators = undefined;
        this.eligibleValidators = undefined;
        this.waitingValidators = undefined;
        this.qualifiedAuctionValidators = undefined;
        this.allStakedNodes = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, default: 3200 }),
    tslib_1.__metadata("design:type", Number)
], GlobalStake.prototype, "totalValidators", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, default: 3199 }),
    tslib_1.__metadata("design:type", Number)
], GlobalStake.prototype, "activeValidators", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, default: 3199 }),
    tslib_1.__metadata("design:type", Number)
], GlobalStake.prototype, "totalObservers", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, default: 2 }),
    tslib_1.__metadata("design:type", Number)
], GlobalStake.prototype, "queueSize", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], GlobalStake.prototype, "totalStaked", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], GlobalStake.prototype, "minimumAuctionQualifiedTopUp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], GlobalStake.prototype, "minimumAuctionQualifiedStake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], GlobalStake.prototype, "auctionValidators", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], GlobalStake.prototype, "nakamotoCoefficient", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], GlobalStake.prototype, "dangerZoneValidators", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], GlobalStake.prototype, "eligibleValidators", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], GlobalStake.prototype, "waitingValidators", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], GlobalStake.prototype, "qualifiedAuctionValidators", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], GlobalStake.prototype, "allStakedNodes", void 0);
exports.GlobalStake = GlobalStake;
//# sourceMappingURL=global.stake.js.map