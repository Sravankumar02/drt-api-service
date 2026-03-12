export declare class AccountDetailed {
    constructor(init?: Partial<AccountDetailed>);
    address: string;
    nonce: number;
    balance: string;
    username: string;
    code: string;
    codeHash: string | undefined;
    rootHash: string;
    codeMetadata: string;
    developerReward: string;
    ownerAddress: string;
}
