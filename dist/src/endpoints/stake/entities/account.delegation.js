"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDelegation = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
const account_undelegation_1 = require("./account.undelegation");
class AccountDelegation {
    constructor(init) {
        this.address = "";
        this.contract = "";
        this.userUnBondable = "";
        this.userActiveStake = "";
        this.claimableRewards = "";
        this.userUndelegatedList = [];
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Delegation account details', type: String }),
    tslib_1.__metadata("design:type", String)
], AccountDelegation.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Account delegation contract', type: String }),
    tslib_1.__metadata("design:type", String)
], AccountDelegation.prototype, "contract", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions({ required: false })),
    tslib_1.__metadata("design:type", String)
], AccountDelegation.prototype, "userUnBondable", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions({ required: false })),
    tslib_1.__metadata("design:type", String)
], AccountDelegation.prototype, "userActiveStake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions({ required: false })),
    tslib_1.__metadata("design:type", String)
], AccountDelegation.prototype, "claimableRewards", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User undelegated list details', type: account_undelegation_1.AccountUndelegation, isArray: true, required: false }),
    tslib_1.__metadata("design:type", Array)
], AccountDelegation.prototype, "userUndelegatedList", void 0);
exports.AccountDelegation = AccountDelegation;
//# sourceMappingURL=account.delegation.js.map