export declare class Identity {
    constructor(init?: Partial<Identity>);
    identity?: string;
    name?: string;
    description?: string;
    avatar?: string;
    website?: string;
    twitter?: string;
    location?: string;
    score?: number;
    validators?: number;
    stake?: string;
    topUp?: string;
    locked: string;
    distribution?: {
        [index: string]: number | undefined;
    };
    providers?: string[];
    stakePercent?: number;
    rank?: number;
    apr?: number;
}
