import { TransactionAction } from "../../entities/transaction.action";
import { TransactionMetadata } from "../../entities/transaction.metadata";
import { TransactionActionRecognizerInterface } from "../../transaction.action.recognizer.interface";
export declare class SCCallActionRecognizerService implements TransactionActionRecognizerInterface {
    private builtInSelfFunctions;
    recognize(metadata: TransactionMetadata): Promise<TransactionAction | undefined>;
    private getSCDeployAction;
    private getSCCallAction;
    private isSmartContractCall;
    private isSelfBuiltInFunctionCall;
}
