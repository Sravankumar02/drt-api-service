"use strict";
var DataApiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataApiService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../api-config/api.config.service");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const data_api_token_1 = require("./entities/data-api.token");
const cache_info_1 = require("../../utils/cache.info");
let DataApiService = DataApiService_1 = class DataApiService {
    constructor(apiConfigService, apiService, cachingService) {
        this.apiConfigService = apiConfigService;
        this.apiService = apiService;
        this.cachingService = cachingService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(DataApiService_1.name);
    }
    async getRewaPrice(timestamp) {
        return await this.getDcdtTokenPrice('REWA', timestamp);
    }
    async getDcdtTokenPrice(identifier, timestamp) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.DataApiTokenPrice(identifier, timestamp).key, async () => await this.getDcdtTokenPriceRaw(identifier, timestamp), cache_info_1.CacheInfo.DataApiTokenPrice(identifier, timestamp).ttl);
    }
    async getDcdtTokenPriceRaw(identifier, timestamp) {
        if (!this.apiConfigService.isDataApiFeatureEnabled()) {
            return undefined;
        }
        const token = await this.getDataApiToken(identifier);
        if (!token) {
            return undefined;
        }
        try {
            const priceDate = timestamp ? new Date(timestamp * 1000).toISODateString() : undefined;
            const dateQuery = priceDate ? `&date=${priceDate}` : '';
            const priceUrl = `${this.apiConfigService.getDataApiServiceUrl()}/v1/quotes/${token.market}/${token.identifier}?extract=price${dateQuery}`;
            const response = await this.apiService.get(priceUrl);
            return response === null || response === void 0 ? void 0 : response.data;
        }
        catch (error) {
            this.logger.error(`An unexpected error occurred while fetching price for token ${identifier} from Data API.`);
            this.logger.error(error);
        }
        return undefined;
    }
    async getDataApiToken(identifier) {
        const tokens = await this.getDataApiTokens();
        return tokens[identifier];
    }
    async getDataApiTokens() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.DataApiTokens.key, async () => await this.getDataApiTokensRaw(), cache_info_1.CacheInfo.DataApiTokens.ttl);
    }
    async getDataApiTokensRaw() {
        if (!this.apiConfigService.isDataApiFeatureEnabled()) {
            return {};
        }
        try {
            const [cexTokensRaw, DharitrixTokensRaw, hatomTokensRaw, xoxnoTokensRaw] = await Promise.all([
                this.apiService.get(`${this.apiConfigService.getDataApiServiceUrl()}/v1/tokens/cex?fields=identifier`),
                this.apiService.get(`${this.apiConfigService.getDataApiServiceUrl()}/v1/tokens/dharitrix?fields=identifier`),
                this.apiService.get(`${this.apiConfigService.getDataApiServiceUrl()}/v1/tokens/hatom?fields=identifier`),
                this.apiService.get(`${this.apiConfigService.getDataApiServiceUrl()}/v1/tokens/xoxno?fields=identifier`),
            ]);
            const cexTokens = cexTokensRaw.data.map((token) => new data_api_token_1.DataApiToken({ identifier: token.identifier, market: 'cex' }));
            const DharitrixTokens = DharitrixTokensRaw.data.map((token) => new data_api_token_1.DataApiToken({ identifier: token.identifier, market: 'dharitrix' }));
            const hatomTokens = hatomTokensRaw.data.map((token) => new data_api_token_1.DataApiToken({ identifier: token.identifier, market: 'hatom' }));
            const xoxnoTokens = xoxnoTokensRaw.data.map((token) => new data_api_token_1.DataApiToken({ identifier: token.identifier, market: 'xoxno' }));
            const tokens = [...cexTokens, ...DharitrixTokens, ...hatomTokens, ...xoxnoTokens].toRecord(x => x.identifier);
            return tokens;
        }
        catch (error) {
            this.logger.error(`An unexpected error occurred while fetching tokens from Data API.`);
            this.logger.error(error);
            return {};
        }
    }
};
DataApiService = DataApiService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        sdk_nestjs_http_1.ApiService,
        sdk_nestjs_cache_1.CacheService])
], DataApiService);
exports.DataApiService = DataApiService;
//# sourceMappingURL=data-api.service.js.map