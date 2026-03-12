"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSupplyOptions = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
class TokenSupplyOptions {
    constructor(init) {
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions({ description: 'Supply amount' })),
    tslib_1.__metadata("design:type", Boolean)
], TokenSupplyOptions.prototype, "denominated", void 0);
exports.TokenSupplyOptions = TokenSupplyOptions;
//# sourceMappingURL=token.supply.options.js.map