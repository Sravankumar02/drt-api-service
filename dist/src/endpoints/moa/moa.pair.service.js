"use strict";
var MoaPairService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaPairService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const cache_info_1 = require("../../utils/cache.info");
const graphql_service_1 = require("../../common/graphql/graphql.service");
const moa_pair_state_1 = require("./entities/moa.pair.state");
const moa_pair_type_1 = require("./entities/moa.pair.type");
const moa_settings_service_1 = require("./moa.settings.service");
const sdk_nestjs_common_2 = require("@sravankumar02/sdk-nestjs-common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const moa_pair_exchange_1 = require("./entities/moa.pair.exchange");
const moa_pair_status_1 = require("./entities/moa.pair.status");
const filtered_pairs_query_1 = require("./graphql/filtered.pairs.query");
let MoaPairService = MoaPairService_1 = class MoaPairService {
    constructor(cachingService, moaSettingService, graphQlService, apiConfigService) {
        this.cachingService = cachingService;
        this.moaSettingService = moaSettingService;
        this.graphQlService = graphQlService;
        this.apiConfigService = apiConfigService;
        this.logger = new sdk_nestjs_common_2.OriginLogger(MoaPairService_1.name);
    }
    async refreshMoaPairs() {
        const pairs = await this.getAllMoaPairsRaw(false);
        await this.cachingService.setRemote(cache_info_1.CacheInfo.MoaPairs.key, pairs, cache_info_1.CacheInfo.MoaPairs.ttl);
        this.cachingService.setLocal(cache_info_1.CacheInfo.MoaPairs.key, pairs, sdk_nestjs_common_1.Constants.oneSecond() * 30);
    }
    async getMoaPairs(from, size, filter) {
        var _a;
        let allMoaPairs = await this.getAllMoaPairs((_a = filter === null || filter === void 0 ? void 0 : filter.includeFarms) !== null && _a !== void 0 ? _a : false);
        allMoaPairs = this.applyFilters(allMoaPairs, filter);
        return allMoaPairs.slice(from, from + size);
    }
    async getMoaPair(baseId, quoteId, includeFarms = false) {
        const allMoaPairs = await this.getAllMoaPairs(includeFarms);
        return allMoaPairs.find(pair => pair.baseId === baseId && pair.quoteId === quoteId);
    }
    async getAllMoaPairs(includeFarms = false) {
        if (!this.apiConfigService.isExchangeEnabled()) {
            return [];
        }
        const cacheKey = includeFarms ? cache_info_1.CacheInfo.MoaPairsWithFarms.key : cache_info_1.CacheInfo.MoaPairs.key;
        const ttl = includeFarms ? cache_info_1.CacheInfo.MoaPairsWithFarms.ttl : cache_info_1.CacheInfo.MoaPairs.ttl;
        return await this.cachingService.getOrSet(cacheKey, async () => await this.getAllMoaPairsRaw(includeFarms), ttl, sdk_nestjs_common_1.Constants.oneSecond() * 30);
    }
    async getMoaPairsCount(filter) {
        var _a;
        const moaPairs = await this.getAllMoaPairs((_a = filter === null || filter === void 0 ? void 0 : filter.includeFarms) !== null && _a !== void 0 ? _a : false);
        const filteredPairs = this.applyFilters(moaPairs, filter);
        return filteredPairs.length;
    }
    async getAllMoaPairsRaw(includeFarms = false) {
        try {
            const settings = await this.moaSettingService.getSettings();
            if (!settings) {
                throw new common_1.BadRequestException('Could not fetch MOA settings');
            }
            const allPairs = [];
            let cursor = null;
            let hasNextPage = true;
            while (hasNextPage) {
                const variables = {
                    pagination: { first: 25, after: cursor },
                    filters: { state: [moa_pair_status_1.MoaPairStatus.active] },
                };
                const query = (0, filtered_pairs_query_1.filteredPairsQuery)(includeFarms);
                const result = await this.graphQlService.getExchangeServiceData(query, variables);
                if (!result) {
                    break;
                }
                const pairs = result.filteredPairs.edges.map((edge) => this.getPairInfo(edge.node, includeFarms));
                allPairs.push(...pairs.filter((pair) => pair !== undefined));
                hasNextPage = result.filteredPairs.pageInfo.hasNextPage;
                cursor = result.filteredPairs.edges.length > 0 ? result.filteredPairs.edges[result.filteredPairs.edges.length - 1].cursor : null;
            }
            return allPairs;
        }
        catch (error) {
            this.logger.error('An error occurred while getting all moa pairs from the exchange');
            this.logger.error(error);
            return [];
        }
    }
    getPairInfo(pair, includeFarms = false) {
        var _a, _b;
        const firstTokenSymbol = pair.firstToken.identifier.split('-')[0];
        const secondTokenSymbol = pair.secondToken.identifier.split('-')[0];
        const state = this.getPairState(pair.state);
        const type = this.getPairType(pair.type);
        if (!type || [moa_pair_type_1.MoaPairType.unlisted].includes(type)) {
            return undefined;
        }
        const dharitrixTypes = [
            moa_pair_type_1.MoaPairType.core,
            moa_pair_type_1.MoaPairType.community,
            moa_pair_type_1.MoaPairType.experimental,
            moa_pair_type_1.MoaPairType.ecosystem,
        ];
        let exchange;
        if (dharitrixTypes.includes(type)) {
            exchange = moa_pair_exchange_1.MoaPairExchange.dharitrix;
        }
        else {
            exchange = moa_pair_exchange_1.MoaPairExchange.unknown;
        }
        const baseInfo = Object.assign({ address: pair.address, id: pair.liquidityPoolToken.identifier, symbol: pair.liquidityPoolToken.identifier.split('-')[0], name: pair.liquidityPoolToken.name, price: Number(pair.liquidityPoolTokenPriceUSD), totalValue: Number(pair.lockedValueUSD), volume24h: Number(pair.volumeUSD24h), tradesCount: Number(pair.tradesCount), tradesCount24h: Number(pair.tradesCount24h), deployedAt: Number(pair.deployedAt), state,
            type,
            exchange }, (includeFarms && {
            hasFarms: (_a = pair.hasFarms) !== null && _a !== void 0 ? _a : false,
            hasDualFarms: (_b = pair.hasDualFarms) !== null && _b !== void 0 ? _b : false,
        }));
        if ((firstTokenSymbol === 'WREWA' && secondTokenSymbol === 'USDC') || secondTokenSymbol === 'WREWA') {
            return Object.assign(Object.assign({}, baseInfo), { basePrevious24hPrice: Number(pair.firstToken.previous24hPrice), quotePrevious24hPrice: Number(pair.secondToken.previous24hPrice), baseId: pair.firstToken.identifier, basePrice: Number(pair.firstTokenPriceUSD), baseSymbol: firstTokenSymbol, baseName: pair.firstToken.name, quoteId: pair.secondToken.identifier, quotePrice: Number(pair.secondTokenPriceUSD), quoteSymbol: secondTokenSymbol, quoteName: pair.secondToken.name });
        }
        return Object.assign(Object.assign({}, baseInfo), { basePrevious24hPrice: Number(pair.secondToken.previous24hPrice), quotePrevious24hPrice: Number(pair.firstToken.previous24hPrice), baseId: pair.secondToken.identifier, basePrice: Number(pair.secondTokenPriceUSD), baseSymbol: secondTokenSymbol, baseName: pair.secondToken.name, quoteId: pair.firstToken.identifier, quotePrice: Number(pair.firstTokenPriceUSD), quoteSymbol: firstTokenSymbol, quoteName: pair.firstToken.name });
    }
    getPairState(state) {
        switch (state) {
            case 'Active':
                return moa_pair_state_1.MoaPairState.active;
            case 'Inactive':
                return moa_pair_state_1.MoaPairState.inactive;
            case 'ActiveNoSwaps':
                return moa_pair_state_1.MoaPairState.paused;
            case 'PartialActive':
                return moa_pair_state_1.MoaPairState.partial;
            default:
                throw new Error(`Unsupported pair state '${state}'`);
        }
    }
    getPairType(type) {
        switch (type) {
            case 'Core':
                return moa_pair_type_1.MoaPairType.core;
            case 'Community':
                return moa_pair_type_1.MoaPairType.community;
            case 'Ecosystem':
                return moa_pair_type_1.MoaPairType.ecosystem;
            case 'Experimental':
                return moa_pair_type_1.MoaPairType.experimental;
            case 'Unlisted':
                return moa_pair_type_1.MoaPairType.unlisted;
            default:
                this.logger.error(`Unsupported pair type '${type}'`);
                return undefined;
        }
    }
    applyFilters(moaPairs, filter) {
        if (!filter) {
            return moaPairs;
        }
        let filteredPairs = moaPairs;
        if (filter.exchange) {
            filteredPairs = filteredPairs.filter(pair => pair.exchange === filter.exchange);
        }
        return filteredPairs;
    }
};
MoaPairService = MoaPairService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        moa_settings_service_1.MoaSettingsService,
        graphql_service_1.GraphQlService,
        api_config_service_1.ApiConfigService])
], MoaPairService);
exports.MoaPairService = MoaPairService;
//# sourceMappingURL=moa.pair.service.js.map