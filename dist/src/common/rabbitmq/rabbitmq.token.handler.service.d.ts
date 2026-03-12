import { NotifierEvent } from './entities/notifier.event';
import { DcdtService } from 'src/endpoints/dcdt/dcdt.service';
import { ClientProxy } from '@nestjs/microservices';
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
export declare class RabbitMqTokenHandlerService {
    private readonly cachingService;
    private readonly dcdtService;
    private clientProxy;
    private readonly logger;
    constructor(cachingService: CacheService, dcdtService: DcdtService, clientProxy: ClientProxy);
    handleTransferOwnershipEvent(event: NotifierEvent): Promise<boolean>;
    private invalidateKey;
    private refreshCacheKey;
}
