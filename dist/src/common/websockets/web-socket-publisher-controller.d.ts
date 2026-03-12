import { ShardTransaction } from "@terradharitri/sdk-transaction-processor";
import { WebSocketPublisherService } from "src/common/websockets/web-socket-publisher-service";
import { EventEmitter2 } from "@nestjs/event-emitter";
export declare class WebSocketPublisherController {
    private readonly webSocketPublisherService;
    private readonly eventEmitter;
    private logger;
    constructor(webSocketPublisherService: WebSocketPublisherService, eventEmitter: EventEmitter2);
    transactionsCompleted(transactions: ShardTransaction[]): Promise<void>;
    transactionsPendingResults(transactions: ShardTransaction[]): Promise<void>;
    onBatchUpdated(payload: {
        address: string;
        batchId: string;
        txHashes: string[];
    }): void;
}
