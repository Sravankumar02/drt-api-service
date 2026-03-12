"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountUndelegation = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
class AccountUndelegation {
    constructor(init) {
        this.amount = '';
        this.seconds = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], AccountUndelegation.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], AccountUndelegation.prototype, "seconds", void 0);
exports.AccountUndelegation = AccountUndelegation;
//# sourceMappingURL=account.undelegation.js.map