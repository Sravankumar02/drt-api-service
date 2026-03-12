import { AuctionStatus } from "./auction.status";
import { Bids } from "./bids";
export declare class Auction {
    constructor(init?: Partial<Auction>);
    owner?: string;
    auctionId?: number;
    identifier: string;
    collection: string;
    status: AuctionStatus;
    auctionType?: string;
    createdAt: number;
    endsAt?: number;
    marketplaceAuctionId: string;
    marketplace: string;
    minBid: Bids;
    maxBid: Bids;
}
