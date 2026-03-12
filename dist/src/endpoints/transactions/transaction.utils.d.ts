import { TransactionFilter } from "src/endpoints/transactions/entities/transaction.filter";
import { TransactionOperation } from "src/endpoints/transactions/entities/transaction.operation";
import '@sravankumar02/sdk-nestjs-common/lib/utils/extensions/array.extensions';
export declare class TransactionUtils {
    static isTransactionCountQueryWithAddressOnly(filter: TransactionFilter, address?: string): boolean;
    static isTransactionCountQueryWithSenderAndReceiver(filter: TransactionFilter): boolean;
    static trimOperations(sender: string, operations: TransactionOperation[], previousHashes: Record<string, string>): TransactionOperation[];
}
