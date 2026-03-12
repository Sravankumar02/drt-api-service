"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenWithBalance = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
const token_1 = require("./token");
const moa_pair_type_1 = require("../../moa/entities/moa.pair.type");
class TokenWithBalance extends token_1.Token {
    constructor(init) {
        super();
        this.balance = '';
        this.valueUsd = undefined;
        this.attributes = undefined;
        this.moaPairType = moa_pair_type_1.MoaPairType.experimental;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], TokenWithBalance.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], TokenWithBalance.prototype, "valueUsd", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], TokenWithBalance.prototype, "attributes", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: moa_pair_type_1.MoaPairType }),
    tslib_1.__metadata("design:type", String)
], TokenWithBalance.prototype, "moaPairType", void 0);
exports.TokenWithBalance = TokenWithBalance;
//# sourceMappingURL=token.with.balance.js.map