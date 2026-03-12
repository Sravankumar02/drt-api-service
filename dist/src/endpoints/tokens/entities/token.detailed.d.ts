import { Token } from "./token";
import { TokenRoles } from "./token.roles";
export declare class TokenDetailed extends Token {
    constructor(init?: Partial<TokenDetailed>);
    supply: string | number | undefined;
    circulatingSupply: string | number | undefined;
    roles: TokenRoles[] | undefined;
    minted: string;
    burnt: string;
    initialMinted: string;
    canTransfer: boolean | undefined;
}
