"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftMarketplaceController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const query_pagination_1 = require("../../common/entities/query.pagination");
const account_auction_stats_1 = require("./entities/account.auction.stats");
const account_auctions_1 = require("./entities/account.auctions");
const auction_status_1 = require("./entities/auction.status");
const auctions_1 = require("./entities/auctions");
const collection_auction_stats_1 = require("./entities/collection.auction.stats");
const nft_marketplace_service_1 = require("./nft.marketplace.service");
let NftMarketplaceController = class NftMarketplaceController {
    constructor(nftMarketplaceService) {
        this.nftMarketplaceService = nftMarketplaceService;
    }
    async getAuctions(size) {
        return await this.nftMarketplaceService.getAuctions(new query_pagination_1.QueryPagination({ size }));
    }
    async getAuctionsCount(status) {
        return await this.nftMarketplaceService.getAuctionsCount(status);
    }
    async getAuctionsCountAlternative(status) {
        return await this.nftMarketplaceService.getAuctionsCount(status);
    }
    async getAuctionId(id) {
        return await this.nftMarketplaceService.getAuctionId(id);
    }
    async getAccountStats(address) {
        const account = await this.nftMarketplaceService.getAccountStats(address);
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        return account;
    }
    async getAccountAuctions(address, from, size, status) {
        const account = await this.nftMarketplaceService.getAccountAuctions(new query_pagination_1.QueryPagination({ from, size }), address, status);
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        return account;
    }
    async getAccountAuctionsCount(address) {
        return await this.nftMarketplaceService.getAccountAuctionsCount(address);
    }
    async getCollectionStats(collection) {
        return await this.nftMarketplaceService.getCollectionStats({ identifier: collection });
    }
    async getCollectionAuctions(collection, size) {
        return await this.nftMarketplaceService.getCollectionAuctions(new query_pagination_1.QueryPagination({ size }), collection);
    }
    async getCollectionAuctionsCount(collection) {
        return await this.nftMarketplaceService.getCollectionAuctionsCount(collection);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/auctions"),
    (0, swagger_1.ApiOperation)({ summary: 'Explore auctions', description: 'Returns auctions available in marketplaces ' }),
    (0, swagger_1.ApiOkResponse)({ type: [auctions_1.Auctions] }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    tslib_1.__param(0, (0, common_1.Query)("size", new common_1.DefaultValuePipe(25), common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], NftMarketplaceController.prototype, "getAuctions", null);
tslib_1.__decorate([
    (0, common_1.Get)("/auctions/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Auctions count', description: 'Returns all auctions count available on marketplaces ' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Returns auctions count with specified status', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(auction_status_1.AuctionStatus))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NftMarketplaceController.prototype, "getAuctionsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/auctions/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, swagger_1.ApiOperation)({ summary: 'Auctions count', description: 'Returns all auctions count available on marketplaces ' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Returns auctions count with specified status', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(auction_status_1.AuctionStatus))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NftMarketplaceController.prototype, "getAuctionsCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)("/auctions/:id"),
    (0, swagger_1.ApiOperation)({ summary: 'Auction details', description: 'Returns auction details for a specific auction identifier ' }),
    (0, swagger_1.ApiOkResponse)({ type: auctions_1.Auctions }),
    (0, swagger_1.ApiQuery)({ name: 'auctionId', description: 'Auction identifier', required: true }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], NftMarketplaceController.prototype, "getAuctionId", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/auction/stats"),
    (0, swagger_1.ApiOperation)({ summary: 'Account stats', description: 'Returns account status details from nft marketplace for a given address' }),
    (0, swagger_1.ApiOkResponse)({ type: account_auction_stats_1.AccountAuctionStats }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NftMarketplaceController.prototype, "getAccountStats", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/auctions"),
    (0, swagger_1.ApiOperation)({ summary: 'Account auctions', description: 'Returns account auctions for a given address' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Returns auctions with specified status', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: account_auctions_1.Auction }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(auction_status_1.AuctionStatus))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NftMarketplaceController.prototype, "getAccountAuctions", null);
tslib_1.__decorate([
    (0, common_1.Get)('/accounts/:address/auctions/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Address auctions count', description: 'Returns total running auctions count for a specific address ' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'address', description: 'Account address', required: true }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NftMarketplaceController.prototype, "getAccountAuctionsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/collections/:collection/auction/stats"),
    (0, swagger_1.ApiOperation)({ summary: 'Collection stats', description: 'Returns collection status details from nft marketplace for a given collection identifier' }),
    (0, swagger_1.ApiOkResponse)({ type: collection_auction_stats_1.CollectionAuctionStats }),
    tslib_1.__param(0, (0, common_1.Param)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NftMarketplaceController.prototype, "getCollectionStats", null);
tslib_1.__decorate([
    (0, common_1.Get)('/collections/:collection/auctions'),
    (0, swagger_1.ApiOperation)({ summary: 'Collection auctions', description: 'Returns all auctions for a specific collection ' }),
    (0, swagger_1.ApiOkResponse)({ type: [auctions_1.Auctions] }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'collection', description: 'Collection identifier', required: true }),
    tslib_1.__param(0, (0, common_1.Param)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__param(1, (0, common_1.Query)("size", new common_1.DefaultValuePipe(25), common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], NftMarketplaceController.prototype, "getCollectionAuctions", null);
tslib_1.__decorate([
    (0, common_1.Get)('/collections/:collection/auctions/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Collection auctions count', description: 'Returns total running auctions count for a specific collection ' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'collection', description: 'Collection identifier', required: true }),
    tslib_1.__param(0, (0, common_1.Param)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NftMarketplaceController.prototype, "getCollectionAuctionsCount", null);
NftMarketplaceController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('marketplace'),
    tslib_1.__metadata("design:paramtypes", [nft_marketplace_service_1.NftMarketplaceService])
], NftMarketplaceController);
exports.NftMarketplaceController = NftMarketplaceController;
//# sourceMappingURL=nft.marketplace.controller.js.map