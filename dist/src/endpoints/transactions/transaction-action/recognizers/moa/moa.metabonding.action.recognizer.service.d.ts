import { ApiConfigService } from "src/common/api-config/api.config.service";
import { TransactionAction } from "../../entities/transaction.action";
import { TransactionMetadata } from "../../entities/transaction.metadata";
export declare class MetabondingActionRecognizerService {
    private readonly apiConfigService;
    constructor(apiConfigService: ApiConfigService);
    recognize(metadata: TransactionMetadata): Promise<TransactionAction | undefined>;
    private getClaimRewardsAction;
}
