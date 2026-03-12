import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { ApiConfigService } from '../api-config/api.config.service';
import { PersistenceService } from '../persistence/persistence.service';
export declare class SettingsService {
    private readonly apiConfigService;
    private readonly persistenceService;
    private readonly cachingService;
    constructor(apiConfigService: ApiConfigService, persistenceService: PersistenceService, cachingService: CacheService);
    getUseRequestCachingFlag(): Promise<boolean>;
    getUseRequestLoggingFlag(): Promise<boolean>;
    getUseVmQueryTracingFlag(): Promise<boolean>;
    private getSetting;
    getAllSettings(): Promise<{
        name: string;
        value: any;
    }[]>;
}
