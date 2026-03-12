"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const cache_info_1 = require("../../utils/cache.info");
const api_config_service_1 = require("../api-config/api.config.service");
const persistence_service_1 = require("../persistence/persistence.service");
let SettingsService = class SettingsService {
    constructor(apiConfigService, persistenceService, cachingService) {
        this.apiConfigService = apiConfigService;
        this.persistenceService = persistenceService;
        this.cachingService = cachingService;
    }
    async getUseRequestCachingFlag() {
        return await this.getSetting('UseRequestCaching', this.apiConfigService.getUseRequestCachingFlag());
    }
    async getUseRequestLoggingFlag() {
        return await this.getSetting('UseRequestLogging', this.apiConfigService.getUseRequestLoggingFlag());
    }
    async getUseVmQueryTracingFlag() {
        return await this.getSetting('UseVmQueryTracing', this.apiConfigService.getUseVmQueryTracingFlag());
    }
    async getSetting(name, fallbackValue) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.Setting(name).key, async () => {
            const value = await this.persistenceService.getSetting(name);
            if (!value) {
                await this.persistenceService.setSetting(name, fallbackValue);
            }
            return value !== null && value !== void 0 ? value : fallbackValue;
        }, cache_info_1.CacheInfo.Setting(name).ttl);
    }
    async getAllSettings() {
        return await this.persistenceService.getAllSettings();
    }
};
SettingsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => persistence_service_1.PersistenceService))),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        persistence_service_1.PersistenceService,
        sdk_nestjs_cache_1.CacheService])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map