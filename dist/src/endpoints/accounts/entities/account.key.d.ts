export declare class AccountKey {
    constructor(init?: Partial<AccountKey>);
    blsKey: string;
    stake: string;
    topUp: string;
    status: string;
    rewardAddress: string;
    queueIndex: string | undefined;
    queueSize: string | undefined;
    remainingUnBondPeriod: number | undefined;
}
