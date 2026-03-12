"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShardService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const node_service_1 = require("../nodes/node.service");
const node_status_1 = require("../nodes/entities/node.status");
const cache_info_1 = require("../../utils/cache.info");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
let ShardService = class ShardService {
    constructor(nodeService, cachingService) {
        this.nodeService = nodeService;
        this.cachingService = cachingService;
    }
    async getShards(queryPagination) {
        const { from, size } = queryPagination;
        const allShards = await this.getAllShardsRaw();
        return allShards.slice(from, from + size);
    }
    async getAllShards() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.ActiveShards.key, async () => await this.getAllShardsRaw(), cache_info_1.CacheInfo.ActiveShards.ttl);
    }
    async getAllShardsRaw() {
        const nodes = await this.nodeService.getAllNodes();
        const validators = nodes.filter(({ type, shard, status }) => type === 'validator' &&
            shard !== undefined &&
            [node_status_1.NodeStatus.eligible, node_status_1.NodeStatus.waiting].includes(status !== null && status !== void 0 ? status : node_status_1.NodeStatus.unknown));
        const shards = validators.map(({ shard }) => shard).filter(shard => shard !== undefined).map(shard => shard !== null && shard !== void 0 ? shard : 0).distinct();
        return shards.map((shard) => {
            const shardValidators = validators.filter((node) => node.shard === shard);
            const activeShardValidators = shardValidators.filter(({ online }) => online);
            return {
                shard,
                validators: shardValidators.length,
                activeValidators: activeShardValidators.length,
            };
        });
    }
};
ShardService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [node_service_1.NodeService,
        sdk_nestjs_cache_1.CacheService])
], ShardService);
exports.ShardService = ShardService;
//# sourceMappingURL=shard.service.js.map