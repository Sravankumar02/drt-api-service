"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaController = void 0;
const tslib_1 = require("tslib");
const moa_economics_1 = require("./entities/moa.economics");
const moa_token_1 = require("./entities/moa.token");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const moa_pair_1 = require("./entities/moa.pair");
const moa_economics_service_1 = require("./moa.economics.service");
const moa_pair_service_1 = require("./moa.pair.service");
const moa_settings_service_1 = require("./moa.settings.service");
const moa_token_service_1 = require("./moa.token.service");
const moa_farm_service_1 = require("./moa.farm.service");
const moa_farm_1 = require("./entities/moa.farm");
const query_pagination_1 = require("../../common/entities/query.pagination");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const moa_pair_exchange_1 = require("./entities/moa.pair.exchange");
const moa_pairs__filter_1 = require("./entities/moa.pairs..filter");
const moa_token_charts_service_1 = require("./moa.token.charts.service");
const moa_token_chart_1 = require("./entities/moa.token.chart");
let MoaController = class MoaController {
    constructor(moaEconomicsService, moaSettingsService, moaPairsService, moaTokensService, moaFarmsService, moaTokenChartsService) {
        this.moaEconomicsService = moaEconomicsService;
        this.moaSettingsService = moaSettingsService;
        this.moaPairsService = moaPairsService;
        this.moaTokensService = moaTokensService;
        this.moaFarmsService = moaFarmsService;
        this.moaTokenChartsService = moaTokenChartsService;
    }
    async getMoaSettings() {
        const settings = await this.moaSettingsService.getSettings();
        if (!settings) {
            throw new common_1.NotFoundException('MOA settings not found');
        }
        return settings;
    }
    async getMoaEconomics() {
        return await this.moaEconomicsService.getMoaEconomics();
    }
    async getMoaPairs(from, size, exchange, includeFarms) {
        const filter = new moa_pairs__filter_1.MoaPairsFilter({ exchange, includeFarms });
        return await this.moaPairsService.getMoaPairs(from, size, filter);
    }
    async getMoaPairsTemp(from, size, exchange) {
        const filter = new moa_pairs__filter_1.MoaPairsFilter({ exchange });
        return await this.moaPairsService.getMoaPairs(from, size, filter);
    }
    async getMoaPairsCount(exchange, includeFarms) {
        const filter = new moa_pairs__filter_1.MoaPairsFilter({ exchange, includeFarms });
        return await this.moaPairsService.getMoaPairsCount(filter);
    }
    async getMoaTokens(from, size) {
        return await this.moaTokensService.getMoaTokens(new query_pagination_1.QueryPagination({ from, size }));
    }
    async getMoaTokensCount() {
        return await this.moaTokensService.getMoaTokensCount();
    }
    async getMoaTokenIdentifier(identifier) {
        const moaToken = await this.moaTokensService.getMoaTokenByIdentifier(identifier);
        if (!moaToken) {
            throw new common_1.NotFoundException('Token not found');
        }
        return moaToken;
    }
    async getMoaFarms(from, size) {
        return await this.moaFarmsService.getMoaFarms(new query_pagination_1.QueryPagination({ from, size }));
    }
    async getMoaFarmsCount() {
        return await this.moaFarmsService.getMoaFarmsCount();
    }
    async getMoaPair(baseId, quoteId, includeFarms) {
        const pair = await this.moaPairsService.getMoaPair(baseId, quoteId, includeFarms);
        if (!pair) {
            throw new common_1.NotFoundException('Pair not found');
        }
        return pair;
    }
    async getTokenPricesHourResolution(identifier) {
        const charts = await this.moaTokenChartsService.getTokenPricesHourResolution(identifier);
        if (!charts) {
            throw new common_1.NotFoundException('Price not available for given token identifier');
        }
        return charts;
    }
    async getTokenPricesDayResolution(identifier) {
        const charts = await this.moaTokenChartsService.getTokenPricesDayResolution(identifier);
        if (!charts) {
            throw new common_1.NotFoundException('Price not available for given token identifier');
        }
        return charts;
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/moa/settings"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The settings of the Dharitrix' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'MOA settings not found' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MoaController.prototype, "getMoaSettings", null);
tslib_1.__decorate([
    (0, common_1.Get)("/moa/economics"),
    (0, swagger_1.ApiOperation)({ summary: 'Dharitrix economics', description: 'Returns economics details of Dharitrix' }),
    (0, swagger_1.ApiOkResponse)({ type: moa_economics_1.MoaEconomics }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MoaController.prototype, "getMoaEconomics", null);
tslib_1.__decorate([
    (0, common_1.Get)("/moa/pairs"),
    (0, swagger_1.ApiOperation)({ summary: 'Dharitrix pairs', description: 'Returns active liquidity pools available on Dharitrix' }),
    (0, swagger_1.ApiOkResponse)({ type: [moa_pair_1.MoaPair] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'exchange', description: 'Filter by exchange', required: false, enum: moa_pair_exchange_1.MoaPairExchange }),
    (0, swagger_1.ApiQuery)({ name: 'includeFarms', description: 'Include farms information in response', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)("size", new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('exchange', new sdk_nestjs_common_1.ParseEnumPipe(moa_pair_exchange_1.MoaPairExchange))),
    tslib_1.__param(3, (0, common_1.Query)('includeFarms', new common_1.DefaultValuePipe(false), sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], MoaController.prototype, "getMoaPairs", null);
tslib_1.__decorate([
    (0, common_1.Get)("/moa-pairs"),
    (0, swagger_1.ApiOperation)({ summary: 'Dharitrix pairs', description: 'Returns active liquidity pools available on Dharitrix', deprecated: true }),
    (0, swagger_1.ApiOkResponse)({ type: [moa_pair_1.MoaPair] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'exchange', description: 'Filter by exchange', required: false, enum: moa_pair_exchange_1.MoaPairExchange }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)("size", new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('exchange', new sdk_nestjs_common_1.ParseEnumPipe(moa_pair_exchange_1.MoaPairExchange))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String]),
    tslib_1.__metadata("design:returntype", Promise)
], MoaController.prototype, "getMoaPairsTemp", null);
tslib_1.__decorate([
    (0, common_1.Get)("/moa/pairs/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Maiar Exchange pairs count', description: 'Returns active liquidity pools count available on Maiar Exchange' }),
    (0, swagger_1.ApiQuery)({ name: 'exchange', description: 'Filter by exchange', required: false, enum: moa_pair_exchange_1.MoaPairExchange }),
    (0, swagger_1.ApiQuery)({ name: 'includeFarms', description: 'Include farms information in response', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Query)('exchange', new sdk_nestjs_common_1.ParseEnumPipe(moa_pair_exchange_1.MoaPairExchange))),
    tslib_1.__param(1, (0, common_1.Query)('includeFarms', new common_1.DefaultValuePipe(false), sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], MoaController.prototype, "getMoaPairsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/moa/tokens"),
    (0, swagger_1.ApiOperation)({ summary: 'Dharitrix tokens details', description: 'Returns a list of tokens listed on Dharitrix' }),
    (0, swagger_1.ApiOkResponse)({ type: [moa_token_1.MoaToken] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)("size", new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], MoaController.prototype, "getMoaTokens", null);
tslib_1.__decorate([
    (0, common_1.Get)("/moa/tokens/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Maiar Exchange tokens count', description: 'Returns tokens count available on Maiar Exchange' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MoaController.prototype, "getMoaTokensCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/moa/tokens/:identifier"),
    (0, swagger_1.ApiOperation)({ summary: 'Dharitrix token details', description: 'Returns a specific token listed on Dharitrix' }),
    (0, swagger_1.ApiOkResponse)({ type: moa_token_1.MoaToken }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Token not found' }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], MoaController.prototype, "getMoaTokenIdentifier", null);
tslib_1.__decorate([
    (0, common_1.Get)("/moa/farms"),
    (0, swagger_1.ApiOperation)({ summary: 'Dharitrix farms details', description: 'Returns a list of farms listed on Dharitrix' }),
    (0, swagger_1.ApiOkResponse)({ type: [moa_farm_1.MoaFarm] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)("size", new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], MoaController.prototype, "getMoaFarms", null);
tslib_1.__decorate([
    (0, common_1.Get)("/moa/farms/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Maiar Exchange farms count', description: 'Returns farms count available on Maiar Exchange' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MoaController.prototype, "getMoaFarmsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/moa/pairs/:baseId/:quoteId"),
    (0, swagger_1.ApiOperation)({ summary: 'Dharitrix pairs details', description: 'Returns liquidity pool details by providing a combination of two tokens' }),
    (0, swagger_1.ApiOkResponse)({ type: moa_pair_1.MoaPair }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Pair not found' }),
    (0, swagger_1.ApiQuery)({ name: 'includeFarms', description: 'Include farms information in response', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Param)('baseId')),
    tslib_1.__param(1, (0, common_1.Param)('quoteId')),
    tslib_1.__param(2, (0, common_1.Query)('includeFarms', new common_1.DefaultValuePipe(false), sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], MoaController.prototype, "getMoaPair", null);
tslib_1.__decorate([
    (0, common_1.Get)('moa/tokens/prices/hourly/:identifier'),
    (0, swagger_1.ApiOperation)({ summary: 'Dharitrix token prices hourly', description: 'Returns token prices hourly' }),
    (0, swagger_1.ApiOkResponse)({ type: [moa_token_chart_1.MoaTokenChart] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Price not available for given token identifier' }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], MoaController.prototype, "getTokenPricesHourResolution", null);
tslib_1.__decorate([
    (0, common_1.Get)('moa/tokens/prices/daily/:identifier'),
    (0, swagger_1.ApiOperation)({
        summary: 'Dharitrix token prices daily',
        description: 'Returns token prices daily, ordered by timestamp in ascending order. The entries represent the latest complete daily values for the given token series.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: [moa_token_chart_1.MoaTokenChart] }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Price not available for given token identifier' }),
    tslib_1.__param(0, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], MoaController.prototype, "getTokenPricesDayResolution", null);
MoaController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('dharitrix'),
    tslib_1.__metadata("design:paramtypes", [moa_economics_service_1.MoaEconomicsService,
        moa_settings_service_1.MoaSettingsService,
        moa_pair_service_1.MoaPairService,
        moa_token_service_1.MoaTokenService,
        moa_farm_service_1.MoaFarmService,
        moa_token_charts_service_1.MoaTokenChartsService])
], MoaController);
exports.MoaController = MoaController;
//# sourceMappingURL=moa.controller.js.map