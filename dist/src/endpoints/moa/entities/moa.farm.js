"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaFarm = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const moa_farm_type_1 = require("./moa.farm.type");
class MoaFarm {
    constructor(init) {
        this.type = moa_farm_type_1.MoaFarmType.standard;
        this.address = '';
        this.id = '';
        this.symbol = '';
        this.name = '';
        this.price = 0;
        this.farmingId = '';
        this.farmingSymbol = '';
        this.farmingName = '';
        this.farmingPrice = 0;
        this.farmedId = '';
        this.farmedSymbol = '';
        this.farmedName = '';
        this.farmedPrice = 0;
        Object.assign(this, init);
    }
    static fromFarmQueryResponse(response) {
        let price = Number(response.farmTokenPriceUSD);
        const symbol = response.farmToken.collection.split('-')[0];
        if (['REWAUSDCF', 'REWAUSDCFL'].includes(symbol)) {
            price = price / (10 ** 12) * 2;
        }
        const moaFarm = new MoaFarm();
        moaFarm.type = moa_farm_type_1.MoaFarmType.standard;
        moaFarm.version = response.version;
        moaFarm.address = response.address;
        moaFarm.id = response.farmToken.collection;
        moaFarm.symbol = symbol;
        moaFarm.name = response.farmToken.name;
        moaFarm.price = price;
        moaFarm.farmingId = response.farmingToken.identifier;
        moaFarm.farmingSymbol = response.farmingToken.identifier.split('-')[0];
        moaFarm.farmingName = response.farmingToken.name;
        moaFarm.farmingPrice = Number(response.farmingTokenPriceUSD);
        moaFarm.farmedId = response.farmedToken.identifier;
        moaFarm.farmedSymbol = response.farmedToken.identifier.split('-')[0];
        moaFarm.farmedName = response.farmedToken.name;
        moaFarm.farmedPrice = Number(response.farmedTokenPriceUSD);
        return moaFarm;
    }
    static fromStakingFarmResponse(response, pairs) {
        var _a, _b;
        const price = (_b = (_a = pairs[response.farmingToken.identifier]) === null || _a === void 0 ? void 0 : _a.price) !== null && _b !== void 0 ? _b : 0;
        const moaFarm = new MoaFarm();
        moaFarm.type = moa_farm_type_1.MoaFarmType.metastaking;
        moaFarm.address = response.address;
        moaFarm.id = response.farmToken.collection;
        moaFarm.symbol = response.farmToken.collection.split('-')[0];
        moaFarm.name = response.farmToken.name;
        moaFarm.price = price;
        moaFarm.farmingId = response.farmingToken.identifier;
        moaFarm.farmingSymbol = response.farmingToken.identifier.split('-')[0];
        moaFarm.farmingName = response.farmingToken.name;
        moaFarm.farmingPrice = price;
        moaFarm.farmedId = response.farmingToken.identifier;
        moaFarm.farmedSymbol = response.farmingToken.identifier.split('-')[0];
        moaFarm.farmedName = response.farmingToken.name;
        moaFarm.farmedPrice = price;
        return moaFarm;
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: moa_farm_type_1.MoaFarmType }),
    tslib_1.__metadata("design:type", String)
], MoaFarm.prototype, "type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    tslib_1.__metadata("design:type", String)
], MoaFarm.prototype, "version", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'drt1qqqqqqqqqqqqqpgqzps75vsk97w9nsx2cenv2r2tyxl4fl402jpsmzscxv' }),
    tslib_1.__metadata("design:type", String)
], MoaFarm.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MoaFarm.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MoaFarm.prototype, "symbol", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MoaFarm.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], MoaFarm.prototype, "price", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MoaFarm.prototype, "farmingId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MoaFarm.prototype, "farmingSymbol", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MoaFarm.prototype, "farmingName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], MoaFarm.prototype, "farmingPrice", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MoaFarm.prototype, "farmedId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MoaFarm.prototype, "farmedSymbol", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MoaFarm.prototype, "farmedName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], MoaFarm.prototype, "farmedPrice", void 0);
exports.MoaFarm = MoaFarm;
//# sourceMappingURL=moa.farm.js.map