import { AssetsService } from "src/common/assets/assets.service";
import { NftService } from "src/endpoints/nfts/nft.service";
import { PersistenceInterface } from "src/common/persistence/persistence.interface";
import { IndexerService } from "src/common/indexer/indexer.service";
export declare class ElasticUpdaterService {
    private readonly assetsService;
    private readonly indexerService;
    private readonly nftService;
    private readonly persistenceService;
    private readonly logger;
    constructor(assetsService: AssetsService, indexerService: IndexerService, nftService: NftService, persistenceService: PersistenceInterface);
    handleUpdateAssets(): Promise<void>;
    handleUpdateTokenExtraDetails(): Promise<void>;
    private updateMetadataForTokens;
    private updateMediaForTokens;
    private updateIsWhitelistedStorageForTokens;
    private updateIsWhitelistedStorageForToken;
    private updateMediaForToken;
    private updateMetadataForToken;
}
