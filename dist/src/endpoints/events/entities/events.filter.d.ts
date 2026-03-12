export declare class EventsFilter {
    constructor(init?: Partial<EventsFilter>);
    identifier: string;
    address: string;
    txHash: string;
    shard: number;
    before: number;
    after: number;
    order: number;
    logAddress: string;
    topics: string[];
}
