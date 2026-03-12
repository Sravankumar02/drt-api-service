import { TpsFrequency } from "./entities/tps.frequency";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { Tps } from "./entities/tps";
import { TpsInterval } from "./entities/tps.interval";
import { ProtocolService } from "src/common/protocol/protocol.service";
import { ApiConfigService } from "src/common/api-config/api.config.service";
export declare class TpsService {
    private readonly cacheService;
    private readonly protocolService;
    private readonly apiConfigService;
    constructor(cacheService: CacheService, protocolService: ProtocolService, apiConfigService: ApiConfigService);
    getTpsLatest(frequency: TpsFrequency): Promise<Tps>;
    getTpsMax(interval: TpsInterval): Promise<Tps>;
    getTpsHistory(interval: TpsInterval): Promise<Tps[]>;
    getTpsHistoryRaw(interval: TpsInterval): Promise<Tps[]>;
    getTransactionCount(): Promise<number>;
}
