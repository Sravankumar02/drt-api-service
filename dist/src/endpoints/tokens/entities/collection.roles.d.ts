export declare class CollectionRoles {
    constructor(init?: Partial<CollectionRoles>);
    address: string | undefined;
    canCreate: boolean;
    canBurn: boolean;
    canAddQuantity: boolean;
    canUpdateAttributes: boolean;
    canAddUri: boolean;
    canTransfer: boolean | undefined;
    roles: string[];
}
