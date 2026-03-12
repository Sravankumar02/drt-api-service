import { AuctionStatus } from "./auction.status";
import { Bids } from "./bids";
export declare class Auctions {
    constructor(init?: Partial<Auctions>);
    owner: string;
    auctionId?: number;
    identifier: string;
    collection: string;
    status: AuctionStatus;
    auctionType?: string;
    createdAt: number;
    endsAt?: number;
    marketplaceAuctionId: number;
    marketplace: string;
    minBid: Bids;
    maxBid: Bids;
}
