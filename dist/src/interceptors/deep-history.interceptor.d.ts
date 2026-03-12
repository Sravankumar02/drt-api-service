import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { IndexerService } from "src/common/indexer/indexer.service";
import { ProtocolService } from "src/common/protocol/protocol.service";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
export declare class DeepHistoryInterceptor implements NestInterceptor {
    private readonly indexerService;
    private readonly apiConfigService;
    private readonly protocolService;
    private readonly cacheService;
    constructor(indexerService: IndexerService, apiConfigService: ApiConfigService, protocolService: ProtocolService, cacheService: CacheService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
