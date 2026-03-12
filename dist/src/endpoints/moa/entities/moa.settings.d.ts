export declare class MoaSettings {
    constructor(init?: Partial<MoaSettings>);
    pairContracts: string[];
    farmContracts: string[];
    wrapContracts: string[];
    routerFactoryContract: string;
    distributionContract: string;
    lockedAssetContract: string;
    lockedAssetIdentifier: string;
    lockedAssetIdentifierV2: string;
    moaId: string;
    wrewaId: string;
    static fromQueryResponse(response: any): MoaSettings;
}
