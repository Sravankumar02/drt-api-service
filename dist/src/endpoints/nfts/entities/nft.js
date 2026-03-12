"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nft = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const token_assets_1 = require("../../../common/assets/entities/token.assets");
const nft_media_1 = require("./nft.media");
const nft_metadata_1 = require("./nft.metadata");
const nft_type_1 = require("./nft.type");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const nft_rarities_1 = require("./nft.rarities");
const unlock_milestone_model_1 = require("../../../common/locked-asset/entities/unlock.milestone.model");
const scam_info_dto_1 = require("../../../common/entities/scam-info.dto");
const nft_sub_type_1 = require("./nft.sub.type");
class Nft {
    constructor(init) {
        this.identifier = '';
        this.collection = '';
        this.hash = '';
        this.timestamp = undefined;
        this.attributes = '';
        this.nonce = 0;
        this.type = nft_type_1.NftType.NonFungibleDCDT;
        this.subType = nft_sub_type_1.NftSubType.NonFungibleDCDT;
        this.name = '';
        this.creator = '';
        this.royalties = undefined;
        this.uris = [];
        this.url = '';
        this.media = undefined;
        this.isWhitelistedStorage = false;
        this.thumbnailUrl = '';
        this.tags = [];
        this.metadata = undefined;
        this.owner = undefined;
        this.balance = undefined;
        this.supply = undefined;
        this.decimals = undefined;
        this.ticker = '';
        this.scamInfo = undefined;
        this.score = undefined;
        this.rank = undefined;
        this.rarities = undefined;
        this.isNsfw = undefined;
        this.unlockSchedule = undefined;
        this.unlockEpoch = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Nft.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Nft.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Nft.prototype, "hash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Nft.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Nft.prototype, "attributes", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Nft.prototype, "nonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: nft_type_1.NftType }),
    tslib_1.__metadata("design:type", String)
], Nft.prototype, "type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: nft_sub_type_1.NftSubType }),
    tslib_1.__metadata("design:type", String)
], Nft.prototype, "subType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Nft.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Nft.prototype, "creator", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Nft.prototype, "royalties", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, isArray: true }),
    tslib_1.__metadata("design:type", Array)
], Nft.prototype, "uris", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Nft.prototype, "url", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: nft_media_1.NftMedia, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Nft.prototype, "media", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false, required: false }),
    tslib_1.__metadata("design:type", Boolean)
], Nft.prototype, "isWhitelistedStorage", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    tslib_1.__metadata("design:type", String)
], Nft.prototype, "thumbnailUrl", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, isArray: true, required: false }),
    tslib_1.__metadata("design:type", Array)
], Nft.prototype, "tags", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: nft_metadata_1.NftMetadata, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Nft.prototype, "metadata", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    (0, sdk_nestjs_common_1.ComplexityEstimation)({ value: 100, alternatives: ['withOwner'], group: 'extras' }),
    tslib_1.__metadata("design:type", Object)
], Nft.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Nft.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    (0, sdk_nestjs_common_1.ComplexityEstimation)({ value: 100, alternatives: ['withSupply'], group: 'extras' }),
    tslib_1.__metadata("design:type", Object)
], Nft.prototype, "supply", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Nft.prototype, "decimals", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: token_assets_1.TokenAssets, required: false }),
    tslib_1.__metadata("design:type", token_assets_1.TokenAssets)
], Nft.prototype, "assets", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Nft.prototype, "ticker", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: scam_info_dto_1.ScamInfo, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Nft.prototype, "scamInfo", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Nft.prototype, "score", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Nft.prototype, "rank", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: nft_rarities_1.NftRarities, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Nft.prototype, "rarities", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Nft.prototype, "isNsfw", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [unlock_milestone_model_1.UnlockMileStoneModel], nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Nft.prototype, "unlockSchedule", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Nft.prototype, "unlockEpoch", void 0);
exports.Nft = Nft;
//# sourceMappingURL=nft.js.map