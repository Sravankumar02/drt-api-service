"use strict";
var TransactionProcessorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionProcessorService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const schedule_1 = require("@nestjs/schedule");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const node_service_1 = require("../../endpoints/nodes/node.service");
const cache_info_1 = require("../../utils/cache.info");
const event_emitter_1 = require("@nestjs/event-emitter");
const sft_change_transaction_extractor_1 = require("./extractor/sft.change.transaction.extractor");
const transfer_ownership_extractor_1 = require("./extractor/transfer.ownership.extractor");
const metrics_events_constants_1 = require("../../utils/metrics-events.constants");
const log_metrics_event_1 = require("../../common/entities/log.metrics.event");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_monitoring_1 = require("@sravankumar02/sdk-nestjs-monitoring");
const stake_function_1 = require("../../endpoints/transactions/transaction-action/recognizers/staking/entities/stake.function");
const sdk_transaction_processor_1 = require("@terradharitri/sdk-transaction-processor");
let TransactionProcessorService = TransactionProcessorService_1 = class TransactionProcessorService {
    constructor(cachingService, apiConfigService, clientProxy, nodeService, eventEmitter) {
        this.cachingService = cachingService;
        this.apiConfigService = apiConfigService;
        this.clientProxy = clientProxy;
        this.nodeService = nodeService;
        this.eventEmitter = eventEmitter;
        this.logger = new sdk_nestjs_common_1.OriginLogger(TransactionProcessorService_1.name);
        this.transactionProcessor = new sdk_transaction_processor_1.TransactionProcessor();
    }
    async handleNewTransactions() {
        await this.transactionProcessor.start({
            gatewayUrl: this.apiConfigService.getGatewayUrl(),
            maxLookBehind: this.apiConfigService.getTransactionProcessorMaxLookBehind(),
            onTransactionsReceived: async (shard, nonce, transactions) => {
                const profiler = new sdk_nestjs_monitoring_1.PerformanceProfiler('Processing new transactions');
                this.logger.log(`New transactions: ${transactions.length} for shard ${shard} and nonce ${nonce}`);
                const allInvalidatedKeys = [];
                for (const transaction of transactions) {
                    const invalidatedTokenProperties = await this.tryInvalidateTokenProperties(transaction);
                    const invalidatedOwnerKeys = await this.tryInvalidateOwner(transaction);
                    const invalidatedCollectionPropertiesKeys = await this.tryInvalidateCollectionProperties(transaction);
                    const invalidatedStakeTopUpKey = await this.tryInvalidateStakeTopup(transaction);
                    allInvalidatedKeys.push(...invalidatedTokenProperties, ...invalidatedOwnerKeys, ...invalidatedCollectionPropertiesKeys, ...invalidatedStakeTopUpKey);
                }
                const uniqueInvalidatedKeys = allInvalidatedKeys.distinct();
                if (uniqueInvalidatedKeys.length > 0) {
                    this.clientProxy.emit('deleteCacheKeys', uniqueInvalidatedKeys);
                }
                const distinctSendersAndReceivers = transactions.selectMany(transaction => [transaction.sender, transaction.receiver]).distinct();
                const txCountInvalidationKeys = distinctSendersAndReceivers.map(address => cache_info_1.CacheInfo.TxCount(address).key);
                await this.cachingService.batchDelCache(txCountInvalidationKeys);
                profiler.stop();
            },
            getLastProcessedNonce: async (shardId) => {
                return await this.cachingService.get(cache_info_1.CacheInfo.TransactionProcessorShardNonce(shardId).key);
            },
            setLastProcessedNonce: async (shardId, nonce) => {
                const event = new log_metrics_event_1.LogMetricsEvent();
                event.args = [shardId, nonce];
                this.eventEmitter.emit(metrics_events_constants_1.MetricsEvents.SetLastProcessedNonce, event);
                await this.cachingService.set(cache_info_1.CacheInfo.TransactionProcessorShardNonce(shardId).key, nonce, cache_info_1.CacheInfo.TransactionProcessorShardNonce(shardId).ttl);
            },
        });
    }
    async tryInvalidateTokenProperties(transaction) {
        if (transaction.receiver !== this.apiConfigService.getDcdtContractAddress()) {
            return [];
        }
        const transactionFuncName = transaction.getDataFunctionName();
        if (transactionFuncName === 'controlChanges') {
            const args = transaction.getDataArgs();
            if (args && args.length > 0) {
                const tokenIdentifier = sdk_nestjs_common_1.BinaryUtils.hexToString(args[0]);
                this.logger.log(`Invalidating token properties for token ${tokenIdentifier}`);
                return await this.cachingService.deleteInCache(`tokenProperties:${tokenIdentifier}`);
            }
        }
        return [];
    }
    async tryInvalidateOwner(transaction) {
        const transactionFuncName = transaction.getDataFunctionName();
        if (transactionFuncName !== 'mergeValidatorToDelegationWithWhitelist' && transactionFuncName !== 'makeNewContractFromValidatorData') {
            return [];
        }
        return await this.nodeService.deleteOwnersForAddressInCache(transaction.sender);
    }
    async tryInvalidateCollectionProperties(transaction) {
        if (!transaction.data) {
            return [];
        }
        const tryExtractSftChange = new sft_change_transaction_extractor_1.SftChangeTransactionExtractor();
        const collectionIdentifier = tryExtractSftChange.extract(transaction);
        if (!collectionIdentifier) {
            return [];
        }
        const tryExtractTransferOwnership = new transfer_ownership_extractor_1.TransferOwnershipExtractor();
        const metadataTransferOwnership = tryExtractTransferOwnership.extract(transaction);
        if (metadataTransferOwnership) {
            this.logger.log(`Detected NFT Transfer ownership for collection with identifier '${metadataTransferOwnership.identifier}'`);
            const key = cache_info_1.CacheInfo.DcdtProperties(collectionIdentifier).key;
            await this.cachingService.deleteInCache(key);
            return [key];
        }
        return [];
    }
    async tryInvalidateStakeTopup(transaction) {
        if (!transaction.data) {
            return [];
        }
        const transactionFuncName = transaction.getDataFunctionName();
        if (!transactionFuncName) {
            return [];
        }
        if (!transactionFuncName.in(stake_function_1.StakeFunction.delegate, stake_function_1.StakeFunction.unDelegate, stake_function_1.StakeFunction.reDelegateRewards)) {
            return [];
        }
        await this.cachingService.deleteInCache(cache_info_1.CacheInfo.StakeTopup(transaction.receiver).key);
        return [cache_info_1.CacheInfo.StakeTopup(transaction.receiver).key];
    }
};
tslib_1.__decorate([
    (0, schedule_1.Cron)('*/1 * * * * *'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionProcessorService.prototype, "handleNewTransactions", null);
TransactionProcessorService = TransactionProcessorService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(2, (0, common_1.Inject)('PUBSUB_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        api_config_service_1.ApiConfigService,
        microservices_1.ClientProxy,
        node_service_1.NodeService,
        event_emitter_1.EventEmitter2])
], TransactionProcessorService);
exports.TransactionProcessorService = TransactionProcessorService;
//# sourceMappingURL=transaction.processor.service.js.map