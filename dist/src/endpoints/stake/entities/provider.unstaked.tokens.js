"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderUnstakedTokens = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
class ProviderUnstakedTokens {
    constructor(init) {
        this.amount = '';
        this.expires = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], ProviderUnstakedTokens.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], ProviderUnstakedTokens.prototype, "expires", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], ProviderUnstakedTokens.prototype, "epochs", void 0);
exports.ProviderUnstakedTokens = ProviderUnstakedTokens;
//# sourceMappingURL=provider.unstaked.tokens.js.map