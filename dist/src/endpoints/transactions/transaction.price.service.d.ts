import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { TransactionDetailed } from "./entities/transaction.detailed";
import { DataApiService } from "src/common/data-api/data-api.service";
export declare class TransactionPriceService {
    private readonly cachingService;
    private readonly dataApiService;
    constructor(cachingService: CacheService, dataApiService: DataApiService);
    getTransactionPrice(transaction: TransactionDetailed): Promise<number | undefined>;
    private getTransactionPriceForDate;
    private getTransactionPriceToday;
    private getTransactionPriceHistorical;
}
