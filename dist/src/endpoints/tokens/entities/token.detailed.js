"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenDetailed = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
const token_1 = require("./token");
const token_roles_1 = require("./token.roles");
class TokenDetailed extends token_1.Token {
    constructor(init) {
        super();
        this.supply = undefined;
        this.circulatingSupply = undefined;
        this.roles = undefined;
        this.minted = '';
        this.burnt = '';
        this.initialMinted = '';
        this.canTransfer = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions({ description: 'Supply amount' })),
    tslib_1.__metadata("design:type", Object)
], TokenDetailed.prototype, "supply", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions({ description: 'Circulating supply amount' })),
    tslib_1.__metadata("design:type", Object)
], TokenDetailed.prototype, "circulatingSupply", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: token_roles_1.TokenRoles, nullable: true, isArray: true }),
    tslib_1.__metadata("design:type", Object)
], TokenDetailed.prototype, "roles", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions({ description: 'Minted amount' })),
    tslib_1.__metadata("design:type", String)
], TokenDetailed.prototype, "minted", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions({ description: 'Burnt amount' })),
    tslib_1.__metadata("design:type", String)
], TokenDetailed.prototype, "burnt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions({ description: 'Initial minted amount' })),
    tslib_1.__metadata("design:type", String)
], TokenDetailed.prototype, "initialMinted", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TokenDetailed.prototype, "canTransfer", void 0);
exports.TokenDetailed = TokenDetailed;
//# sourceMappingURL=token.detailed.js.map