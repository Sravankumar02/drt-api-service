export declare class TokenWithRolesFilter {
    constructor(init?: Partial<TokenWithRolesFilter>);
    identifier?: string;
    search?: string;
    owner?: string;
    canMint?: boolean;
    canBurn?: boolean;
    includeMetaDCDT?: boolean;
}
