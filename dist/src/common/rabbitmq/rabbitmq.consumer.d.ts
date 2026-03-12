import { RabbitMqNftHandlerService } from './rabbitmq.nft.handler.service';
import { RabbitMqTokenHandlerService } from './rabbitmq.token.handler.service';
export declare class RabbitMqConsumer {
    private readonly nftHandlerService;
    private readonly tokenHandlerService;
    private readonly logger;
    constructor(nftHandlerService: RabbitMqNftHandlerService, tokenHandlerService: RabbitMqTokenHandlerService);
    consumeEvents(rawEvents: any): Promise<void>;
    private handleEvent;
}
