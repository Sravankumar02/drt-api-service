import { AccountHistory } from "./account.history";
export declare class AccountDcdtHistory extends AccountHistory {
    constructor(init?: Partial<AccountDcdtHistory>);
    token: string;
    identifier: string | undefined;
}
