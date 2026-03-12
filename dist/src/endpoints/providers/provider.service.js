"use strict";
var ProviderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const vm_query_service_1 = require("../vm.query/vm.query.service");
const provider_config_1 = require("./entities/provider.config");
const node_service_1 = require("../nodes/node.service");
const nodes_infos_1 = require("./entities/nodes.infos");
const cache_info_1 = require("../../utils/cache.info");
const provider_filter_1 = require("./entities/provider.filter");
const provider_1 = require("./entities/provider");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_2 = require("@sravankumar02/sdk-nestjs-common");
const identities_service_1 = require("../identities/identities.service");
const elastic_indexer_service_1 = require("../../common/indexer/elastic/elastic.indexer.service");
const provider_accounts_1 = require("./entities/provider.accounts");
let ProviderService = ProviderService_1 = class ProviderService {
    constructor(cachingService, apiConfigService, vmQueryService, nodeService, apiService, identitiesService, elasticIndexerService) {
        this.cachingService = cachingService;
        this.apiConfigService = apiConfigService;
        this.vmQueryService = vmQueryService;
        this.nodeService = nodeService;
        this.apiService = apiService;
        this.identitiesService = identitiesService;
        this.elasticIndexerService = elasticIndexerService;
        this.logger = new sdk_nestjs_common_2.OriginLogger(ProviderService_1.name);
    }
    async getProvider(address) {
        const query = new provider_filter_1.ProviderFilter();
        const providers = await this.getProviders(query);
        const provider = providers.find(x => x.provider === address);
        if (provider) {
            const delegationData = await this.getDelegationProviderByAddress(provider.provider);
            if (!delegationData) {
                return undefined;
            }
            const modifiedProvider = Object.assign({}, provider);
            modifiedProvider.automaticActivation = delegationData.automaticActivation;
            modifiedProvider.initialOwnerFunds = delegationData.initialOwnerFunds;
            modifiedProvider.checkCapOnRedelegate = delegationData.checkCapOnRedelegate;
            modifiedProvider.totalUnStaked = delegationData.totalUnStaked;
            modifiedProvider.createdNonce = delegationData.createdNonce;
            modifiedProvider.ownerBelowRequiredBalanceThreshold = delegationData.ownerBelowRequiredBalanceThreshold;
            return modifiedProvider;
        }
        return provider;
    }
    async getProviderAvatar(address) {
        const providerIdentity = await this.getProviderIdentity(address);
        return providerIdentity ? this.identitiesService.getIdentityAvatar(providerIdentity) : undefined;
    }
    getNodesInfosForProvider(providerNodes) {
        const results = providerNodes.reduce((accumulator, current) => {
            if (current && current.stake && current.topUp && current.locked) {
                accumulator.numNodes += 1;
                accumulator.stake += BigInt(current.stake);
                accumulator.topUp += BigInt(current.topUp);
                accumulator.locked += BigInt(current.locked);
            }
            return accumulator;
        }, {
            numNodes: 0,
            stake: BigInt('0'),
            topUp: BigInt('0'),
            locked: BigInt('0'),
        });
        const nodesInfos = new nodes_infos_1.NodesInfos();
        nodesInfos.numNodes = results.numNodes;
        nodesInfos.stake = results.stake.toString();
        nodesInfos.topUp = results.topUp.toString();
        nodesInfos.locked = results.locked.toString();
        return nodesInfos;
    }
    async getProvidersWithStakeInformation() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.ProvidersWithStakeInformation.key, async () => await this.getProvidersWithStakeInformationRaw(), cache_info_1.CacheInfo.ProvidersWithStakeInformation.ttl);
    }
    async getProvidersWithStakeInformationRaw() {
        const providers = await this.getAllProviders();
        const nodes = await this.nodeService.getAllNodes();
        const nodesGroupedByProvider = nodes.groupBy(x => x.provider);
        const providersDelegationData = await this.getDelegationProviders();
        if (!Array.isArray(providersDelegationData)) {
            return providers;
        }
        providers.forEach((element) => {
            var _a;
            const providerAddress = element.provider;
            const delegationData = providersDelegationData.find((providerDelegationInfo) => providerDelegationInfo !== null && providerAddress === providerDelegationInfo.contract);
            if (delegationData) {
                if (delegationData.aprValue) {
                    element.apr = parseFloat(delegationData.aprValue.toFixed(2));
                }
                if (delegationData.featured) {
                    element.featured = delegationData.featured;
                }
                if (delegationData.owner) {
                    element.owner = delegationData.owner;
                }
                if (delegationData.automaticActivation) {
                    element.automaticActivation = delegationData.automaticActivation;
                }
                if (delegationData.checkCapOnRedelegate) {
                    element.checkCapOnRedelegate = delegationData.checkCapOnRedelegate;
                }
                if (delegationData.ownerBelowRequiredBalanceThreshold) {
                    element.ownerBelowRequiredBalanceThreshold = delegationData.ownerBelowRequiredBalanceThreshold;
                }
            }
            const providerNodes = (_a = nodesGroupedByProvider[providerAddress]) !== null && _a !== void 0 ? _a : [];
            const nodesInfos = this.getNodesInfosForProvider(providerNodes);
            element.numNodes = nodesInfos.numNodes;
            element.stake = nodesInfos.stake;
            element.topUp = nodesInfos.topUp;
            element.locked = nodesInfos.locked;
        });
        providers.sort((a, b) => {
            const aSort = a.locked && a.locked !== '0' ? parseInt(a.locked.slice(0, -18)) : 0;
            const bSort = b.locked && b.locked !== '0' ? parseInt(b.locked.slice(0, -18)) : 0;
            return bSort - aSort;
        });
        for (const provider of providers) {
            if (!provider.identity) {
                continue;
            }
            const githubProfileValidatedAt = await this.cachingService.getRemote(cache_info_1.CacheInfo.GithubProfileValidated(provider.identity).key);
            const githubKeysValidatedAt = await this.cachingService.getRemote(cache_info_1.CacheInfo.GithubKeysValidated(provider.identity).key);
            provider.githubProfileValidatedAt = githubProfileValidatedAt !== undefined && Number.isInteger(githubProfileValidatedAt) ? new Date(githubProfileValidatedAt * 1000).toISOString() : undefined;
            provider.githubKeysValidatedAt = githubKeysValidatedAt !== undefined && Number.isInteger(githubKeysValidatedAt) ? new Date(githubKeysValidatedAt * 1000).toISOString() : undefined;
            provider.githubProfileValidated = githubProfileValidatedAt !== undefined && Number.isInteger(githubProfileValidatedAt) ? true : false;
            provider.githubKeysValidated = githubKeysValidatedAt !== undefined && Number.isInteger(githubKeysValidatedAt) ? true : false;
        }
        return providers;
    }
    isIdentityFormattedCorrectly(identity) {
        return /^[\w]*$/g.test(identity !== null && identity !== void 0 ? identity : '');
    }
    async getProviders(filter, queryOptions) {
        const providers = await this.getFilteredProviders(filter);
        if (queryOptions && queryOptions.withIdentityInfo === true) {
            for (const provider of providers) {
                if (provider.identity) {
                    const identityInfo = await this.identitiesService.getIdentity(provider.identity);
                    provider.identityInfo = identityInfo;
                }
            }
        }
        else {
            for (const provider of providers) {
                delete provider.identityInfo;
            }
        }
        if (queryOptions && queryOptions.withLatestInfo) {
            for (const provider of providers) {
                const contractConfig = await this.getProviderConfig(provider.provider);
                const contractTotalActiveStake = await this.getTotalActiveStake(provider.provider);
                const contractNodesCount = await this.getNumNodes(provider.provider);
                if (contractConfig) {
                    if (provider.serviceFee !== undefined) {
                        provider.serviceFee = contractConfig.serviceFee;
                    }
                    if (provider.automaticActivation !== undefined) {
                        provider.automaticActivation = contractConfig.automaticActivation;
                    }
                    if (provider.checkCapOnRedelegate !== undefined) {
                        provider.checkCapOnRedelegate = contractConfig.checkCapOnRedelegate;
                    }
                    if (provider.delegationCap !== undefined) {
                        provider.delegationCap = contractConfig.delegationCap;
                    }
                    if (provider.numNodes !== undefined) {
                        provider.numNodes = contractNodesCount;
                    }
                    if (contractTotalActiveStake !== undefined) {
                        if (provider.locked !== undefined) {
                            provider.locked = contractTotalActiveStake;
                        }
                    }
                }
            }
        }
        return providers;
    }
    async getDelegationProviders() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.DelegationProviders.key, async () => await this.getDelegationProvidersRaw(), cache_info_1.CacheInfo.DelegationProviders.ttl);
    }
    async getDelegationProviderByAddress(address) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.DelegationProvider(address).key, async () => await this.getDelegationProviderByAddressRaw(address), cache_info_1.CacheInfo.DelegationProvider(address).ttl);
    }
    async getDelegationProvidersRaw() {
        try {
            const { data } = await this.apiService.get(this.apiConfigService.getProvidersUrl());
            return data;
        }
        catch (error) {
            this.logger.error('Error when getting delegation providers');
            this.logger.error(error);
            return [];
        }
    }
    async getDelegationProviderByAddressRaw(address) {
        try {
            const { data } = await this.apiService.get(`${this.apiConfigService.getProvidersUrl()}/${address}`);
            return data;
        }
        catch (error) {
            this.logger.error('Error when getting delegation provider');
            this.logger.error(error);
            return undefined;
        }
    }
    async getAllProviders() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.Providers.key, async () => await this.getAllProvidersRaw(), cache_info_1.CacheInfo.Providers.ttl);
    }
    async getAllProvidersRaw() {
        if (this.apiConfigService.isProvidersFetchFeatureEnabled()) {
            return await this.getProviderAddressesFromApi();
        }
        const providerAddresses = await this.getProviderAddresses();
        const [configs, numUsers, cumulatedRewards] = await Promise.all([
            this.cachingService.batchProcess(providerAddresses, address => `providerConfig:${address}`, async (address) => await this.getProviderConfig(address), sdk_nestjs_common_1.Constants.oneMinute() * 15),
            this.cachingService.batchProcess(providerAddresses, address => `providerNumUsers:${address}`, async (address) => await this.getNumUsers(address), sdk_nestjs_common_1.Constants.oneHour()),
            this.cachingService.batchProcess(providerAddresses, address => `providerCumulatedRewards:${address}`, async (address) => await this.getCumulatedRewards(address), sdk_nestjs_common_1.Constants.oneHour()),
        ]);
        const providersRaw = providerAddresses.map((provider, index) => {
            var _a, _b, _c;
            return new provider_1.Provider(Object.assign(Object.assign({ provider }, (_a = configs[index]) !== null && _a !== void 0 ? _a : new provider_config_1.ProviderConfig()), { numUsers: (_b = numUsers[index]) !== null && _b !== void 0 ? _b : 0, cumulatedRewards: (_c = cumulatedRewards[index]) !== null && _c !== void 0 ? _c : '0', numNodes: 0, stake: '0', topUp: '0', locked: '0', featured: false }));
        });
        for (const provider of providersRaw) {
            const identity = await this.cachingService.getRemote(cache_info_1.CacheInfo.ConfirmedProvider(provider.provider).key);
            if (identity) {
                provider.identity = identity;
            }
        }
        for (const provider of providersRaw) {
            await this.cachingService.set(cache_info_1.CacheInfo.ProviderOwner(provider.provider).key, provider.owner, cache_info_1.CacheInfo.ProviderOwner(provider.provider).ttl);
        }
        return providersRaw;
    }
    async getProviderAddressesFromApi() {
        try {
            const { data } = await this.apiService.get(`${this.apiConfigService.getProvidersFetchServiceUrl()}/providers`, { params: { size: 10000 } });
            return data;
        }
        catch (error) {
            this.logger.error('An unhandled error occurred when getting tokens from API');
            this.logger.error(error);
            throw error;
        }
    }
    async getProviderAddresses() {
        let providersBase64;
        try {
            providersBase64 = await this.vmQueryService.vmQuery(this.apiConfigService.getDelegationManagerContractAddress(), 'getAllContractAddresses');
        }
        catch (error) {
            this.logger.error(error);
            return [];
        }
        if (!providersBase64) {
            return [];
        }
        const value = providersBase64.map((providerBase64) => sdk_nestjs_common_1.AddressUtils.bech32Encode(Buffer.from(providerBase64, 'base64').toString('hex')));
        return value;
    }
    async getProviderConfig(address) {
        if (address === this.apiConfigService.getDelegationContractAddress()) {
            return undefined;
        }
        try {
            const ownerAddressIndex = 0;
            const serviceFeeIndex = 1;
            const delegationCapIndex = 2;
            const automaticActivationIndex = 4;
            const redelegationCapIndex = 7;
            const response = await this.vmQueryService.vmQuery(address, 'getContractConfig');
            const ownerAddress = response[ownerAddressIndex];
            const serviceFeeBase64 = response[serviceFeeIndex];
            const delegationCapBase64 = response[delegationCapIndex];
            const automaticActivationBase64 = response[automaticActivationIndex];
            const checkCapOnRedelegateBase64 = response[redelegationCapIndex];
            const owner = sdk_nestjs_common_1.AddressUtils.bech32Encode(Buffer.from(ownerAddress, 'base64').toString('hex'));
            const [serviceFee, delegationCap] = [
                serviceFeeBase64,
                delegationCapBase64,
            ].map((base64) => {
                const hex = base64 ? Buffer.from(base64, 'base64').toString('hex') : base64;
                return hex === null ? null : BigInt(hex ? '0x' + hex : hex).toString();
            });
            const [automaticActivation, checkCapOnRedelegate] = [
                automaticActivationBase64,
                checkCapOnRedelegateBase64,
            ].map((base64) => (Buffer.from(base64, 'base64').toString() === 'true' ? true : false));
            const serviceFeeString = String(parseInt(serviceFee !== null && serviceFee !== void 0 ? serviceFee : '0') / 10000);
            return {
                owner,
                serviceFee: parseFloat(serviceFeeString),
                delegationCap: delegationCap !== null && delegationCap !== void 0 ? delegationCap : '0',
                apr: 0,
                automaticActivation,
                checkCapOnRedelegate,
            };
        }
        catch (error) {
            this.logger.error(`An unhandled error occurred when fetching provider config for address '${address}'`);
            this.logger.error(error);
            return undefined;
        }
    }
    async getProviderMetadata(address) {
        try {
            const response = await this.vmQueryService.vmQuery(address, 'getMetaData');
            if (response) {
                const [name, website, identity] = response.map((base64) => {
                    if (base64) {
                        return Buffer.from(base64, 'base64').toString().trim().toLowerCase();
                    }
                    return "";
                });
                return { name, website, identity };
            }
        }
        catch (error) {
            this.logger.error(`Could not get provider metadata for address '${address}'`);
            this.logger.error(error);
        }
        return { name: null, website: null, identity: null };
    }
    async getNumUsers(address) {
        const [base64] = await this.vmQueryService.vmQuery(address, 'getNumUsers');
        if (base64) {
            const hex = Buffer.from(base64, 'base64').toString('hex');
            return Number(BigInt(hex ? '0x' + hex : hex));
        }
        return null;
    }
    async getCumulatedRewards(address) {
        const [base64] = await this.vmQueryService.vmQuery(address, 'getTotalCumulatedRewards', 'drt1qqqqqqqqqqqqqqqpqqqqqqqqllllllllllllllllllllllllllls7el70e');
        if (base64) {
            const hex = Buffer.from(base64, 'base64').toString('hex');
            return BigInt(hex ? '0x' + hex : hex).toString();
        }
        return null;
    }
    async getProviderAccounts(address, queryPagination) {
        const elasticResults = await this.elasticIndexerService.getProviderDelegators(address, queryPagination);
        if (!elasticResults) {
            return [];
        }
        return elasticResults.map(account => sdk_nestjs_http_1.ApiUtils.mergeObjects(new provider_accounts_1.ProviderAccounts(), {
            address: account.address,
            stake: account.activeStake,
        }));
    }
    async getProviderAccountsCount(address) {
        return await this.elasticIndexerService.getProviderDelegatorsCount(address);
    }
    async getFilteredProviders(filter) {
        let providers = await this.getProvidersWithStakeInformation();
        if (filter.identity) {
            providers = providers.filter((provider) => provider.identity === filter.identity);
        }
        if (filter.providers) {
            providers = providers.filter(x => { var _a; return x.provider && ((_a = filter.providers) === null || _a === void 0 ? void 0 : _a.includes(x.provider)); });
        }
        if (filter.owner) {
            providers = providers.filter((provider) => provider.owner === filter.owner);
        }
        return providers;
    }
    async isProvider(address) {
        const provider = await this.getProvider(address);
        return !!provider;
    }
    async getProviderIdentity(address) {
        const providerDetails = await this.getProvider(address);
        return providerDetails && providerDetails.identity ? providerDetails.identity : undefined;
    }
    async getTotalActiveStake(address) {
        const [activeStake] = await this.vmQueryService.vmQuery(address, 'getTotalActiveStake');
        return sdk_nestjs_common_1.BinaryUtils.base64ToBigInt(activeStake).toString();
    }
    async getNumNodes(address) {
        const [numNodesBase64] = await this.vmQueryService.vmQuery(address, 'getNumNodes');
        return Number(sdk_nestjs_common_1.BinaryUtils.base64ToBigInt(numNodesBase64));
    }
};
ProviderService = ProviderService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => node_service_1.NodeService))),
    tslib_1.__param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => identities_service_1.IdentitiesService))),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        api_config_service_1.ApiConfigService,
        vm_query_service_1.VmQueryService,
        node_service_1.NodeService,
        sdk_nestjs_http_1.ApiService,
        identities_service_1.IdentitiesService,
        elastic_indexer_service_1.ElasticIndexerService])
], ProviderService);
exports.ProviderService = ProviderService;
//# sourceMappingURL=provider.service.js.map