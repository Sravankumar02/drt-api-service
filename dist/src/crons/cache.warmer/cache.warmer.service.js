"use strict";
var CacheWarmerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheWarmerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const identities_service_1 = require("../../endpoints/identities/identities.service");
const node_service_1 = require("../../endpoints/nodes/node.service");
const provider_service_1 = require("../../endpoints/providers/provider.service");
const microservices_1 = require("@nestjs/microservices");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const network_service_1 = require("../../endpoints/network/network.service");
const account_service_1 = require("../../endpoints/accounts/account.service");
const cron_1 = require("cron");
const keybase_service_1 = require("../../common/keybase/keybase.service");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const dcdt_service_1 = require("../../endpoints/dcdt/dcdt.service");
const cache_info_1 = require("../../utils/cache.info");
const assets_service_1 = require("../../common/assets/assets.service");
const gateway_component_request_1 = require("../../common/gateway/entities/gateway.component.request");
const moa_settings_service_1 = require("../../endpoints/moa/moa.settings.service");
const moa_pair_service_1 = require("../../endpoints/moa/moa.pair.service");
const moa_farm_service_1 = require("../../endpoints/moa/moa.farm.service");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const delegation_legacy_service_1 = require("../../endpoints/delegation.legacy/delegation.legacy.service");
const settings_service_1 = require("../../common/settings/settings.service");
const token_service_1 = require("../../endpoints/tokens/token.service");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const nft_service_1 = require("../../endpoints/nfts/nft.service");
const account_query_options_1 = require("../../endpoints/accounts/entities/account.query.options");
const entities_1 = require("../../common/indexer/entities");
const data_api_service_1 = require("../../common/data-api/data-api.service");
const block_service_1 = require("../../endpoints/blocks/block.service");
const pool_service_1 = require("../../endpoints/pool/pool.service");
const JsonDiff = tslib_1.__importStar(require("json-diff"));
const query_pagination_1 = require("../../common/entities/query.pagination");
const stake_service_1 = require("../../endpoints/stake/stake.service");
const nft_type_1 = require("../../common/indexer/entities/nft.type");
let CacheWarmerService = CacheWarmerService_1 = class CacheWarmerService {
    constructor(nodeService, dcdtService, identitiesService, providerService, keybaseService, cachingService, clientProxy, apiConfigService, settingsService, networkService, accountService, gatewayService, schedulerRegistry, assetsService, moaPairsService, moaSettingsService, moaFarmsService, delegationLegacyService, tokenService, indexerService, nftService, guestCachingWarmer, dataApiService, blockService, poolService, stakeService) {
        this.nodeService = nodeService;
        this.dcdtService = dcdtService;
        this.identitiesService = identitiesService;
        this.providerService = providerService;
        this.keybaseService = keybaseService;
        this.cachingService = cachingService;
        this.clientProxy = clientProxy;
        this.apiConfigService = apiConfigService;
        this.settingsService = settingsService;
        this.networkService = networkService;
        this.accountService = accountService;
        this.gatewayService = gatewayService;
        this.schedulerRegistry = schedulerRegistry;
        this.assetsService = assetsService;
        this.moaPairsService = moaPairsService;
        this.moaSettingsService = moaSettingsService;
        this.moaFarmsService = moaFarmsService;
        this.delegationLegacyService = delegationLegacyService;
        this.tokenService = tokenService;
        this.indexerService = indexerService;
        this.nftService = nftService;
        this.guestCachingWarmer = guestCachingWarmer;
        this.dataApiService = dataApiService;
        this.blockService = blockService;
        this.poolService = poolService;
        this.stakeService = stakeService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(CacheWarmerService_1.name);
        this.configCronJob('handleTokenAssetsInvalidations', schedule_1.CronExpression.EVERY_MINUTE, schedule_1.CronExpression.EVERY_10_MINUTES, async () => await this.handleTokenAssetsInvalidations());
        if (this.apiConfigService.isStakingV4Enabled()) {
            const handleNodeAuctionInvalidationsCronJob = new cron_1.CronJob(this.apiConfigService.getStakingV4CronExpression(), async () => await this.handleNodeAuctionInvalidations());
            this.schedulerRegistry.addCronJob('handleNodeAuctionInvalidations', handleNodeAuctionInvalidationsCronJob);
            handleNodeAuctionInvalidationsCronJob.start();
        }
        if (this.apiConfigService.isUpdateCollectionExtraDetailsEnabled()) {
            const handleUpdateCollectionExtraDetailsCronJob = new cron_1.CronJob(schedule_1.CronExpression.EVERY_10_MINUTES, async () => await this.handleUpdateCollectionExtraDetails());
            this.schedulerRegistry.addCronJob('handleUpdateCollectionExtraDetails', handleUpdateCollectionExtraDetailsCronJob);
            handleUpdateCollectionExtraDetailsCronJob.start();
        }
        if (this.apiConfigService.isTransactionPoolCacheWarmerEnabled()) {
            const handleTransactionPoolCacheInvalidation = new cron_1.CronJob(this.apiConfigService.getTransactionPoolCacheWarmerCronExpression(), async () => await this.handleTxPoolInvalidations());
            this.schedulerRegistry.addCronJob('handleTxPoolInvalidations', handleTransactionPoolCacheInvalidation);
            handleTransactionPoolCacheInvalidation.start();
        }
        if (this.apiConfigService.isUpdateAccountExtraDetailsEnabled()) {
            if (this.apiConfigService.getAccountExtraDetailsTransfersLast24hUrl()) {
                const handleUpdateAccountExtraDetails = new cron_1.CronJob(schedule_1.CronExpression.EVERY_MINUTE, async () => await this.handleUpdateAccountTransfersLast24h());
                this.schedulerRegistry.addCronJob('handleUpdateAccountTransfersLast24h', handleUpdateAccountExtraDetails);
                handleUpdateAccountExtraDetails.start();
            }
            const handleUpdateAccountAssetsCronJob = new cron_1.CronJob(schedule_1.CronExpression.EVERY_MINUTE, async () => await this.handleUpdateAccountAssets());
            this.schedulerRegistry.addCronJob('handleUpdateAccountAssets', handleUpdateAccountAssetsCronJob);
            handleUpdateAccountAssetsCronJob.start();
        }
    }
    configCronJob(name, fastExpression, normalExpression, callback) {
        const cronTime = this.apiConfigService.getIsFastWarmerCronActive() ? fastExpression : normalExpression;
        const cronJob = new cron_1.CronJob(cronTime, async () => await callback());
        this.schedulerRegistry.addCronJob(name, cronJob);
        cronJob.start();
    }
    async handleAboutInvalidation() {
        const about = await this.networkService.getAboutRaw();
        await this.invalidateKey(cache_info_1.CacheInfo.About.key, about, cache_info_1.CacheInfo.About.ttl);
    }
    async handleNodeInvalidations() {
        const nodes = await this.nodeService.getAllNodesRaw();
        await this.invalidateKey(cache_info_1.CacheInfo.Nodes.key, nodes, cache_info_1.CacheInfo.Nodes.ttl);
    }
    async handleDelegationLegacyInvalidations() {
        const delegation = await this.delegationLegacyService.getDelegationRaw();
        await this.invalidateKey(cache_info_1.CacheInfo.DelegationLegacy.key, delegation, cache_info_1.CacheInfo.DelegationLegacy.ttl);
    }
    async handleNodeAuctionInvalidations() {
        const currentEpoch = await this.blockService.getCurrentEpoch();
        if (currentEpoch < this.apiConfigService.getStakingV4ActivationEpoch()) {
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 1000 + 1000 * Math.random()));
        const nodesAuctions = await this.nodeService.getAllNodesAuctionsRaw();
        await this.invalidateKey(cache_info_1.CacheInfo.NodesAuctions.key, nodesAuctions, cache_info_1.CacheInfo.NodesAuctions.ttl);
    }
    async handleTxPoolInvalidations() {
        const pool = await this.poolService.getTxPoolRaw();
        await this.invalidateKey(cache_info_1.CacheInfo.TransactionPool.key, pool, this.apiConfigService.getTransactionPoolCacheWarmerTtlInSeconds());
    }
    async handleDcdtTokenInvalidations() {
        const tokens = await this.tokenService.getAllTokensRaw();
        await this.invalidateKey(cache_info_1.CacheInfo.AllDcdtTokens.key, tokens, cache_info_1.CacheInfo.AllDcdtTokens.ttl);
    }
    async handleIdentityInvalidations() {
        const identities = await this.identitiesService.getAllIdentitiesRaw();
        await this.invalidateKey(cache_info_1.CacheInfo.Identities.key, identities, cache_info_1.CacheInfo.Identities.ttl);
    }
    async handleProviderInvalidations() {
        const providers = await this.providerService.getAllProvidersRaw();
        await this.invalidateKey(cache_info_1.CacheInfo.Providers.key, providers, cache_info_1.CacheInfo.Providers.ttl);
        const providersWithStakeInformation = await this.providerService.getProvidersWithStakeInformationRaw();
        await this.invalidateKey(cache_info_1.CacheInfo.ProvidersWithStakeInformation.key, providersWithStakeInformation, cache_info_1.CacheInfo.ProvidersWithStakeInformation.ttl);
    }
    async handleCurrentPriceInvalidations() {
        const currentPrice = await this.dataApiService.getRewaPrice();
        if (currentPrice) {
            await this.invalidateKey(cache_info_1.CacheInfo.CurrentPrice.key, currentPrice, cache_info_1.CacheInfo.CurrentPrice.ttl);
        }
    }
    async handleGuestCache() {
        if (this.apiConfigService.isGuestCacheFeatureActive()) {
            await this.guestCachingWarmer.recompute({
                targetUrl: this.apiConfigService.getSelfUrl(),
                cacheTriggerHitsThreshold: this.apiConfigService.getGuestCacheHitsThreshold(),
                cacheTtl: this.apiConfigService.getGuestCacheTtl(),
            });
        }
    }
    async handleLatestBlock() {
        const block = await this.blockService.getLatestBlockRaw();
        await this.cachingService.setRemote(cache_info_1.CacheInfo.BlocksLatest().key, block, cache_info_1.CacheInfo.BlocksLatest().ttl);
    }
    async handleEconomicsInvalidations() {
        const economics = await this.networkService.getEconomicsRaw();
        await this.invalidateKey(cache_info_1.CacheInfo.Economics.key, economics, cache_info_1.CacheInfo.Economics.ttl);
    }
    async handleStakeInvalidations() {
        const stake = await this.stakeService.getGlobalStakeRaw();
        await this.invalidateKey(cache_info_1.CacheInfo.GlobalStake.key, stake, cache_info_1.CacheInfo.GlobalStake.ttl);
    }
    async handleAccountInvalidations() {
        const accounts = await this.accountService.getAccountsRaw({ from: 0, size: 25 }, new account_query_options_1.AccountQueryOptions());
        const accountsCacheInfo = cache_info_1.CacheInfo.Accounts({ from: 0, size: 25 });
        await this.invalidateKey(accountsCacheInfo.key, accounts, accountsCacheInfo.ttl);
    }
    async handleHeartbeatStatusInvalidations() {
        const result = await this.gatewayService.getRaw('node/heartbeatstatus', gateway_component_request_1.GatewayComponentRequest.nodeHeartbeat);
        await this.invalidateKey('heartbeatstatus', JSON.stringify(result.data), sdk_nestjs_common_1.Constants.oneMinute() * 2);
    }
    async handleValidatorStatisticsInvalidations() {
        const result = await this.gatewayService.getRaw('validator/statistics', gateway_component_request_1.GatewayComponentRequest.validatorStatistics);
        await this.invalidateKey('validatorstatistics', JSON.stringify(result.data), sdk_nestjs_common_1.Constants.oneMinute() * 2);
    }
    async handleTokenAssetsInvalidations() {
        const assets = await this.assetsService.getAllTokenAssetsRaw();
        await this.invalidateKey(cache_info_1.CacheInfo.TokenAssets.key, assets, cache_info_1.CacheInfo.TokenAssets.ttl);
        await this.keybaseService.confirmIdentities();
        await this.keybaseService.confirmIdentityProfiles();
        await this.handleNodeInvalidations();
        await this.handleProviderInvalidations();
        await this.handleIdentityInvalidations();
        const providers = await this.providerService.getAllProviders();
        const identities = await this.identitiesService.getAllIdentities();
        const pairs = await this.moaPairsService.getAllMoaPairs();
        const farms = await this.moaFarmsService.getAllMoaFarms();
        const settings = await this.moaSettingsService.getSettings();
        const stakingProxies = await this.moaFarmsService.getAllStakingProxies();
        const accountLabels = await this.assetsService.getAllAccountAssetsRaw(providers, identities, pairs, farms, settings !== null && settings !== void 0 ? settings : undefined, stakingProxies);
        await this.invalidateKey(cache_info_1.CacheInfo.AccountAssets.key, accountLabels, cache_info_1.CacheInfo.AccountAssets.ttl);
        const collectionRanks = await this.assetsService.getAllCollectionRanksRaw();
        await this.invalidateKey(cache_info_1.CacheInfo.CollectionRanks.key, collectionRanks, cache_info_1.CacheInfo.CollectionRanks.ttl);
    }
    async handleTokenAssetsExtraInfoInvalidations() {
        var _a;
        const assets = await this.assetsService.getAllTokenAssets();
        const allTokens = await this.tokenService.getAllTokens();
        const allTokensIndexed = allTokens.toRecord(token => token.identifier);
        for (const identifier of Object.keys(assets)) {
            const token = allTokensIndexed[identifier];
            if (!token) {
                continue;
            }
            const asset = assets[identifier];
            if (asset.lockedAccounts) {
                const lockedAccounts = await this.dcdtService.getLockedAccountsRaw(identifier);
                await this.invalidateKey(cache_info_1.CacheInfo.TokenLockedAccounts(identifier).key, lockedAccounts, cache_info_1.CacheInfo.TokenLockedAccounts(identifier).ttl);
            }
            if (asset.extraTokens || token.type === entities_1.TokenType.MetaDCDT) {
                const accounts = await this.dcdtService.countAllDistinctAccounts([identifier, ...((_a = asset.extraTokens) !== null && _a !== void 0 ? _a : [])]);
                await this.cachingService.setRemote(cache_info_1.CacheInfo.TokenAccountsExtra(identifier).key, accounts, cache_info_1.CacheInfo.TokenAccountsExtra(identifier).ttl);
            }
        }
    }
    async handleApiSettings() {
        const settings = await this.settingsService.getAllSettings();
        await Promise.all(settings.map(async (setting) => {
            await this.invalidateKey(cache_info_1.CacheInfo.Setting(setting.name).key, setting.value, cache_info_1.CacheInfo.Setting(setting.name).ttl);
        }));
    }
    async handleVerifiedAccountsInvalidation() {
        const verifiedAccounts = await this.accountService.getVerifiedAccounts();
        await this.invalidateKey(cache_info_1.CacheInfo.VerifiedAccounts.key, verifiedAccounts, cache_info_1.CacheInfo.VerifiedAccounts.ttl);
    }
    async handleUpdateCollectionExtraDetails() {
        const allAssets = await this.assetsService.getAllTokenAssets();
        const nftTypes = [
            nft_type_1.NftType.NonFungibleDCDT,
            nft_type_1.NftType.SemiFungibleDCDT,
            nft_type_1.NftType.MetaDCDT,
            nft_type_1.NftType.NonFungibleDCDTv2,
            nft_type_1.NftType.DynamicNonFungibleDCDT,
            nft_type_1.NftType.DynamicSemiFungibleDCDT,
            nft_type_1.NftType.DynamicMetaDCDT,
        ];
        for (const key of Object.keys(allAssets)) {
            const collection = await this.indexerService.getCollection(key);
            if (!collection) {
                continue;
            }
            if (!nftTypes.includes(collection.type)) {
                continue;
            }
            const nftCount = await this.nftService.getNftCount({ collection: collection._id });
            const holderCount = await this.dcdtService.countAllDistinctAccounts([collection._id]);
            this.logger.log(`Setting isVerified to true, holderCount to ${holderCount}, nftCount to ${nftCount} for collection with identifier '${key}'`);
            await this.indexerService.setExtraCollectionFields(key, true, holderCount, nftCount);
        }
    }
    async handleUpdateAccountAssets() {
        const batchSize = 100;
        const allAccountAssets = await this.assetsService.getAllAccountAssets();
        const addresses = Object.keys(allAccountAssets);
        const batches = sdk_nestjs_common_1.BatchUtils.splitArrayIntoChunks(addresses, batchSize);
        for (const batch of batches) {
            const accounts = await this.indexerService.getAccounts(new query_pagination_1.QueryPagination({ from: 0, size: batchSize }), new account_query_options_1.AccountQueryOptions({ addresses: batch }));
            const accountsDictionary = accounts.toRecord(account => account.address);
            for (const address of Object.keys(allAccountAssets)) {
                try {
                    const assets = allAccountAssets[address];
                    const account = accountsDictionary[address];
                    if (!account) {
                        continue;
                    }
                    if (JsonDiff.diff(account.api_assets, assets)) {
                        this.logger.log(`Updating assets for account with address '${address}'`);
                        await this.indexerService.setAccountAssetsFields(address, assets);
                    }
                }
                catch (error) {
                    this.logger.error(`Failed to update assets for account with address '${address}': ${error}`);
                }
            }
        }
    }
    async handleUpdateAccountTransfersLast24h() {
        var _a, _b;
        const batchSize = 100;
        const mostUsed = await this.accountService.getApplicationMostUsedRaw();
        const mostUsedIndexedAccounts = await this.indexerService.getAddressesWithTransfersLast24h();
        const allAddressesToUpdate = [...mostUsed.map(item => item.address), ...mostUsedIndexedAccounts].distinct();
        const mostUsedDictionary = mostUsed.toRecord(item => item.address);
        const batches = sdk_nestjs_common_1.BatchUtils.splitArrayIntoChunks(allAddressesToUpdate, batchSize);
        for (const batch of batches) {
            const accounts = await this.indexerService.getAccounts(new query_pagination_1.QueryPagination({ from: 0, size: batchSize }), new account_query_options_1.AccountQueryOptions({ addresses: batch }), ['address', 'api_transfersLast24h']);
            const accountsDictionary = accounts.toRecord(account => account.address);
            for (const address of batch) {
                const account = accountsDictionary[address];
                const newTransfersLast24h = (_b = (_a = mostUsedDictionary[address]) === null || _a === void 0 ? void 0 : _a.transfers24H) !== null && _b !== void 0 ? _b : 0;
                if (account && account.api_transfersLast24h !== newTransfersLast24h) {
                    this.logger.log(`Setting transferLast24h to ${newTransfersLast24h} for account with address '${address}'`);
                    await this.indexerService.setAccountTransfersLast24h(address, newTransfersLast24h);
                }
            }
        }
    }
    async invalidateKey(key, data, ttl) {
        await this.cachingService.set(key, data, ttl);
        this.refreshCacheKey(key, ttl);
    }
    refreshCacheKey(key, ttl) {
        this.clientProxy.emit('refreshCacheKey', { key, ttl });
    }
};
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    (0, sdk_nestjs_common_1.Lock)({ name: 'About invalidation', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleAboutInvalidation", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Node invalidations', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleNodeInvalidations", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Delegation legacy invalidations', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleDelegationLegacyInvalidations", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.Lock)({ name: 'Node auction invalidations', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleNodeAuctionInvalidations", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.Lock)({ name: 'Transaction pool invalidation', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleTxPoolInvalidations", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)('*/2 * * * *'),
    (0, sdk_nestjs_common_1.Lock)({ name: 'All Tokens invalidations', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleDcdtTokenInvalidations", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Identities invalidations', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleIdentityInvalidations", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Providers invalidations', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleProviderInvalidations", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Current price invalidations', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleCurrentPriceInvalidations", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)("*/6 * * * * *"),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Guest caching recompute', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleGuestCache", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)("*/6 * * * * *"),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Latest block recompute' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleLatestBlock", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Economics invalidations', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleEconomicsInvalidations", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_SECONDS),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Stake invalidations', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleStakeInvalidations", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Accounts invalidations', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleAccountInvalidations", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Heartbeatstatus invalidations', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleHeartbeatStatusInvalidations", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Validator statistics invalidations', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleValidatorStatisticsInvalidations", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.Lock)({ name: 'Token / account assets invalidations', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleTokenAssetsInvalidations", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_MINUTES),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Token assets extra info invalidations', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleTokenAssetsExtraInfoInvalidations", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_MINUTES),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Api settings invalidations' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleApiSettings", null);
tslib_1.__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_MINUTES),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleVerifiedAccountsInvalidation", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.Lock)({ name: 'Elastic updater: Update collection isVerified, nftCount, holderCount', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleUpdateCollectionExtraDetails", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.Lock)({ name: 'Elastic updater: Update account assets', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleUpdateAccountAssets", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.Lock)({ name: 'Elastic updater: Update account transfersLast24h', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CacheWarmerService.prototype, "handleUpdateAccountTransfersLast24h", null);
CacheWarmerService = CacheWarmerService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(6, (0, common_1.Inject)('PUBSUB_SERVICE')),
    tslib_1.__param(9, (0, common_1.Inject)((0, common_1.forwardRef)(() => network_service_1.NetworkService))),
    tslib_1.__metadata("design:paramtypes", [node_service_1.NodeService,
        dcdt_service_1.DcdtService,
        identities_service_1.IdentitiesService,
        provider_service_1.ProviderService,
        keybase_service_1.KeybaseService,
        sdk_nestjs_cache_1.CacheService,
        microservices_1.ClientProxy,
        api_config_service_1.ApiConfigService,
        settings_service_1.SettingsService,
        network_service_1.NetworkService,
        account_service_1.AccountService,
        gateway_service_1.GatewayService,
        schedule_1.SchedulerRegistry,
        assets_service_1.AssetsService,
        moa_pair_service_1.MoaPairService,
        moa_settings_service_1.MoaSettingsService,
        moa_farm_service_1.MoaFarmService,
        delegation_legacy_service_1.DelegationLegacyService,
        token_service_1.TokenService,
        indexer_service_1.IndexerService,
        nft_service_1.NftService,
        sdk_nestjs_cache_1.GuestCacheWarmer,
        data_api_service_1.DataApiService,
        block_service_1.BlockService,
        pool_service_1.PoolService,
        stake_service_1.StakeService])
], CacheWarmerService);
exports.CacheWarmerService = CacheWarmerService;
//# sourceMappingURL=cache.warmer.service.js.map