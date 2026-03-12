import { TransactionBatchSimplified } from "./entities/transaction.batch.simplified";
import { TransactionBatchSimplifiedResult } from "./entities/transaction.batch.simplified.result";
import { TransactionsBatchService } from "./transactions.batch.service";
export declare class TransactionsBatchController {
    private readonly transactionsBatchService;
    private readonly logger;
    constructor(transactionsBatchService: TransactionsBatchService);
    startTransactionBatch(batch: TransactionBatchSimplified, headers: any): Promise<TransactionBatchSimplifiedResult>;
    getTransactionBatch(address: string, batchId: string): Promise<TransactionBatchSimplifiedResult>;
    getTransactionBatches(address: string): Promise<TransactionBatchSimplifiedResult[]>;
}
