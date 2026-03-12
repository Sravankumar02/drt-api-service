import { TransactionAction } from "../../entities/transaction.action";
import { TransactionMetadata } from "../../entities/transaction.metadata";
import { TransactionActionDcdtNftRecognizerService } from "../dcdt/transaction.action.dcdt.nft.recognizer.service";
import { MoaSettings } from "../../../../moa/entities/moa.settings";
export declare class MoaFarmActionRecognizerService {
    private readonly transactionActionDcdtNftRecognizerService;
    constructor(transactionActionDcdtNftRecognizerService: TransactionActionDcdtNftRecognizerService);
    recognize(settings: MoaSettings, metadata: TransactionMetadata): TransactionAction | undefined;
    private getFarmAction;
}
