"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DcdtSupply = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
class DcdtSupply {
    constructor(init) {
        this.totalSupply = '0';
        this.circulatingSupply = '0';
        this.minted = '0';
        this.burned = '0';
        this.initialMinted = '0';
        this.lockedAccounts = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], DcdtSupply.prototype, "totalSupply", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], DcdtSupply.prototype, "circulatingSupply", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], DcdtSupply.prototype, "minted", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], DcdtSupply.prototype, "burned", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], DcdtSupply.prototype, "initialMinted", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Object)
], DcdtSupply.prototype, "lockedAccounts", void 0);
exports.DcdtSupply = DcdtSupply;
//# sourceMappingURL=dcdt.supply.js.map