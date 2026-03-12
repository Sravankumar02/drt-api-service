"use strict";
var TransactionCompletedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionCompletedService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const schedule_1 = require("@nestjs/schedule");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const cache_info_1 = require("../../utils/cache.info");
const log_metrics_event_1 = require("../../common/entities/log.metrics.event");
const event_emitter_1 = require("@nestjs/event-emitter");
const metrics_events_constants_1 = require("../../utils/metrics-events.constants");
const sdk_transaction_processor_1 = require("@terradharitri/sdk-transaction-processor");
const log_topic_1 = require("@terradharitri/sdk-transaction-processor/lib/types/log-topic");
let TransactionCompletedService = TransactionCompletedService_1 = class TransactionCompletedService {
    constructor(apiConfigService, cachingService, clientProxy, eventEmitter) {
        this.apiConfigService = apiConfigService;
        this.cachingService = cachingService;
        this.clientProxy = clientProxy;
        this.eventEmitter = eventEmitter;
        this.transactionProcessor = new sdk_transaction_processor_1.TransactionProcessor();
        this.isProcessing = false;
        this.logger = new common_1.Logger(TransactionCompletedService_1.name);
    }
    async handleNewTransactions() {
        if (this.isProcessing) {
            return;
        }
        try {
            await this.transactionProcessor.start({
                gatewayUrl: this.apiConfigService.getGatewayUrl(),
                maxLookBehind: this.apiConfigService.getTransactionCompletedMaxLookBehind(),
                waitForFinalizedCrossShardSmartContractResults: true,
                onTransactionsReceived: async (_, __, transactions) => {
                    const transactionsExcludingSmartContractResults = transactions.filter(transaction => !transaction.originalTransactionHash);
                    const cacheKeys = transactionsExcludingSmartContractResults.map(transaction => cache_info_1.CacheInfo.TransactionPendingResults(transaction.hash).key);
                    const hashes = await this.cachingService.batchGetManyRemote(cacheKeys);
                    const validHashes = hashes.filter(x => x !== null);
                    if (validHashes.length > 0) {
                        const keys = validHashes.map(hash => cache_info_1.CacheInfo.TransactionPendingResults(hash).key);
                        await this.cachingService.batchDelCache(keys);
                    }
                    this.logger.log(`Transactions completed: ${transactionsExcludingSmartContractResults.map(x => x.hash).join(', ')}`);
                    this.clientProxy.emit('transactionsCompleted', transactionsExcludingSmartContractResults);
                },
                onTransactionsPending: async (_, __, transactions) => {
                    await this.cachingService.batchSet(transactions.map(transaction => cache_info_1.CacheInfo.TransactionPendingResults(transaction.hash).key), transactions.map(transaction => transaction.hash), transactions.map(transaction => cache_info_1.CacheInfo.TransactionPendingResults(transaction.hash).ttl), false, false);
                    this.clientProxy.emit('transactionsPendingResults', transactions);
                },
                getLastProcessedNonce: async (shardId) => {
                    return await this.cachingService.get(cache_info_1.CacheInfo.TransactionCompletedShardNonce(shardId).key);
                },
                setLastProcessedNonce: async (shardId, nonce) => {
                    const event = new log_metrics_event_1.LogMetricsEvent();
                    event.args = [shardId, nonce];
                    this.eventEmitter.emit(metrics_events_constants_1.MetricsEvents.SetLastProcessedTransactionCompletedProcessorNonce, event);
                    await this.cachingService.set(cache_info_1.CacheInfo.TransactionCompletedShardNonce(shardId).key, nonce, cache_info_1.CacheInfo.TransactionCompletedShardNonce(shardId).ttl);
                },
                onMessageLogged: (topic, message) => {
                    const logLevel = this.apiConfigService.getTransactionCompletedLogLevel();
                    if (topic === log_topic_1.LogTopic.CrossShardSmartContractResult && [log_topic_1.LogTopic.Error].includes(logLevel)) {
                        return;
                    }
                    else if (topic === log_topic_1.LogTopic.Debug && [log_topic_1.LogTopic.Error, log_topic_1.LogTopic.CrossShardSmartContractResult].includes(logLevel)) {
                        return;
                    }
                    this.logger.log(`[${topic}] ${message}`);
                },
            });
        }
        finally {
            this.isProcessing = false;
        }
    }
};
tslib_1.__decorate([
    (0, schedule_1.Cron)('*/1 * * * * *'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionCompletedService.prototype, "handleNewTransactions", null);
TransactionCompletedService = TransactionCompletedService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(2, (0, common_1.Inject)('PUBSUB_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        sdk_nestjs_cache_1.CacheService,
        microservices_1.ClientProxy,
        event_emitter_1.EventEmitter2])
], TransactionCompletedService);
exports.TransactionCompletedService = TransactionCompletedService;
//# sourceMappingURL=transaction.completed.service.js.map