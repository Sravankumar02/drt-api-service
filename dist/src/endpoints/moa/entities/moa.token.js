"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaToken = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class MoaToken {
    constructor(init) {
        this.id = '';
        this.symbol = '';
        this.name = '';
        this.price = 0;
        this.previous24hPrice = 0;
        this.previous24hVolume = 0;
        this.tradesCount = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'MOA-455c57' }),
    tslib_1.__metadata("design:type", String)
], MoaToken.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'MOA' }),
    tslib_1.__metadata("design:type", String)
], MoaToken.prototype, "symbol", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'MOA' }),
    tslib_1.__metadata("design:type", String)
], MoaToken.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 0.000206738758250580 }),
    tslib_1.__metadata("design:type", Number)
], MoaToken.prototype, "price", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 0.000206738758250580 }),
    tslib_1.__metadata("design:type", Number)
], MoaToken.prototype, "previous24hPrice", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 0.000206738758250580 }),
    tslib_1.__metadata("design:type", Object)
], MoaToken.prototype, "previous24hVolume", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], MoaToken.prototype, "tradesCount", void 0);
exports.MoaToken = MoaToken;
//# sourceMappingURL=moa.token.js.map