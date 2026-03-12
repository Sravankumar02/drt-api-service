import { ShardTransaction } from "@terradharitri/sdk-transaction-processor";
import { TransactionDetailed } from "src/endpoints/transactions/entities/transaction.detailed";
import { TransactionExtractorInterface } from "./transaction.extractor.interface";
export declare class NftCreateTransactionExtractor implements TransactionExtractorInterface<{
    collection: string;
}> {
    private readonly logger;
    canDetectNftCreateTransactionFromLogs(transaction: ShardTransaction): Boolean;
    extract(transaction: ShardTransaction, transactionDetailed?: TransactionDetailed): {
        collection: string;
    } | undefined;
}
