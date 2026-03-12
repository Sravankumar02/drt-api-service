import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { GraphQlService } from "src/common/graphql/graphql.service";
import { MoaSettingsService } from "./moa.settings.service";
import { MoaEconomics } from "./entities/moa.economics";
export declare class MoaEconomicsService {
    private readonly moaSettingService;
    private readonly cachingService;
    private readonly graphQlService;
    constructor(moaSettingService: MoaSettingsService, cachingService: CacheService, graphQlService: GraphQlService);
    refreshMoaEconomics(): Promise<void>;
    getMoaEconomics(): Promise<MoaEconomics>;
    getMoaEconomicsRaw(): Promise<MoaEconomics>;
}
