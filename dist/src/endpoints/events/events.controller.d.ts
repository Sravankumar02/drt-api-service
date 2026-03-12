import { EventsService } from './events.service';
import { Events } from './entities/events';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    getEvents(from: number, size: number, address: string, logAddress: string, identifier: string, txHash: string, shard: number, before: number, after: number, order: number, topics: string | string[]): Promise<Events[]>;
    getEventsCount(address: string, identifier: string, txHash: string, shard: number, before: number, after: number, topics: string | string[]): Promise<number>;
    getEvent(txHash: string): Promise<Events | undefined>;
}
