"use strict";
var MoaTokenService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaTokenService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const cache_info_1 = require("../../utils/cache.info");
const moa_token_1 = require("./entities/moa.token");
const moa_pair_service_1 = require("./moa.pair.service");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const moa_farm_service_1 = require("./moa.farm.service");
const moa_settings_service_1 = require("./moa.settings.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_2 = require("@sravankumar02/sdk-nestjs-common");
const graphql_service_1 = require("../../common/graphql/graphql.service");
const tokens_query_1 = require("./graphql/tokens.query");
let MoaTokenService = MoaTokenService_1 = class MoaTokenService {
    constructor(cachingService, apiConfigService, moaPairService, moaFarmService, moaSettingsService, graphQlService) {
        this.cachingService = cachingService;
        this.apiConfigService = apiConfigService;
        this.moaPairService = moaPairService;
        this.moaFarmService = moaFarmService;
        this.moaSettingsService = moaSettingsService;
        this.graphQlService = graphQlService;
        this.logger = new sdk_nestjs_common_2.OriginLogger(MoaTokenService_1.name);
    }
    async refreshMoaTokens() {
        const tokens = await this.getAllMoaTokensRaw();
        await this.cachingService.setRemote(cache_info_1.CacheInfo.MoaTokens.key, tokens, cache_info_1.CacheInfo.MoaTokens.ttl);
        this.cachingService.setLocal(cache_info_1.CacheInfo.MoaTokens.key, tokens, sdk_nestjs_common_1.Constants.oneSecond() * 30);
        const tokenTypes = await this.getAllMoaTokenTypesRaw();
        await this.cachingService.setRemote(cache_info_1.CacheInfo.MoaTokenTypes.key, tokenTypes, cache_info_1.CacheInfo.MoaTokenTypes.ttl);
        this.cachingService.setLocal(cache_info_1.CacheInfo.MoaTokenTypes.key, tokenTypes, sdk_nestjs_common_1.Constants.oneSecond() * 30);
        const indexedTokens = await this.getIndexedMoaTokensRaw();
        await this.cachingService.setRemote(cache_info_1.CacheInfo.MoaTokensIndexed.key, indexedTokens, cache_info_1.CacheInfo.MoaTokensIndexed.ttl);
        this.cachingService.setLocal(cache_info_1.CacheInfo.MoaTokensIndexed.key, indexedTokens, sdk_nestjs_common_1.Constants.oneSecond() * 30);
        const indexedPrices = await this.getMoaPricesRaw();
        await this.cachingService.setRemote(cache_info_1.CacheInfo.MoaPrices.key, indexedPrices, cache_info_1.CacheInfo.MoaPrices.ttl);
        this.cachingService.setLocal(cache_info_1.CacheInfo.MoaPrices.key, indexedPrices, sdk_nestjs_common_1.Constants.oneSecond() * 30);
    }
    async getMoaTokens(queryPagination) {
        const { from, size } = queryPagination;
        let allMoaTokens = await this.getAllMoaTokens();
        allMoaTokens = JSON.parse(JSON.stringify(allMoaTokens));
        return allMoaTokens.slice(from, from + size);
    }
    async getMoaTokenByIdentifier(identifier) {
        const moaTokens = await this.getAllMoaTokens();
        return moaTokens.find(x => x.id === identifier);
    }
    async getMoaPrices() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.MoaPrices.key, async () => await this.getMoaPricesRaw(), cache_info_1.CacheInfo.MoaPrices.ttl, sdk_nestjs_common_1.Constants.oneSecond() * 30);
    }
    async getMoaPricesRaw() {
        try {
            const result = {};
            const tokens = await this.getAllMoaTokens();
            for (const token of tokens) {
                result[token.id] = {
                    price: token.price,
                    isToken: true,
                };
            }
            const pairs = await this.moaPairService.getAllMoaPairs();
            for (const pair of pairs) {
                result[pair.id] = {
                    price: pair.price,
                    isToken: false,
                };
            }
            const farms = await this.moaFarmService.getAllMoaFarms();
            for (const farm of farms) {
                result[farm.id] = {
                    price: farm.price,
                    isToken: false,
                };
            }
            const settings = await this.moaSettingsService.getSettings();
            if (settings) {
                const moaToken = tokens.find(x => x.symbol === 'MOA');
                if (moaToken) {
                    const lkmoaIdentifier = settings.lockedAssetIdentifier;
                    if (lkmoaIdentifier) {
                        result[lkmoaIdentifier] = {
                            price: moaToken.price,
                            isToken: false,
                        };
                    }
                    const xmoaIdentifier = settings.lockedAssetIdentifierV2;
                    if (xmoaIdentifier) {
                        result[xmoaIdentifier] = {
                            price: moaToken.price,
                            isToken: false,
                        };
                    }
                }
            }
            return result;
        }
        catch (error) {
            this.logger.error('An error occurred while fetching moa prices');
            this.logger.error(error);
            return {};
        }
    }
    async getIndexedMoaTokens() {
        if (!this.apiConfigService.getExchangeServiceUrl()) {
            return {};
        }
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.MoaTokensIndexed.key, async () => await this.getIndexedMoaTokensRaw(), cache_info_1.CacheInfo.MoaTokensIndexed.ttl, sdk_nestjs_common_1.Constants.oneSecond() * 30);
    }
    async getIndexedMoaTokensRaw() {
        const result = {};
        const tokens = await this.getAllMoaTokens();
        for (const token of tokens) {
            result[token.id] = token;
        }
        return result;
    }
    async getMoaTokensCount() {
        const moaTokens = await this.getAllMoaTokens();
        return moaTokens.length;
    }
    async getAllMoaTokens() {
        if (!this.apiConfigService.getExchangeServiceUrl()) {
            return [];
        }
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.MoaTokens.key, async () => await this.getAllMoaTokensRaw(), cache_info_1.CacheInfo.MoaTokens.ttl, sdk_nestjs_common_1.Constants.oneSecond() * 30);
    }
    async getAllMoaTokensRaw() {
        const pairs = await this.moaPairService.getAllMoaPairs();
        const tokenVolumes = {};
        for (const pair of pairs) {
            if (!tokenVolumes[pair.baseId]) {
                tokenVolumes[pair.baseId] = 0;
            }
            tokenVolumes[pair.baseId] += Number(pair.volume24h || 0);
            if (!tokenVolumes[pair.quoteId]) {
                tokenVolumes[pair.quoteId] = 0;
            }
            tokenVolumes[pair.quoteId] += Number(pair.volume24h || 0);
        }
        const tokenPoolMap = {};
        for (const pair of pairs) {
            if (pair.baseSymbol === 'WREWA' && pair.quoteSymbol === "USDC") {
                const wrewaToken = new moa_token_1.MoaToken();
                wrewaToken.id = pair.baseId;
                wrewaToken.symbol = pair.baseSymbol;
                wrewaToken.name = pair.baseName;
                wrewaToken.price = pair.basePrice;
                wrewaToken.previous24hPrice = pair.basePrevious24hPrice;
                wrewaToken.previous24hVolume = tokenVolumes[pair.baseId];
                wrewaToken.tradesCount = this.computeTradesCountForMoaToken(wrewaToken, pairs);
                if (!tokenPoolMap[wrewaToken.id] || pair.totalValue > tokenPoolMap[wrewaToken.id].liquidityValue) {
                    tokenPoolMap[wrewaToken.id] = { token: wrewaToken, liquidityValue: pair.totalValue };
                }
            }
            const moaToken = this.getMoaToken(pair);
            if (!moaToken) {
                continue;
            }
            moaToken.previous24hVolume = tokenVolumes[moaToken.id];
            moaToken.tradesCount = this.computeTradesCountForMoaToken(moaToken, pairs);
            if (!tokenPoolMap[moaToken.id] || pair.totalValue > tokenPoolMap[moaToken.id].liquidityValue) {
                tokenPoolMap[moaToken.id] = { token: moaToken, liquidityValue: pair.totalValue };
            }
        }
        const moaTokens = Object.values(tokenPoolMap).map(entry => entry.token);
        return moaTokens;
    }
    getMoaToken(pair) {
        if (pair.baseSymbol === 'WREWA' && pair.quoteSymbol === "USDC") {
            return {
                id: pair.quoteId,
                symbol: pair.quoteSymbol,
                name: pair.quoteName,
                price: pair.quotePrice,
                previous24hPrice: pair.quotePrevious24hPrice,
                previous24hVolume: 0,
                tradesCount: 0,
            };
        }
        if (['WREWA', 'USDC'].includes(pair.quoteSymbol)) {
            return {
                id: pair.baseId,
                symbol: pair.baseSymbol,
                name: pair.baseName,
                price: pair.basePrice,
                previous24hPrice: pair.basePrevious24hPrice,
                previous24hVolume: 0,
                tradesCount: 0,
            };
        }
        if (['WREWA', 'USDC'].includes(pair.baseSymbol)) {
            return {
                id: pair.quoteId,
                symbol: pair.quoteSymbol,
                name: pair.quoteName,
                price: pair.quotePrice,
                previous24hPrice: pair.quotePrevious24hPrice,
                previous24hVolume: 0,
                tradesCount: 0,
            };
        }
        return null;
    }
    async getAllMoaTokenTypes() {
        if (!this.apiConfigService.getExchangeServiceUrl()) {
            return [];
        }
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.MoaTokenTypes.key, async () => await this.getAllMoaTokenTypesRaw(), cache_info_1.CacheInfo.MoaTokenTypes.ttl, sdk_nestjs_common_1.Constants.oneSecond() * 30);
    }
    async getAllMoaTokenTypesRaw() {
        try {
            const settings = await this.moaSettingsService.getSettings();
            if (!settings) {
                throw new common_1.BadRequestException('Could not fetch MOA tokens');
            }
            const result = await this.graphQlService.getExchangeServiceData(tokens_query_1.tokensQuery);
            if (!result || !result.tokens) {
                return [];
            }
            return result.tokens.map((token) => ({
                identifier: token.identifier,
                type: token.type.toLowerCase(),
            }));
        }
        catch (error) {
            this.logger.error('An error occurred while fetching all moa token types');
            this.logger.error(error);
            return [];
        }
    }
    computeTradesCountForMoaToken(moaToken, filteredPairs) {
        const pairs = filteredPairs.filter(x => x.baseId === moaToken.id || x.quoteId === moaToken.id);
        const computeResult = pairs.sum(pair => { var _a; return (_a = pair.tradesCount) !== null && _a !== void 0 ? _a : 0; });
        return computeResult;
    }
};
MoaTokenService = MoaTokenService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => moa_farm_service_1.MoaFarmService))),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        api_config_service_1.ApiConfigService,
        moa_pair_service_1.MoaPairService,
        moa_farm_service_1.MoaFarmService,
        moa_settings_service_1.MoaSettingsService,
        graphql_service_1.GraphQlService])
], MoaTokenService);
exports.MoaTokenService = MoaTokenService;
//# sourceMappingURL=moa.token.service.js.map