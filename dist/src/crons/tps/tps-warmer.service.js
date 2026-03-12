"use strict";
var TpsWarmerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TpsWarmerService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const protocol_service_1 = require("../../common/protocol/protocol.service");
const cache_info_1 = require("../../utils/cache.info");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const cron_1 = require("cron");
const tps_utils_1 = require("../../utils/tps.utils");
const tps_service_1 = require("../../endpoints/tps/tps.service");
const tps_interval_1 = require("../../endpoints/tps/entities/tps.interval");
const block_service_1 = require("../../endpoints/blocks/block.service");
const transfer_service_1 = require("../../endpoints/transfers/transfer.service");
let TpsWarmerService = TpsWarmerService_1 = class TpsWarmerService {
    constructor(cachingService, redisCacheService, protocolService, apiConfigService, gatewayService, schedulerRegistry, tpsService, blockService, transferService) {
        this.cachingService = cachingService;
        this.redisCacheService = redisCacheService;
        this.protocolService = protocolService;
        this.apiConfigService = apiConfigService;
        this.gatewayService = gatewayService;
        this.schedulerRegistry = schedulerRegistry;
        this.tpsService = tpsService;
        this.blockService = blockService;
        this.transferService = transferService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(TpsWarmerService_1.name);
        if (!this.apiConfigService.isTpsEnabled()) {
            return;
        }
        const handleBlockProcessorCronJob = new cron_1.CronJob(schedule_1.CronExpression.EVERY_SECOND, async () => await this.handleBlockProcessor());
        this.schedulerRegistry.addCronJob('handleBlockProcessor', handleBlockProcessorCronJob);
        handleBlockProcessorCronJob.start();
        const refreshTpsHistoryCronJob = new cron_1.CronJob(schedule_1.CronExpression.EVERY_10_SECONDS, async () => await this.refreshTpsHistory());
        this.schedulerRegistry.addCronJob('refreshTpsHistory', refreshTpsHistoryCronJob);
        refreshTpsHistoryCronJob.start();
    }
    async handleBlockProcessor() {
        const shardCount = await this.protocolService.getShardCount();
        const metaChainShardId = this.apiConfigService.getMetaChainShardId();
        const shards = [...Array.from({ length: shardCount }, (_, i) => i), metaChainShardId];
        await Promise.all(shards.map(shardId => this.processTpsForShard(shardId)));
    }
    async refreshTpsHistory() {
        const intervals = [tps_interval_1.TpsInterval._10m, tps_interval_1.TpsInterval._1h, tps_interval_1.TpsInterval._1d];
        for (const interval of intervals) {
            const tpsHistory = await this.tpsService.getTpsHistoryRaw(interval);
            if (tpsHistory.length > 0) {
                const calculatedMaxTps = this.getMaxTps(tpsHistory);
                const retrievedMaxTps = await this.cachingService.getRemote(cache_info_1.CacheInfo.TpsMaxByInterval(interval).key);
                if (!retrievedMaxTps || calculatedMaxTps.tps > retrievedMaxTps.tps) {
                    await this.cachingService.setRemote(cache_info_1.CacheInfo.TpsMaxByInterval(interval).key, calculatedMaxTps, cache_info_1.CacheInfo.TpsMaxByInterval(interval).ttl);
                }
            }
            await this.cachingService.setRemote(cache_info_1.CacheInfo.TpsHistoryByInterval(interval).key, tpsHistory);
        }
    }
    async incrementTotalTransactions(shardId, totalTransactions, startNonce) {
        const incrementResult = await this.redisCacheService.incrby(cache_info_1.CacheInfo.TransactionCountByShard(shardId).key, totalTransactions);
        if (incrementResult === totalTransactions) {
            await this.redisCacheService.expire(cache_info_1.CacheInfo.TransactionCountByShard(shardId).key, cache_info_1.CacheInfo.TransactionCountByShard(shardId).ttl);
            const blocks = await this.blockService.getBlocks({ shard: shardId, beforeNonce: startNonce - 1 }, { from: 0, size: 1 });
            if (blocks.length === 0) {
                this.logger.error(`No block found for shard ${shardId} and nonce ${startNonce - 1}`);
                return;
            }
            const block = blocks[0];
            const transactionsUntilStartNonce = await this.transferService.getTransfersCount({ senderShard: shardId, before: block.timestamp });
            await this.redisCacheService.incrby(cache_info_1.CacheInfo.TransactionCountByShard(shardId).key, transactionsUntilStartNonce);
        }
    }
    getMaxTps(tpsHistory) {
        if (tpsHistory.length === 0) {
            throw new Error('TPS history is empty');
        }
        return tpsHistory.reduce((prev, current) => {
            return prev.tps > current.tps ? prev : current;
        });
    }
    async processTpsForShard(shardId) {
        const endNonce = await this.getEndNonce(shardId);
        const startNonce = await this.getStartNonce(shardId, endNonce);
        for (let nonce = startNonce + 1; nonce <= endNonce; nonce++) {
            const transactionCount = await this.processTpsForShardAndNonce(shardId, nonce);
            await this.cachingService.setRemote(cache_info_1.CacheInfo.TpsNonceByShard(shardId).key, nonce);
            await this.incrementTotalTransactions(shardId, transactionCount, nonce);
        }
    }
    async getStartNonce(shardId, endNonce) {
        const startNonce = await this.cachingService.getRemote(cache_info_1.CacheInfo.TpsNonceByShard(shardId).key);
        if (!startNonce) {
            return endNonce - this.apiConfigService.getTpsMaxLookBehindNonces();
        }
        if (startNonce < endNonce - this.apiConfigService.getTpsMaxLookBehindNonces()) {
            return endNonce - this.apiConfigService.getTpsMaxLookBehindNonces();
        }
        return startNonce;
    }
    async getEndNonce(shardId) {
        const networkStatus = await this.gatewayService.getNetworkStatus(shardId);
        return networkStatus.drt_nonce;
    }
    async processTpsForShardAndNonce(shardId, nonce) {
        const block = await this.gatewayService.getBlockByShardAndNonce(shardId, nonce);
        const transactionCount = block.numTxs;
        const timestamp = block.timestamp;
        for (const frequency of tps_utils_1.TpsUtils.Frequencies) {
            await this.saveTps(timestamp, frequency, transactionCount);
        }
        return transactionCount;
    }
    async saveTps(timestamp, frequency, transactionCount) {
        const timestampByFrequency = tps_utils_1.TpsUtils.getTimestampByFrequency(timestamp, frequency);
        const key = cache_info_1.CacheInfo.TpsByTimestampAndFrequency(timestampByFrequency, frequency).key;
        const transactionCountAfterIncrement = await this.redisCacheService.incrby(key, transactionCount);
        if (transactionCountAfterIncrement === transactionCount) {
            await this.redisCacheService.expire(key, cache_info_1.CacheInfo.TpsByTimestampAndFrequency(timestampByFrequency, frequency).ttl);
        }
    }
};
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.Lock)({ name: 'Block Processor', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TpsWarmerService.prototype, "handleBlockProcessor", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.Lock)({ name: 'Refresh TPS History', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TpsWarmerService.prototype, "refreshTpsHistory", null);
TpsWarmerService = TpsWarmerService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        sdk_nestjs_cache_1.RedisCacheService,
        protocol_service_1.ProtocolService,
        api_config_service_1.ApiConfigService,
        gateway_service_1.GatewayService,
        schedule_1.SchedulerRegistry,
        tps_service_1.TpsService,
        block_service_1.BlockService,
        transfer_service_1.TransferService])
], TpsWarmerService);
exports.TpsWarmerService = TpsWarmerService;
//# sourceMappingURL=tps-warmer.service.js.map