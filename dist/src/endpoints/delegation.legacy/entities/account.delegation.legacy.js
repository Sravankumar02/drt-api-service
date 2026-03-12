"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDelegationLegacy = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class AccountDelegationLegacy {
    constructor(init) {
        this.claimableRewards = '';
        this.userActiveStake = '';
        this.userDeferredPaymentStake = '';
        this.userUnstakedStake = '';
        this.userWaitingStake = '';
        this.userWithdrawOnlyStake = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, default: 0 }),
    tslib_1.__metadata("design:type", String)
], AccountDelegationLegacy.prototype, "claimableRewards", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, default: 0 }),
    tslib_1.__metadata("design:type", String)
], AccountDelegationLegacy.prototype, "userActiveStake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, default: 0 }),
    tslib_1.__metadata("design:type", String)
], AccountDelegationLegacy.prototype, "userDeferredPaymentStake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, default: 0 }),
    tslib_1.__metadata("design:type", String)
], AccountDelegationLegacy.prototype, "userUnstakedStake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, default: 0 }),
    tslib_1.__metadata("design:type", String)
], AccountDelegationLegacy.prototype, "userWaitingStake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, default: 0 }),
    tslib_1.__metadata("design:type", String)
], AccountDelegationLegacy.prototype, "userWithdrawOnlyStake", void 0);
exports.AccountDelegationLegacy = AccountDelegationLegacy;
//# sourceMappingURL=account.delegation.legacy.js.map