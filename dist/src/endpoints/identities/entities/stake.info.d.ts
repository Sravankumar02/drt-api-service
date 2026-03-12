export declare class StakeInfo {
    constructor(init?: Partial<StakeInfo>);
    score?: number;
    validators?: number;
    queued?: number;
    auctioned?: number;
    stake?: string;
    topUp?: string;
    locked: string;
    distribution?: {
        [key: string]: number;
    };
    providers?: any[];
    stakePercent?: number;
    sort?: number;
}
