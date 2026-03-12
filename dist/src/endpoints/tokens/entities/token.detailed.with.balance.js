"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenDetailedWithBalance = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const token_detailed_1 = require("./token.detailed");
class TokenDetailedWithBalance extends token_detailed_1.TokenDetailed {
    constructor(init) {
        super();
        this.balance = '';
        this.valueUsd = undefined;
        this.attributes = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TokenDetailedWithBalance.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TokenDetailedWithBalance.prototype, "valueUsd", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TokenDetailedWithBalance.prototype, "attributes", void 0);
exports.TokenDetailedWithBalance = TokenDetailedWithBalance;
//# sourceMappingURL=token.detailed.with.balance.js.map