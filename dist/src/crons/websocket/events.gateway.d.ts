import { Server, Socket } from 'socket.io';
import { EventsService } from '../../endpoints/events/events.service';
import { EventsSubscribePayload } from '../../endpoints/events/entities/events.subscribe';
export declare class EventsGateway {
    private readonly eventsService;
    private readonly logger;
    static readonly keyPrefix = "events-";
    server: Server;
    constructor(eventsService: EventsService);
    handleSubscription(client: Socket, payload: EventsSubscribePayload): Promise<{
        status: string;
    }>;
    handleUnsubscribe(client: Socket, payload: EventsSubscribePayload): Promise<{
        status: string;
    }>;
    pushEventsForRoom(roomName: string): Promise<void>;
    pushEvents(): Promise<void>;
}
