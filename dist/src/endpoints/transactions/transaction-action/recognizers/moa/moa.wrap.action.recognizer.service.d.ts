import { TransactionAction } from "../../entities/transaction.action";
import { TransactionMetadata } from "../../entities/transaction.metadata";
import { TransactionActionDcdtNftRecognizerService } from "../dcdt/transaction.action.dcdt.nft.recognizer.service";
import { MoaSettings } from "../../../../moa/entities/moa.settings";
import { MoaSettingsService } from "../../../../moa/moa.settings.service";
export declare class MoaWrapActionRecognizerService {
    private readonly transactionActionDcdtNftRecognizerService;
    private readonly moaSettingsService;
    constructor(transactionActionDcdtNftRecognizerService: TransactionActionDcdtNftRecognizerService, moaSettingsService: MoaSettingsService);
    recognize(settings: MoaSettings, metadata: TransactionMetadata): TransactionAction | undefined;
    private getWrapAction;
    private getUnwrapAction;
}
