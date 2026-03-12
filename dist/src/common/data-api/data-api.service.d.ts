import { ApiConfigService } from "../api-config/api.config.service";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { ApiService } from "@sravankumar02/sdk-nestjs-http";
import { DataApiToken } from "./entities/data-api.token";
export declare class DataApiService {
    private readonly apiConfigService;
    private readonly apiService;
    private readonly cachingService;
    private readonly logger;
    constructor(apiConfigService: ApiConfigService, apiService: ApiService, cachingService: CacheService);
    getRewaPrice(timestamp?: number): Promise<number | undefined>;
    getDcdtTokenPrice(identifier: string, timestamp?: number): Promise<number | undefined>;
    private getDcdtTokenPriceRaw;
    getDataApiToken(identifier: string): Promise<DataApiToken | undefined>;
    getDataApiTokens(): Promise<Record<string, DataApiToken>>;
    getDataApiTokensRaw(): Promise<Record<string, DataApiToken>>;
}
