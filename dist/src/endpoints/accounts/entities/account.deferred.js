"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDeferred = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
class AccountDeferred {
    constructor(init) {
        this.deferredPayment = '';
        this.secondsLeft = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions({ description: 'Deferred payment amount' })),
    tslib_1.__metadata("design:type", String)
], AccountDeferred.prototype, "deferredPayment", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Seconds left until unbonding time' }),
    tslib_1.__metadata("design:type", Number)
], AccountDeferred.prototype, "secondsLeft", void 0);
exports.AccountDeferred = AccountDeferred;
//# sourceMappingURL=account.deferred.js.map