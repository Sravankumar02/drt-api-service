"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchTransactionProcessorModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const api_config_module_1 = require("../../common/api-config/api.config.module");
const transactions_batch_module_1 = require("../../endpoints/transactions.batch/transactions.batch.module");
const transaction_module_1 = require("../../endpoints/transactions/transaction.module");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
const batch_transaction_processor_service_1 = require("./batch.transaction.processor.service");
let BatchTransactionProcessorModule = class BatchTransactionProcessorModule {
};
BatchTransactionProcessorModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            api_config_module_1.ApiConfigModule,
            dynamic_module_utils_1.DynamicModuleUtils.getCacheModule(),
            transactions_batch_module_1.TransactionsBatchModule,
            transaction_module_1.TransactionModule,
        ],
        providers: [
            dynamic_module_utils_1.DynamicModuleUtils.getPubSubService(),
            batch_transaction_processor_service_1.BatchTransactionProcessorService,
        ],
    })
], BatchTransactionProcessorModule);
exports.BatchTransactionProcessorModule = BatchTransactionProcessorModule;
//# sourceMappingURL=batch.transaction.processor.module.js.map