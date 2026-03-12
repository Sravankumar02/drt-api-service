import { CollectionRoles } from "src/endpoints/tokens/entities/collection.roles";
import { NftCollection } from "./nft.collection";
export declare class NftCollectionDetailed extends NftCollection {
    constructor(init?: Partial<NftCollectionDetailed>);
    canTransfer: boolean | undefined;
    roles: CollectionRoles[];
}
