"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderStake = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
const provider_unstaked_tokens_1 = require("./provider.unstaked.tokens");
class ProviderStake {
    constructor(init) {
        this.totalStaked = '';
        this.unstakedTokens = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], ProviderStake.prototype, "totalStaked", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: provider_unstaked_tokens_1.ProviderUnstakedTokens, isArray: true, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], ProviderStake.prototype, "unstakedTokens", void 0);
exports.ProviderStake = ProviderStake;
//# sourceMappingURL=provider.stake.js.map