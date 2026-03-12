export declare class DappConfig {
    constructor(init?: Partial<DappConfig>);
    id: string;
    name: string;
    rewaLabel: string;
    decimals: string;
    rewaDenomination: string;
    gasPerDataByte: string;
    apiTimeout: string;
    walletConnectDeepLink: string;
    walletConnectBridgeAddresses: string;
    walletAddress: string;
    apiAddress: string;
    explorerAddress: string;
    chainId: string;
    refreshRate: number;
}
