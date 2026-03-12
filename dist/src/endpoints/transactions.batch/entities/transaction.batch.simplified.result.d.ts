import { TransactionBatchStatus } from "./transaction.batch.status";
import { TransactionDetails } from "./transaction.details";
export declare class TransactionBatchSimplifiedResult {
    id: string;
    status?: TransactionBatchStatus;
    transactions: TransactionDetails[][];
}
