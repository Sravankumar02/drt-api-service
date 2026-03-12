"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegationLegacy = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
class DelegationLegacy {
    constructor(init) {
        this.totalWithdrawOnlyStake = '';
        this.totalWaitingStake = '';
        this.totalActiveStake = '';
        this.totalUnstakedStake = '';
        this.totalDeferredPaymentStake = '';
        this.numUsers = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], DelegationLegacy.prototype, "totalWithdrawOnlyStake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], DelegationLegacy.prototype, "totalWaitingStake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], DelegationLegacy.prototype, "totalActiveStake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], DelegationLegacy.prototype, "totalUnstakedStake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], DelegationLegacy.prototype, "totalDeferredPaymentStake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], DelegationLegacy.prototype, "numUsers", void 0);
exports.DelegationLegacy = DelegationLegacy;
//# sourceMappingURL=delegation.legacy.js.map