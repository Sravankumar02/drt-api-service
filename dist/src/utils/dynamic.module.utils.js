"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicModuleUtils = void 0;
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_elastic_1 = require("@sravankumar02/sdk-nestjs-elastic");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const microservices_1 = require("@nestjs/microservices");
const api_config_module_1 = require("../common/api-config/api.config.module");
const api_config_service_1 = require("../common/api-config/api.config.service");
const drtnest_config_service_impl_service_1 = require("../common/api-config/drtnest-config-service-impl.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
class DynamicModuleUtils {
    static getElasticModule() {
        return sdk_nestjs_elastic_1.ElasticModule.forRootAsync({
            imports: [api_config_module_1.ApiConfigModule],
            useFactory: (apiConfigService) => new sdk_nestjs_elastic_1.ElasticModuleOptions({
                url: apiConfigService.getElasticUrl(),
                customValuePrefix: 'api',
            }),
            inject: [api_config_service_1.ApiConfigService],
        });
    }
    static getCacheModule() {
        return sdk_nestjs_cache_1.CacheModule.forRootAsync({
            imports: [api_config_module_1.ApiConfigModule],
            useFactory: (apiConfigService) => new sdk_nestjs_cache_1.RedisCacheModuleOptions({
                host: apiConfigService.getRedisUrl(),
            }, {
                poolLimit: apiConfigService.getPoolLimit(),
                processTtl: apiConfigService.getProcessTtl(),
            }),
            inject: [api_config_service_1.ApiConfigService],
        }, {
            skipItemsSerialization: true,
        });
    }
    static getRedisCacheModule() {
        return sdk_nestjs_cache_1.RedisCacheModule.forRootAsync({
            imports: [api_config_module_1.ApiConfigModule],
            useFactory: (apiConfigService) => new sdk_nestjs_cache_1.RedisCacheModuleOptions({
                host: apiConfigService.getRedisUrl(),
                connectTimeout: 10000,
            }),
            inject: [api_config_service_1.ApiConfigService],
        });
    }
    static getApiModule() {
        return sdk_nestjs_http_1.ApiModule.forRootAsync({
            imports: [api_config_module_1.ApiConfigModule],
            useFactory: (apiConfigService) => new sdk_nestjs_http_1.ApiModuleOptions({
                axiosTimeout: apiConfigService.getAxiosTimeout(),
                rateLimiterSecret: apiConfigService.getRateLimiterSecret(),
                serverTimeout: apiConfigService.getServerTimeout(),
                useKeepAliveAgent: apiConfigService.getUseKeepAliveAgentFlag(),
            }),
            inject: [api_config_service_1.ApiConfigService],
        });
    }
    static getNestJsApiConfigService() {
        return {
            provide: sdk_nestjs_common_1.DRTNEST_CONFIG_SERVICE,
            useClass: drtnest_config_service_impl_service_1.DrtnestConfigServiceImpl,
        };
    }
    static getPubSubService() {
        return {
            provide: 'PUBSUB_SERVICE',
            useFactory: (apiConfigService) => {
                const clientOptions = {
                    transport: microservices_1.Transport.REDIS,
                    options: {
                        host: apiConfigService.getRedisUrl(),
                        port: 6379,
                        retryDelay: 1000,
                        retryAttempts: 10,
                        retryStrategy: () => 1000,
                    },
                };
                return microservices_1.ClientProxyFactory.create(clientOptions);
            },
            inject: [api_config_service_1.ApiConfigService],
        };
    }
}
exports.DynamicModuleUtils = DynamicModuleUtils;
//# sourceMappingURL=dynamic.module.utils.js.map