"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheWarmerModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const cache_warmer_service_1 = require("./cache.warmer.service");
const endpoints_services_module_1 = require("../../endpoints/endpoints.services.module");
const keybase_module_1 = require("../../common/keybase/keybase.module");
const moa_module_1 = require("../../endpoints/moa/moa.module");
const assets_module_1 = require("../../common/assets/assets.module");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
const nft_cron_module_1 = require("../nft/nft.cron.module");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const plugin_module_1 = require("../../plugins/plugin.module");
const tps_warmer_service_1 = require("../tps/tps-warmer.service");
const tps_module_1 = require("../../endpoints/tps/tps.module");
let CacheWarmerModule = class CacheWarmerModule {
};
CacheWarmerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            endpoints_services_module_1.EndpointsServicesModule,
            keybase_module_1.KeybaseModule,
            moa_module_1.MoaModule.forRoot(),
            dynamic_module_utils_1.DynamicModuleUtils.getRedisCacheModule(),
            assets_module_1.AssetsModule,
            nft_cron_module_1.NftCronModule,
            plugin_module_1.PluginModule,
            tps_module_1.TpsModule,
        ],
        providers: [
            dynamic_module_utils_1.DynamicModuleUtils.getPubSubService(),
            sdk_nestjs_cache_1.GuestCacheWarmer,
            cache_warmer_service_1.CacheWarmerService,
            tps_warmer_service_1.TpsWarmerService,
        ],
    })
], CacheWarmerModule);
exports.CacheWarmerModule = CacheWarmerModule;
//# sourceMappingURL=cache.warmer.module.js.map