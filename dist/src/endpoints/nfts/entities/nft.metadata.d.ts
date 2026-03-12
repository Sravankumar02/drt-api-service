import { NftMetadataError } from "./nft.metadata.error";
export declare class NftMetadata {
    constructor(init?: Partial<NftMetadata>);
    description: string;
    fileType: string;
    fileUri: string;
    fileName: string;
    error: NftMetadataError | undefined;
}
