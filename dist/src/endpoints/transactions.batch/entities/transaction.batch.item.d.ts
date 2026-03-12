import { Transaction } from "./transaction";
import { BatchTransactionStatus } from "./batch.transaction.status";
export declare class TransactionBatchItem {
    transaction: Transaction;
    status: BatchTransactionStatus;
    error?: string;
}
