import { CollectionRoles } from "src/endpoints/tokens/entities/collection.roles";
import { NftCollection } from "./nft.collection";
export declare class NftCollectionWithRoles extends NftCollection {
    constructor(init?: Partial<NftCollectionWithRoles>);
    role: CollectionRoles;
    canTransfer: Boolean;
    canCreate: boolean;
    canBurn: boolean;
    canAddQuantity: boolean;
    canUpdateAttributes: boolean;
    canAddUri: boolean;
}
