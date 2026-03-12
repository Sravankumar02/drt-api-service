import { AccountAssetsSocial } from "./account.assets.social";
export declare class AccountAssets {
    constructor(init?: Partial<AccountAssets>);
    name: string;
    description: string;
    social: AccountAssetsSocial | undefined;
    tags: string[];
    proof: string | undefined;
    icon: string | undefined;
    iconPng: string | undefined;
    iconSvg: string | undefined;
}
