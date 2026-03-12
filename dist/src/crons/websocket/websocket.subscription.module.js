"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketSubscriptionModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const transaction_module_1 = require("../../endpoints/transactions/transaction.module");
const websocket_cron_service_1 = require("./websocket.cron.service");
const block_module_1 = require("../../endpoints/blocks/block.module");
const network_module_1 = require("../../endpoints/network/network.module");
const pool_module_1 = require("../../endpoints/pool/pool.module");
const events_module_1 = require("../../endpoints/events/events.module");
const blocks_gateway_1 = require("./blocks.gateway");
const network_gateway_1 = require("./network.gateway");
const transaction_gateway_1 = require("./transaction.gateway");
const pool_gateway_1 = require("./pool.gateway");
const events_gateway_1 = require("./events.gateway");
const connection_handler_1 = require("./connection.handler");
const round_module_1 = require("../../endpoints/rounds/round.module");
const transaction_custom_gateway_1 = require("./transaction.custom.gateway");
const events_custom_gateway_1 = require("./events.custom.gateway");
const api_config_module_1 = require("../../common/api-config/api.config.module");
const transfers_custom_gateway_1 = require("./transfers.custom.gateway");
const transfer_module_1 = require("../../endpoints/transfers/transfer.module");
let WebsocketSubscriptionModule = class WebsocketSubscriptionModule {
};
WebsocketSubscriptionModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            transaction_module_1.TransactionModule,
            block_module_1.BlockModule,
            network_module_1.NetworkModule,
            pool_module_1.PoolModule,
            events_module_1.EventsModule,
            round_module_1.RoundModule,
            transfer_module_1.TransferModule,
            api_config_module_1.ApiConfigModule,
        ],
        providers: [
            websocket_cron_service_1.WebsocketCronService,
            connection_handler_1.ConnectionHandler,
            blocks_gateway_1.BlocksGateway,
            network_gateway_1.NetworkGateway,
            transaction_gateway_1.TransactionsGateway,
            pool_gateway_1.PoolGateway,
            events_gateway_1.EventsGateway,
            transaction_custom_gateway_1.TransactionsCustomGateway,
            events_custom_gateway_1.EventsCustomGateway,
            transfers_custom_gateway_1.TransfersCustomGateway,
        ],
    })
], WebsocketSubscriptionModule);
exports.WebsocketSubscriptionModule = WebsocketSubscriptionModule;
//# sourceMappingURL=websocket.subscription.module.js.map