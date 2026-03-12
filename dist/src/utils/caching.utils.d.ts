import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
export declare class CachingUtils {
    static executeOptimistic<T>(param: {
        cachingService: CacheService;
        description: string;
        key: string;
        ttl: number;
        action: () => Promise<T>;
    }): Promise<T | undefined>;
}
