"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftCollection = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const token_assets_1 = require("../../../common/assets/entities/token.assets");
const nft_type_1 = require("../../nfts/entities/nft.type");
const scam_info_dto_1 = require("../../../common/entities/scam-info.dto");
const collection_trait_1 = require("./collection.trait");
const collection_auction_stats_1 = require("../../marketplace/entities/collection.auction.stats");
const nft_sub_type_1 = require("../../nfts/entities/nft.sub.type");
class NftCollection {
    constructor(init) {
        this.collection = '';
        this.type = nft_type_1.NftType.NonFungibleDCDT;
        this.subType = undefined;
        this.name = '';
        this.ticker = '';
        this.owner = undefined;
        this.timestamp = 0;
        this.canFreeze = false;
        this.canWipe = false;
        this.canPause = false;
        this.canTransferNftCreateRole = false;
        this.canChangeOwner = false;
        this.canUpgrade = false;
        this.canAddSpecialRoles = false;
        this.decimals = undefined;
        this.assets = undefined;
        this.scamInfo = undefined;
        this.traits = [];
        this.auctionStats = undefined;
        this.isVerified = undefined;
        this.holderCount = undefined;
        this.nftCount = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], NftCollection.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: nft_type_1.NftType }),
    tslib_1.__metadata("design:type", String)
], NftCollection.prototype, "type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: nft_sub_type_1.NftSubType, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], NftCollection.prototype, "subType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], NftCollection.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], NftCollection.prototype, "ticker", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], NftCollection.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], NftCollection.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Number)
], NftCollection.prototype, "timestampMs", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], NftCollection.prototype, "canFreeze", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], NftCollection.prototype, "canWipe", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], NftCollection.prototype, "canPause", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], NftCollection.prototype, "canTransferNftCreateRole", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], NftCollection.prototype, "canChangeOwner", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], NftCollection.prototype, "canUpgrade", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], NftCollection.prototype, "canAddSpecialRoles", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], NftCollection.prototype, "decimals", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: token_assets_1.TokenAssets, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], NftCollection.prototype, "assets", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: scam_info_dto_1.ScamInfo, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], NftCollection.prototype, "scamInfo", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: collection_trait_1.CollectionTrait, isArray: true, required: false }),
    tslib_1.__metadata("design:type", Array)
], NftCollection.prototype, "traits", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: collection_auction_stats_1.CollectionAuctionStats, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], NftCollection.prototype, "auctionStats", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], NftCollection.prototype, "isVerified", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], NftCollection.prototype, "holderCount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], NftCollection.prototype, "nftCount", void 0);
exports.NftCollection = NftCollection;
//# sourceMappingURL=nft.collection.js.map