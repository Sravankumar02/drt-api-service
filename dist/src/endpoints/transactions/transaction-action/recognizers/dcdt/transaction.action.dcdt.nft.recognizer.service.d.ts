import { ApiConfigService } from "src/common/api-config/api.config.service";
import { TokenTransferService } from "src/endpoints/tokens/token.transfer.service";
import { TransactionAction } from "../../entities/transaction.action";
import { TransactionActionCategory } from "../../entities/transaction.action.category";
import { TransactionMetadata } from "../../entities/transaction.metadata";
import { TransactionMetadataTransfer } from "../../entities/transaction.metadata.transfer";
import { TransactionActionRecognizerInterface } from "../../transaction.action.recognizer.interface";
export declare class TransactionActionDcdtNftRecognizerService implements TransactionActionRecognizerInterface {
    private readonly apiConfigService;
    private readonly tokenTransferService;
    constructor(apiConfigService: ApiConfigService, tokenTransferService: TokenTransferService);
    recognize(metadata: TransactionMetadata): Promise<TransactionAction | undefined>;
    recognizeFreeze(metadata: TransactionMetadata): Promise<TransactionAction | undefined>;
    recognizeBurn(metadata: TransactionMetadata): Promise<TransactionAction | undefined>;
    private recognizeTransfer;
    getMultiTransferActionWithTicker(metadata: TransactionMetadata, category: TransactionActionCategory, name: string, action: string): TransactionAction | undefined;
    getMultiTransferActionWithFullDescription(metadata: TransactionMetadata, category: TransactionActionCategory, name: string, action: string): TransactionAction | undefined;
    getMultiTransferAction(metadata: TransactionMetadata, category: TransactionActionCategory, name: string, description: string): TransactionAction | undefined;
    getNftTransferDetails(transfer: TransactionMetadataTransfer): any;
    getMultiTransferDescription(transfer: TransactionMetadataTransfer): string | undefined;
    private getTokenTransferDescription;
    private getNftTransferDescription;
}
