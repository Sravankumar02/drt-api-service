"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const pool_service_1 = require("./pool.service");
const transaction_action_module_1 = require("../transactions/transaction-action/transaction.action.module");
let PoolModule = class PoolModule {
};
PoolModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            transaction_action_module_1.TransactionActionModule,
        ],
        providers: [
            pool_service_1.PoolService,
        ],
        exports: [
            pool_service_1.PoolService,
        ],
    })
], PoolModule);
exports.PoolModule = PoolModule;
//# sourceMappingURL=pool.module.js.map