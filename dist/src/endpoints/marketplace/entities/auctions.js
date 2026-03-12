"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auctions = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const auction_status_1 = require("./auction.status");
const bids_1 = require("./bids");
class Auctions {
    constructor(init) {
        this.owner = '';
        this.auctionId = 0;
        this.identifier = '';
        this.collection = '';
        this.status = auction_status_1.AuctionStatus.unknown;
        this.auctionType = '';
        this.createdAt = 0;
        this.endsAt = 0;
        this.marketplaceAuctionId = 0;
        this.marketplace = '';
        this.minBid = new bids_1.Bids();
        this.maxBid = new bids_1.Bids();
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Auctions.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Auctions.prototype, "auctionId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Auctions.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Auctions.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: auction_status_1.AuctionStatus }),
    tslib_1.__metadata("design:type", String)
], Auctions.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Auctions.prototype, "auctionType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Auctions.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Auctions.prototype, "endsAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Auctions.prototype, "marketplaceAuctionId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Auctions.prototype, "marketplace", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: bids_1.Bids }),
    tslib_1.__metadata("design:type", bids_1.Bids)
], Auctions.prototype, "minBid", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: bids_1.Bids }),
    tslib_1.__metadata("design:type", bids_1.Bids)
], Auctions.prototype, "maxBid", void 0);
exports.Auctions = Auctions;
//# sourceMappingURL=auctions.js.map