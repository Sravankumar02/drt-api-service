"use strict";
var BatchTransactionProcessorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchTransactionProcessorService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_transaction_processor_1 = require("@terradharitri/sdk-transaction-processor");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const schedule_1 = require("@nestjs/schedule");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const batch_transaction_status_1 = require("../../endpoints/transactions.batch/entities/batch.transaction.status");
const transaction_batch_1 = require("../../endpoints/transactions.batch/entities/transaction.batch");
const transaction_batch_status_1 = require("../../endpoints/transactions.batch/entities/transaction.batch.status");
const transactions_batch_service_1 = require("../../endpoints/transactions.batch/transactions.batch.service");
const transaction_service_1 = require("../../endpoints/transactions/transaction.service");
const cache_info_1 = require("../../utils/cache.info");
const log_metrics_event_1 = require("../../common/entities/log.metrics.event");
const event_emitter_1 = require("@nestjs/event-emitter");
const metrics_events_constants_1 = require("../../utils/metrics-events.constants");
let BatchTransactionProcessorService = BatchTransactionProcessorService_1 = class BatchTransactionProcessorService {
    constructor(apiConfigService, cachingService, transactionsBatchService, clientProxy, transactionService, eventEmitter) {
        this.apiConfigService = apiConfigService;
        this.cachingService = cachingService;
        this.transactionsBatchService = transactionsBatchService;
        this.clientProxy = clientProxy;
        this.transactionService = transactionService;
        this.eventEmitter = eventEmitter;
        this.isRunnningHandleNewTransactions = false;
        this.transactionProcessor = new sdk_transaction_processor_1.TransactionProcessor();
        this.logger = new common_1.Logger(BatchTransactionProcessorService_1.name);
    }
    async handleDroppedTransactions() {
        const keys = await this.cachingService.getKeys(cache_info_1.CacheInfo.PendingTransaction('*').key);
        const pendingTransactionsCached = await this.cachingService.batchGetManyRemote(keys);
        const pendingTransactions = {};
        for (const [index, key] of keys.entries()) {
            const newKey = key.replace('pendingtransaction:', '');
            if (!pendingTransactionsCached[index]) {
                continue;
            }
            const components = pendingTransactionsCached[index].split(';');
            pendingTransactions[newKey] = {
                batchId: components[0],
                address: components.length > 1 ? components[1] : '',
                date: components.length > 2 ? new Date(components[2]) : new Date('2021-01-01'),
            };
        }
        if (Object.keys(pendingTransactions).length === 0) {
            return;
        }
        const processedTransactions = [];
        for (const hash of Object.keys(pendingTransactions)) {
            const date = pendingTransactions[hash].date;
            const differenceInMilliseconds = new Date().getTime() - date.getTime();
            const differenceInMinutes = differenceInMilliseconds / 1000 / 60;
            if (differenceInMinutes <= 10) {
                continue;
            }
            this.logger.log(`DroppedTransactions: found transaction with hash '${hash}' older than 10 minutes (${date.toISOString()})`);
            try {
                const transaction = await this.transactionService.getTransaction(hash);
                if (!transaction) {
                    const batchId = pendingTransactions[hash].batchId;
                    const address = pendingTransactions[hash].address;
                    this.logger.log(`DroppedTransactions: transaction with hash '${hash}' and batchId '${batchId}', address '${address}' could not be found. Dropping`);
                    const batch = await this.cachingService.getRemote(cache_info_1.CacheInfo.TransactionBatch(address, batchId).key);
                    if (batch) {
                        this.logger.log(`DroppedTransactions: found batch with id '${batchId}'`);
                        for (const group of batch.groups) {
                            for (const item of group.items) {
                                if (item.transaction.hash === hash && item.status === batch_transaction_status_1.BatchTransactionStatus.pending) {
                                    item.status = batch_transaction_status_1.BatchTransactionStatus.dropped;
                                    batch.status = transaction_batch_status_1.TransactionBatchStatus.dropped;
                                    await this.cachingService.setRemote(cache_info_1.CacheInfo.TransactionBatch(address, batchId).key, batch, cache_info_1.CacheInfo.TransactionBatch(address, batchId).ttl);
                                    await this.cachingService.deleteInCache(cache_info_1.CacheInfo.PendingTransaction(hash).key);
                                    processedTransactions.push({ batchId, hash, address });
                                    this.logger.log(`DroppedTransactions: found pending transaction with hash '${hash}' in batch with id '${batchId}' for address '${address}'`);
                                }
                            }
                        }
                    }
                }
            }
            catch (error) {
                this.logger.error(`Unexpected error when getting tx for hash: ${hash}`);
                this.logger.error(error);
            }
        }
        const groupedByBatchId = processedTransactions.groupBy(x => x.batchId);
        for (const batchId of Object.keys(groupedByBatchId)) {
            const transactionInfos = groupedByBatchId[batchId];
            const txHashes = transactionInfos.map((x) => x.hash);
            const address = transactionInfos[0].address;
            this.clientProxy.emit('onBatchUpdated', { address, batchId, txHashes });
            this.logger.log(`DroppedTransactions: transaction with hashes '${txHashes}' and batchId '${batchId}', address '${address}' finished emitting onBatchUpdated event`);
        }
    }
    async handleNewTransactions() {
        if (this.isRunnningHandleNewTransactions) {
            return;
        }
        this.isRunnningHandleNewTransactions = true;
        try {
            await this.transactionProcessor.start({
                gatewayUrl: this.apiConfigService.getGatewayUrl(),
                maxLookBehind: this.apiConfigService.getTransactionBatchMaxLookBehind(),
                waitForFinalizedCrossShardSmartContractResults: true,
                onTransactionsReceived: async (shardId, nonce, transactions, statistics) => {
                    this.logger.log(`Received ${transactions.length} transactions on shard ${shardId} and nonce ${nonce}. Time left: ${statistics.secondsLeft}`);
                    this.handleTransactionBatches(transactions);
                },
                getLastProcessedNonce: async (shardId) => {
                    return await this.cachingService.getRemote(cache_info_1.CacheInfo.TransactionBatchShardNonce(shardId).key);
                },
                setLastProcessedNonce: async (shardId, nonce) => {
                    const event = new log_metrics_event_1.LogMetricsEvent();
                    event.args = [shardId, nonce];
                    this.eventEmitter.emit(metrics_events_constants_1.MetricsEvents.SetLastProcessedBatchProcessorNonce, event);
                    await this.cachingService.setRemote(cache_info_1.CacheInfo.TransactionBatchShardNonce(shardId).key, nonce, cache_info_1.CacheInfo.TransactionBatchShardNonce(shardId).ttl);
                },
            });
        }
        catch (error) {
            this.logger.error('Unhandled exception while processing transactions');
            this.logger.error(error);
        }
        finally {
            this.isRunnningHandleNewTransactions = false;
        }
    }
    async handleTransactionBatches(transactions) {
        const transactionsIndexed = {};
        for (const transaction of transactions) {
            transactionsIndexed[transaction.hash] = transaction;
        }
        const processedTransactions = [];
        const keys = transactions.map(transaction => cache_info_1.CacheInfo.PendingTransaction(transaction.hash).key);
        const pendingTransactionsCached = await this.cachingService.batchGetManyRemote(keys);
        const pendingTransactions = {};
        for (const [index, key] of keys.entries()) {
            const newKey = key.replace('pendingtransaction:', '');
            if (!pendingTransactionsCached[index]) {
                continue;
            }
            const components = pendingTransactionsCached[index].split(';');
            pendingTransactions[newKey] = {
                batchId: components[0],
                address: components.length > 1 ? components[1] : '',
                date: components.length > 2 ? new Date(components[2]) : new Date('2021-01-01'),
            };
        }
        for (const hash of Object.keys(pendingTransactions)) {
            const transaction = transactionsIndexed[hash];
            if (!transaction) {
                continue;
            }
            const transactionStatus = transaction.status;
            const batchId = pendingTransactions[hash].batchId;
            await this.processTransaction(hash, batchId, transaction.sender, transactionStatus);
            processedTransactions.push({ batchId, hash, address: transaction.sender });
        }
        const groupedByBatchId = processedTransactions.groupBy(x => x.batchId);
        for (const batchId of Object.keys(groupedByBatchId)) {
            const transactionInfos = groupedByBatchId[batchId];
            const txHashes = transactionInfos.map((x) => x.hash);
            const address = transactionInfos[0].address;
            this.clientProxy.emit('onBatchUpdated', { address, batchId, txHashes });
        }
    }
    async processTransaction(txHash, batchId, address, status) {
        this.logger.log(`Processing transaction with hash '${txHash}', batch '${batchId}', address '${address}', status '${status}'`);
        try {
            const batch = await this.cachingService.getRemote(cache_info_1.CacheInfo.TransactionBatch(address, batchId).key);
            if (!batch) {
                this.logger.error(`Could not find batch with id '${batchId}' when processing transaction with hash '${txHash}'`);
                return;
            }
            for (const [index, group] of batch.groups.entries()) {
                for (const item of group.items) {
                    if (item.transaction.hash === txHash) {
                        item.status = status;
                        if (batch.status === transaction_batch_status_1.TransactionBatchStatus.pending) {
                            if (status === batch_transaction_status_1.BatchTransactionStatus.invalid) {
                                batch.status = transaction_batch_status_1.TransactionBatchStatus.invalid;
                            }
                            else if (status === batch_transaction_status_1.BatchTransactionStatus.success) {
                                if (group.items.every((item) => item.status === batch_transaction_status_1.BatchTransactionStatus.success)) {
                                    if (index + 1 >= batch.groups.length) {
                                        this.logger.log(`Marking batch with id '${batch.id}' as success`);
                                        batch.status = transaction_batch_status_1.TransactionBatchStatus.success;
                                    }
                                    else {
                                        const nextGroup = batch.groups[index + 1];
                                        this.logger.log(`Starting group with index ${index + 1} for batch with id '${batch.id}'`);
                                        await this.transactionsBatchService.startTransactionGroup(batch, nextGroup);
                                        const invalidResults = nextGroup.items.filter((x) => x.status === batch_transaction_status_1.BatchTransactionStatus.invalid);
                                        if (invalidResults.length > 0) {
                                            const address = transaction_batch_1.TransactionBatch.getAddress(batch);
                                            const txHashes = invalidResults.map((x) => x.transaction.hash);
                                            this.logger.log(`Encountered failed transactions for batch with id '${batch.id}', tx hashes: ${txHashes}. Aborting`);
                                            batch.status = transaction_batch_status_1.TransactionBatchStatus.invalid;
                                            this.clientProxy.emit('onBatchUpdated', { address, batchId, txHashes });
                                        }
                                    }
                                }
                            }
                        }
                        await this.cachingService.setRemote(cache_info_1.CacheInfo.TransactionBatch(address, batchId).key, batch, cache_info_1.CacheInfo.TransactionBatch(address, batchId).ttl);
                    }
                }
            }
        }
        finally {
            await this.cachingService.deleteInCache(cache_info_1.CacheInfo.PendingTransaction(txHash).key);
        }
    }
};
tslib_1.__decorate([
    (0, schedule_1.Cron)('* * * * *'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BatchTransactionProcessorService.prototype, "handleDroppedTransactions", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)('*/1 * * * * *'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BatchTransactionProcessorService.prototype, "handleNewTransactions", null);
BatchTransactionProcessorService = BatchTransactionProcessorService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(3, (0, common_1.Inject)('PUBSUB_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        sdk_nestjs_cache_1.CacheService,
        transactions_batch_service_1.TransactionsBatchService,
        microservices_1.ClientProxy,
        transaction_service_1.TransactionService,
        event_emitter_1.EventEmitter2])
], BatchTransactionProcessorService);
exports.BatchTransactionProcessorService = BatchTransactionProcessorService;
//# sourceMappingURL=batch.transaction.processor.service.js.map