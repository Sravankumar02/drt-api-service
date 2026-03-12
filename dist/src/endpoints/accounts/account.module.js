"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const assets_module_1 = require("../../common/assets/assets.module");
const plugin_module_1 = require("../../plugins/plugin.module");
const collection_module_1 = require("../collections/collection.module");
const delegation_legacy_module_1 = require("../delegation.legacy/delegation.legacy.module");
const nft_module_1 = require("../nfts/nft.module");
const scresult_module_1 = require("../sc-results/scresult.module");
const stake_module_1 = require("../stake/stake.module");
const token_module_1 = require("../tokens/token.module");
const transaction_module_1 = require("../transactions/transaction.module");
const transfer_module_1 = require("../transfers/transfer.module");
const username_module_1 = require("../usernames/username.module");
const vm_query_module_1 = require("../vm.query/vm.query.module");
const waiting_list_module_1 = require("../waiting-list/waiting.list.module");
const account_service_1 = require("./account.service");
const provider_module_1 = require("../providers/provider.module");
const keys_module_1 = require("../keys/keys.module");
let AccountModule = class AccountModule {
};
AccountModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            vm_query_module_1.VmQueryModule,
            (0, common_1.forwardRef)(() => nft_module_1.NftModule),
            delegation_legacy_module_1.DelegationLegacyModule,
            waiting_list_module_1.WaitingListModule,
            (0, common_1.forwardRef)(() => stake_module_1.StakeModule),
            (0, common_1.forwardRef)(() => transaction_module_1.TransactionModule),
            (0, common_1.forwardRef)(() => scresult_module_1.SmartContractResultModule),
            (0, common_1.forwardRef)(() => collection_module_1.CollectionModule),
            (0, common_1.forwardRef)(() => plugin_module_1.PluginModule),
            (0, common_1.forwardRef)(() => transfer_module_1.TransferModule),
            (0, common_1.forwardRef)(() => token_module_1.TokenModule),
            (0, common_1.forwardRef)(() => assets_module_1.AssetsModule),
            (0, common_1.forwardRef)(() => provider_module_1.ProviderModule),
            username_module_1.UsernameModule,
            (0, common_1.forwardRef)(() => keys_module_1.KeysModule),
        ],
        providers: [
            account_service_1.AccountService,
        ],
        exports: [
            account_service_1.AccountService,
        ],
    })
], AccountModule);
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map