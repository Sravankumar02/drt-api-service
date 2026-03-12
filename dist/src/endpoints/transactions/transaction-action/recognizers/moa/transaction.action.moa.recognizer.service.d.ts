import { TransactionAction } from "../../entities/transaction.action";
import { TransactionMetadata } from "../../entities/transaction.metadata";
import { TransactionActionRecognizerInterface } from "../../transaction.action.recognizer.interface";
import { MoaFarmActionRecognizerService } from "./moa.farm.action.recognizer.service";
import { MoaPairActionRecognizerService } from "./moa.pair.action.recognizer.service";
import { MoaWrapActionRecognizerService } from "./moa.wrap.action.recognizer.service";
import { MoaDistributionActionRecognizerService } from "./moa.distribution.action.recognizer.service";
import { MoaLockedAssetActionRecognizerService } from "./moa.locked.asset.action.recognizer.service";
import { MoaSettingsService } from "../../../../moa/moa.settings.service";
import { ApiConfigService } from "src/common/api-config/api.config.service";
export declare class TransactionActionMoaRecognizerService implements TransactionActionRecognizerInterface {
    private readonly pairActionRecognizer;
    private readonly farmActionRecognizer;
    private readonly wrapActionRecognizer;
    private readonly distributionRecognizer;
    private readonly lockedAssetRecognizer;
    private readonly moaSettingsService;
    private readonly apiConfigService;
    constructor(pairActionRecognizer: MoaPairActionRecognizerService, farmActionRecognizer: MoaFarmActionRecognizerService, wrapActionRecognizer: MoaWrapActionRecognizerService, distributionRecognizer: MoaDistributionActionRecognizerService, lockedAssetRecognizer: MoaLockedAssetActionRecognizerService, moaSettingsService: MoaSettingsService, apiConfigService: ApiConfigService);
    isActive(): Promise<boolean>;
    recognize(metadata: TransactionMetadata): Promise<TransactionAction | undefined>;
}
