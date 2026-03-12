"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaSettingsService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const cache_info_1 = require("../../utils/cache.info");
const graphql_service_1 = require("../../common/graphql/graphql.service");
const moa_settings_1 = require("./entities/moa.settings");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const settings_query_1 = require("./graphql/settings.query");
const pairs_count_query_1 = require("./graphql/pairs.count.query");
let MoaSettingsService = class MoaSettingsService {
    constructor(cachingService, graphQlService, apiConfigService) {
        this.cachingService = cachingService;
        this.graphQlService = graphQlService;
        this.apiConfigService = apiConfigService;
    }
    getTransfers(metadata) {
        const transfers = metadata.transfers;
        if (!transfers || transfers.length === 0) {
            return undefined;
        }
        return transfers;
    }
    async isMoaInteraction(metadata) {
        const moaContracts = await this.getMoaContracts();
        return moaContracts.has(metadata.receiver);
    }
    async refreshSettings() {
        const settings = await this.getSettingsRaw();
        await this.cachingService.setRemote(cache_info_1.CacheInfo.MoaSettings.key, settings, cache_info_1.CacheInfo.MoaSettings.ttl);
        this.cachingService.setLocal(cache_info_1.CacheInfo.MoaSettings.key, settings, sdk_nestjs_common_1.Constants.oneMinute() * 10);
        const contracts = await this.getMoaContractsRaw();
        await this.cachingService.setRemote(cache_info_1.CacheInfo.MoaContracts.key, contracts, cache_info_1.CacheInfo.MoaContracts.ttl);
        this.cachingService.setLocal(cache_info_1.CacheInfo.MoaContracts.key, contracts, sdk_nestjs_common_1.Constants.oneMinute() * 10);
    }
    async getSettings() {
        if (!this.apiConfigService.isExchangeEnabled()) {
            return null;
        }
        const settings = await this.cachingService.getOrSet(cache_info_1.CacheInfo.MoaSettings.key, async () => await this.getSettingsRaw(), cache_info_1.CacheInfo.MoaSettings.ttl, sdk_nestjs_common_1.Constants.oneMinute() * 10);
        this.wrewaId = settings === null || settings === void 0 ? void 0 : settings.wrewaId;
        return settings;
    }
    async getMoaContracts() {
        let contracts = this.cachingService.getLocal(cache_info_1.CacheInfo.MoaContracts.key);
        if (!contracts) {
            contracts = await this.getMoaContractsRaw();
            this.cachingService.setLocal(cache_info_1.CacheInfo.MoaContracts.key, contracts, sdk_nestjs_common_1.Constants.oneMinute() * 10);
        }
        return contracts;
    }
    async getMoaContractsRaw() {
        const settings = await this.getSettings();
        if (!settings) {
            return new Set();
        }
        return new Set([
            settings.distributionContract,
            settings.lockedAssetContract,
            settings.routerFactoryContract,
            ...settings.farmContracts,
            ...settings.pairContracts,
            ...settings.wrapContracts,
        ]);
    }
    async getSettingsRaw() {
        const pairLimitCount = await this.getPairLimitCount();
        const response = await this.graphQlService.getExchangeServiceData((0, settings_query_1.settingsQuery)(pairLimitCount));
        if (!response) {
            return null;
        }
        const transformedResponse = Object.assign(Object.assign({}, response), { pairs: response.filteredPairs.edges.map((edge) => ({
                address: edge.node.address,
            })) });
        const settings = moa_settings_1.MoaSettings.fromQueryResponse(transformedResponse);
        return settings;
    }
    getWrewaId() {
        return this.wrewaId;
    }
    async getPairLimitCount() {
        const response = await this.graphQlService.getExchangeServiceData(pairs_count_query_1.pairCountQuery);
        if (!response) {
            return 500;
        }
        return response.factory.pairCount;
    }
};
MoaSettingsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        graphql_service_1.GraphQlService,
        api_config_service_1.ApiConfigService])
], MoaSettingsService);
exports.MoaSettingsService = MoaSettingsService;
//# sourceMappingURL=moa.settings.service.js.map