import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { TransactionBatch } from "./entities/transaction.batch";
import { TransactionBatchGroup } from "./entities/transaction.batch.group";
import { TransactionBatchSimplified } from "./entities/transaction.batch.simplified";
import { TransactionBatchSimplifiedResult } from "./entities/transaction.batch.simplified.result";
import { TransactionService } from "../transactions/transaction.service";
export declare class TransactionsBatchService {
    private readonly cachingService;
    private readonly transactionService;
    private readonly logger;
    constructor(cachingService: CacheService, transactionService: TransactionService);
    startTransactionBatch(batch: TransactionBatch, sourceIp: string): Promise<TransactionBatch>;
    getTransactionBatches(address: string): Promise<TransactionBatch[]>;
    getTransactionBatch(address: string, batchId: string): Promise<TransactionBatch | undefined>;
    startTransactionGroup(batch: TransactionBatch, group: TransactionBatchGroup): Promise<any>;
    private executeTransaction;
    convertToTransactionBatch(batch: TransactionBatchSimplified): TransactionBatch;
    convertFromTransactionBatch(batch: TransactionBatch): TransactionBatchSimplifiedResult;
}
