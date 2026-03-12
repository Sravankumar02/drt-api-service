export declare class MoaStakingProxy {
    constructor(init?: Partial<MoaStakingProxy>);
    address: string;
    dualYieldTokenName: string;
    dualYieldTokenCollection: string;
    static fromQueryResponse(response: any): MoaStakingProxy;
}
