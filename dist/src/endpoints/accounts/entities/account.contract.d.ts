import { AccountAssets } from "src/common/assets/entities/account.assets";
export declare class AccountContract {
    constructor(init?: Partial<AccountContract>);
    address: string;
    deployTxHash: string;
    timestamp: number;
    assets: AccountAssets | undefined;
}
