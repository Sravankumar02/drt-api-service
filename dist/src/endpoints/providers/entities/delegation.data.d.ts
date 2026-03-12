export declare class DelegationData {
    constructor(init?: Partial<DelegationData>);
    aprValue: number | undefined;
    featured: boolean;
    contract: string | null;
    owner: string | null;
    automaticActivation: boolean;
    initialOwnerFunds: string;
    checkCapOnRedelegate: boolean;
    totalUnStaked: string;
    createdNonce: number;
    ownerBelowRequiredBalanceThreshold: boolean;
}
