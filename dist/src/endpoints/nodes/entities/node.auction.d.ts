export declare class NodeAuction {
    constructor(init?: Partial<NodeAuction>);
    identity?: string;
    name?: string;
    description: string;
    avatar: string;
    provider?: string;
    bls?: string;
    stake: string;
    owner: string;
    distribution?: {
        [index: string]: number | undefined;
    };
    auctionTopUp: string;
    qualifiedStake: string;
    auctionValidators: number;
    qualifiedAuctionValidators: number;
    droppedValidators: number;
    dangerZoneValidators: number;
}
