export declare class ProviderQueryOptions {
    constructor(init?: Partial<ProviderQueryOptions>);
    withLatestInfo?: boolean;
    withIdentityInfo?: boolean;
    static applyDefaultOptions(owner: string | undefined, options: ProviderQueryOptions): ProviderQueryOptions;
}
