export declare class NftQueryOptions {
    constructor(init?: Partial<NftQueryOptions>);
    withOwner?: boolean;
    withSupply?: boolean;
    withReceivedAt?: boolean;
    withAssets?: boolean;
    validate(size: number): void;
}
