"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const cache_info_1 = require("../../utils/cache.info");
const token_assets_1 = require("./entities/token.assets");
const account_assets_1 = require("./entities/account.assets");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const dns_contracts_1 = require("../../utils/dns.contracts");
const nft_rank_1 = require("./entities/nft.rank");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const api_config_service_1 = require("../api-config/api.config.service");
const keybase_identity_1 = require("../keybase/entities/keybase.identity");
let AssetsService = class AssetsService {
    constructor(apiConfigService, apiService, cachingService) {
        this.apiConfigService = apiConfigService;
        this.apiService = apiService;
        this.cachingService = cachingService;
    }
    async getAllTokenAssets() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.TokenAssets.key, async () => await this.getAllTokenAssetsRaw(), cache_info_1.CacheInfo.TokenAssets.ttl);
    }
    async getAllTokenAssetsRaw() {
        if (!this.apiConfigService.isAssetsCdnFeatureEnabled()) {
            return {};
        }
        const assetsCdnUrl = this.apiConfigService.getAssetsCdnUrl();
        const network = this.apiConfigService.getNetwork();
        const { data: assetsRaw } = await this.apiService.get(`${assetsCdnUrl}/${network}/tokens`);
        const assets = {};
        for (const asset of assetsRaw) {
            const { identifier } = asset, details = tslib_1.__rest(asset, ["identifier"]);
            assets[identifier] = new token_assets_1.TokenAssets(details);
        }
        return assets;
    }
    async getCollectionRanks(identifier) {
        const allCollectionRanks = await this.getAllCollectionRanks();
        return allCollectionRanks[identifier];
    }
    async getAllCollectionRanks() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.CollectionRanks.key, async () => await this.getAllCollectionRanksRaw(), cache_info_1.CacheInfo.CollectionRanks.ttl);
    }
    async getAllCollectionRanksRaw() {
        if (!this.apiConfigService.isAssetsCdnFeatureEnabled()) {
            return {};
        }
        const assetsCdnUrl = this.apiConfigService.getAssetsCdnUrl();
        const network = this.apiConfigService.getNetwork();
        const { data: assets } = await this.apiService.get(`${assetsCdnUrl}/${network}/tokens`);
        const result = {};
        for (const asset of assets) {
            if (asset.ranks && asset.ranks.length > 0) {
                result[asset.identifier] = asset.ranks.map((rank) => new nft_rank_1.NftRank({
                    identifier: rank.identifier,
                    rank: rank.rank,
                }));
            }
        }
        return result;
    }
    async getAllAccountAssets() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.AccountAssets.key, async () => await this.getAllAccountAssetsRaw(), cache_info_1.CacheInfo.AccountAssets.ttl);
    }
    async getAllAccountAssetsRaw(providers, identities, pairs, farms, moaSettings, stakingProxies) {
        var _a, _b;
        if (!this.apiConfigService.isAssetsCdnFeatureEnabled()) {
            return {};
        }
        const assetsCdnUrl = this.apiConfigService.getAssetsCdnUrl();
        const network = this.apiConfigService.getNetwork();
        const { data: assets } = await this.apiService.get(`${assetsCdnUrl}/${network}/accounts`);
        const allAssets = {};
        for (const asset of assets) {
            const { address } = asset, details = tslib_1.__rest(asset, ["address"]);
            allAssets[address] = new account_assets_1.AccountAssets(details);
        }
        if (providers && identities) {
            for (const provider of providers) {
                const identity = identities.find(x => x.identity === provider.identity);
                if (!identity) {
                    continue;
                }
                allAssets[provider.provider] = new account_assets_1.AccountAssets({
                    name: `Staking: ${(_a = identity.name) !== null && _a !== void 0 ? _a : ''}`,
                    description: (_b = identity.description) !== null && _b !== void 0 ? _b : '',
                    iconPng: identity.avatar,
                    tags: ['staking', 'provider'],
                });
            }
        }
        if (pairs) {
            for (const pair of pairs) {
                allAssets[pair.address] = this.createAccountAsset(`Dharitrix: ${pair.baseSymbol}/${pair.quoteSymbol} Liquidity Pool`, ['dharitrix', 'liquiditypool']);
            }
        }
        if (farms) {
            for (const farm of farms) {
                allAssets[farm.address] = this.createAccountAsset(`Dharitrix: ${farm.name} Farm`, ['dharitrix', 'farm']);
            }
        }
        if (moaSettings) {
            for (const [index, wrapContract] of moaSettings.wrapContracts.entries()) {
                allAssets[wrapContract] = this.createAccountAsset(`DCDT: WrappedREWA Contract Shard ${index}`, ['dharitrix', 'wrewa']);
            }
            allAssets[moaSettings.lockedAssetContract] = this.createAccountAsset(`Dharitrix: Locked asset Contract`, ['dharitrix', 'lockedasset']);
            allAssets[moaSettings.distributionContract] = this.createAccountAsset(`Dharitrix: Distribution Contract`, ['dharitrix', 'lockedasset']);
        }
        if (stakingProxies) {
            for (const stakingProxy of stakingProxies) {
                allAssets[stakingProxy.address] = this.createAccountAsset(`Dharitrix: ${stakingProxy.dualYieldTokenName} Contract`, ['dharitrix', 'metastaking']);
            }
        }
        for (const [index, address] of dns_contracts_1.DnsContracts.addresses.entries()) {
            allAssets[address] = new account_assets_1.AccountAssets({
                name: `Dharitri DNS: Contract ${index}`,
                tags: ['dns'],
                icon: 'dharitri',
            });
        }
        return allAssets;
    }
    async getTokenAssets(tokenIdentifier) {
        const assets = await this.getAllTokenAssets();
        return assets[tokenIdentifier];
    }
    async getAllIdentitiesRaw() {
        if (!this.apiConfigService.isAssetsCdnFeatureEnabled()) {
            return {};
        }
        const assetsCdnUrl = this.apiConfigService.getAssetsCdnUrl();
        const network = this.apiConfigService.getNetwork();
        const { data: assets } = await this.apiService.get(`${assetsCdnUrl}/${network}/identities`);
        const allAssets = {};
        for (const asset of assets) {
            allAssets[asset.identity] = new keybase_identity_1.KeybaseIdentity(asset);
        }
        return allAssets;
    }
    async getIdentityInfo(identity) {
        const allIdentities = await this.getAllIdentitiesRaw();
        return allIdentities[identity] || null;
    }
    createAccountAsset(name, tags) {
        return new account_assets_1.AccountAssets({
            name: name,
            tags: tags,
            iconSvg: 'https://raw.githubusercontent.com/terradharitri/drt-assets/master/accounts/icons/dharitrix.svg',
            iconPng: 'https://raw.githubusercontent.com/terradharitri/drt-assets/master/accounts/icons/dharitrix.png',
        });
    }
};
AssetsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        sdk_nestjs_http_1.ApiService,
        sdk_nestjs_cache_1.CacheService])
], AssetsService);
exports.AssetsService = AssetsService;
//# sourceMappingURL=assets.service.js.map