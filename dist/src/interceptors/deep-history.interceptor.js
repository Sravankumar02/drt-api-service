"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepHistoryInterceptor = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const api_config_service_1 = require("../common/api-config/api.config.service");
const indexer_service_1 = require("../common/indexer/indexer.service");
const protocol_service_1 = require("../common/protocol/protocol.service");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const cache_info_1 = require("../utils/cache.info");
let DeepHistoryInterceptor = class DeepHistoryInterceptor {
    constructor(indexerService, apiConfigService, protocolService, cacheService) {
        this.indexerService = indexerService;
        this.apiConfigService = apiConfigService;
        this.protocolService = protocolService;
        this.cacheService = cacheService;
    }
    async intercept(context, next) {
        var _a, _b;
        const httpContext = context.switchToHttp();
        const response = httpContext.getResponse();
        const request = httpContext.getRequest();
        const timestamp = Number((_a = request.query) === null || _a === void 0 ? void 0 : _a.timestamp);
        if (Number.isNaN(timestamp)) {
            return next.handle();
        }
        const address = (_b = request.params.address) !== null && _b !== void 0 ? _b : request.body.scAddress;
        if (!address) {
            return next.handle();
        }
        if (!this.apiConfigService.isDeepHistoryGatewayEnabled()) {
            throw new common_1.BadRequestException('Deep history is not enabled. Timestamp query parameter in this context is unsupported');
        }
        const shardId = await this.protocolService.getShardIdForAddress(address);
        if (shardId === undefined) {
            throw new common_1.BadRequestException('Could not determine shard based on the provided address');
        }
        const block = await this.cacheService.getOrSet(cache_info_1.CacheInfo.DeepHistoryBlock(timestamp, shardId).key, async () => await this.indexerService.getBlockByTimestampAndShardId(timestamp, shardId), cache_info_1.CacheInfo.DeepHistoryBlock(timestamp, shardId).ttl);
        if (!block) {
            throw new common_1.BadRequestException('Could not determine block nonce based on the provided timestamp and the shardId associated with the given address');
        }
        const blockNonce = block.nonce;
        sdk_nestjs_common_1.ContextTracker.assign({ deepHistoryBlockNonce: blockNonce });
        return next
            .handle()
            .pipe((0, rxjs_1.tap)(() => {
            const contextObj = sdk_nestjs_common_1.ContextTracker.get();
            const blockInfo = contextObj === null || contextObj === void 0 ? void 0 : contextObj.deepHistoryBlockInfo;
            if (blockInfo) {
                response.setHeader('X-Deep-History-Block-Hash', blockInfo.hash);
                response.setHeader('X-Deep-History-Block-Nonce', blockInfo.nonce);
                response.setHeader('X-Deep-History-Block-RootHash', blockInfo.rootHash);
            }
        }), (0, rxjs_1.catchError)((err) => {
            return (0, rxjs_1.throwError)(() => err);
        }));
    }
};
DeepHistoryInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [indexer_service_1.IndexerService,
        api_config_service_1.ApiConfigService,
        protocol_service_1.ProtocolService,
        sdk_nestjs_cache_1.CacheService])
], DeepHistoryInterceptor);
exports.DeepHistoryInterceptor = DeepHistoryInterceptor;
//# sourceMappingURL=deep-history.interceptor.js.map