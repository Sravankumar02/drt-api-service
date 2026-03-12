export declare class TokenRoles {
    constructor(init?: Partial<TokenRoles>);
    address: string | undefined;
    canLocalMint: boolean;
    canLocalBurn: boolean;
    canCreate?: boolean;
    canBurn?: boolean;
    canAddQuantity?: boolean;
    canUpdateAttributes?: boolean;
    canAddUri?: boolean;
    canTransfer?: boolean;
    roles: string[];
}
