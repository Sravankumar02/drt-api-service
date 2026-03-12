import { Tps } from "./entities/tps";
import { TpsFrequency } from "./entities/tps.frequency";
import { TpsService } from "./tps.service";
import { TpsInterval } from "./entities/tps.interval";
export declare class TpsController {
    private readonly tpsService;
    constructor(tpsService: TpsService);
    getTpsLatest(): Promise<Tps>;
    getTpsLatestByFrequency(frequency: TpsFrequency): Promise<Tps>;
    getTpsMax(): Promise<Tps>;
    getTpsMaxByFrequency(interval: TpsInterval): Promise<Tps>;
    getTransactionCount(): Promise<number>;
    getTpsHistory(): Promise<Tps[]>;
    getTpsHistoryByInterval(interval: TpsInterval): Promise<Tps[]>;
}
