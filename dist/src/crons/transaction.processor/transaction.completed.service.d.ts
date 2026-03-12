import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { ClientProxy } from "@nestjs/microservices";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
export declare class TransactionCompletedService {
    private readonly apiConfigService;
    private readonly cachingService;
    private clientProxy;
    private readonly eventEmitter;
    private transactionProcessor;
    private isProcessing;
    private readonly logger;
    constructor(apiConfigService: ApiConfigService, cachingService: CacheService, clientProxy: ClientProxy, eventEmitter: EventEmitter2);
    handleNewTransactions(): Promise<void>;
}
