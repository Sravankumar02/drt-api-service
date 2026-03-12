import { AuctionNode } from "./auction.node";
export declare class Auction {
    constructor(init?: Partial<Auction>);
    owner: string;
    numStakedNodes: number;
    totalTopUp: string;
    topUpPerNode: string;
    qualifiedTopUp: string;
    nodes: AuctionNode[] | null;
}
