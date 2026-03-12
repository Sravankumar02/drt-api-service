export declare class AccountUsername {
    constructor(init?: Partial<AccountUsername>);
    address: string;
    nonce: number | undefined;
    balance: string;
    rootHash: string;
    txCount: number | undefined;
    scrCount: number | undefined;
    username: string;
    shard: number | undefined;
    developerReward: string;
}
