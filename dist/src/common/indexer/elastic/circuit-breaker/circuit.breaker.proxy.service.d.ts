import { ElasticQuery, ElasticService } from "@sravankumar02/sdk-nestjs-elastic";
import { ApiConfigService } from "../../../api-config/api.config.service";
export declare class EsCircuitBreakerProxy {
    readonly apiConfigService: ApiConfigService;
    private readonly elasticService;
    private failureCount;
    private lastFailureTime;
    private isCircuitOpen;
    private readonly logger;
    private readonly enabled;
    private readonly config;
    constructor(apiConfigService: ApiConfigService, elasticService: ElasticService);
    private withCircuitBreaker;
    getCount(index: string, query: ElasticQuery): Promise<number>;
    getList(index: string, id: string, query: ElasticQuery): Promise<any[]>;
    getItem(index: string, id: string, value: string): Promise<any>;
    getCustomValue(index: string, id: string, key: string): Promise<any>;
    setCustomValue(index: string, id: string, key: string, value: any): Promise<void>;
    setCustomValues(index: string, id: string, values: Record<string, any>): Promise<void>;
    getScrollableList(index: string, id: string, query: ElasticQuery, action: (items: any[]) => Promise<void>): Promise<void>;
    get(url: string): Promise<any>;
    post(url: string, data: any): Promise<any>;
}
