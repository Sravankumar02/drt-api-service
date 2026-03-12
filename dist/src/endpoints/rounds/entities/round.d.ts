export declare class Round {
    constructor(init?: Partial<Round>);
    blockWasProposed: boolean;
    round: number;
    shard: number;
    epoch: number;
    timestamp: number;
    timestampMs?: number;
}
