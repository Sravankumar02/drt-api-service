import { Server, Socket } from 'socket.io';
import { TransferService } from 'src/endpoints/transfers/transfer.service';
import { TransferCustomSubscribePayload } from 'src/endpoints/websocket/entities/transfers.custom.payload';
export declare class TransfersCustomGateway {
    private readonly transferService;
    private readonly logger;
    static keyPrefix: string;
    server: Server;
    constructor(transferService: TransferService);
    handleCustomSubscription(client: Socket, payload: TransferCustomSubscribePayload): Promise<{
        status: string;
    }>;
    handleCustomUnsubscribe(client: Socket, payload: TransferCustomSubscribePayload): Promise<{
        status: string;
    }>;
    pushTransfersForTimestampMs(timestampMs: number): Promise<void>;
}
