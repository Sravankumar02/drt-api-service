"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaEconomics = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class MoaEconomics {
    constructor(init) {
        this.totalSupply = 0;
        this.circulatingSupply = 0;
        this.price = 0;
        this.marketCap = 0;
        this.volume24h = 0;
        this.marketPairs = 0;
        Object.assign(this, init);
    }
    static fromQueryResponse(response, settings) {
        const totalSupply = 8045920000000;
        const price = Number(response.moaPriceUSD);
        const circulatingSupply = Number(response.moaSupply);
        const marketCap = Math.round(circulatingSupply * price);
        const volume24h = Math.round(Number(response.factory.totalVolumeUSD24h));
        const marketPairs = settings.pairContracts.length;
        return new MoaEconomics({
            totalSupply,
            price,
            circulatingSupply,
            marketCap,
            volume24h,
            marketPairs,
        });
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 8045920000000 }),
    tslib_1.__metadata("design:type", Number)
], MoaEconomics.prototype, "totalSupply", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 4913924072690 }),
    tslib_1.__metadata("design:type", Number)
], MoaEconomics.prototype, "circulatingSupply", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 0.00020552146843751037 }),
    tslib_1.__metadata("design:type", Number)
], MoaEconomics.prototype, "price", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1009916891 }),
    tslib_1.__metadata("design:type", Number)
], MoaEconomics.prototype, "marketCap", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 13680479 }),
    tslib_1.__metadata("design:type", Number)
], MoaEconomics.prototype, "volume24h", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 15 }),
    tslib_1.__metadata("design:type", Number)
], MoaEconomics.prototype, "marketPairs", void 0);
exports.MoaEconomics = MoaEconomics;
//# sourceMappingURL=moa.economics.js.map