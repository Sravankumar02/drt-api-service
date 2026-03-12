import { MetricsService } from '@sravankumar02/sdk-nestjs-monitoring';
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { GatewayService } from "../gateway/gateway.service";
import { ProtocolService } from "../protocol/protocol.service";
import { LogMetricsEvent } from "../entities/log.metrics.event";
export declare class ApiMetricsService {
    private readonly apiConfigService;
    private readonly gatewayService;
    private readonly protocolService;
    private readonly metricsService;
    private static vmQueriesHistogram;
    private static gatewayDurationHistogram;
    private static persistenceDurationHistogram;
    private static indexerDurationHistogram;
    private static graphqlDurationHistogram;
    private static currentNonceGauge;
    private static lastProcessedNonceGauge;
    private static lastProcessedBatchProcessorNonce;
    private static lastProcessedTransactionCompletedProcessorNonce;
    private static transactionsCompletedCounter;
    private static transactionsPendingResultsCounter;
    private static batchUpdatesCounter;
    private static subscriptionsConnectionsGauge;
    private static subscriptionsTopicConnectionsGauge;
    constructor(apiConfigService: ApiConfigService, gatewayService: GatewayService, protocolService: ProtocolService, metricsService: MetricsService);
    setVmQuery(payload: LogMetricsEvent): void;
    setGatewayDuration(payload: LogMetricsEvent): void;
    setPersistenceDuration(payload: LogMetricsEvent): void;
    setIndexerDuration(payload: LogMetricsEvent): void;
    setGraphqlDuration(payload: LogMetricsEvent): void;
    setLastProcessedNonce(payload: LogMetricsEvent): void;
    setLastProcessedBatchProcessorNonce(payload: LogMetricsEvent): void;
    setLastProcessedTransactionCompletedProcessorNonce(payload: LogMetricsEvent): void;
    setWebsocketSubscriptionsMetrics(payload: {
        connectedClients: number;
        topics?: Record<string, number>;
    }): void;
    recordTransactionsCompleted(payload: {
        transactions: any[];
    }): void;
    recordTransactionsPendingResults(payload: {
        transactions: any[];
    }): void;
    recordBatchUpdated(): void;
    getMetrics(): Promise<string>;
    private getCurrentNonces;
    getCurrentNonce(shardId: number): Promise<number>;
}
