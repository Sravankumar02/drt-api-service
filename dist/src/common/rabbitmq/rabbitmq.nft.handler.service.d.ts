import { NftService } from 'src/endpoints/nfts/nft.service';
import { NftWorkerService } from 'src/queue.worker/nft.worker/nft.worker.service';
import { NotifierEvent } from './entities/notifier.event';
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { IndexerService } from '../indexer/indexer.service';
import { ClientProxy } from '@nestjs/microservices';
export declare class RabbitMqNftHandlerService {
    private readonly nftWorkerService;
    private readonly nftService;
    private readonly indexerService;
    private readonly cachingService;
    private clientProxy;
    private readonly logger;
    constructor(nftWorkerService: NftWorkerService, nftService: NftService, indexerService: IndexerService, cachingService: CacheService, clientProxy: ClientProxy);
    private getCollectionType;
    private getCollectionTypeRaw;
    handleNftUpdateAttributesEvent(event: NotifierEvent): Promise<boolean>;
    private isDynamicNftType;
    handleNftCreateEvent(event: NotifierEvent): Promise<boolean>;
    handleNftBurnEvent(event: NotifierEvent): Promise<boolean>;
    handleNftMetadataEvent(event: NotifierEvent): Promise<boolean>;
    handleNftModifyCreatorEvent(event: NotifierEvent): Promise<boolean>;
    private getNftIdentifier;
}
