import { ClientProxy } from "@nestjs/microservices";
import { MoaSettingsService } from "src/endpoints/moa/moa.settings.service";
import { MoaEconomicsService } from "src/endpoints/moa/moa.economics.service";
import { MoaPairService } from "src/endpoints/moa/moa.pair.service";
import { MoaTokenService } from "src/endpoints/moa/moa.token.service";
import { MoaFarmService } from "src/endpoints/moa/moa.farm.service";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
export declare class MoaWarmerService {
    private readonly cachingService;
    private clientProxy;
    private readonly moaEconomicsService;
    private readonly moaPairsService;
    private readonly moaTokensService;
    private readonly moaSettingsService;
    private readonly moaFarmsService;
    constructor(cachingService: CacheService, clientProxy: ClientProxy, moaEconomicsService: MoaEconomicsService, moaPairsService: MoaPairService, moaTokensService: MoaTokenService, moaSettingsService: MoaSettingsService, moaFarmsService: MoaFarmService);
    handleMoaInvalidations(): Promise<void>;
    handleMoaSettings(): Promise<void>;
    private invalidateKey;
    private refreshCacheKey;
}
