import { Server, Socket } from 'socket.io';
import { TransactionService } from '../../endpoints/transactions/transaction.service';
import { TransactionCustomSubscribePayload } from 'src/endpoints/transactions/entities/dtos/transaction.custom.subscribe';
export declare class TransactionsCustomGateway {
    private readonly transactionService;
    private readonly logger;
    static keyPrefix: string;
    server: Server;
    constructor(transactionService: TransactionService);
    handleCustomSubscription(client: Socket, payload: TransactionCustomSubscribePayload): Promise<{
        status: string;
    }>;
    handleCustomUnsubscribe(client: Socket, payload: TransactionCustomSubscribePayload): Promise<{
        status: string;
    }>;
    pushTransactionsForTimestampMs(timestampMs: number): Promise<void>;
}
