import { ProcessNftRequest } from "./process.nft.request";
export declare class ProcessNftSettings {
    forceRefreshMedia: boolean;
    forceRefreshMetadata: boolean;
    forceRefreshThumbnail: boolean;
    skipRefreshThumbnail: boolean;
    uploadAsset: boolean;
    constructor(init?: Partial<ProcessNftSettings>);
    static fromRequest(processNftRequest: ProcessNftRequest): ProcessNftSettings;
}
