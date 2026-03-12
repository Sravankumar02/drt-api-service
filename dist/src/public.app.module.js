"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicAppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
require("@sravankumar02/sdk-nestjs-common/lib/utils/extensions/array.extensions");
require("@sravankumar02/sdk-nestjs-common/lib/utils/extensions/date.extensions");
require("@sravankumar02/sdk-nestjs-common/lib/utils/extensions/number.extensions");
require("@sravankumar02/sdk-nestjs-common/lib/utils/extensions/string.extensions");
const endpoints_services_module_1 = require("./endpoints/endpoints.services.module");
const endpoints_controllers_module_1 = require("./endpoints/endpoints.controllers.module");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const dynamic_module_utils_1 = require("./utils/dynamic.module.utils");
const local_cache_controller_1 = require("./endpoints/caching/local.cache.controller");
let PublicAppModule = class PublicAppModule {
};
PublicAppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            sdk_nestjs_common_1.LoggingModule,
            endpoints_services_module_1.EndpointsServicesModule,
            endpoints_controllers_module_1.EndpointsControllersModule.forRoot(),
            dynamic_module_utils_1.DynamicModuleUtils.getRedisCacheModule(),
        ],
        controllers: [
            local_cache_controller_1.LocalCacheController,
        ],
        providers: [
            dynamic_module_utils_1.DynamicModuleUtils.getNestJsApiConfigService(),
            sdk_nestjs_cache_1.GuestCacheService,
        ],
        exports: [
            endpoints_services_module_1.EndpointsServicesModule,
        ],
    })
], PublicAppModule);
exports.PublicAppModule = PublicAppModule;
//# sourceMappingURL=public.app.module.js.map