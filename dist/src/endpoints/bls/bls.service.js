"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlsService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const cache_info_1 = require("../../utils/cache.info");
let BlsService = class BlsService {
    constructor(indexerService, cachingService) {
        this.indexerService = indexerService;
        this.cachingService = cachingService;
    }
    async getPublicKeys(shard, epoch) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.ShardAndEpochBlses(shard, epoch).key, async () => await this.getPublicKeysRaw(shard, epoch), cache_info_1.CacheInfo.ShardAndEpochBlses(shard, epoch).ttl);
    }
    async getPublicKeysRaw(shard, epoch) {
        const publicKeys = await this.indexerService.getPublicKeys(shard, epoch);
        if (publicKeys) {
            return publicKeys;
        }
        return [];
    }
    async getBlsIndex(bls, shardId, epoch) {
        const publicKeys = await this.getPublicKeys(shardId, epoch);
        return publicKeys.indexOf(bls);
    }
};
BlsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => indexer_service_1.IndexerService))),
    tslib_1.__metadata("design:paramtypes", [indexer_service_1.IndexerService,
        sdk_nestjs_cache_1.CacheService])
], BlsService);
exports.BlsService = BlsService;
//# sourceMappingURL=bls.service.js.map