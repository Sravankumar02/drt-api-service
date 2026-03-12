import { TransactionAction } from "./entities/transaction.action";
import { TransactionMetadata } from "./entities/transaction.metadata";
export declare class TransactionActionRecognizerInterface {
    recognize(metadata: TransactionMetadata): Promise<TransactionAction | undefined>;
}
