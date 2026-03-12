"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EsCircuitBreakerProxyModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_module_1 = require("../../../api-config/api.config.module");
const dynamic_module_utils_1 = require("../../../../utils/dynamic.module.utils");
const circuit_breaker_proxy_service_1 = require("./circuit.breaker.proxy.service");
let EsCircuitBreakerProxyModule = class EsCircuitBreakerProxyModule {
};
EsCircuitBreakerProxyModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            api_config_module_1.ApiConfigModule,
            dynamic_module_utils_1.DynamicModuleUtils.getElasticModule(),
        ],
        providers: [circuit_breaker_proxy_service_1.EsCircuitBreakerProxy],
        exports: [circuit_breaker_proxy_service_1.EsCircuitBreakerProxy],
    })
], EsCircuitBreakerProxyModule);
exports.EsCircuitBreakerProxyModule = EsCircuitBreakerProxyModule;
//# sourceMappingURL=circuit.breaker.proxy.module.js.map