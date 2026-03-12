import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { IdentitiesService } from "src/endpoints/identities/identities.service";
import { ProviderService } from "src/endpoints/providers/provider.service";
import { TransactionAction } from "../../entities/transaction.action";
import { TransactionMetadata } from "../../entities/transaction.metadata";
import { TransactionActionRecognizerInterface } from "../../transaction.action.recognizer.interface";
export declare class StakeActionRecognizerService implements TransactionActionRecognizerInterface {
    private readonly providerService;
    private readonly identitiesService;
    private readonly cachingService;
    constructor(providerService: ProviderService, identitiesService: IdentitiesService, cachingService: CacheService);
    private getProviders;
    recognize(metadata: TransactionMetadata): Promise<TransactionAction | undefined>;
    private getDelegateAction;
    private getUnDelegateAction;
    private getAction;
}
