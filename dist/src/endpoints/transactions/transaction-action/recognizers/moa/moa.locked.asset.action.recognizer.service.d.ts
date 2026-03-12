import { TransactionAction } from "../../entities/transaction.action";
import { TransactionMetadata } from "../../entities/transaction.metadata";
import { TransactionActionDcdtNftRecognizerService } from "../dcdt/transaction.action.dcdt.nft.recognizer.service";
import { MoaSettings } from "../../../../moa/entities/moa.settings";
import { MoaSettingsService } from "../../../../moa/moa.settings.service";
export declare class MoaLockedAssetActionRecognizerService {
    private readonly moaSettingsService;
    private readonly transactionActionDcdtNftRecognizerService;
    constructor(moaSettingsService: MoaSettingsService, transactionActionDcdtNftRecognizerService: TransactionActionDcdtNftRecognizerService);
    recognize(settings: MoaSettings, metadata: TransactionMetadata): TransactionAction | undefined;
    private getMergeLockedAssetTokens;
    private getAssetsAction;
}
