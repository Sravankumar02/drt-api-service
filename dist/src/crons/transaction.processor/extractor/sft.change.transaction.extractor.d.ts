import { ShardTransaction } from "@terradharitri/sdk-transaction-processor";
import { TransactionExtractorInterface } from "./transaction.extractor.interface";
export declare class SftChangeTransactionExtractor implements TransactionExtractorInterface<string> {
    extract(transaction: ShardTransaction): string | undefined;
}
