import { DcdtLockedAccount } from "src/endpoints/dcdt/entities/dcdt.locked.account";
export declare class TokenSupplyResult {
    constructor(init?: Partial<TokenSupplyResult>);
    supply: string | number;
    circulatingSupply: string | number;
    minted: string | number | undefined;
    burnt: string | number | undefined;
    initialMinted: string | number | undefined;
    lockedAccounts: DcdtLockedAccount[] | undefined;
}
