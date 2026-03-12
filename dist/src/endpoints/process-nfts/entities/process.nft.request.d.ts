export declare class ProcessNftRequest {
    constructor(init?: Partial<ProcessNftRequest>);
    collection?: string;
    identifier?: string;
    forceRefreshMedia?: boolean;
    forceRefreshMetadata?: boolean;
    forceRefreshThumbnail?: boolean;
    skipRefreshThumbnail?: boolean;
    uploadAsset?: boolean;
}
