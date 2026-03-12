"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticIndexerModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_module_1 = require("../../api-config/api.config.module");
const bls_module_1 = require("../../../endpoints/bls/bls.module");
const elastic_indexer_helper_1 = require("./elastic.indexer.helper");
const elastic_indexer_service_1 = require("./elastic.indexer.service");
const circuit_breaker_proxy_module_1 = require("./circuit-breaker/circuit.breaker.proxy.module");
let ElasticIndexerModule = class ElasticIndexerModule {
};
ElasticIndexerModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            api_config_module_1.ApiConfigModule,
            (0, common_1.forwardRef)(() => bls_module_1.BlsModule),
            circuit_breaker_proxy_module_1.EsCircuitBreakerProxyModule,
        ],
        providers: [elastic_indexer_service_1.ElasticIndexerService, elastic_indexer_helper_1.ElasticIndexerHelper],
        exports: [elastic_indexer_service_1.ElasticIndexerService, elastic_indexer_helper_1.ElasticIndexerHelper],
    })
], ElasticIndexerModule);
exports.ElasticIndexerModule = ElasticIndexerModule;
//# sourceMappingURL=elastic.indexer.module.js.map