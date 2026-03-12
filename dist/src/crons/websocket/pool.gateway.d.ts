import { Server, Socket } from 'socket.io';
import { PoolService } from '../../endpoints/pool/pool.service';
import { PoolSubscribePayload } from '../../endpoints/pool/entities/pool.subscribe';
export declare class PoolGateway {
    private readonly poolService;
    private readonly logger;
    static readonly keyPrefix = "pool-";
    server: Server;
    constructor(poolService: PoolService);
    handleSubscription(client: Socket, payload: PoolSubscribePayload): Promise<{
        status: string;
    }>;
    handleUnsubscribe(client: Socket, payload: PoolSubscribePayload): Promise<{
        status: string;
    }>;
    pushPoolForRoom(roomName: string): Promise<void>;
    pushPool(): Promise<void>;
}
