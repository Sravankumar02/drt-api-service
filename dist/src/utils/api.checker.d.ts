export declare class ApiChecker {
    private readonly endpoint;
    private readonly httpServer;
    skipFields: string[];
    defaultParams: Record<string, any>;
    constructor(endpoint: string, httpServer: any);
    checkPagination(): Promise<void>;
    checkDetails(field?: string): Promise<void>;
    private requestItemParallel;
    checkTokensDetails(): Promise<void>;
    checkAlternativeCount(params?: Record<string, any>): Promise<void>;
    checkFilter(criterias: string[]): Promise<void>;
    checkFilterInternal(criteria: string): Promise<void>;
    checkStatus(): Promise<void>;
    checkFilterValueInternal(criteria: string, value: string): Promise<void>;
    private checkPaginationInternal;
    private requestItem;
    private requestList;
    private requestCount;
    private requestAlternativeCount;
    private requestStatus;
}
