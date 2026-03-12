"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaWarmerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const microservices_1 = require("@nestjs/microservices");
const cache_info_1 = require("../../utils/cache.info");
const moa_settings_service_1 = require("./moa.settings.service");
const moa_economics_service_1 = require("./moa.economics.service");
const moa_pair_service_1 = require("./moa.pair.service");
const moa_token_service_1 = require("./moa.token.service");
const moa_farm_service_1 = require("./moa.farm.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
let MoaWarmerService = class MoaWarmerService {
    constructor(cachingService, clientProxy, moaEconomicsService, moaPairsService, moaTokensService, moaSettingsService, moaFarmsService) {
        this.cachingService = cachingService;
        this.clientProxy = clientProxy;
        this.moaEconomicsService = moaEconomicsService;
        this.moaPairsService = moaPairsService;
        this.moaTokensService = moaTokensService;
        this.moaSettingsService = moaSettingsService;
        this.moaFarmsService = moaFarmsService;
    }
    async handleMoaInvalidations() {
        await sdk_nestjs_common_1.Locker.lock('Refreshing moa pairs', async () => {
            await this.moaPairsService.refreshMoaPairs();
        }, true);
        await sdk_nestjs_common_1.Locker.lock('Refreshing moa economics', async () => {
            await this.moaEconomicsService.refreshMoaEconomics();
        }, true);
        await sdk_nestjs_common_1.Locker.lock('Refreshing moa tokens', async () => {
            await this.moaTokensService.refreshMoaTokens();
        }, true);
        await sdk_nestjs_common_1.Locker.lock('Refreshing moa farms', async () => {
            await this.moaFarmsService.refreshMoaFarms();
        }, true);
        await sdk_nestjs_common_1.Locker.lock('Refreshing moa settings', async () => {
            await this.moaSettingsService.refreshSettings();
        }, true);
    }
    async handleMoaSettings() {
        const settings = await this.moaSettingsService.getSettingsRaw();
        if (settings) {
            await this.invalidateKey(cache_info_1.CacheInfo.MoaSettings.key, settings, cache_info_1.CacheInfo.MoaSettings.ttl);
        }
    }
    async invalidateKey(key, data, ttl) {
        await this.cachingService.set(key, data, ttl);
        this.refreshCacheKey(key, ttl);
    }
    refreshCacheKey(key, ttl) {
        this.clientProxy.emit('refreshCacheKey', { key, ttl });
    }
};
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MoaWarmerService.prototype, "handleMoaInvalidations", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_MINUTES),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Moa settings invalidations' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MoaWarmerService.prototype, "handleMoaSettings", null);
MoaWarmerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Inject)('PUBSUB_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        microservices_1.ClientProxy,
        moa_economics_service_1.MoaEconomicsService,
        moa_pair_service_1.MoaPairService,
        moa_token_service_1.MoaTokenService,
        moa_settings_service_1.MoaSettingsService,
        moa_farm_service_1.MoaFarmService])
], MoaWarmerService);
exports.MoaWarmerService = MoaWarmerService;
//# sourceMappingURL=moa.warmer.service.js.map