import { ApiConfigService } from "src/common/api-config/api.config.service";
import { NftExtendedAttributesService } from "src/endpoints/nfts/nft.extendedattributes.service";
import { NftService } from "src/endpoints/nfts/nft.service";
import { NftWorkerService } from "src/queue.worker/nft.worker/nft.worker.service";
export declare class NftCronService {
    private readonly nftWorkerService;
    private readonly nftService;
    private readonly apiConfigService;
    private readonly nftExtendedAttributesService;
    private readonly logger;
    constructor(nftWorkerService: NftWorkerService, nftService: NftService, apiConfigService: ApiConfigService, nftExtendedAttributesService: NftExtendedAttributesService);
    triggerProcessFailedMetadata(): Promise<void>;
    triggerProcessNftsForLast24Hours(): Promise<void>;
    triggerProcessNftsForLastYear(): Promise<void>;
    private needsMediaRefresh;
    private needsMetadataRefresh;
    private needsMetadataFetch;
    private needsMediaFetch;
    private processNfts;
}
