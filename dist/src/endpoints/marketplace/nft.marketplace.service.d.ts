import { GraphQlService } from "src/common/graphql/graphql.service";
import { AccountAuctionStats } from "./entities/account.auction.stats";
import { Auction } from "./entities/account.auctions";
import { CollectionAuctionStats } from "./entities/collection.auction.stats";
import { CollectionStatsFilters } from "./entities/collection.stats.filter";
import { Auctions } from "./entities/auctions";
import { QueryPagination } from "src/common/entities/query.pagination";
import { AuctionStatus } from "./entities/auction.status";
export declare class NftMarketplaceService {
    private readonly graphQlService;
    constructor(graphQlService: GraphQlService);
    getAccountStats(address: string): Promise<AccountAuctionStats>;
    getCollectionStats(filters: CollectionStatsFilters): Promise<CollectionAuctionStats>;
    getAccountAuctions(queryPagination: QueryPagination, address: string, state?: AuctionStatus): Promise<Auction[]>;
    getAuctionId(id: number): Promise<Auction>;
    getAuctions(pagination: QueryPagination): Promise<Auctions[]>;
    getAuctionsCount(status?: AuctionStatus): Promise<number>;
    getCollectionAuctionsCount(collection: string): Promise<number>;
    getAccountAuctionsCount(address: string): Promise<number>;
    getCollectionAuctions(pagination: QueryPagination, collection: string): Promise<Auctions[]>;
}
