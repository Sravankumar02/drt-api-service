"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketPublisherModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const transaction_action_module_1 = require("../../endpoints/transactions/transaction-action/transaction.action.module");
const web_socket_publisher_service_1 = require("./web-socket-publisher-service");
const web_socket_publisher_controller_1 = require("./web-socket-publisher-controller");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
let WebSocketPublisherModule = class WebSocketPublisherModule {
};
WebSocketPublisherModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            transaction_action_module_1.TransactionActionModule,
        ],
        controllers: [
            web_socket_publisher_controller_1.WebSocketPublisherController,
        ],
        providers: [
            web_socket_publisher_service_1.WebSocketPublisherService,
            dynamic_module_utils_1.DynamicModuleUtils.getPubSubService(),
        ],
        exports: [
            web_socket_publisher_service_1.WebSocketPublisherService,
            'PUBSUB_SERVICE',
        ],
    })
], WebSocketPublisherModule);
exports.WebSocketPublisherModule = WebSocketPublisherModule;
//# sourceMappingURL=web-socket-publisher-module.js.map