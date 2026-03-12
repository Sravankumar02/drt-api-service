import { IndexerService } from '../../common/indexer/indexer.service';
import { QueryPagination } from '../../common/entities/query.pagination';
import { Events } from './entities/events';
import { EventsFilter } from './entities/events.filter';
export declare class EventsService {
    private readonly indexerService;
    constructor(indexerService: IndexerService);
    getEvents(pagination: QueryPagination, filter: EventsFilter): Promise<Events[]>;
    getEvent(txHash: string): Promise<Events | undefined>;
    getEventsCount(filter: EventsFilter): Promise<number>;
    private mapEvent;
}
