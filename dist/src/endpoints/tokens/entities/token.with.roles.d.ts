import { Token } from "./token";
import { TokenRoles } from "./token.roles";
export declare class TokenWithRoles extends Token {
    constructor(init?: Partial<TokenWithRoles>);
    role: TokenRoles;
    address: string | undefined;
    canLocalMint: boolean;
    canLocalBurn: boolean;
    canCreate?: boolean;
    canAddQuantity?: boolean;
    canUpdateAttributes?: boolean;
    canAddUri?: boolean;
    canTransfer: boolean;
}
