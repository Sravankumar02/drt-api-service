"use strict";
var StatusCheckerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCheckerService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_monitoring_1 = require("@sravankumar02/sdk-nestjs-monitoring");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const gateway_component_request_1 = require("../../common/gateway/entities/gateway.component.request");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const elastic_indexer_service_1 = require("../../common/indexer/elastic/elastic.indexer.service");
const protocol_service_1 = require("../../common/protocol/protocol.service");
const identities_service_1 = require("../../endpoints/identities/identities.service");
const moa_farm_service_1 = require("../../endpoints/moa/moa.farm.service");
const moa_pair_service_1 = require("../../endpoints/moa/moa.pair.service");
const moa_token_service_1 = require("../../endpoints/moa/moa.token.service");
const node_service_1 = require("../../endpoints/nodes/node.service");
const provider_service_1 = require("../../endpoints/providers/provider.service");
const round_filter_1 = require("../../endpoints/rounds/entities/round.filter");
const shard_service_1 = require("../../endpoints/shards/shard.service");
const token_service_1 = require("../../endpoints/tokens/token.service");
const moa_economics_service_1 = require("../../endpoints/moa/moa.economics.service");
const network_service_1 = require("../../endpoints/network/network.service");
const query_pagination_1 = require("../../common/entities/query.pagination");
const token_filter_1 = require("../../endpoints/tokens/entities/token.filter");
const node_type_1 = require("../../endpoints/nodes/entities/node.type");
const account_query_options_1 = require("../../endpoints/accounts/entities/account.query.options");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const status_checker_thresholds_1 = require("../../common/api-config/entities/status-checker-thresholds");
const smart_contract_result_filter_1 = require("../../endpoints/sc-results/entities/smart.contract.result.filter");
let StatusCheckerService = StatusCheckerService_1 = class StatusCheckerService {
    constructor(elasticIndexerService, tokenService, protocolService, gatewayService, identitiesService, nodeService, providerService, shardService, moaPairService, moaFarmService, moaTokenService, moaEconomicService, economicService, apiConfigService) {
        this.elasticIndexerService = elasticIndexerService;
        this.tokenService = tokenService;
        this.protocolService = protocolService;
        this.gatewayService = gatewayService;
        this.identitiesService = identitiesService;
        this.nodeService = nodeService;
        this.providerService = providerService;
        this.shardService = shardService;
        this.moaPairService = moaPairService;
        this.moaFarmService = moaFarmService;
        this.moaTokenService = moaTokenService;
        this.moaEconomicService = moaEconomicService;
        this.economicService = economicService;
        this.apiConfigService = apiConfigService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(StatusCheckerService_1.name);
    }
    async handleAccountsCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Accounts Count', async () => {
            const count = await this.elasticIndexerService.getAccountsCount(new account_query_options_1.AccountQueryOptions());
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_accounts', count);
        }, true);
    }
    async handleBlocksCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Blocks Count', async () => {
            const count = await this.elasticIndexerService.getBlocksCount({});
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_blocks', count);
        }, true);
    }
    async handleCollectionsCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Collections Count', async () => {
            const count = await this.elasticIndexerService.getNftCollectionCount({});
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_collections', count);
        }, true);
    }
    async handleNftsCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Nfts Count', async () => {
            const count = await this.elasticIndexerService.getNftCount({});
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_nfts', count);
        }, true);
    }
    async handleTagsCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Tags Count', async () => {
            const count = await this.elasticIndexerService.getNftTagCount();
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_tags', count);
        }, true);
    }
    async handleRoundsCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Rounds Count', async () => {
            const count = await this.elasticIndexerService.getRoundCount(new round_filter_1.RoundFilter());
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_rounds', count);
        }, true);
    }
    async handleResultsCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Results Count', async () => {
            const count = await this.elasticIndexerService.getScResultsCount(new smart_contract_result_filter_1.SmartContractResultFilter());
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_results', count);
        }, true);
    }
    async handleTokensCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Tokens Count', async () => {
            const count = await this.tokenService.getTokenCount({});
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_tokens', count);
        }, true);
    }
    async handleTransactionsCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Transactions Count', async () => {
            const count = await this.elasticIndexerService.getTransactionCount({});
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_transactions', count);
        }, true);
    }
    async handleTransfersCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Transfers Count', async () => {
            const count = await this.elasticIndexerService.getTransfersCount({});
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_transfers', count);
        }, true);
    }
    async handleIdentitiesCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Identities Count', async () => {
            const identities = await this.identitiesService.getAllIdentities();
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_identities', identities.length);
        }, true);
    }
    async handleNodesCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Nodes Count', async () => {
            const nodes = await this.nodeService.getAllNodes();
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_nodes', nodes.length);
        }, true);
    }
    async handleProvidersCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Providers Count', async () => {
            const providers = await this.providerService.getAllProviders();
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_providers', providers.length);
        }, true);
    }
    async handleShardsCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Shards Count', async () => {
            const shards = await this.shardService.getAllShards();
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_shards', shards.length);
        }, true);
    }
    async handleMoaPairsCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Moa Pairs Count', async () => {
            const count = await this.moaPairService.getMoaPairsCount();
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_moa_pairs', count);
        }, true);
    }
    async handleMoaFarmsCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Moa Farms Count', async () => {
            const count = await this.moaFarmService.getMoaFarmsCount();
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_moa_farms', count);
        }, true);
    }
    async handleMoaTokensCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Moa Tokens Count', async () => {
            const count = await this.moaTokenService.getMoaTokensCount();
            sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue('total_moa_tokens', count);
        }, true);
    }
    async handleShardRoundsAndNonces() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Shard rounds and nonces', async () => {
            const shardIds = await this.protocolService.getShardIds();
            const roundsAndNonces = await Promise.all(shardIds.map(shardId => this.getCurrentRoundAndNonce(shardId)));
            for (const [shardId, round, nonce] of shardIds.zip(roundsAndNonces, (shardId, roundAndNonce) => [shardId, roundAndNonce.round, roundAndNonce.nonce])) {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`total_shard_rounds_${shardId}`, round);
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`total_shard_nonces_${shardId}`, nonce);
            }
        }, true);
    }
    async handleMoaEconomicValues() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Store Moa economics metrics', async () => {
            const economics = await this.moaEconomicService.getMoaEconomics();
            for (const [key, value] of Object.entries(economics)) {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`moa_economics_${key}`, value);
            }
        }, true);
    }
    async handleEconomicValues() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Store Economics metrics', async () => {
            const economics = await this.economicService.getEconomics();
            for (const [key, value] of Object.entries(economics)) {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`economics_${key}`, value);
            }
        }, true);
    }
    async checkTokenCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Check token count', async () => {
            const tokenCount = await this.tokenService.getTokenCount({});
            if (tokenCount > this.getStatusCheckerThresholds().tokens) {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_token_count:success`, 1);
            }
            else {
                this.logger.error(`Invalid token count '${tokenCount}'`);
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_token_count:error`, 1);
            }
        }, true);
    }
    async checkNodeCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Check node count', async () => {
            const allNodes = await this.nodeService.getAllNodes();
            if (allNodes.length > this.getStatusCheckerThresholds().nodes) {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_node_count:success`, 1);
            }
            else {
                this.logger.error(`Invalid node count '${allNodes.length}'`);
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_node_count:error`, 1);
            }
        }, true);
    }
    async checkProviderCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Check provider count', async () => {
            const providers = await this.providerService.getAllProviders();
            if (providers.length > this.getStatusCheckerThresholds().providers) {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_provider_count:success`, 1);
            }
            else {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_provider_count:error`, 1);
                this.logger.error(`Invalid provider count '${providers.length}'`);
            }
        }, true);
    }
    async checkTokenSupply() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Check token supply', async () => {
            const tokens = await this.tokenService.getTokens(new query_pagination_1.QueryPagination({ size: 1000 }), new token_filter_1.TokenFilter());
            const tokensWithSupply = tokens.filter(token => token.supply);
            if (tokensWithSupply.length > this.getStatusCheckerThresholds().tokenSupplyCount) {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_token_supply:success`, 1);
            }
            else {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_token_supply:error`, 1);
                this.logger.error(`Invalid token with supply count '${tokensWithSupply.length}'`);
            }
        }, true);
    }
    async checkTokenAssets() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Check token assets', async () => {
            const tokens = await this.tokenService.getTokens(new query_pagination_1.QueryPagination({ size: 1000 }), new token_filter_1.TokenFilter());
            const tokensWithAssets = tokens.filter(token => token.assets);
            if (tokensWithAssets.length > this.getStatusCheckerThresholds().tokenAssets) {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_token_assets:success`, 1);
            }
            else {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_token_assets:error`, 1);
                this.logger.error(`Invalid token with assets count '${tokensWithAssets.length}'`);
            }
        }, true);
    }
    async checkTokenAccounts() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Check token accounts', async () => {
            const tokens = await this.tokenService.getTokens(new query_pagination_1.QueryPagination({ size: 1000 }), new token_filter_1.TokenFilter());
            const tokensWithAccounts = tokens.filter(token => token.accounts);
            if (tokensWithAccounts.length > this.getStatusCheckerThresholds().tokenAccounts) {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_token_accounts:success`, 1);
            }
            else {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_token_accounts:error`, 1);
                this.logger.error(`Invalid token with accounts count '${tokensWithAccounts.length}'`);
            }
        }, true);
    }
    async checkTokenTransactions() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Check token transactions', async () => {
            const tokens = await this.tokenService.getTokens(new query_pagination_1.QueryPagination({ size: 1000 }), new token_filter_1.TokenFilter());
            const tokensWithTransactions = tokens.filter(token => token.transactions);
            if (tokensWithTransactions.length >= this.getStatusCheckerThresholds().tokenTransactions) {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_token_transactions:success`, 1);
            }
            else {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_token_transactions:error`, 1);
                this.logger.error(`Invalid token with transactions count '${tokensWithTransactions.length}'`);
            }
        }, true);
    }
    async checkValidatorNodeCount() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Check validator node count ', async () => {
            const nodes = await this.nodeService.getAllNodes();
            const validators = nodes.filter(node => node.type === node_type_1.NodeType.validator);
            if (validators.length >= this.getStatusCheckerThresholds().nodeValidators) {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_validator_node_count:success`, 1);
            }
            else {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_validator_node_count:error`, 1);
                this.logger.error(`Invalid validator count '${validators.length}'`);
            }
        }, true);
    }
    async checkIdentityNames() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Check identity names', async () => {
            const identities = await this.identitiesService.getAllIdentities();
            const success = identities.slice(0, 50).every(x => x.name);
            if (success) {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_identity_names:success`, 1);
            }
            else {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_identity_names:error`, 1);
            }
        }, true);
    }
    async checkIdentities() {
        await sdk_nestjs_common_1.Locker.lock('Status Checker: Check identities', async () => {
            const identities = await this.identitiesService.getAllIdentities();
            const success = identities.slice(0, 50).every(identity => identity.identity);
            if (success) {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_identities:success`, 1);
            }
            else {
                sdk_nestjs_monitoring_1.MetricsService.setClusterComparisonValue(`check_identities:error`, 1);
            }
        }, true);
    }
    async getCurrentRoundAndNonce(shardId) {
        const result = await this.gatewayService.get(`network/status/${shardId}`, gateway_component_request_1.GatewayComponentRequest.networkStatus);
        return {
            round: result.status.drt_current_round,
            nonce: result.status.drt_nonce,
        };
    }
    getStatusCheckerThresholds() {
        const thresholds = this.apiConfigService.getStatusCheckerThresholds();
        if (!thresholds) {
            return this.getDefaultStatusCheckerThresholds();
        }
        return new status_checker_thresholds_1.StatusCheckerThresholds(thresholds);
    }
    getDefaultStatusCheckerThresholds() {
        const network = this.apiConfigService.getNetwork();
        switch (network) {
            case 'devnet':
                return new status_checker_thresholds_1.StatusCheckerThresholds({
                    tokens: 500,
                    nodes: 3000,
                    providers: 10,
                    tokenSupplyCount: 20,
                    tokenAssets: 20,
                    tokenAccounts: 500,
                    tokenTransactions: 500,
                    nodeValidators: 300,
                });
            case 'testnet':
                return new status_checker_thresholds_1.StatusCheckerThresholds({
                    tokens: 100,
                    nodes: 300,
                    providers: 30,
                    tokenSupplyCount: 1,
                    tokenAssets: 1,
                    tokenAccounts: 200,
                    tokenTransactions: 100,
                    nodeValidators: 3500,
                });
            case 'mainnet':
                return new status_checker_thresholds_1.StatusCheckerThresholds({
                    tokens: 1000,
                    nodes: 5000,
                    providers: 150,
                    tokenSupplyCount: 100,
                    tokenAssets: 100,
                    tokenAccounts: 1000,
                    tokenTransactions: 1000,
                    nodeValidators: 3260,
                });
            default:
                throw new Error(`Invalid network '${network}'`);
        }
    }
};
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleAccountsCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleBlocksCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleCollectionsCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleNftsCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleTagsCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleRoundsCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleResultsCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleTokensCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleTransactionsCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleTransfersCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleIdentitiesCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleNodesCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleProvidersCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleShardsCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleMoaPairsCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleMoaFarmsCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleMoaTokensCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleShardRoundsAndNonces", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleMoaEconomicValues", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "handleEconomicValues", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "checkTokenCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "checkNodeCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "checkProviderCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "checkTokenSupply", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "checkTokenAssets", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "checkTokenAccounts", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "checkTokenTransactions", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "checkValidatorNodeCount", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "checkIdentityNames", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StatusCheckerService.prototype, "checkIdentities", null);
StatusCheckerService = StatusCheckerService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [elastic_indexer_service_1.ElasticIndexerService,
        token_service_1.TokenService,
        protocol_service_1.ProtocolService,
        gateway_service_1.GatewayService,
        identities_service_1.IdentitiesService,
        node_service_1.NodeService,
        provider_service_1.ProviderService,
        shard_service_1.ShardService,
        moa_pair_service_1.MoaPairService,
        moa_farm_service_1.MoaFarmService,
        moa_token_service_1.MoaTokenService,
        moa_economics_service_1.MoaEconomicsService,
        network_service_1.NetworkService,
        api_config_service_1.ApiConfigService])
], StatusCheckerService);
exports.StatusCheckerService = StatusCheckerService;
//# sourceMappingURL=status.checker.service.js.map