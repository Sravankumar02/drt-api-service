"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsBatchModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
const transaction_module_1 = require("../transactions/transaction.module");
const transactions_batch_service_1 = require("./transactions.batch.service");
let TransactionsBatchModule = class TransactionsBatchModule {
};
TransactionsBatchModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            dynamic_module_utils_1.DynamicModuleUtils.getCacheModule(),
            transaction_module_1.TransactionModule,
        ],
        providers: [
            transactions_batch_service_1.TransactionsBatchService,
        ],
        exports: [
            transactions_batch_service_1.TransactionsBatchService,
        ],
    })
], TransactionsBatchModule);
exports.TransactionsBatchModule = TransactionsBatchModule;
//# sourceMappingURL=transactions.batch.module.js.map