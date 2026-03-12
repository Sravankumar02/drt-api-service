import { AccountAssets } from "src/common/assets/entities/account.assets";
export declare class TokenAccount {
    constructor(init?: Partial<TokenAccount>);
    address: string;
    balance: string;
    identifier: string | undefined;
    attributes: string | undefined;
    assets: AccountAssets | undefined;
}
