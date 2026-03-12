import { Server, Socket } from 'socket.io';
import { BlockService } from '../../endpoints/blocks/block.service';
import { BlockSubscribePayload } from '../../endpoints/blocks/entities/block.subscribe';
export declare class BlocksGateway {
    private readonly blockService;
    private readonly logger;
    static readonly keyPrefix = "blocks-";
    server: Server;
    constructor(blockService: BlockService);
    handleSubscription(client: Socket, payload: BlockSubscribePayload): Promise<{
        status: string;
    }>;
    handleUnsubscribe(client: Socket, payload: BlockSubscribePayload): Promise<{
        status: string;
    }>;
    pushBlocksForRoom(roomName: string): Promise<void>;
    pushBlocks(): Promise<void>;
}
