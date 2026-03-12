import { ShardTransaction } from "@terradharitri/sdk-transaction-processor";
import { Server, Socket } from 'socket.io';
import { TransactionActionService } from "src/endpoints/transactions/transaction-action/transaction.action.service";
export declare class WebSocketPublisherService {
    private readonly transactionActionService;
    private readonly maxAddressesSize;
    server: Server | undefined;
    constructor(transactionActionService: TransactionActionService);
    handleDisconnect(socket: Socket): Promise<void>;
    handleConnection(socket: Socket): Promise<void>;
    onTransactionCompleted(transaction: ShardTransaction): Promise<void>;
    onTransactionPendingResults(transaction: ShardTransaction): Promise<void>;
    onBatchUpdated(address: string, batchId: string, txHashes: string[]): void;
    private emitTransactionEvent;
    private getAddressesFromSocketQuery;
}
