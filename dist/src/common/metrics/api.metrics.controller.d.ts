import { ApiMetricsService } from "./api.metrics.service";
export declare class ApiMetricsController {
    private readonly metricsService;
    constructor(metricsService: ApiMetricsService);
    getMetrics(): Promise<string>;
}
