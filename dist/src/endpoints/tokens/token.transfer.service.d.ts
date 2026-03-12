import { DcdtService } from "../dcdt/dcdt.service";
import { AssetsService } from "../../common/assets/assets.service";
import { TokenTransferProperties } from "./entities/token.transfer.properties";
import { TransactionLog } from "../transactions/entities/transaction.log";
import { TransactionOperation } from "../transactions/entities/transaction.operation";
import { TransactionDetailed } from "../transactions/entities/transaction.detailed";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { DataApiService } from "src/common/data-api/data-api.service";
export declare class TokenTransferService {
    private readonly cachingService;
    private readonly dcdtService;
    private readonly assetsService;
    private readonly dataApiService;
    private readonly logger;
    constructor(cachingService: CacheService, dcdtService: DcdtService, assetsService: AssetsService, dataApiService: DataApiService);
    getTokenTransfer(elasticTransaction: any): {
        tokenIdentifier: string;
        tokenAmount: string;
    } | undefined;
    private getTokenTransferPropertiesFromLogs;
    getOperationsForTransaction(transaction: TransactionDetailed, logs: TransactionLog[]): Promise<TransactionOperation[]>;
    private getOperationsForTransactionScResults;
    getOperationsForTransactionLogs(txHash: string, logs: TransactionLog[], sender: string): Promise<TransactionOperation[]>;
    private getTransactionLogOperation;
    private getOperationDcdtActionByEventIdentifier;
    private getTransactionMultiDCDTNFTOperations;
    private getTransactionNftOperation;
    private getTransactionTransferValueOperation;
    getTokenTransferProperties(options: {
        identifier: string;
        nonce?: string;
        timestamp?: number;
        value?: string;
        applyValue?: boolean;
    }): Promise<TokenTransferProperties | null>;
    getTokenTransferPropertiesRaw(identifier: string): Promise<TokenTransferProperties | null>;
}
