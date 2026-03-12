import { ClientProxy, RmqContext } from "@nestjs/microservices";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { NftService } from "src/endpoints/nfts/nft.service";
import { NftMessage } from "./entities/nft.message";
import { NftMediaService } from "./job-services/media/nft.media.service";
import { NftMetadataService } from "./job-services/metadata/nft.metadata.service";
import { NftThumbnailService } from "./job-services/thumbnails/nft.thumbnail.service";
import { NftAssetService } from "./job-services/assets/nft.asset.service";
export declare class NftQueueController {
    private readonly nftMetadataService;
    private readonly nftMediaService;
    private readonly nftThumbnailService;
    private readonly nftService;
    private readonly nftAssetService;
    private clientProxy;
    private readonly logger;
    private readonly RETRY_LIMIT;
    constructor(nftMetadataService: NftMetadataService, nftMediaService: NftMediaService, nftThumbnailService: NftThumbnailService, nftService: NftService, nftAssetService: NftAssetService, clientProxy: ClientProxy, apiConfigService: ApiConfigService);
    private getAttempt;
    private getProcessNftActivatedSettings;
    onNftCreated(data: NftMessage, context: RmqContext): Promise<void>;
    private generateThumbnail;
}
