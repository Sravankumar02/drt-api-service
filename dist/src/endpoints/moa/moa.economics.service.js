"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaEconomicsService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const graphql_request_1 = require("graphql-request");
const cache_info_1 = require("../../utils/cache.info");
const graphql_service_1 = require("../../common/graphql/graphql.service");
const moa_settings_service_1 = require("./moa.settings.service");
const moa_economics_1 = require("./entities/moa.economics");
let MoaEconomicsService = class MoaEconomicsService {
    constructor(moaSettingService, cachingService, graphQlService) {
        this.moaSettingService = moaSettingService;
        this.cachingService = cachingService;
        this.graphQlService = graphQlService;
    }
    async refreshMoaEconomics() {
        const economics = await this.getMoaEconomicsRaw();
        await this.cachingService.setRemote(cache_info_1.CacheInfo.MoaEconomics.key, economics, cache_info_1.CacheInfo.MoaEconomics.ttl);
    }
    async getMoaEconomics() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.MoaEconomics.key, async () => await this.getMoaEconomicsRaw(), cache_info_1.CacheInfo.MoaEconomics.ttl);
    }
    async getMoaEconomicsRaw() {
        const settings = await this.moaSettingService.getSettings();
        if (!settings) {
            throw new common_1.BadRequestException('Could not fetch MOA settings');
        }
        const variables = {
            "moaID": settings.moaId,
            "days": 7,
        };
        const query = (0, graphql_request_1.gql) `
      query ($days: Int!, $moaID: String!) {
        totalAggregatedRewards(days: $days)
        moaPriceUSD: getTokenPriceUSD(tokenID: $moaID)
        moaSupply: totalTokenSupply(tokenID: $moaID)
        factory {
          totalVolumeUSD24h
          __typename
        }
      }
    `;
        const response = await this.graphQlService.getExchangeServiceData(query, variables);
        if (!response) {
            throw new common_1.BadRequestException('Could not fetch MOA economics data from MOA microservice');
        }
        const moaEconomics = moa_economics_1.MoaEconomics.fromQueryResponse(response, settings);
        return moaEconomics;
    }
};
MoaEconomicsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [moa_settings_service_1.MoaSettingsService,
        sdk_nestjs_cache_1.CacheService,
        graphql_service_1.GraphQlService])
], MoaEconomicsService);
exports.MoaEconomicsService = MoaEconomicsService;
//# sourceMappingURL=moa.economics.service.js.map