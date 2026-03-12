"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Economics = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class Economics {
    constructor(init) {
        this.totalSupply = 0;
        this.circulatingSupply = 0;
        this.staked = 0;
        this.price = undefined;
        this.marketCap = undefined;
        this.apr = 0;
        this.topUpApr = 0;
        this.baseApr = 0;
        this.tokenMarketCap = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Economics.prototype, "totalSupply", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Economics.prototype, "circulatingSupply", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Economics.prototype, "staked", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Object)
], Economics.prototype, "price", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Object)
], Economics.prototype, "marketCap", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Economics.prototype, "apr", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Economics.prototype, "topUpApr", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Economics.prototype, "baseApr", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Economics.prototype, "tokenMarketCap", void 0);
exports.Economics = Economics;
//# sourceMappingURL=economics.js.map