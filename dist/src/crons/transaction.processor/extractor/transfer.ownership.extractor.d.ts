import { ShardTransaction } from "@terradharitri/sdk-transaction-processor";
import { TransactionExtractorInterface } from "./transaction.extractor.interface";
export declare class TransferOwnershipExtractor implements TransactionExtractorInterface<{
    identifier: string;
}> {
    extract(transaction: ShardTransaction): {
        identifier: string;
    } | undefined;
}
