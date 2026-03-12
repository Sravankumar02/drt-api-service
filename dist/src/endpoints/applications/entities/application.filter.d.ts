export declare class ApplicationFilter {
    constructor(init?: Partial<ApplicationFilter>);
    after?: number;
    before?: number;
    withTxCount?: boolean;
    validate(size: number): void;
    isSet(): boolean;
}
