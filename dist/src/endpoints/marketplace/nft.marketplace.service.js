"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftMarketplaceService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_service_1 = require("../../common/graphql/graphql.service");
const account_auctions_1 = require("./entities/account.auctions");
const account_auctions_query_1 = require("./graphql/account.auctions.query");
const account_stats_query_1 = require("./graphql/account.stats.query");
const collection_stats_query_1 = require("./graphql/collection.stats.query");
const auctions_1 = require("./entities/auctions");
const auctions_query_1 = require("./graphql/auctions.query");
const bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
const auctionId_query_1 = require("./graphql/auctionId.query");
const auctions_count_query_1 = require("./graphql/auctions.count.query");
const collection_auctions_query_1 = require("./graphql/collection.auctions.query");
let NftMarketplaceService = class NftMarketplaceService {
    constructor(graphQlService) {
        this.graphQlService = graphQlService;
    }
    async getAccountStats(address) {
        const variables = { filters: { address } };
        const result = await this.graphQlService.getNftServiceData(account_stats_query_1.accountStatsQuery, variables);
        if (!result) {
            throw new common_1.BadRequestException('Count not fetch data from nft service');
        }
        return {
            auctions: parseInt(result.accountStats.auctions),
            claimable: parseInt(result.accountStats.claimable),
            collected: parseInt(result.accountStats.collected),
            collections: parseInt(result.accountStats.collections),
            creations: parseInt(result.accountStats.creations),
            likes: parseInt(result.accountStats.likes),
            orders: parseInt(result.accountStats.orders),
        };
    }
    async getCollectionStats(filters) {
        const variables = { filters };
        const result = await this.graphQlService.getNftServiceData(collection_stats_query_1.collectionStatsQuery, variables);
        if (!result) {
            throw new common_1.BadRequestException('Count not fetch data from nft service');
        }
        return {
            activeAuctions: result.collectionStats.activeAuctions,
            endedAuctions: result.collectionStats.auctionsEnded,
            maxPrice: result.collectionStats.maxPrice,
            minPrice: result.collectionStats.minPrice,
            saleAverage: new bignumber_js_1.default(result.collectionStats.saleAverage).toFixed(0),
            volumeTraded: result.collectionStats.volumeTraded,
        };
    }
    async getAccountAuctions(queryPagination, address, state) {
        const { from, size } = queryPagination;
        const result = await this.graphQlService.getNftServiceData((0, account_auctions_query_1.accountAuctionsQuery)(address, state), {});
        if (!result) {
            return [];
        }
        const auctions = result.auctions.edges.map((auction) => {
            const accountAuction = new account_auctions_1.Auction();
            accountAuction.auctionId = parseInt(auction.node.id);
            accountAuction.identifier = auction.node.identifier;
            accountAuction.collection = auction.node.collection;
            accountAuction.status = auction.node.status.toLowerCase();
            accountAuction.createdAt = auction.node.creationDate;
            accountAuction.endsAt = auction.node.endDate !== 0 ? auction.endDate : undefined;
            accountAuction.marketplace = auction.node.marketplace.key;
            accountAuction.marketplaceAuctionId = auction.node.marketplaceAuctionId;
            accountAuction.minBid.amount = auction.node.minBid.amount;
            accountAuction.minBid.token = auction.node.minBid.token;
            accountAuction.maxBid.amount = auction.node.maxBid.amount;
            accountAuction.maxBid.token = auction.node.maxBid.token;
            return accountAuction;
        });
        return auctions.slice(from, from + size);
    }
    async getAuctionId(id) {
        const result = await this.graphQlService.getNftServiceData((0, auctionId_query_1.auctionIdQuery)(id), {});
        if (!result) {
            throw new common_1.BadRequestException('Count not fetch data from nft service');
        }
        const auction = result.auctions.edges[0].node;
        const auctionData = {
            owner: auction.ownerAddress,
            identifier: auction.identifier,
            collection: auction.collection,
            status: auction.status.toLowerCase(),
            auctionType: auction.type,
            createdAt: auction.creationDate,
            endsAt: auction.endDate !== 0 ? auction.endDate : undefined,
            marketplaceAuctionId: auction.marketplaceAuctionId,
            marketplace: auction.marketplace.key,
            minBid: {
                amount: auction.minBid.amount,
                token: auction.minBid.token,
            },
            maxBid: {
                amount: auction.maxBid.amount,
                token: auction.maxBid.token,
            },
        };
        return auctionData;
    }
    async getAuctions(pagination) {
        let hasNextPage = true;
        let after = null;
        const pageSize = pagination.size;
        const totalPages = Math.ceil(pagination.size / pageSize);
        const currentTimestamp = Math.round(Date.now() / 1000).toString();
        let pagesLeft = Math.min(totalPages, 3);
        if (pagination.size > 25) {
            pagesLeft = totalPages;
        }
        const auctions = [];
        while (hasNextPage && pagesLeft > 0) {
            const variables = {
                "first": pageSize,
                "after": after,
                "currentTimestamp": currentTimestamp,
            };
            const result = await this.graphQlService.getNftServiceData(auctions_query_1.auctionsQuery, variables);
            if (!result) {
                return auctions;
            }
            const edges = result.auctions.edges;
            const pageInfo = result.auctions.pageInfo;
            const endCursor = pageInfo.endCursor;
            if (edges.length > 0) {
                const currentAuctions = edges.map((auction) => {
                    const currentAuction = new auctions_1.Auctions();
                    currentAuction.owner = auction.node.ownerAddress;
                    currentAuction.identifier = auction.node.identifier;
                    currentAuction.collection = auction.node.collection;
                    currentAuction.status = auction.node.status.toLowerCase();
                    currentAuction.auctionType = auction.node.type;
                    currentAuction.auctionId = parseInt(auction.node.id);
                    currentAuction.marketplaceAuctionId = auction.node.marketplaceAuctionId;
                    currentAuction.marketplace = auction.node.marketplaceKey;
                    currentAuction.createdAt = auction.node.creationDate;
                    currentAuction.endsAt = auction.node.endDate !== 0 ? auction.endDate : undefined;
                    currentAuction.minBid.amount = auction.node.minBid.amount;
                    currentAuction.minBid.token = auction.node.minBid.token;
                    currentAuction.maxBid.amount = auction.node.maxBid.amount;
                    currentAuction.maxBid.token = auction.node.maxBid.token;
                    return currentAuction;
                });
                auctions.push(...currentAuctions);
            }
            if (pagesLeft > 1 && pageInfo.hasNextPage) {
                after = endCursor;
                pagesLeft--;
            }
            else {
                hasNextPage = false;
            }
        }
        if (hasNextPage) {
            const remainingAuctions = await this.getAuctions(Object.assign(Object.assign({}, pagination), { size: pagination.size - auctions.length }));
            auctions.push(...remainingAuctions);
        }
        return auctions;
    }
    async getAuctionsCount(status) {
        const variables = {
            filters: {
                filters: [
                    {
                        field: 'status',
                        op: 'IN',
                        values: [status],
                    },
                ],
                operator: 'AND',
            },
        };
        const result = await this.graphQlService.getNftServiceData(auctions_count_query_1.auctionsCountQuery, variables);
        if (!result) {
            throw new common_1.BadRequestException('Count not fetch data from nft service');
        }
        return result.auctions.pageData.count;
    }
    async getCollectionAuctionsCount(collection) {
        const variables = {
            filters: {
                filters: [
                    {
                        field: "status",
                        op: "EQ",
                        values: ["Running"],
                    },
                    {
                        field: 'collection',
                        op: 'EQ',
                        values: [collection],
                    },
                ],
                operator: 'AND',
            },
        };
        const result = await this.graphQlService.getNftServiceData(auctions_count_query_1.auctionsCountQuery, variables);
        if (!result) {
            throw new common_1.BadRequestException('Count not fetch data from nft service');
        }
        return result.auctions.pageData.count;
    }
    async getAccountAuctionsCount(address) {
        const variables = {
            filters: {
                filters: [
                    {
                        field: "status",
                        op: "EQ",
                        values: ["Running"],
                    },
                    {
                        field: 'ownerAddress',
                        op: 'EQ',
                        values: [address],
                    },
                ],
                operator: 'AND',
            },
        };
        const result = await this.graphQlService.getNftServiceData(auctions_count_query_1.auctionsCountQuery, variables);
        if (!result) {
            throw new common_1.BadRequestException('Count not fetch data from nft service');
        }
        return result.auctions.pageData.count;
    }
    async getCollectionAuctions(pagination, collection) {
        let hasNextPage = true;
        let after = null;
        const pageSize = pagination.size;
        const totalPages = Math.ceil(pagination.size / pageSize);
        let pagesLeft = Math.min(totalPages, 3);
        if (pagination.size > 25) {
            pagesLeft = totalPages;
        }
        const auctions = [];
        while (hasNextPage && pagesLeft > 0) {
            const variables = {
                "first": pageSize,
                "after": after,
                "collection": collection,
            };
            const result = await this.graphQlService.getNftServiceData(collection_auctions_query_1.collectionAuctionsQuery, variables);
            if (!result) {
                return auctions;
            }
            const edges = result.auctions.edges;
            const pageInfo = result.auctions.pageInfo;
            const endCursor = pageInfo.endCursor;
            if (edges.length > 0) {
                const currentAuctions = edges.map((auction) => {
                    const currentAuction = new auctions_1.Auctions();
                    currentAuction.owner = auction.node.ownerAddress;
                    currentAuction.identifier = auction.node.identifier;
                    currentAuction.collection = auction.node.collection;
                    currentAuction.status = auction.node.status.toLowerCase();
                    currentAuction.auctionType = auction.node.type;
                    currentAuction.auctionId = parseInt(auction.node.id);
                    currentAuction.marketplaceAuctionId = auction.node.marketplaceAuctionId;
                    currentAuction.marketplace = auction.node.marketplaceKey;
                    currentAuction.createdAt = auction.node.creationDate;
                    currentAuction.endsAt = auction.node.endDate !== 0 ? auction.endDate : undefined;
                    currentAuction.minBid.amount = auction.node.minBid.amount;
                    currentAuction.minBid.token = auction.node.minBid.token;
                    currentAuction.maxBid.amount = auction.node.maxBid.amount;
                    currentAuction.maxBid.token = auction.node.maxBid.token;
                    return currentAuction;
                });
                auctions.push(...currentAuctions);
            }
            if (pagesLeft > 1 && pageInfo.hasNextPage) {
                after = endCursor;
                pagesLeft--;
            }
            else {
                hasNextPage = false;
            }
        }
        if (hasNextPage) {
            const remainingAuctions = await this.getCollectionAuctions(Object.assign(Object.assign({}, pagination), { size: pagination.size - auctions.length }), collection);
            auctions.push(...remainingAuctions);
        }
        return auctions;
    }
};
NftMarketplaceService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [graphql_service_1.GraphQlService])
], NftMarketplaceService);
exports.NftMarketplaceService = NftMarketplaceService;
//# sourceMappingURL=nft.marketplace.service.js.map