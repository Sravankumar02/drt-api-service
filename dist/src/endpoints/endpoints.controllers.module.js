"use strict";
var EndpointsControllersModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointsControllersModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const configuration_1 = tslib_1.__importDefault(require("../../config/configuration"));
const plugin_module_1 = require("../plugins/plugin.module");
const dynamic_module_utils_1 = require("../utils/dynamic.module.utils");
const account_controller_1 = require("./accounts/account.controller");
const block_controller_1 = require("./blocks/block.controller");
const collection_controller_1 = require("./collections/collection.controller");
const dapp_config_controller_1 = require("./dapp-config/dapp.config.controller");
const delegation_legacy_controller_1 = require("./delegation.legacy/delegation.legacy.controller");
const delegation_controller_1 = require("./delegation/delegation.controller");
const endpoints_services_module_1 = require("./endpoints.services.module");
const health_check_controller_1 = require("./health-check/health.check.controller");
const identities_controller_1 = require("./identities/identities.controller");
const keys_controller_1 = require("./keys/keys.controller");
const nft_marketplace_controller_1 = require("./marketplace/nft.marketplace.controller");
const moa_controller_1 = require("./moa/moa.controller");
const mini_block_controller_1 = require("./miniblocks/mini.block.controller");
const network_controller_1 = require("./network/network.controller");
const nft_controller_1 = require("./nfts/nft.controller");
const tag_controller_1 = require("./nfttags/tag.controller");
const node_controller_1 = require("./nodes/node.controller");
const process_nfts_public_controller_1 = require("./process-nfts/process.nfts.public.controller");
const provider_controller_1 = require("./providers/provider.controller");
const gateway_proxy_controller_1 = require("./proxy/gateway.proxy.controller");
const proxy_module_1 = require("./proxy/proxy.module");
const round_controller_1 = require("./rounds/round.controller");
const scresult_controller_1 = require("./sc-results/scresult.controller");
const shard_controller_1 = require("./shards/shard.controller");
const stake_controller_1 = require("./stake/stake.controller");
const token_controller_1 = require("./tokens/token.controller");
const transactions_batch_controller_1 = require("./transactions.batch/transactions.batch.controller");
const transaction_controller_1 = require("./transactions/transaction.controller");
const transfer_controller_1 = require("./transfers/transfer.controller");
const username_controller_1 = require("./usernames/username.controller");
const vm_query_controller_1 = require("./vm.query/vm.query.controller");
const waiting_list_controller_1 = require("./waiting-list/waiting.list.controller");
const websocket_controller_1 = require("./websocket/websocket.controller");
const pool_controller_1 = require("./pool/pool.controller");
const tps_controller_1 = require("./tps/tps.controller");
const application_controller_1 = require("./applications/application.controller");
const events_controller_1 = require("./events/events.controller");
let EndpointsControllersModule = EndpointsControllersModule_1 = class EndpointsControllersModule {
    static forRoot() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        const controllers = [
            account_controller_1.AccountController, block_controller_1.BlockController, collection_controller_1.CollectionController, delegation_controller_1.DelegationController, delegation_legacy_controller_1.DelegationLegacyController, identities_controller_1.IdentitiesController,
            keys_controller_1.KeysController, mini_block_controller_1.MiniBlockController, network_controller_1.NetworkController, nft_controller_1.NftController, tag_controller_1.TagController, node_controller_1.NodeController,
            provider_controller_1.ProviderController, gateway_proxy_controller_1.GatewayProxyController, round_controller_1.RoundController, scresult_controller_1.SmartContractResultController, shard_controller_1.ShardController, stake_controller_1.StakeController, stake_controller_1.StakeController,
            token_controller_1.TokenController, transaction_controller_1.TransactionController, username_controller_1.UsernameController, vm_query_controller_1.VmQueryController, waiting_list_controller_1.WaitingListController,
            health_check_controller_1.HealthCheckController, dapp_config_controller_1.DappConfigController, websocket_controller_1.WebsocketController, transfer_controller_1.TransferController,
            process_nfts_public_controller_1.ProcessNftsPublicController, transactions_batch_controller_1.TransactionsBatchController, application_controller_1.ApplicationController, events_controller_1.EventsController,
        ];
        const isMarketplaceFeatureEnabled = (_c = (_b = (_a = (0, configuration_1.default)().features) === null || _a === void 0 ? void 0 : _a.marketplace) === null || _b === void 0 ? void 0 : _b.enabled) !== null && _c !== void 0 ? _c : false;
        if (isMarketplaceFeatureEnabled) {
            controllers.push(nft_marketplace_controller_1.NftMarketplaceController);
        }
        const isExchangeEnabled = ((_f = (_e = (_d = (0, configuration_1.default)().features) === null || _d === void 0 ? void 0 : _d.exchange) === null || _e === void 0 ? void 0 : _e.enabled) !== null && _f !== void 0 ? _f : false) ||
            ((_h = (_g = (0, configuration_1.default)()['transaction-action']) === null || _g === void 0 ? void 0 : _g.moa) === null || _h === void 0 ? void 0 : _h.microServiceUrl) ||
            ((_l = (_k = (_j = (0, configuration_1.default)()['plugins']) === null || _j === void 0 ? void 0 : _j['transaction-action']) === null || _k === void 0 ? void 0 : _k['moa']) === null || _l === void 0 ? void 0 : _l['microServiceUrl']);
        if (isExchangeEnabled) {
            controllers.push(moa_controller_1.MoaController);
        }
        const isTxPoolEnabled = (_o = (_m = (0, configuration_1.default)().features) === null || _m === void 0 ? void 0 : _m.transactionPool) === null || _o === void 0 ? void 0 : _o.enabled;
        if (isTxPoolEnabled) {
            controllers.push(pool_controller_1.PoolController);
        }
        const isTpsEnabled = (_q = (_p = (0, configuration_1.default)().features) === null || _p === void 0 ? void 0 : _p.tps) === null || _q === void 0 ? void 0 : _q.enabled;
        if (isTpsEnabled) {
            controllers.push(tps_controller_1.TpsController);
        }
        return {
            module: EndpointsControllersModule_1,
            imports: [
                endpoints_services_module_1.EndpointsServicesModule,
                proxy_module_1.ProxyModule,
                plugin_module_1.PluginModule,
            ],
            providers: [
                dynamic_module_utils_1.DynamicModuleUtils.getNestJsApiConfigService(),
            ],
            controllers,
        };
    }
};
EndpointsControllersModule = EndpointsControllersModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({})
], EndpointsControllersModule);
exports.EndpointsControllersModule = EndpointsControllersModule;
//# sourceMappingURL=endpoints.controllers.module.js.map