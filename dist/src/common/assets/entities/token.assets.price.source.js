"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAssetsPriceSource = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const token_assets_price_source_type_1 = require("./token.assets.price.source.type");
class TokenAssetsPriceSource {
    constructor() {
        this.type = undefined;
        this.url = undefined;
        this.path = undefined;
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: token_assets_price_source_type_1.TokenAssetsPriceSourceType, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TokenAssetsPriceSource.prototype, "type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TokenAssetsPriceSource.prototype, "url", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TokenAssetsPriceSource.prototype, "path", void 0);
exports.TokenAssetsPriceSource = TokenAssetsPriceSource;
//# sourceMappingURL=token.assets.price.source.js.map