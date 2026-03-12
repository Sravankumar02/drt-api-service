import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { CacheValue } from "./entities/cache.value";
export declare class LocalCacheController {
    private readonly cachingService;
    constructor(cachingService: CacheService);
    getCache(key: string): Promise<unknown>;
    setCache(key: string, cacheValue: CacheValue): void;
    delCache(key: string): void;
}
