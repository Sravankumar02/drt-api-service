export declare class ConcurrencyUtils {
    private static readonly logger;
    static executeWithConcurrencyLimit<T, R>(items: T[], asyncOperation: (item: T) => Promise<R>, concurrencyLimit?: number, description?: string): Promise<R[]>;
    static executeWithChunksAndDelay<T, R>(items: T[], asyncOperation: (item: T) => Promise<R>, chunkSize?: number, delayMs?: number, description?: string): Promise<R[]>;
    private static delay;
}
