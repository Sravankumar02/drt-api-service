"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaPair = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const moa_pair_state_1 = require("./moa.pair.state");
const moa_pair_type_1 = require("./moa.pair.type");
class MoaPair {
    constructor(init) {
        this.address = '';
        this.id = '';
        this.symbol = '';
        this.name = '';
        this.price = 0;
        this.basePrevious24hPrice = 0;
        this.quotePrevious24hPrice = 0;
        this.baseId = '';
        this.baseSymbol = '';
        this.baseName = '';
        this.basePrice = 0;
        this.quoteId = '';
        this.quoteSymbol = '';
        this.quoteName = '';
        this.quotePrice = 0;
        this.totalValue = 0;
        this.state = moa_pair_state_1.MoaPairState.inactive;
        this.type = moa_pair_type_1.MoaPairType.experimental;
        this.tradesCount = undefined;
        this.tradesCount24h = undefined;
        this.deployedAt = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MoaPair.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MoaPair.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MoaPair.prototype, "symbol", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MoaPair.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], MoaPair.prototype, "price", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], MoaPair.prototype, "basePrevious24hPrice", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], MoaPair.prototype, "quotePrevious24hPrice", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'MOA-455c57' }),
    tslib_1.__metadata("design:type", String)
], MoaPair.prototype, "baseId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'MOA' }),
    tslib_1.__metadata("design:type", String)
], MoaPair.prototype, "baseSymbol", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'MOA' }),
    tslib_1.__metadata("design:type", String)
], MoaPair.prototype, "baseName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 0.00020596180499578328 }),
    tslib_1.__metadata("design:type", Number)
], MoaPair.prototype, "basePrice", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'WREWA-bd4d79' }),
    tslib_1.__metadata("design:type", String)
], MoaPair.prototype, "quoteId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'WREWA' }),
    tslib_1.__metadata("design:type", String)
], MoaPair.prototype, "quoteSymbol", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'WrappedREWA' }),
    tslib_1.__metadata("design:type", String)
], MoaPair.prototype, "quoteName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 145.26032 }),
    tslib_1.__metadata("design:type", Number)
], MoaPair.prototype, "quotePrice", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: '347667206.84174806' }),
    tslib_1.__metadata("design:type", Number)
], MoaPair.prototype, "totalValue", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: '2109423.4531209776' }),
    tslib_1.__metadata("design:type", Object)
], MoaPair.prototype, "volume24h", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: moa_pair_state_1.MoaPairState }),
    tslib_1.__metadata("design:type", String)
], MoaPair.prototype, "state", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: moa_pair_type_1.MoaPairType }),
    tslib_1.__metadata("design:type", String)
], MoaPair.prototype, "type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'jungledex' }),
    tslib_1.__metadata("design:type", Object)
], MoaPair.prototype, "exchange", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], MoaPair.prototype, "tradesCount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], MoaPair.prototype, "tradesCount24h", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], MoaPair.prototype, "deployedAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], MoaPair.prototype, "hasFarms", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], MoaPair.prototype, "hasDualFarms", void 0);
exports.MoaPair = MoaPair;
//# sourceMappingURL=moa.pair.js.map