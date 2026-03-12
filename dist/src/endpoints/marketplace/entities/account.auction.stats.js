"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAuctionStats = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
let AccountAuctionStats = class AccountAuctionStats {
    constructor(init) {
        this.auctions = 0;
        this.claimable = 0;
        this.collected = 0;
        this.collections = 0;
        this.creations = 0;
        this.likes = 0;
        this.orders = 0;
        Object.assign(this, init);
    }
};
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], AccountAuctionStats.prototype, "auctions", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], AccountAuctionStats.prototype, "claimable", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], AccountAuctionStats.prototype, "collected", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], AccountAuctionStats.prototype, "collections", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], AccountAuctionStats.prototype, "creations", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], AccountAuctionStats.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], AccountAuctionStats.prototype, "orders", void 0);
AccountAuctionStats = tslib_1.__decorate([
    (0, graphql_1.ObjectType)("AccountAuctionStats", { description: "Account auction statistics." }),
    tslib_1.__metadata("design:paramtypes", [Object])
], AccountAuctionStats);
exports.AccountAuctionStats = AccountAuctionStats;
//# sourceMappingURL=account.auction.stats.js.map