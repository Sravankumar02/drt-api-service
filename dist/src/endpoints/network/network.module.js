"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const plugin_module_1 = require("../../plugins/plugin.module");
const account_module_1 = require("../accounts/account.module");
const block_module_1 = require("../blocks/block.module");
const scresult_module_1 = require("../sc-results/scresult.module");
const stake_module_1 = require("../stake/stake.module");
const token_module_1 = require("../tokens/token.module");
const transaction_module_1 = require("../transactions/transaction.module");
const vm_query_module_1 = require("../vm.query/vm.query.module");
const network_service_1 = require("./network.service");
let NetworkModule = class NetworkModule {
};
NetworkModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => token_module_1.TokenModule),
            (0, common_1.forwardRef)(() => vm_query_module_1.VmQueryModule),
            (0, common_1.forwardRef)(() => block_module_1.BlockModule),
            (0, common_1.forwardRef)(() => account_module_1.AccountModule),
            (0, common_1.forwardRef)(() => transaction_module_1.TransactionModule),
            (0, common_1.forwardRef)(() => stake_module_1.StakeModule),
            (0, common_1.forwardRef)(() => plugin_module_1.PluginModule),
            (0, common_1.forwardRef)(() => scresult_module_1.SmartContractResultModule),
        ],
        providers: [
            network_service_1.NetworkService,
        ],
        exports: [
            network_service_1.NetworkService,
        ],
    })
], NetworkModule);
exports.NetworkModule = NetworkModule;
//# sourceMappingURL=network.module.js.map