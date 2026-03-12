export declare class AccountHistory {
    constructor(init?: Partial<AccountHistory>);
    address: string;
    balance: string;
    timestamp: number;
    isSender?: boolean | undefined;
}
