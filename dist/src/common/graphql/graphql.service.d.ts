import { ApiConfigService } from "../api-config/api.config.service";
export declare class GraphQlService {
    private readonly apiConfigService;
    private readonly logger;
    constructor(apiConfigService: ApiConfigService);
    getExchangeServiceData(query: string, variables?: any): Promise<any>;
    getNftServiceData(query: string, variables: any): Promise<any>;
    private createFetchWithTimeout;
}
