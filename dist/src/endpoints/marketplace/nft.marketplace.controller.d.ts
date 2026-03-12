import { AccountAuctionStats } from "./entities/account.auction.stats";
import { Auction } from "./entities/account.auctions";
import { AuctionStatus } from "./entities/auction.status";
import { Auctions } from "./entities/auctions";
import { CollectionAuctionStats } from "./entities/collection.auction.stats";
import { NftMarketplaceService } from "./nft.marketplace.service";
export declare class NftMarketplaceController {
    private readonly nftMarketplaceService;
    constructor(nftMarketplaceService: NftMarketplaceService);
    getAuctions(size: number): Promise<Auctions[]>;
    getAuctionsCount(status?: AuctionStatus): Promise<number>;
    getAuctionsCountAlternative(status?: AuctionStatus): Promise<number>;
    getAuctionId(id: number): Promise<Auction>;
    getAccountStats(address: string): Promise<AccountAuctionStats>;
    getAccountAuctions(address: string, from: number, size: number, status?: AuctionStatus): Promise<Auction[]>;
    getAccountAuctionsCount(address: string): Promise<number>;
    getCollectionStats(collection: string): Promise<CollectionAuctionStats>;
    getCollectionAuctions(collection: string, size: number): Promise<Auctions[]>;
    getCollectionAuctionsCount(collection: string): Promise<number>;
}
