import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { ClientProxy } from "@nestjs/microservices";
import { CacheValue } from "./entities/cache.value";
export declare class RemoteCacheController {
    private readonly cachingService;
    private clientProxy;
    constructor(cachingService: CacheService, clientProxy: ClientProxy);
    getCache(key: string): Promise<unknown>;
    setCache(key: string, cacheValue: CacheValue): Promise<void>;
    delCache(key: string): Promise<void>;
    getKeys(keys: string | undefined): Promise<string[]>;
}
