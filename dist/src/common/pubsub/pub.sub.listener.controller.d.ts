import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
export declare class PubSubListenerController {
    private readonly cachingService;
    private logger;
    constructor(cachingService: CacheService);
    deleteCacheKey(keys: string[]): void;
    refreshCacheKey(info: {
        key: string;
        ttl: number;
    }): Promise<void>;
}
