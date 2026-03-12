"use strict";
var PubSubListenerController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubListenerController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let PubSubListenerController = PubSubListenerController_1 = class PubSubListenerController {
    constructor(cachingService) {
        this.cachingService = cachingService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(PubSubListenerController_1.name);
    }
    deleteCacheKey(keys) {
        for (const key of keys) {
            this.logger.log(`Deleting local cache key ${key}`);
            this.cachingService.deleteLocal(key);
        }
    }
    async refreshCacheKey(info) {
        this.logger.log(`Refreshing local cache key ${info.key} with ttl ${info.ttl}`);
        await this.cachingService.refreshLocal(info.key, info.ttl);
    }
};
tslib_1.__decorate([
    (0, microservices_1.EventPattern)('deleteCacheKeys'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", void 0)
], PubSubListenerController.prototype, "deleteCacheKey", null);
tslib_1.__decorate([
    (0, microservices_1.EventPattern)('refreshCacheKey'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PubSubListenerController.prototype, "refreshCacheKey", null);
PubSubListenerController = PubSubListenerController_1 = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService])
], PubSubListenerController);
exports.PubSubListenerController = PubSubListenerController;
//# sourceMappingURL=pub.sub.listener.controller.js.map