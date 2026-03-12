"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAssets = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const token_asset_status_1 = require("../../../endpoints/tokens/entities/token.asset.status");
const nft_rank_algorithm_1 = require("./nft.rank.algorithm");
const token_assets_price_source_1 = require("./token.assets.price.source");
class TokenAssets {
    constructor(init) {
        this.website = '';
        this.description = '';
        this.status = token_asset_status_1.TokenAssetStatus.inactive;
        this.pngUrl = '';
        this.name = '';
        this.svgUrl = '';
        this.lockedAccounts = undefined;
        this.extraTokens = undefined;
        this.preferredRankAlgorithm = undefined;
        this.priceSource = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TokenAssets.prototype, "website", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TokenAssets.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: token_asset_status_1.TokenAssetStatus, default: 'inactive' }),
    tslib_1.__metadata("design:type", String)
], TokenAssets.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TokenAssets.prototype, "pngUrl", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TokenAssets.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TokenAssets.prototype, "svgUrl", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", Object)
], TokenAssets.prototype, "ledgerSignature", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", Object)
], TokenAssets.prototype, "lockedAccounts", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, isArray: true }),
    tslib_1.__metadata("design:type", Object)
], TokenAssets.prototype, "extraTokens", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: nft_rank_algorithm_1.NftRankAlgorithm, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TokenAssets.prototype, "preferredRankAlgorithm", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: token_assets_price_source_1.TokenAssetsPriceSource, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TokenAssets.prototype, "priceSource", void 0);
exports.TokenAssets = TokenAssets;
//# sourceMappingURL=token.assets.js.map