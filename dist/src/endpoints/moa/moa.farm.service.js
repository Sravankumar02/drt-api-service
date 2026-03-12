"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaFarmService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const cache_info_1 = require("../../utils/cache.info");
const graphql_service_1 = require("../../common/graphql/graphql.service");
const moa_farm_1 = require("./entities/moa.farm");
const moa_token_service_1 = require("./moa.token.service");
const moa_staking_proxy_1 = require("./entities/moa.staking.proxy");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const farms_query_1 = require("./graphql/farms.query");
const staking_proxy_query_1 = require("./graphql/staking.proxy.query");
let MoaFarmService = class MoaFarmService {
    constructor(cachingService, graphQlService, moaTokenService, apiConfigService) {
        this.cachingService = cachingService;
        this.graphQlService = graphQlService;
        this.moaTokenService = moaTokenService;
        this.apiConfigService = apiConfigService;
    }
    async refreshMoaFarms() {
        const farms = await this.getAllMoaFarmsRaw();
        await this.cachingService.setRemote(cache_info_1.CacheInfo.MoaFarms.key, farms, cache_info_1.CacheInfo.MoaFarms.ttl);
        this.cachingService.setLocal(cache_info_1.CacheInfo.MoaFarms.key, farms, sdk_nestjs_common_1.Constants.oneSecond() * 30);
    }
    async getMoaFarms(pagination) {
        const moaFarms = await this.getAllMoaFarms();
        const { from, size } = pagination;
        return moaFarms.slice(from, from + size);
    }
    async getAllMoaFarms() {
        if (!this.apiConfigService.isExchangeEnabled()) {
            return [];
        }
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.MoaFarms.key, async () => await this.getAllMoaFarmsRaw(), cache_info_1.CacheInfo.MoaFarms.ttl, sdk_nestjs_common_1.Constants.oneSecond() * 30);
    }
    async getMoaFarmsCount() {
        const moaFarms = await this.getAllMoaFarms();
        return moaFarms.length;
    }
    async getAllMoaFarmsRaw() {
        const response = await this.graphQlService.getExchangeServiceData(farms_query_1.farmsQuery, {});
        if (!response) {
            return [];
        }
        const pairs = await this.moaTokenService.getIndexedMoaTokens();
        const farms = response.farms.map((farmResponse) => moa_farm_1.MoaFarm.fromFarmQueryResponse(farmResponse));
        const stakingFarms = response.stakingFarms.map((stakingFarm) => moa_farm_1.MoaFarm.fromStakingFarmResponse(stakingFarm, pairs));
        return [...farms, ...stakingFarms];
    }
    async getAllStakingProxies() {
        if (!this.apiConfigService.isExchangeEnabled()) {
            return [];
        }
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.StakingProxies.key, async () => await this.getAllStakingProxiesRaw(), cache_info_1.CacheInfo.StakingProxies.ttl, sdk_nestjs_common_1.Constants.oneSecond() * 30);
    }
    async getAllStakingProxiesRaw() {
        const response = await this.graphQlService.getExchangeServiceData(staking_proxy_query_1.stakingProxyQuery, {});
        if (!response) {
            return [];
        }
        const stakingProxies = response.stakingProxies.map((stakingProxyRaw) => moa_staking_proxy_1.MoaStakingProxy.fromQueryResponse(stakingProxyRaw));
        return stakingProxies;
    }
};
MoaFarmService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => moa_token_service_1.MoaTokenService))),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        graphql_service_1.GraphQlService,
        moa_token_service_1.MoaTokenService,
        api_config_service_1.ApiConfigService])
], MoaFarmService);
exports.MoaFarmService = MoaFarmService;
//# sourceMappingURL=moa.farm.service.js.map