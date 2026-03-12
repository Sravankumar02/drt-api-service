import { Server, Socket } from 'socket.io';
import { TransactionService } from '../../endpoints/transactions/transaction.service';
import { TransactionSubscribePayload } from '../../endpoints/transactions/entities/dtos/transaction.subscribe';
export declare class TransactionsGateway {
    private readonly transactionService;
    private readonly logger;
    static readonly keyPrefix = "tx-";
    server: Server;
    constructor(transactionService: TransactionService);
    handleSubscription(client: Socket, payload: TransactionSubscribePayload): Promise<{
        status: string;
    }>;
    handleUnsubscribe(client: Socket, payload: TransactionSubscribePayload): Promise<{
        status: string;
    }>;
    pushTransactionsForRoom(roomName: string): Promise<void>;
    pushTransactions(): Promise<void>;
}
