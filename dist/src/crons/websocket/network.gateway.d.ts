import { Server, Socket } from 'socket.io';
import { NetworkService } from '../../endpoints/network/network.service';
export declare class NetworkGateway {
    private readonly networkService;
    private readonly logger;
    server: Server;
    constructor(networkService: NetworkService);
    handleSubscription(client: Socket): Promise<{
        status: string;
    }>;
    handleUnsubscribe(client: Socket): Promise<{
        status: string;
    }>;
    pushStats(): Promise<void>;
}
