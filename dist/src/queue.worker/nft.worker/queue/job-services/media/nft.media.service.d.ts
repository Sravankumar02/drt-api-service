import { ApiService } from "@sravankumar02/sdk-nestjs-http";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { PersistenceService } from "src/common/persistence/persistence.service";
import { Nft } from "src/endpoints/nfts/entities/nft";
import { NftMedia } from "src/endpoints/nfts/entities/nft.media";
import { ClientProxy } from "@nestjs/microservices";
export declare class NftMediaService {
    private readonly cachingService;
    private readonly apiService;
    private readonly apiConfigService;
    private readonly persistenceService;
    private clientProxy;
    private readonly logger;
    private readonly IPFS_REQUEST_TIMEOUT;
    private readonly NFT_THUMBNAIL_PREFIX;
    readonly NFT_THUMBNAIL_DEFAULT: string;
    constructor(cachingService: CacheService, apiService: ApiService, apiConfigService: ApiConfigService, persistenceService: PersistenceService, clientProxy: ClientProxy);
    getMedia(identifier: string): Promise<NftMedia[] | null>;
    refreshMedia(nft: Nft): Promise<NftMedia[] | undefined>;
    private getMediaRaw;
    private getUrl;
    private getFileProperties;
    private getFilePropertiesRaw;
    private getFilePropertiesFromHeaders;
    private isContentTypeAccepted;
    private isFileSizeAccepted;
}
