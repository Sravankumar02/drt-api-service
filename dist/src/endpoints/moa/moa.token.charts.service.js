"use strict";
var MoaTokenChartsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaTokenChartsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_service_1 = require("../../common/graphql/graphql.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const graphql_request_1 = require("graphql-request");
const moa_token_chart_1 = require("./entities/moa.token.chart");
const moa_token_service_1 = require("./moa.token.service");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const cache_info_1 = require("../../utils/cache.info");
const token_prices_hour_resolution_query_1 = require("./graphql/token.prices.hour.resolution.query");
let MoaTokenChartsService = MoaTokenChartsService_1 = class MoaTokenChartsService {
    constructor(graphQlService, moaTokenService, cachingService) {
        this.graphQlService = graphQlService;
        this.moaTokenService = moaTokenService;
        this.cachingService = cachingService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(MoaTokenChartsService_1.name);
    }
    async getTokenPricesHourResolution(tokenIdentifier) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.TokenHourChart(tokenIdentifier).key, async () => await this.getTokenPricesHourResolutionRaw(tokenIdentifier), cache_info_1.CacheInfo.TokenHourChart(tokenIdentifier).ttl);
    }
    async getTokenPricesHourResolutionRaw(tokenIdentifier) {
        const isMoaToken = await this.isMoaToken(tokenIdentifier);
        if (!isMoaToken) {
            return undefined;
        }
        try {
            const query = (0, token_prices_hour_resolution_query_1.tokenPricesHourResolutionQuery)(tokenIdentifier);
            const data = await this.graphQlService.getExchangeServiceData(query);
            return this.convertToMoaTokenChart(data === null || data === void 0 ? void 0 : data.values24h) || [];
        }
        catch (error) {
            this.logger.error(`An error occurred while fetching hourly token prices for ${tokenIdentifier}`, error);
            return [];
        }
    }
    async getTokenPricesDayResolution(tokenIdentifier) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.TokenDailyChart(tokenIdentifier).key, async () => await this.getTokenPricesDayResolutionRaw(tokenIdentifier), cache_info_1.CacheInfo.TokenDailyChart(tokenIdentifier).ttl);
    }
    async getTokenPricesDayResolutionRaw(tokenIdentifier) {
        const isMoaToken = await this.isMoaToken(tokenIdentifier);
        if (!isMoaToken) {
            return undefined;
        }
        const query = (0, graphql_request_1.gql) `
      query tokenPriceDayResolution {
        latestCompleteValues(
          series: "${tokenIdentifier}",
          metric: "priceUSD",
        ) {
          timestamp
          value
        }
      }
    `;
        try {
            const data = await this.graphQlService.getExchangeServiceData(query);
            return this.convertToMoaTokenChart(data === null || data === void 0 ? void 0 : data.latestCompleteValues) || [];
        }
        catch (error) {
            this.logger.error(`An error occurred while fetching daily token prices for ${tokenIdentifier}`, error);
            return [];
        }
    }
    convertToMoaTokenChart(data) {
        return (data === null || data === void 0 ? void 0 : data.map(item => new moa_token_chart_1.MoaTokenChart({
            timestamp: Math.floor(new Date(item.timestamp).getTime() / 1000),
            value: Number(item.value),
        }))) || [];
    }
    async isMoaToken(tokenIdentifier) {
        const token = await this.moaTokenService.getMoaTokenByIdentifier(tokenIdentifier);
        return token !== undefined;
    }
};
MoaTokenChartsService = MoaTokenChartsService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [graphql_service_1.GraphQlService,
        moa_token_service_1.MoaTokenService,
        sdk_nestjs_cache_1.CacheService])
], MoaTokenChartsService);
exports.MoaTokenChartsService = MoaTokenChartsService;
//# sourceMappingURL=moa.token.charts.service.js.map