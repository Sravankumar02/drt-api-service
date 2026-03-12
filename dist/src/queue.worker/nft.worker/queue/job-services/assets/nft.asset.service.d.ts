import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { ApiService } from "@sravankumar02/sdk-nestjs-http";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { NftMedia } from "src/endpoints/nfts/entities/nft.media";
import { AWSService } from "../thumbnails/aws.service";
export declare class NftAssetService {
    private readonly apiService;
    private readonly awsService;
    private readonly apiConfigService;
    private readonly cachingService;
    private readonly logger;
    private readonly API_TIMEOUT_MILLISECONDS;
    private readonly STANDARD_PATH;
    constructor(apiService: ApiService, awsService: AWSService, apiConfigService: ApiConfigService, cachingService: CacheService);
    uploadAsset(identifier: string, fileUrl: string, fileType: string): Promise<void>;
    isAssetUploaded(media: NftMedia): Promise<boolean>;
}
