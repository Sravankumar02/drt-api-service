import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { IndexerService } from "src/common/indexer/indexer.service";
export declare class BlsService {
    private readonly indexerService;
    private readonly cachingService;
    constructor(indexerService: IndexerService, cachingService: CacheService);
    getPublicKeys(shard: number, epoch: number): Promise<string[]>;
    private getPublicKeysRaw;
    getBlsIndex(bls: string, shardId: number, epoch: number): Promise<number | boolean>;
}
