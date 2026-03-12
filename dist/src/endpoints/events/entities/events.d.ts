export declare class Events {
    constructor(init?: Partial<Events>);
    txHash: string;
    logAddress: string;
    identifier: string;
    address: string;
    data: string;
    topics: string[];
    shardID: number;
    additionalData: string[];
    txOrder: number;
    order: number;
    timestamp: number;
    timestampMs?: number;
}
