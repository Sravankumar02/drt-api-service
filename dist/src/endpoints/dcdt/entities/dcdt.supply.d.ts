import { DcdtLockedAccount } from "./dcdt.locked.account";
export declare class DcdtSupply {
    constructor(init?: Partial<DcdtSupply>);
    totalSupply: string;
    circulatingSupply: string;
    minted: string;
    burned: string;
    initialMinted: string;
    lockedAccounts: DcdtLockedAccount[] | undefined;
}
