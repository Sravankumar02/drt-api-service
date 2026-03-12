"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionAuctionStats = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class CollectionAuctionStats {
    constructor(init) {
        this.activeAuctions = 0;
        this.endedAuctions = 0;
        this.maxPrice = "";
        this.minPrice = "";
        this.saleAverage = "";
        this.volumeTraded = "";
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], CollectionAuctionStats.prototype, "activeAuctions", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], CollectionAuctionStats.prototype, "endedAuctions", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], CollectionAuctionStats.prototype, "maxPrice", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], CollectionAuctionStats.prototype, "minPrice", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], CollectionAuctionStats.prototype, "saleAverage", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], CollectionAuctionStats.prototype, "volumeTraded", void 0);
exports.CollectionAuctionStats = CollectionAuctionStats;
//# sourceMappingURL=collection.auction.stats.js.map