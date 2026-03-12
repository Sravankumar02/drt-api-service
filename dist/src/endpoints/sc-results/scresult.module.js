"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractResultModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const assets_module_1 = require("../../common/assets/assets.module");
const transaction_action_module_1 = require("../transactions/transaction-action/transaction.action.module");
const scresult_service_1 = require("./scresult.service");
let SmartContractResultModule = class SmartContractResultModule {
};
SmartContractResultModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => transaction_action_module_1.TransactionActionModule),
            assets_module_1.AssetsModule,
        ],
        providers: [
            scresult_service_1.SmartContractResultService,
        ],
        exports: [
            scresult_service_1.SmartContractResultService,
        ],
    })
], SmartContractResultModule);
exports.SmartContractResultModule = SmartContractResultModule;
//# sourceMappingURL=scresult.module.js.map