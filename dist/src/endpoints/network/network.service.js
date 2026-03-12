"use strict";
var NetworkService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const account_service_1 = require("../accounts/account.service");
const block_service_1 = require("../blocks/block.service");
const block_filter_1 = require("../blocks/entities/block.filter");
const transaction_filter_1 = require("../transactions/entities/transaction.filter");
const transaction_service_1 = require("../transactions/transaction.service");
const vm_query_service_1 = require("../vm.query/vm.query.service");
const economics_1 = require("./entities/economics");
const stake_service_1 = require("../stake/stake.service");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const cache_info_1 = require("../../utils/cache.info");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const about_1 = require("./entities/about");
const plugin_service_1 = require("../../common/plugins/plugin.service");
const scresult_service_1 = require("../sc-results/scresult.service");
const token_service_1 = require("../tokens/token.service");
const account_query_options_1 = require("../accounts/entities/account.query.options");
const data_api_service_1 = require("../../common/data-api/data-api.service");
const feature_configs_1 = require("./entities/feature.configs");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const smart_contract_result_filter_1 = require("../sc-results/entities/smart.contract.result.filter");
let NetworkService = NetworkService_1 = class NetworkService {
    constructor(tokenService, apiConfigService, cachingService, gatewayService, vmQueryService, blockService, accountService, transactionService, dataApiService, stakeService, pluginService, smartContractResultService, indexerService) {
        this.tokenService = tokenService;
        this.apiConfigService = apiConfigService;
        this.cachingService = cachingService;
        this.gatewayService = gatewayService;
        this.vmQueryService = vmQueryService;
        this.blockService = blockService;
        this.accountService = accountService;
        this.transactionService = transactionService;
        this.dataApiService = dataApiService;
        this.stakeService = stakeService;
        this.pluginService = pluginService;
        this.smartContractResultService = smartContractResultService;
        this.indexerService = indexerService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(NetworkService_1.name);
    }
    async getConstants() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.Constants.key, async () => await this.getConstantsRaw(), cache_info_1.CacheInfo.Constants.ttl);
    }
    async getConstantsRaw() {
        const networkConfig = await this.gatewayService.getNetworkConfig();
        const chainId = networkConfig.drt_chain_id;
        const gasPerDataByte = networkConfig.drt_gas_per_data_byte;
        const minGasLimit = networkConfig.drt_min_gas_limit;
        const minGasPrice = networkConfig.drt_min_gas_price;
        const minTransactionVersion = networkConfig.drt_min_transaction_version;
        const gasPriceModifier = networkConfig.drt_gas_price_modifier;
        return {
            chainId,
            gasPerDataByte,
            minGasLimit,
            minGasPrice,
            minTransactionVersion,
            gasPriceModifier,
        };
    }
    async getNetworkConfig() {
        const metaChainShard = this.apiConfigService.getMetaChainShardId();
        const [{ drt_round_duration, drt_rounds_per_epoch, }, { drt_rounds_passed_in_current_epoch, },] = await Promise.all([
            this.gatewayService.getNetworkConfig(),
            this.gatewayService.getNetworkStatus(metaChainShard),
        ]);
        const roundsPassed = drt_rounds_passed_in_current_epoch;
        const roundsPerEpoch = drt_rounds_per_epoch;
        const roundDuration = drt_round_duration / 1000;
        return { roundsPassed, roundsPerEpoch, roundDuration };
    }
    async getEconomics() {
        const economics = await this.cachingService.getOrSet(cache_info_1.CacheInfo.Economics.key, async () => await this.getEconomicsRaw(), cache_info_1.CacheInfo.Economics.ttl);
        return new economics_1.Economics(Object.assign({}, economics));
    }
    async getEconomicsRaw() {
        const auctionContractBalance = await this.getAuctionContractBalance();
        const rewaPrice = await this.dataApiService.getRewaPrice();
        const tokenMarketCap = await this.tokenService.getTokenMarketCapRaw();
        const currentEpoch = await this.blockService.getCurrentEpoch();
        let totalWaitingStake = BigInt(0);
        if (!this.apiConfigService.isStakingV4Enabled() || currentEpoch < this.apiConfigService.getStakingV4ActivationEpoch()) {
            totalWaitingStake = await this.getTotalWaitingStake();
        }
        const staked = sdk_nestjs_common_1.NumberUtils.denominate(BigInt(auctionContractBalance.toString()) + BigInt(totalWaitingStake.toString())).toRounded();
        const totalSupply = await this.getTotalSupply();
        const circulatingSupply = totalSupply;
        const price = rewaPrice === null || rewaPrice === void 0 ? void 0 : rewaPrice.toRounded(2);
        const marketCap = price ? Math.round(price * circulatingSupply) : undefined;
        const aprInfo = await this.getApr();
        const economics = new economics_1.Economics({
            totalSupply,
            circulatingSupply,
            staked,
            price,
            marketCap,
            apr: aprInfo.apr ? aprInfo.apr.toRounded(6) : 0,
            topUpApr: aprInfo.topUpApr ? aprInfo.topUpApr.toRounded(6) : 0,
            baseApr: aprInfo.baseApr ? aprInfo.baseApr.toRounded(6) : 0,
            tokenMarketCap: tokenMarketCap ? Math.round(tokenMarketCap) : undefined,
        });
        return economics;
    }
    async getAuctionContractBalance() {
        var _a;
        const auctionContractAddress = this.apiConfigService.getAuctionContractAddress();
        if (!auctionContractAddress) {
            return BigInt(0);
        }
        const addressDetails = await this.gatewayService.getAddressDetails(auctionContractAddress);
        const balance = (_a = addressDetails === null || addressDetails === void 0 ? void 0 : addressDetails.account) === null || _a === void 0 ? void 0 : _a.balance;
        if (!balance) {
            throw new Error(`Could not fetch balance from auction contract address '${auctionContractAddress}'`);
        }
        return BigInt(balance);
    }
    async getTotalSupply() {
        const economics = await this.gatewayService.getNetworkEconomics();
        const totalSupply = economics === null || economics === void 0 ? void 0 : economics.drt_total_supply;
        if (!totalSupply) {
            throw new Error('Could not extract drt_total_supply from network economics');
        }
        return sdk_nestjs_common_1.NumberUtils.denominate(BigInt(totalSupply)).toRounded();
    }
    async getTotalWaitingStake() {
        const delegationContractAddress = this.apiConfigService.getDelegationContractAddress();
        if (!delegationContractAddress) {
            return BigInt(0);
        }
        const vmQueryResult = await this.vmQueryService.vmQuery(delegationContractAddress, 'getTotalStakeByType');
        if (!vmQueryResult || vmQueryResult.length < 2) {
            this.logger.warn(`Could not fetch getTotalStakeByType from delegation contract address '${delegationContractAddress}'`);
            return BigInt(0);
        }
        const totalWaitingStakeBase64 = vmQueryResult[1];
        return sdk_nestjs_common_1.BinaryUtils.base64ToBigInt(totalWaitingStakeBase64);
    }
    async getStats() {
        const metaChainShard = this.apiConfigService.getMetaChainShardId();
        const [networkConfig, networkStatus, blocksCount, accountsCount, transactionsCount, scResultsCount,] = await Promise.all([
            this.gatewayService.getNetworkConfig(),
            this.gatewayService.getNetworkStatus(metaChainShard),
            this.blockService.getBlocksCount(new block_filter_1.BlockFilter()),
            this.accountService.getAccountsCount(new account_query_options_1.AccountQueryOptions()),
            this.transactionService.getTransactionCount(new transaction_filter_1.TransactionFilter()),
            this.smartContractResultService.getScResultsCount(new smart_contract_result_filter_1.SmartContractResultFilter()),
        ]);
        const { drt_num_shards_without_meta: shards, drt_round_duration: refreshRate } = networkConfig;
        const { drt_epoch_number: epoch, drt_rounds_passed_in_current_epoch: roundsPassed, drt_rounds_per_epoch: roundsPerEpoch } = networkStatus;
        return {
            shards,
            blocks: blocksCount,
            accounts: accountsCount,
            transactions: transactionsCount + scResultsCount,
            scResults: scResultsCount,
            refreshRate,
            epoch,
            roundsPassed: roundsPassed % roundsPerEpoch,
            roundsPerEpoch,
        };
    }
    async getApr() {
        var _a;
        const stats = await this.getStats();
        const config = await this.getNetworkConfig();
        const stake = await this.stakeService.getValidators();
        if (!stake) {
            throw new Error('Global stake not available');
        }
        const stakingV5Config = {
            enabled: this.apiConfigService.isStakingV5Enabled() && stats.epoch >= this.apiConfigService.getStakingV5ActivationEpoch(),
            activationEpoch: this.apiConfigService.getStakingV5ActivationEpoch(),
            inflationAmounts: this.apiConfigService.getStakingV5InflationAmounts(),
        };
        const stakedBalance = await this.getAuctionContractBalance();
        const dharitriConfig = {
            feesInEpoch: 0,
            stakePerNode: 2500,
        };
        const feesInEpoch = dharitriConfig.feesInEpoch;
        const stakePerNode = dharitriConfig.stakePerNode;
        const epochDuration = config.roundDuration * config.roundsPerEpoch;
        const secondsInYear = 365 * 24 * 3600;
        const epochsInYear = secondsInYear / epochDuration;
        let yearIndex = Math.floor(stats.epoch / epochsInYear);
        let inflationAmounts = this.apiConfigService.getInflationAmounts();
        if (stakingV5Config.enabled) {
            yearIndex = Math.floor((stats.epoch - stakingV5Config.activationEpoch) / epochsInYear);
            inflationAmounts = stakingV5Config.inflationAmounts;
        }
        if (yearIndex >= inflationAmounts.length) {
            throw new Error(`There is no inflation information for year with index ${yearIndex}`);
        }
        const inflation = inflationAmounts[yearIndex];
        const rewardsPerEpoch = Math.max(inflation / epochsInYear, feesInEpoch);
        const topUpRewardsLimit = 0.5 * rewardsPerEpoch;
        const networkBaseStake = stake.totalValidators * stakePerNode;
        const networkTotalStake = sdk_nestjs_common_1.NumberUtils.denominateString(stakedBalance.toString()) - (((_a = stake.inactiveValidators) !== null && _a !== void 0 ? _a : 0) * stakePerNode);
        const networkTopUpStake = networkTotalStake - networkBaseStake;
        const topUpReward = ((2 * topUpRewardsLimit) / Math.PI) * Math.atan(networkTopUpStake / (2 * 2000000));
        const baseReward = rewardsPerEpoch - topUpReward;
        const apr = (epochsInYear * (topUpReward + baseReward)) / networkTotalStake;
        const topUpApr = (epochsInYear * topUpReward) / networkTopUpStake;
        const baseApr = (epochsInYear * baseReward) / networkBaseStake;
        return { apr, topUpApr, baseApr };
    }
    async getAbout() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.About.key, async () => await this.getAboutRaw(), cache_info_1.CacheInfo.About.ttl);
    }
    async getAboutRaw() {
        let appVersion = undefined;
        let pluginsVersion = undefined;
        let apiVersion = process.env['API_VERSION'];
        if (!apiVersion) {
            apiVersion = this.tryGetCurrentTag();
            if (!apiVersion) {
                apiVersion = this.tryGetPreviousTag();
                if (apiVersion) {
                    apiVersion = apiVersion + '-next';
                }
            }
            appVersion = this.tryGetAppCommitHash();
            pluginsVersion = this.tryGetPluginsCommitHash();
        }
        if (pluginsVersion === appVersion) {
            pluginsVersion = undefined;
        }
        const features = new feature_configs_1.FeatureConfigs({
            eventsNotifier: this.apiConfigService.isEventsNotifierFeatureActive(),
            guestCaching: this.apiConfigService.isGuestCacheFeatureActive(),
            transactionPool: this.apiConfigService.isTransactionPoolEnabled(),
            transactionPoolWarmer: this.apiConfigService.getIsCacheWarmerCronActive(),
            updateCollectionExtraDetails: this.apiConfigService.isUpdateCollectionExtraDetailsEnabled(),
            updateAccountsExtraDetails: this.apiConfigService.isUpdateAccountExtraDetailsEnabled(),
            marketplace: this.apiConfigService.isMarketplaceFeatureEnabled(),
            exchange: this.apiConfigService.isExchangeEnabled(),
            dataApi: this.apiConfigService.isDataApiFeatureEnabled(),
            auth: this.apiConfigService.getIsAuthActive(),
            stakingV4: this.apiConfigService.isStakingV4Enabled(),
            chainAndromeda: this.apiConfigService.isChainAndromedaEnabled(),
            stakingV5: this.apiConfigService.isStakingV5Enabled(),
            stakingV5ActivationEpoch: this.apiConfigService.getStakingV5ActivationEpoch(),
            nodeEpochsLeft: this.apiConfigService.isNodeEpochsLeftEnabled(),
            transactionProcessor: this.apiConfigService.getIsTransactionProcessorCronActive(),
            transactionCompleted: this.apiConfigService.getIsTransactionCompletedCronActive(),
            transactionBatch: this.apiConfigService.getIsTransactionBatchCronActive(),
            deepHistory: this.apiConfigService.isDeepHistoryGatewayEnabled(),
            elasticCircuitBreaker: this.apiConfigService.isElasticCircuitBreakerEnabled(),
            statusChecker: this.apiConfigService.getIsApiStatusCheckerActive(),
            nftScamInfo: this.apiConfigService.getIsNftScamInfoEnabled(),
            processNfts: this.apiConfigService.getIsProcessNftsFlagActive(),
            tps: this.apiConfigService.isTpsEnabled(),
            nodesFetch: this.apiConfigService.isNodesFetchFeatureEnabled(),
            tokensFetch: this.apiConfigService.isTokensFetchFeatureEnabled(),
            providersFetch: this.apiConfigService.isProvidersFetchFeatureEnabled(),
            assetsFetch: this.apiConfigService.isAssetsCdnFeatureEnabled(),
        });
        let indexerVersion;
        let gatewayVersion;
        try {
            indexerVersion = await this.indexerService.getVersion();
        }
        catch (error) {
            this.logger.error('Failed to fetch indexer version', error);
        }
        try {
            gatewayVersion = await this.gatewayService.getVersion();
        }
        catch (error) {
            this.logger.error('Failed to fetch gateway version', error);
        }
        const about = new about_1.About({
            appVersion,
            pluginsVersion,
            network: this.apiConfigService.getNetwork(),
            cluster: this.apiConfigService.getCluster(),
            version: apiVersion,
            indexerVersion: indexerVersion,
            gatewayVersion: gatewayVersion,
            features: features,
        });
        await this.pluginService.processAbout(about);
        return about;
    }
    numberDecode(encoded) {
        const hex = Buffer.from(encoded, 'base64').toString('hex');
        return BigInt(hex ? '0x' + hex : hex).toString();
    }
    tryGetCurrentTag() {
        try {
            return require('child_process')
                .execSync('git tag --points-at HEAD')
                .toString().trim();
        }
        catch (error) {
            this.logger.error('An unhandled error occurred when fetching current tag');
            this.logger.error(error);
            return undefined;
        }
    }
    tryGetPreviousTag() {
        try {
            return require('child_process')
                .execSync('git describe --tags --abbrev=0')
                .toString().trim();
        }
        catch (error) {
            this.logger.error('An unhandled error occurred when fetching previous tag');
            this.logger.error(error);
            return undefined;
        }
    }
    tryGetAppCommitHash() {
        try {
            return require('child_process')
                .execSync('git rev-parse HEAD')
                .toString().trim();
        }
        catch (error) {
            this.logger.error('An unhandled error occurred when fetching app commit hash');
            this.logger.error(error);
            return undefined;
        }
    }
    tryGetPluginsCommitHash() {
        try {
            return require('child_process')
                .execSync('git rev-parse HEAD', { cwd: 'src/plugins' })
                .toString().trim();
        }
        catch (error) {
            this.logger.error('An unhandled error occurred when fetching plugins commit hash');
            this.logger.error(error);
            return undefined;
        }
    }
};
NetworkService = NetworkService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => token_service_1.TokenService))),
    tslib_1.__param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => block_service_1.BlockService))),
    tslib_1.__param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => account_service_1.AccountService))),
    tslib_1.__param(7, (0, common_1.Inject)((0, common_1.forwardRef)(() => transaction_service_1.TransactionService))),
    tslib_1.__param(9, (0, common_1.Inject)((0, common_1.forwardRef)(() => stake_service_1.StakeService))),
    tslib_1.__param(11, (0, common_1.Inject)((0, common_1.forwardRef)(() => scresult_service_1.SmartContractResultService))),
    tslib_1.__metadata("design:paramtypes", [token_service_1.TokenService,
        api_config_service_1.ApiConfigService,
        sdk_nestjs_cache_1.CacheService,
        gateway_service_1.GatewayService,
        vm_query_service_1.VmQueryService,
        block_service_1.BlockService,
        account_service_1.AccountService,
        transaction_service_1.TransactionService,
        data_api_service_1.DataApiService,
        stake_service_1.StakeService,
        plugin_service_1.PluginService,
        scresult_service_1.SmartContractResultService,
        indexer_service_1.IndexerService])
], NetworkService);
exports.NetworkService = NetworkService;
//# sourceMappingURL=network.service.js.map