"use strict";
var ApiMetricsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiMetricsService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_monitoring_1 = require("@sravankumar02/sdk-nestjs-monitoring");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const prom_client_1 = require("prom-client");
const api_config_service_1 = require("../api-config/api.config.service");
const gateway_service_1 = require("../gateway/gateway.service");
const protocol_service_1 = require("../protocol/protocol.service");
const metrics_events_constants_1 = require("../../utils/metrics-events.constants");
const log_metrics_event_1 = require("../entities/log.metrics.event");
let ApiMetricsService = ApiMetricsService_1 = class ApiMetricsService {
    constructor(apiConfigService, gatewayService, protocolService, metricsService) {
        this.apiConfigService = apiConfigService;
        this.gatewayService = gatewayService;
        this.protocolService = protocolService;
        this.metricsService = metricsService;
        if (!ApiMetricsService_1.subscriptionsConnectionsGauge) {
            ApiMetricsService_1.subscriptionsConnectionsGauge = new prom_client_1.Gauge({
                name: 'websocket_subscriptions_connections',
                help: 'Number of websocket connections for subscriptions',
            });
        }
        if (!ApiMetricsService_1.subscriptionsTopicConnectionsGauge) {
            ApiMetricsService_1.subscriptionsTopicConnectionsGauge = new prom_client_1.Gauge({
                name: 'websocket_subscriptions_topic_connections',
                help: 'Unique websocket clients per topic',
                labelNames: ['topic'],
            });
        }
        if (!ApiMetricsService_1.vmQueriesHistogram) {
            ApiMetricsService_1.vmQueriesHistogram = new prom_client_1.Histogram({
                name: 'vm_query',
                help: 'VM Queries',
                labelNames: ['address', 'function'],
                buckets: [],
            });
        }
        if (!ApiMetricsService_1.gatewayDurationHistogram) {
            ApiMetricsService_1.gatewayDurationHistogram = new prom_client_1.Histogram({
                name: 'gateway_duration',
                help: 'Gateway Duration',
                labelNames: ['endpoint'],
                buckets: [],
            });
        }
        if (!ApiMetricsService_1.persistenceDurationHistogram) {
            ApiMetricsService_1.persistenceDurationHistogram = new prom_client_1.Histogram({
                name: 'persistence_duration',
                help: 'Persistence Duration',
                labelNames: ['action'],
                buckets: [],
            });
        }
        if (!ApiMetricsService_1.indexerDurationHistogram) {
            ApiMetricsService_1.indexerDurationHistogram = new prom_client_1.Histogram({
                name: 'indexer_duration',
                help: 'Indexer Duration',
                labelNames: ['action'],
                buckets: [],
            });
        }
        if (!ApiMetricsService_1.graphqlDurationHistogram) {
            ApiMetricsService_1.graphqlDurationHistogram = new prom_client_1.Histogram({
                name: 'query_duration',
                help: 'The time it takes to resolve a query',
                labelNames: ['query'],
                buckets: [],
            });
        }
        if (!ApiMetricsService_1.currentNonceGauge) {
            ApiMetricsService_1.currentNonceGauge = new prom_client_1.Gauge({
                name: 'current_nonce',
                help: 'Current nonce of the given shard',
                labelNames: ['shardId'],
            });
        }
        if (!ApiMetricsService_1.lastProcessedNonceGauge) {
            ApiMetricsService_1.lastProcessedNonceGauge = new prom_client_1.Gauge({
                name: 'last_processed_nonce',
                help: 'Last processed nonce of the given shard',
                labelNames: ['shardId'],
            });
        }
        if (!ApiMetricsService_1.lastProcessedBatchProcessorNonce) {
            ApiMetricsService_1.lastProcessedBatchProcessorNonce = new prom_client_1.Gauge({
                name: 'last_processed_batch_processor_nonce',
                help: 'Last processed nonce of the given shard',
                labelNames: ['shardId'],
            });
        }
        if (!ApiMetricsService_1.lastProcessedTransactionCompletedProcessorNonce) {
            ApiMetricsService_1.lastProcessedTransactionCompletedProcessorNonce = new prom_client_1.Gauge({
                name: 'last_processed_transaction_completed_processor_nonce',
                help: 'Last processed nonce of the given shard',
                labelNames: ['shardId'],
            });
        }
        if (!ApiMetricsService_1.transactionsCompletedCounter) {
            ApiMetricsService_1.transactionsCompletedCounter = new prom_client_1.Counter({
                name: 'websocket_transactions_completed_total',
                help: 'Total number of completed transactions processed via websocket',
            });
        }
        if (!ApiMetricsService_1.transactionsPendingResultsCounter) {
            ApiMetricsService_1.transactionsPendingResultsCounter = new prom_client_1.Counter({
                name: 'websocket_transactions_pending_results_total',
                help: 'Total number of transactions with pending results processed via websocket',
            });
        }
        if (!ApiMetricsService_1.batchUpdatesCounter) {
            ApiMetricsService_1.batchUpdatesCounter = new prom_client_1.Counter({
                name: 'websocket_batch_updates_total',
                help: 'Total number of batch updates processed via websocket',
            });
        }
    }
    setVmQuery(payload) {
        const [address, func, duration] = payload.args;
        ApiMetricsService_1.vmQueriesHistogram.labels(address, func).observe(duration);
    }
    setGatewayDuration(payload) {
        const [name, duration] = payload.args;
        ApiMetricsService_1.gatewayDurationHistogram.labels(name).observe(duration);
    }
    setPersistenceDuration(payload) {
        const [action, duration] = payload.args;
        this.metricsService.setExternalCall('persistence', duration);
        ApiMetricsService_1.persistenceDurationHistogram.labels(action).observe(duration);
    }
    setIndexerDuration(payload) {
        const [action, duration] = payload.args;
        this.metricsService.setExternalCall('indexer', duration);
        ApiMetricsService_1.indexerDurationHistogram.labels(action).observe(duration);
    }
    setGraphqlDuration(payload) {
        const [action, duration] = payload.args;
        this.metricsService.setExternalCall('graphql', duration);
        ApiMetricsService_1.graphqlDurationHistogram.labels(action).observe(duration);
    }
    setLastProcessedNonce(payload) {
        const [shardId, nonce] = payload.args;
        ApiMetricsService_1.lastProcessedNonceGauge.set({ shardId }, nonce);
    }
    setLastProcessedBatchProcessorNonce(payload) {
        const [shardId, nonce] = payload.args;
        ApiMetricsService_1.lastProcessedBatchProcessorNonce.set({ shardId }, nonce);
    }
    setLastProcessedTransactionCompletedProcessorNonce(payload) {
        const [shardId, nonce] = payload.args;
        ApiMetricsService_1.lastProcessedTransactionCompletedProcessorNonce.set({ shardId }, nonce);
    }
    setWebsocketSubscriptionsMetrics(payload) {
        const { connectedClients, topics } = payload;
        ApiMetricsService_1.subscriptionsConnectionsGauge.set(connectedClients);
        if (topics) {
            for (const [topic, count] of Object.entries(topics)) {
                ApiMetricsService_1.subscriptionsTopicConnectionsGauge.set({ topic }, count);
            }
        }
    }
    recordTransactionsCompleted(payload) {
        ApiMetricsService_1.transactionsCompletedCounter.inc(payload.transactions.length);
    }
    recordTransactionsPendingResults(payload) {
        ApiMetricsService_1.transactionsPendingResultsCounter.inc(payload.transactions.length);
    }
    recordBatchUpdated() {
        ApiMetricsService_1.batchUpdatesCounter.inc();
    }
    async getMetrics() {
        const shardIds = await this.protocolService.getShardIds();
        if (this.apiConfigService.getIsTransactionProcessorCronActive()) {
            const currentNonces = await this.getCurrentNonces();
            for (const [index, shardId] of shardIds.entries()) {
                ApiMetricsService_1.currentNonceGauge.set({ shardId }, currentNonces[index]);
            }
        }
        const baseMetrics = await this.metricsService.getMetrics();
        const currentMetrics = await prom_client_1.register.metrics();
        return baseMetrics + '\n' + currentMetrics;
    }
    async getCurrentNonces() {
        const shardIds = await this.protocolService.getShardIds();
        return await Promise.all(shardIds.map(shardId => this.getCurrentNonce(shardId)));
    }
    async getCurrentNonce(shardId) {
        const shardInfo = await this.gatewayService.getNetworkStatus(shardId);
        return shardInfo.drt_nonce;
    }
};
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(metrics_events_constants_1.MetricsEvents.SetVmQuery),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [log_metrics_event_1.LogMetricsEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], ApiMetricsService.prototype, "setVmQuery", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(metrics_events_constants_1.MetricsEvents.SetGatewayDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [log_metrics_event_1.LogMetricsEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], ApiMetricsService.prototype, "setGatewayDuration", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(metrics_events_constants_1.MetricsEvents.SetPersistenceDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [log_metrics_event_1.LogMetricsEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], ApiMetricsService.prototype, "setPersistenceDuration", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [log_metrics_event_1.LogMetricsEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], ApiMetricsService.prototype, "setIndexerDuration", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(metrics_events_constants_1.MetricsEvents.SetGraphqlDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [log_metrics_event_1.LogMetricsEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], ApiMetricsService.prototype, "setGraphqlDuration", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(metrics_events_constants_1.MetricsEvents.SetLastProcessedNonce),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [log_metrics_event_1.LogMetricsEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], ApiMetricsService.prototype, "setLastProcessedNonce", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(metrics_events_constants_1.MetricsEvents.SetLastProcessedBatchProcessorNonce),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [log_metrics_event_1.LogMetricsEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], ApiMetricsService.prototype, "setLastProcessedBatchProcessorNonce", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(metrics_events_constants_1.MetricsEvents.SetLastProcessedTransactionCompletedProcessorNonce),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [log_metrics_event_1.LogMetricsEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], ApiMetricsService.prototype, "setLastProcessedTransactionCompletedProcessorNonce", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(metrics_events_constants_1.MetricsEvents.SetWebsocketMetrics),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ApiMetricsService.prototype, "setWebsocketSubscriptionsMetrics", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(metrics_events_constants_1.MetricsEvents.SetTransactionsCompleted),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ApiMetricsService.prototype, "recordTransactionsCompleted", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(metrics_events_constants_1.MetricsEvents.SetTransactionsPendingResults),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ApiMetricsService.prototype, "recordTransactionsPendingResults", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)(metrics_events_constants_1.MetricsEvents.SetBatchUpdated),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ApiMetricsService.prototype, "recordBatchUpdated", null);
ApiMetricsService = ApiMetricsService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => gateway_service_1.GatewayService))),
    tslib_1.__param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => protocol_service_1.ProtocolService))),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        gateway_service_1.GatewayService,
        protocol_service_1.ProtocolService,
        sdk_nestjs_monitoring_1.MetricsService])
], ApiMetricsService);
exports.ApiMetricsService = ApiMetricsService;
//# sourceMappingURL=api.metrics.service.js.map