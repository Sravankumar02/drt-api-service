"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateAppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const remote_cache_controller_1 = require("./endpoints/caching/remote.cache.controller");
const api_metrics_controller_1 = require("./common/metrics/api.metrics.controller");
const health_check_controller_1 = require("./endpoints/health-check/health.check.controller");
const process_nfts_private_controller_1 = require("./endpoints/process-nfts/process.nfts.private.controller");
const process_nfts_module_1 = require("./endpoints/process-nfts/process.nfts.module");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const dynamic_module_utils_1 = require("./utils/dynamic.module.utils");
const api_metrics_module_1 = require("./common/metrics/api.metrics.module");
let PrivateAppModule = class PrivateAppModule {
};
PrivateAppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            sdk_nestjs_common_1.LoggingModule,
            process_nfts_module_1.ProcessNftsModule,
            api_metrics_module_1.ApiMetricsModule,
        ],
        providers: [
            dynamic_module_utils_1.DynamicModuleUtils.getNestJsApiConfigService(),
            dynamic_module_utils_1.DynamicModuleUtils.getPubSubService(),
        ],
        controllers: [
            api_metrics_controller_1.ApiMetricsController,
            remote_cache_controller_1.RemoteCacheController,
            health_check_controller_1.HealthCheckController,
            process_nfts_private_controller_1.ProcessNftsPrivateController,
        ],
    })
], PrivateAppModule);
exports.PrivateAppModule = PrivateAppModule;
//# sourceMappingURL=private.app.module.js.map