export declare class SmartContractResultFilter {
    constructor(init?: Partial<SmartContractResultFilter>);
    miniBlockHash?: string;
    originalTxHashes?: string[];
    sender?: string;
    receiver?: string;
    functions?: string[];
}
