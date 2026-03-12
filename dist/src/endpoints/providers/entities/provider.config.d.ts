export declare class ProviderConfig {
    constructor(init?: Partial<ProviderConfig>);
    owner: string;
    serviceFee: number;
    delegationCap: string;
    apr: number;
    automaticActivation: boolean;
    checkCapOnRedelegate: boolean;
}
