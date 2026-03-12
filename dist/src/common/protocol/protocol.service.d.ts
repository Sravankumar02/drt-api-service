import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { GatewayService } from "../gateway/gateway.service";
import { IndexerService } from "../indexer/indexer.service";
import { ApiConfigService } from "../api-config/api.config.service";
export declare class ProtocolService {
    private readonly gatewayService;
    private readonly cachingService;
    private readonly indexerService;
    private readonly apiConfigService;
    private readonly logger;
    constructor(gatewayService: GatewayService, cachingService: CacheService, indexerService: IndexerService, apiConfigService: ApiConfigService);
    getShardIds(): Promise<number[]>;
    getShardCount(): Promise<number>;
    private getShardCountRaw;
    private getShardIdsRaw;
    getSecondsRemainingUntilNextRound(): Promise<number>;
    private getGenesisTimestamp;
    private getGenesisTimestampRaw;
    getShardIdForAddress(address: string): Promise<number | undefined>;
}
