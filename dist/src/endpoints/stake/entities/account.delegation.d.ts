import { AccountUndelegation } from "./account.undelegation";
export declare class AccountDelegation {
    constructor(init?: Partial<AccountDelegation>);
    address: string;
    contract: string;
    userUnBondable: string;
    userActiveStake: string;
    claimableRewards: string;
    userUndelegatedList: AccountUndelegation[];
}
