import { Nft } from "src/endpoints/nfts/entities/nft";
import { ProcessNftSettings } from "src/endpoints/process-nfts/entities/process.nft.settings";
import { NftThumbnailService } from "./queue/job-services/thumbnails/nft.thumbnail.service";
import { NftMetadataService } from "./queue/job-services/metadata/nft.metadata.service";
import { NftMediaService } from "./queue/job-services/media/nft.media.service";
import { ClientProxy } from "@nestjs/microservices";
import { NftAssetService } from "./queue/job-services/assets/nft.asset.service";
import { PersistenceService } from "src/common/persistence/persistence.service";
import { ApiConfigService } from "src/common/api-config/api.config.service";
export declare class NftWorkerService {
    private readonly nftThumbnailService;
    private readonly nftMetadataService;
    private readonly nftMediaService;
    private readonly nftAssetService;
    private readonly client;
    private readonly persistenceService;
    private readonly apiConfigService;
    constructor(nftThumbnailService: NftThumbnailService, nftMetadataService: NftMetadataService, nftMediaService: NftMediaService, nftAssetService: NftAssetService, client: ClientProxy, persistenceService: PersistenceService, apiConfigService: ApiConfigService);
    addProcessNftQueueJob(nft: Nft, settings: ProcessNftSettings): Promise<boolean>;
    needsProcessing(nft: Nft, settings: ProcessNftSettings): Promise<boolean>;
}
