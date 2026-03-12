"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const tag_1 = require("./entities/tag");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const cache_info_1 = require("../../utils/cache.info");
let TagService = class TagService {
    constructor(indexerService, cachingService) {
        this.indexerService = indexerService;
        this.cachingService = cachingService;
    }
    async getNftTags(pagination, search) {
        if (search) {
            return await this.getNftTagsRaw(pagination, search);
        }
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.NftTags(pagination).key, async () => await this.getNftTagsRaw(pagination), cache_info_1.CacheInfo.NftTags(pagination).ttl);
    }
    async getNftTagCount(search) {
        if (search) {
            return this.getNftTagCountRaw(search);
        }
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.NftTagCount.key, async () => await this.getNftTagCountRaw(), cache_info_1.CacheInfo.NftTagCount.ttl);
    }
    async getNftTagCountRaw(search) {
        return await this.indexerService.getNftTagCount(search);
    }
    async getNftTagsRaw(pagination, search) {
        const result = await this.indexerService.getNftTags(pagination, search);
        return result.map(item => sdk_nestjs_http_1.ApiUtils.mergeObjects(new tag_1.Tag(), item));
    }
    async getNftTag(tag) {
        const result = await this.indexerService.getTag(tag);
        return sdk_nestjs_http_1.ApiUtils.mergeObjects(new tag_1.Tag(), result);
    }
};
TagService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => sdk_nestjs_cache_1.CacheService))),
    tslib_1.__metadata("design:paramtypes", [indexer_service_1.IndexerService,
        sdk_nestjs_cache_1.CacheService])
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map