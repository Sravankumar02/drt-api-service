/// <reference types="node" />
import { Nft } from "src/endpoints/nfts/entities/nft";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { GenerateThumbnailResult } from "./entities/generate.thumbnail.result";
import { AWSService } from "./aws.service";
import { ApiService } from "@sravankumar02/sdk-nestjs-http";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
export declare class NftThumbnailService {
    private readonly apiConfigService;
    private readonly awsService;
    private readonly apiService;
    private readonly cachingService;
    private readonly logger;
    private readonly STANDARD_PATH;
    private readonly API_TIMEOUT_MILLISECONDS;
    constructor(apiConfigService: ApiConfigService, awsService: AWSService, apiService: ApiService, cachingService: CacheService);
    private extractThumbnailFromImage;
    private getScreenshot;
    private extractThumbnailFromVideo;
    private extractThumbnailFromAudio;
    private extractScreenshotFromVideo;
    hasThumbnailGenerated(identifier: string, fileUrl: string): Promise<boolean>;
    generateThumbnail(nft: Nft, fileUrl: string, fileType: string, forceRefresh?: boolean): Promise<GenerateThumbnailResult>;
    uploadThumbnail(urlIdentifier: string, buffer: Buffer, fileType: string): Promise<void>;
    private getFullThumbnailUrl;
    private getThumbnailUrlSuffix;
}
