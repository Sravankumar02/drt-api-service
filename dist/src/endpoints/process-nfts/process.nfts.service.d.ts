import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { NftWorkerService } from "src/queue.worker/nft.worker/nft.worker.service";
import { AccountService } from "../accounts/account.service";
import { CollectionService } from "../collections/collection.service";
import { NftService } from "../nfts/nft.service";
import { ProcessNftRequest } from "./entities/process.nft.request";
import { ProcessNftSettings } from "./entities/process.nft.settings";
export declare class ProcessNftsService {
    private readonly apiConfigService;
    private readonly nftWorkerService;
    private readonly nftService;
    private readonly collectionService;
    private readonly accountService;
    private readonly cachingService;
    private static readonly MAX_DEPTH;
    private static readonly MAXIMUM_PROCESS_RETRIES;
    private readonly logger;
    constructor(apiConfigService: ApiConfigService, nftWorkerService: NftWorkerService, nftService: NftService, collectionService: CollectionService, accountService: AccountService, cachingService: CacheService);
    process(processNftRequest: ProcessNftRequest): Promise<{
        [key: string]: boolean;
    }>;
    processWithOwnerCheck(address: string, processNftRequest: ProcessNftRequest): Promise<{
        [key: string]: boolean;
    }>;
    processCollection(collection: string, settings: ProcessNftSettings): Promise<{
        [key: string]: boolean;
    }>;
    processNft(identifier: string, settings: ProcessNftSettings): Promise<boolean>;
    private isCollectionOwner;
    private getCollectionNonScOwner;
    private getCollectionNonScOwnerRaw;
}
