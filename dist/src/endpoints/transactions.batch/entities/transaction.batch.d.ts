import { TransactionBatchGroup } from "./transaction.batch.group";
import { TransactionBatchStatus } from "./transaction.batch.status";
export declare class TransactionBatch {
    id: string;
    groups: TransactionBatchGroup[];
    status: TransactionBatchStatus;
    sourceIp: string;
    static getAddress(batch: TransactionBatch): string;
}
