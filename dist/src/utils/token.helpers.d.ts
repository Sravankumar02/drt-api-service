import { Nft } from "src/endpoints/nfts/entities/nft";
import { CollectionRoles } from "src/endpoints/tokens/entities/collection.roles";
import { TokenRoles } from "src/endpoints/tokens/entities/token.roles";
import '@sravankumar02/sdk-nestjs-common/lib/utils/extensions/string.extensions';
export declare class TokenHelpers {
    static canBool(string: string): boolean;
    static computeNftUri(uri: string, prefix: string): string;
    static getUrlHash(url: string): string;
    static getThumbnailUrlIdentifier(nftIdentifier: string, fileUrl: string): string;
    static needsDefaultMedia(nft: Nft): boolean;
    static setTokenRole(tokenRoles: TokenRoles, role: string): void;
    static setCollectionRole(tokenRoles: CollectionRoles, role: string): void;
    static tokenNonce(tokenID: string): number;
    static getCollectionIdentifier(nftIdentifier: string): string;
    static getNftProof(hash: string): string | undefined;
}
