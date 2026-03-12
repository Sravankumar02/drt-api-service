"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TpsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const tps_utils_1 = require("../../utils/tps.utils");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const cache_info_1 = require("../../utils/cache.info");
const tps_1 = require("./entities/tps");
const protocol_service_1 = require("../../common/protocol/protocol.service");
const api_config_service_1 = require("../../common/api-config/api.config.service");
let TpsService = class TpsService {
    constructor(cacheService, protocolService, apiConfigService) {
        this.cacheService = cacheService;
        this.protocolService = protocolService;
        this.apiConfigService = apiConfigService;
    }
    async getTpsLatest(frequency) {
        var _a;
        const frequencySeconds = tps_utils_1.TpsUtils.getFrequencyByEnum(frequency);
        const timestamp = tps_utils_1.TpsUtils.getTimestampByFrequency(new Date().getTimeInSeconds() - frequencySeconds, frequencySeconds);
        const transactionCount = (_a = (await this.cacheService.getRemote(cache_info_1.CacheInfo.TpsByTimestampAndFrequency(timestamp, frequencySeconds).key))) !== null && _a !== void 0 ? _a : 0;
        const tps = transactionCount / frequencySeconds;
        return new tps_1.Tps({ timestamp, tps });
    }
    async getTpsMax(interval) {
        const result = await this.cacheService.getRemote(cache_info_1.CacheInfo.TpsMaxByInterval(interval).key);
        if (!result) {
            return new tps_1.Tps({ timestamp: 0, tps: 0 });
        }
        return result;
    }
    async getTpsHistory(interval) {
        return await this.cacheService.getOrSet(cache_info_1.CacheInfo.TpsHistoryByInterval(interval).key, async () => await this.getTpsHistoryRaw(interval), cache_info_1.CacheInfo.TpsHistoryByInterval(interval).ttl);
    }
    async getTpsHistoryRaw(interval) {
        const frequencySeconds = tps_utils_1.TpsUtils.getFrequencyByInterval(interval);
        const endTimestamp = tps_utils_1.TpsUtils.getTimestampByFrequency(new Date().getTimeInSeconds(), frequencySeconds);
        const startTimestamp = endTimestamp - tps_utils_1.TpsUtils.getIntervalByEnum(interval);
        const timestamps = [];
        for (let timestamp = startTimestamp; timestamp <= endTimestamp; timestamp += frequencySeconds) {
            timestamps.push(timestamp);
        }
        const keys = timestamps.map(timestamp => cache_info_1.CacheInfo.TpsByTimestampAndFrequency(timestamp, frequencySeconds).key);
        const transactionResults = await this.cacheService.getManyRemote(keys);
        return timestamps.zip(transactionResults, (timestamp, transactions) => new tps_1.Tps({ timestamp, tps: (transactions !== null && transactions !== void 0 ? transactions : 0) / frequencySeconds }));
    }
    async getTransactionCount() {
        var _a;
        const totalShards = await this.protocolService.getShardCount();
        const shardIds = [...Array.from({ length: totalShards }, (_, i) => i), this.apiConfigService.getMetaChainShardId()];
        let totalTransactions = 0;
        for (const shardId of shardIds) {
            totalTransactions += (_a = await this.cacheService.getRemote(cache_info_1.CacheInfo.TransactionCountByShard(shardId).key)) !== null && _a !== void 0 ? _a : 0;
        }
        return totalTransactions;
    }
};
TpsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        protocol_service_1.ProtocolService,
        api_config_service_1.ApiConfigService])
], TpsService);
exports.TpsService = TpsService;
//# sourceMappingURL=tps.service.js.map