import { TransactionAction } from "../../entities/transaction.action";
import { TransactionMetadata } from "../../entities/transaction.metadata";
import { MoaSettings } from "../../../../moa/entities/moa.settings";
import { TokenTransferService } from "src/endpoints/tokens/token.transfer.service";
import { MoaSettingsService } from "../../../../moa/moa.settings.service";
import { TransactionActionDcdtNftRecognizerService } from "../dcdt/transaction.action.dcdt.nft.recognizer.service";
export declare class MoaPairActionRecognizerService {
    private readonly moaSettingsService;
    private readonly tokenTransferService;
    private readonly transactionActionDcdtNftRecognizerService;
    constructor(moaSettingsService: MoaSettingsService, tokenTransferService: TokenTransferService, transactionActionDcdtNftRecognizerService: TransactionActionDcdtNftRecognizerService);
    recognize(settings: MoaSettings, metadata: TransactionMetadata): Promise<TransactionAction | undefined>;
    private getSwapAction;
    private getMultiSwapAction;
    private getAddLiquidityAction;
    private getRemoveLiquidityAction;
}
