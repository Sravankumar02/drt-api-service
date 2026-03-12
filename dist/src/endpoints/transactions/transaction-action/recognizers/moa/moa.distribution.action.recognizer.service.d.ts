import { TransactionAction } from "../../entities/transaction.action";
import { TransactionMetadata } from "../../entities/transaction.metadata";
import { MoaSettings } from "../../../../moa/entities/moa.settings";
export declare class MoaDistributionActionRecognizerService {
    recognize(settings: MoaSettings, metadata: TransactionMetadata): TransactionAction | undefined;
    private getClaimLockedAssetsAction;
}
