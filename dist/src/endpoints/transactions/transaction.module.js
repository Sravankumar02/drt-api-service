"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const assets_module_1 = require("../../common/assets/assets.module");
const data_api_module_1 = require("../../common/data-api/data-api.module");
const plugin_module_1 = require("../../plugins/plugin.module");
const block_module_1 = require("../blocks/block.module");
const network_module_1 = require("../network/network.module");
const pool_module_1 = require("../pool/pool.module");
const token_module_1 = require("../tokens/token.module");
const username_module_1 = require("../usernames/username.module");
const transaction_action_module_1 = require("./transaction-action/transaction.action.module");
const transaction_get_service_1 = require("./transaction.get.service");
const transaction_price_service_1 = require("./transaction.price.service");
const transaction_service_1 = require("./transaction.service");
let TransactionModule = class TransactionModule {
};
TransactionModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => token_module_1.TokenModule),
            (0, common_1.forwardRef)(() => plugin_module_1.PluginModule),
            (0, common_1.forwardRef)(() => transaction_action_module_1.TransactionActionModule),
            (0, common_1.forwardRef)(() => block_module_1.BlockModule),
            (0, common_1.forwardRef)(() => pool_module_1.PoolModule),
            (0, common_1.forwardRef)(() => network_module_1.NetworkModule),
            assets_module_1.AssetsModule,
            username_module_1.UsernameModule,
            data_api_module_1.DataApiModule,
        ],
        providers: [
            transaction_get_service_1.TransactionGetService, transaction_price_service_1.TransactionPriceService, transaction_service_1.TransactionService,
        ],
        exports: [
            transaction_get_service_1.TransactionGetService, transaction_price_service_1.TransactionPriceService, transaction_service_1.TransactionService,
        ],
    })
], TransactionModule);
exports.TransactionModule = TransactionModule;
//# sourceMappingURL=transaction.module.js.map