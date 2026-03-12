import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { ClientProxy } from "@nestjs/microservices";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { TransactionsBatchService } from "src/endpoints/transactions.batch/transactions.batch.service";
import { TransactionService } from "src/endpoints/transactions/transaction.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
export declare class BatchTransactionProcessorService {
    private readonly apiConfigService;
    private readonly cachingService;
    private readonly transactionsBatchService;
    private clientProxy;
    private readonly transactionService;
    private readonly eventEmitter;
    private isRunnningHandleNewTransactions;
    private transactionProcessor;
    private readonly logger;
    constructor(apiConfigService: ApiConfigService, cachingService: CacheService, transactionsBatchService: TransactionsBatchService, clientProxy: ClientProxy, transactionService: TransactionService, eventEmitter: EventEmitter2);
    handleDroppedTransactions(): Promise<void>;
    handleNewTransactions(): Promise<void>;
    private handleTransactionBatches;
    private processTransaction;
}
