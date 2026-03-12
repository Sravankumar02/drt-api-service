"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auction = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const auction_status_1 = require("./auction.status");
const bids_1 = require("./bids");
class Auction {
    constructor(init) {
        this.owner = '';
        this.auctionId = 0;
        this.identifier = '';
        this.collection = '';
        this.status = auction_status_1.AuctionStatus.unknown;
        this.auctionType = '';
        this.createdAt = 0;
        this.endsAt = 0;
        this.marketplaceAuctionId = '';
        this.marketplace = '';
        this.minBid = new bids_1.Bids();
        this.maxBid = new bids_1.Bids();
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Auction.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Auction.prototype, "auctionId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Auction.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Auction.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: auction_status_1.AuctionStatus }),
    tslib_1.__metadata("design:type", String)
], Auction.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Auction.prototype, "auctionType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Auction.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Auction.prototype, "endsAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Auction.prototype, "marketplaceAuctionId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Auction.prototype, "marketplace", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: bids_1.Bids }),
    tslib_1.__metadata("design:type", bids_1.Bids)
], Auction.prototype, "minBid", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: bids_1.Bids }),
    tslib_1.__metadata("design:type", bids_1.Bids)
], Auction.prototype, "maxBid", void 0);
exports.Auction = Auction;
//# sourceMappingURL=account.auctions.js.map