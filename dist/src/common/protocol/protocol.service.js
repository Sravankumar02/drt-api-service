"use strict";
var ProtocolService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const cache_info_1 = require("../../utils/cache.info");
const gateway_service_1 = require("../gateway/gateway.service");
const indexer_service_1 = require("../indexer/indexer.service");
const api_config_service_1 = require("../api-config/api.config.service");
const out_1 = require("@terradharitri/sdk-core/out");
let ProtocolService = ProtocolService_1 = class ProtocolService {
    constructor(gatewayService, cachingService, indexerService, apiConfigService) {
        this.gatewayService = gatewayService;
        this.cachingService = cachingService;
        this.indexerService = indexerService;
        this.apiConfigService = apiConfigService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(ProtocolService_1.name);
    }
    async getShardIds() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.ShardIds.key, async () => await this.getShardIdsRaw(), cache_info_1.CacheInfo.ShardIds.ttl);
    }
    async getShardCount() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.ShardCount.key, async () => await this.getShardCountRaw(), cache_info_1.CacheInfo.ShardCount.ttl);
    }
    async getShardCountRaw() {
        const networkConfig = await this.gatewayService.getNetworkConfig();
        const shardCount = networkConfig.drt_num_shards_without_meta;
        return shardCount;
    }
    async getShardIdsRaw() {
        const shardCount = await this.getShardCountRaw();
        const metaChainShardId = this.apiConfigService.getMetaChainShardId();
        const result = [];
        for (let i = 0; i < shardCount; i++) {
            result.push(i);
        }
        result.push(metaChainShardId);
        return result;
    }
    async getSecondsRemainingUntilNextRound() {
        const genesisTimestamp = await this.getGenesisTimestamp();
        const currentTimestamp = Math.round(Date.now() / 1000);
        let result = 6 - (currentTimestamp - genesisTimestamp) % 6;
        if (result === 6) {
            result = 0;
        }
        return result;
    }
    async getGenesisTimestamp() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.GenesisTimestamp.key, async () => await this.getGenesisTimestampRaw(), cache_info_1.CacheInfo.GenesisTimestamp.ttl, cache_info_1.CacheInfo.GenesisTimestamp.ttl);
    }
    async getGenesisTimestampRaw() {
        try {
            const round = await this.indexerService.getRound(0, 1);
            return round.timestamp;
        }
        catch (error) {
            this.logger.error(error);
            return 0;
        }
    }
    async getShardIdForAddress(address) {
        if (!sdk_nestjs_common_1.AddressUtils.isAddressValid(address)) {
            return undefined;
        }
        const shardCount = await this.getShardCount();
        const addressHex = new out_1.Address(address).hex();
        return sdk_nestjs_common_1.AddressUtils.computeShard(addressHex, shardCount);
    }
};
ProtocolService = ProtocolService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => gateway_service_1.GatewayService))),
    tslib_1.__param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => sdk_nestjs_cache_1.CacheService))),
    tslib_1.__param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => indexer_service_1.IndexerService))),
    tslib_1.__metadata("design:paramtypes", [gateway_service_1.GatewayService,
        sdk_nestjs_cache_1.CacheService,
        indexer_service_1.IndexerService,
        api_config_service_1.ApiConfigService])
], ProtocolService);
exports.ProtocolService = ProtocolService;
//# sourceMappingURL=protocol.service.js.map