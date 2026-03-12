"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionCompletedModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const api_config_module_1 = require("../../common/api-config/api.config.module");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
const transaction_completed_service_1 = require("./transaction.completed.service");
const api_metrics_module_1 = require("../../common/metrics/api.metrics.module");
const gateway_module_1 = require("../../common/gateway/gateway.module");
const protocol_module_1 = require("../../common/protocol/protocol.module");
let TransactionCompletedModule = class TransactionCompletedModule {
};
TransactionCompletedModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            api_config_module_1.ApiConfigModule,
            api_metrics_module_1.ApiMetricsModule,
            gateway_module_1.GatewayModule,
            protocol_module_1.ProtocolModule,
            dynamic_module_utils_1.DynamicModuleUtils.getCacheModule(),
        ],
        providers: [
            dynamic_module_utils_1.DynamicModuleUtils.getPubSubService(),
            transaction_completed_service_1.TransactionCompletedService,
        ],
    })
], TransactionCompletedModule);
exports.TransactionCompletedModule = TransactionCompletedModule;
//# sourceMappingURL=transaction.completed.module.js.map