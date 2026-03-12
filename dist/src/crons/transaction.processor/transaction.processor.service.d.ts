import { ClientProxy } from "@nestjs/microservices";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { NodeService } from "src/endpoints/nodes/node.service";
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { ShardTransaction } from "@terradharitri/sdk-transaction-processor";
export declare class TransactionProcessorService {
    private readonly cachingService;
    private readonly apiConfigService;
    private clientProxy;
    private readonly nodeService;
    private readonly eventEmitter;
    private readonly logger;
    private transactionProcessor;
    constructor(cachingService: CacheService, apiConfigService: ApiConfigService, clientProxy: ClientProxy, nodeService: NodeService, eventEmitter: EventEmitter2);
    handleNewTransactions(): Promise<void>;
    private tryInvalidateTokenProperties;
    tryInvalidateOwner(transaction: ShardTransaction): Promise<string[]>;
    tryInvalidateCollectionProperties(transaction: ShardTransaction): Promise<string[]>;
    tryInvalidateStakeTopup(transaction: ShardTransaction): Promise<string[]>;
}
