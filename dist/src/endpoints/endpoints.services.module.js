"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointsServicesModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nft_media_module_1 = require("../queue.worker/nft.worker/queue/job-services/media/nft.media.module");
const account_module_1 = require("./accounts/account.module");
const block_module_1 = require("./blocks/block.module");
const bls_module_1 = require("./bls/bls.module");
const collection_module_1 = require("./collections/collection.module");
const dapp_config_module_1 = require("./dapp-config/dapp.config.module");
const delegation_legacy_module_1 = require("./delegation.legacy/delegation.legacy.module");
const delegation_module_1 = require("./delegation/delegation.module");
const dcdt_module_1 = require("./dcdt/dcdt.module");
const identities_module_1 = require("./identities/identities.module");
const keys_module_1 = require("./keys/keys.module");
const nft_marketplace_module_1 = require("./marketplace/nft.marketplace.module");
const moa_module_1 = require("./moa/moa.module");
const miniblock_module_1 = require("./miniblocks/miniblock.module");
const network_module_1 = require("./network/network.module");
const nft_module_1 = require("./nfts/nft.module");
const tag_module_1 = require("./nfttags/tag.module");
const node_module_1 = require("./nodes/node.module");
const process_nfts_module_1 = require("./process-nfts/process.nfts.module");
const provider_module_1 = require("./providers/provider.module");
const round_module_1 = require("./rounds/round.module");
const scresult_module_1 = require("./sc-results/scresult.module");
const shard_module_1 = require("./shards/shard.module");
const stake_module_1 = require("./stake/stake.module");
const token_module_1 = require("./tokens/token.module");
const transactions_batch_module_1 = require("./transactions.batch/transactions.batch.module");
const transaction_action_module_1 = require("./transactions/transaction-action/transaction.action.module");
const transaction_module_1 = require("./transactions/transaction.module");
const transfer_module_1 = require("./transfers/transfer.module");
const username_module_1 = require("./usernames/username.module");
const vm_query_module_1 = require("./vm.query/vm.query.module");
const waiting_list_module_1 = require("./waiting-list/waiting.list.module");
const websocket_module_1 = require("./websocket/websocket.module");
const pool_module_1 = require("./pool/pool.module");
const tps_module_1 = require("./tps/tps.module");
const application_module_1 = require("./applications/application.module");
const events_module_1 = require("./events/events.module");
let EndpointsServicesModule = class EndpointsServicesModule {
};
EndpointsServicesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            account_module_1.AccountModule,
            block_module_1.BlockModule,
            collection_module_1.CollectionModule,
            delegation_module_1.DelegationModule,
            delegation_legacy_module_1.DelegationLegacyModule,
            identities_module_1.IdentitiesModule,
            keys_module_1.KeysModule,
            miniblock_module_1.MiniBlockModule,
            network_module_1.NetworkModule,
            nft_module_1.NftModule,
            nft_media_module_1.NftMediaModule,
            tag_module_1.TagModule,
            node_module_1.NodeModule,
            provider_module_1.ProviderModule,
            round_module_1.RoundModule,
            scresult_module_1.SmartContractResultModule,
            shard_module_1.ShardModule,
            stake_module_1.StakeModule,
            token_module_1.TokenModule,
            round_module_1.RoundModule,
            transaction_module_1.TransactionModule,
            username_module_1.UsernameModule,
            vm_query_module_1.VmQueryModule,
            waiting_list_module_1.WaitingListModule,
            dcdt_module_1.DcdtModule,
            bls_module_1.BlsModule,
            dapp_config_module_1.DappConfigModule,
            transfer_module_1.TransferModule,
            pool_module_1.PoolModule,
            transaction_action_module_1.TransactionActionModule,
            websocket_module_1.WebsocketModule,
            moa_module_1.MoaModule.forRoot(),
            process_nfts_module_1.ProcessNftsModule,
            nft_marketplace_module_1.NftMarketplaceModule,
            transactions_batch_module_1.TransactionsBatchModule,
            tps_module_1.TpsModule,
            application_module_1.ApplicationModule,
            events_module_1.EventsModule,
        ],
        exports: [
            account_module_1.AccountModule, collection_module_1.CollectionModule, block_module_1.BlockModule, delegation_module_1.DelegationModule, delegation_legacy_module_1.DelegationLegacyModule, identities_module_1.IdentitiesModule, keys_module_1.KeysModule,
            miniblock_module_1.MiniBlockModule, network_module_1.NetworkModule, nft_module_1.NftModule, nft_media_module_1.NftMediaModule, tag_module_1.TagModule, node_module_1.NodeModule, provider_module_1.ProviderModule,
            round_module_1.RoundModule, scresult_module_1.SmartContractResultModule, shard_module_1.ShardModule, stake_module_1.StakeModule, token_module_1.TokenModule, round_module_1.RoundModule, transaction_module_1.TransactionModule, username_module_1.UsernameModule, vm_query_module_1.VmQueryModule,
            waiting_list_module_1.WaitingListModule, dcdt_module_1.DcdtModule, bls_module_1.BlsModule, dapp_config_module_1.DappConfigModule, transfer_module_1.TransferModule, pool_module_1.PoolModule, transaction_action_module_1.TransactionActionModule, websocket_module_1.WebsocketModule, moa_module_1.MoaModule,
            process_nfts_module_1.ProcessNftsModule, nft_marketplace_module_1.NftMarketplaceModule, transactions_batch_module_1.TransactionsBatchModule, tps_module_1.TpsModule, application_module_1.ApplicationModule, events_module_1.EventsModule,
        ],
    })
], EndpointsServicesModule);
exports.EndpointsServicesModule = EndpointsServicesModule;
//# sourceMappingURL=endpoints.services.module.js.map