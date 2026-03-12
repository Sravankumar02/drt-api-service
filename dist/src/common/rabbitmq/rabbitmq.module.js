"use strict";
var RabbitMqModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqModule = void 0;
const tslib_1 = require("tslib");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
const dcdt_module_1 = require("../../endpoints/dcdt/dcdt.module");
const nft_module_1 = require("../../endpoints/nfts/nft.module");
const nft_worker_module_1 = require("../../queue.worker/nft.worker/nft.worker.module");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
const api_config_module_1 = require("../api-config/api.config.module");
const api_config_service_1 = require("../api-config/api.config.service");
const rabbitmq_consumer_1 = require("./rabbitmq.consumer");
const rabbitmq_nft_handler_service_1 = require("./rabbitmq.nft.handler.service");
const rabbitmq_token_handler_service_1 = require("./rabbitmq.token.handler.service");
let RabbitMqModule = RabbitMqModule_1 = class RabbitMqModule {
    static register() {
        return {
            module: RabbitMqModule_1,
            imports: [
                nestjs_rabbitmq_1.RabbitMQModule.forRootAsync(nestjs_rabbitmq_1.RabbitMQModule, {
                    imports: [api_config_module_1.ApiConfigModule],
                    inject: [api_config_service_1.ApiConfigService],
                    useFactory: (apiConfigService) => {
                        return {
                            name: apiConfigService.getEventsNotifierExchange(),
                            type: 'fanout',
                            options: {},
                            uri: apiConfigService.getEventsNotifierUrl(),
                        };
                    },
                }),
            ],
        };
    }
};
RabbitMqModule = RabbitMqModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            api_config_module_1.ApiConfigModule,
            nft_module_1.NftModule,
            nft_worker_module_1.NftWorkerModule,
            dcdt_module_1.DcdtModule,
        ],
        providers: [
            dynamic_module_utils_1.DynamicModuleUtils.getPubSubService(),
            rabbitmq_consumer_1.RabbitMqConsumer,
            rabbitmq_nft_handler_service_1.RabbitMqNftHandlerService,
            rabbitmq_token_handler_service_1.RabbitMqTokenHandlerService,
        ],
    })
], RabbitMqModule);
exports.RabbitMqModule = RabbitMqModule;
//# sourceMappingURL=rabbitmq.module.js.map