"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalCacheController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_auth_1 = require("@sravankumar02/sdk-nestjs-auth");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cache_value_1 = require("./entities/cache.value");
let LocalCacheController = class LocalCacheController {
    constructor(cachingService) {
        this.cachingService = cachingService;
    }
    async getCache(key) {
        const value = await this.cachingService.getLocal(key);
        if (!value) {
            throw new common_1.HttpException('Key not found', common_1.HttpStatus.NOT_FOUND);
        }
        return JSON.stringify(value);
    }
    setCache(key, cacheValue) {
        this.cachingService.setLocal(key, cacheValue.value, cacheValue.ttl);
    }
    delCache(key) {
        this.cachingService.deleteLocal(key);
    }
};
tslib_1.__decorate([
    (0, common_1.UseGuards)(sdk_nestjs_auth_1.NativeAuthGuard, sdk_nestjs_auth_1.JwtAdminGuard),
    (0, common_1.Get)("/:key"),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The cache value for one key',
        type: String,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Key not found',
    }),
    tslib_1.__param(0, (0, common_1.Param)('key')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], LocalCacheController.prototype, "getCache", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(sdk_nestjs_auth_1.NativeAuthGuard, sdk_nestjs_auth_1.JwtAdminGuard),
    (0, common_1.Put)("/:key"),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Key has been updated',
    }),
    tslib_1.__param(0, (0, common_1.Param)('key')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, cache_value_1.CacheValue]),
    tslib_1.__metadata("design:returntype", void 0)
], LocalCacheController.prototype, "setCache", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(sdk_nestjs_auth_1.NativeAuthGuard, sdk_nestjs_auth_1.JwtAdminGuard),
    (0, common_1.Delete)("/:key"),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Key has been deleted from cache',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Key not found',
    }),
    tslib_1.__param(0, (0, common_1.Param)('key')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], LocalCacheController.prototype, "delCache", null);
LocalCacheController = tslib_1.__decorate([
    (0, common_1.Controller)('debug/cache/local'),
    (0, swagger_1.ApiExcludeController)(),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService])
], LocalCacheController);
exports.LocalCacheController = LocalCacheController;
//# sourceMappingURL=local.cache.controller.js.map