import { Server, Socket } from 'socket.io';
import { EventsService } from 'src/endpoints/events/events.service';
import { EventsCustomSubscribePayload } from 'src/endpoints/events/entities/events.custom.subscribe';
export declare class EventsCustomGateway {
    private readonly eventsService;
    private readonly logger;
    static keyPrefix: string;
    server: Server;
    constructor(eventsService: EventsService);
    handleCustomSubscription(client: Socket, payload: EventsCustomSubscribePayload): Promise<{
        status: string;
    }>;
    handleCustomUnsubscribe(client: Socket, payload: EventsCustomSubscribePayload): Promise<{
        status: string;
    }>;
    pushEventsForTimestampMs(timestampMs: number): Promise<void>;
}
