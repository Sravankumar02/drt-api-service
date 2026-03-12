"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
const entities_1 = require("../../../common/indexer/entities");
const token_assets_1 = require("../../../common/assets/entities/token.assets");
const moa_pair_type_1 = require("../../moa/entities/moa.pair.type");
const token_owner_history_1 = require("./token.owner.history");
const nft_sub_type_1 = require("../../nfts/entities/nft.sub.type");
class Token {
    constructor(init) {
        this.type = entities_1.TokenType.FungibleDCDT;
        this.subType = nft_sub_type_1.NftSubType.None;
        this.identifier = '';
        this.collection = undefined;
        this.nonce = undefined;
        this.name = '';
        this.ticker = '';
        this.owner = '';
        this.minted = '';
        this.burnt = '';
        this.initialMinted = '';
        this.decimals = 0;
        this.isPaused = false;
        this.assets = undefined;
        this.transactions = undefined;
        this.transactionsLastUpdatedAt = undefined;
        this.transfers = undefined;
        this.transfersLastUpdatedAt = undefined;
        this.accounts = undefined;
        this.accountsLastUpdatedAt = undefined;
        this.canUpgrade = false;
        this.canMint = undefined;
        this.canBurn = undefined;
        this.canChangeOwner = undefined;
        this.canAddSpecialRoles = undefined;
        this.canPause = false;
        this.canFreeze = undefined;
        this.canWipe = false;
        this.canTransferNftCreateRole = undefined;
        this.price = undefined;
        this.marketCap = undefined;
        this.supply = undefined;
        this.circulatingSupply = undefined;
        this.timestamp = undefined;
        this.moaPairType = moa_pair_type_1.MoaPairType.experimental;
        this.totalLiquidity = undefined;
        this.totalVolume24h = undefined;
        this.isLowLiquidity = undefined;
        this.lowLiquidityThresholdPercent = undefined;
        this.tradesCount = undefined;
        this.ownersHistory = [];
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: entities_1.TokenType }),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: nft_sub_type_1.NftSubType }),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "subType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "nonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "ticker", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "minted", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "burnt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "initialMinted", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Token.prototype, "decimals", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Token.prototype, "isPaused", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: token_assets_1.TokenAssets, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "assets", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "transactions", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "transactionsLastUpdatedAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "transfers", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "transfersLastUpdatedAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "accounts", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "accountsLastUpdatedAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Token.prototype, "canUpgrade", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "canMint", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "canBurn", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "canChangeOwner", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "canAddSpecialRoles", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Token.prototype, "canPause", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "canFreeze", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Token.prototype, "canWipe", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "canTransferNftCreateRole", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "price", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "marketCap", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions({ description: 'Supply amount' })),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "supply", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions({ description: 'Circulating supply amount' })),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "circulatingSupply", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Creation timestamp' }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: moa_pair_type_1.MoaPairType }),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "moaPairType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "totalLiquidity", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "totalVolume24h", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "isLowLiquidity", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "lowLiquidityThresholdPercent", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Token.prototype, "tradesCount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: token_owner_history_1.TokenOwnersHistory, nullable: true }),
    tslib_1.__metadata("design:type", Array)
], Token.prototype, "ownersHistory", void 0);
exports.Token = Token;
//# sourceMappingURL=token.js.map