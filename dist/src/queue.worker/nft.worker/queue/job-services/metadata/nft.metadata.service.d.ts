import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { PersistenceService } from "src/common/persistence/persistence.service";
import { Nft } from "src/endpoints/nfts/entities/nft";
import { NftExtendedAttributesService } from "src/endpoints/nfts/nft.extendedattributes.service";
import { ClientProxy } from "@nestjs/microservices";
export declare class NftMetadataService {
    private readonly nftExtendedAttributesService;
    private readonly persistenceService;
    private readonly cachingService;
    private clientProxy;
    private readonly logger;
    constructor(nftExtendedAttributesService: NftExtendedAttributesService, persistenceService: PersistenceService, cachingService: CacheService, clientProxy: ClientProxy);
    getOrRefreshMetadata(nft: Nft): Promise<any>;
    getMetadata(nft: Nft): Promise<any>;
    refreshMetadata(nft: Nft): Promise<any>;
    getMetadataRaw(nft: Nft): Promise<any>;
}
