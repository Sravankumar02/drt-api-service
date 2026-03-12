"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const provider_service_1 = require("./provider.service");
const provider_1 = require("./entities/provider");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const provider_filter_1 = require("./entities/provider.filter");
const provider_query_options_1 = require("./entities/provider.query.options");
const query_pagination_1 = require("../../common/entities/query.pagination");
let ProviderController = class ProviderController {
    constructor(providerService) {
        this.providerService = providerService;
    }
    async getProviders(identity, owner, providers, withIdentityInfo, withLatestInfo) {
        const options = provider_query_options_1.ProviderQueryOptions.applyDefaultOptions(owner, { withIdentityInfo, withLatestInfo });
        return await this.providerService.getProviders(new provider_filter_1.ProviderFilter({ identity, providers, owner }), options);
    }
    async getProviderAccounts(address, from, size) {
        const provider = await this.providerService.getProviderAccounts(address, new query_pagination_1.QueryPagination({ from, size }));
        if (provider === undefined) {
            throw new common_1.HttpException(`Provider '${address}' not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return provider;
    }
    async getProviderAccountsCount(address) {
        const provider = await this.providerService.getProviderAccountsCount(address);
        if (provider === undefined) {
            throw new common_1.HttpException(`Provider '${address}' not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return provider;
    }
    async getProvider(address) {
        const provider = await this.providerService.getProvider(address);
        if (provider === undefined) {
            throw new common_1.HttpException(`Provider '${address}' not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return provider;
    }
    async getIdentityAvatar(address, response) {
        const url = await this.providerService.getProviderAvatar(address);
        if (!url) {
            throw new common_1.HttpException('Provider avatar not found', common_1.HttpStatus.NOT_FOUND);
        }
        response.redirect(url);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/providers"),
    (0, swagger_1.ApiOperation)({ summary: 'Providers', description: 'Returns a list of all providers' }),
    (0, swagger_1.ApiOkResponse)({ type: [provider_1.Provider] }),
    (0, swagger_1.ApiQuery)({ name: 'identity', description: 'Search by identity', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'owner', description: 'Search by owner', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'providers', description: 'Search by multiple providers address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withIdentityInfo', description: 'Returns identity data for providers', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withLatestInfo', description: 'Returns providers details with latest info', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('identity')),
    tslib_1.__param(1, (0, common_1.Query)('owner', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(2, (0, common_1.Query)('providers', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(3, (0, common_1.Query)('withIdentityInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(4, (0, common_1.Query)('withLatestInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], ProviderController.prototype, "getProviders", null);
tslib_1.__decorate([
    (0, common_1.Get)('/providers/:address/accounts'),
    (0, swagger_1.ApiOperation)({ summary: 'Provider', description: 'Returns provider delegators accounts for a given provider address' }),
    (0, swagger_1.ApiOkResponse)({ type: provider_1.Provider }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Provider not found' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProviderController.prototype, "getProviderAccounts", null);
tslib_1.__decorate([
    (0, common_1.Get)('/providers/:address/accounts/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Provider', description: 'Returns provider total number of delegators' }),
    (0, swagger_1.ApiOkResponse)({ type: provider_1.Provider }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Provider not found' }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProviderController.prototype, "getProviderAccountsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)('/providers/:address'),
    (0, swagger_1.ApiOperation)({ summary: 'Provider', description: 'Returns provider details for a given address' }),
    (0, swagger_1.ApiOkResponse)({ type: provider_1.Provider }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Provider not found' }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProviderController.prototype, "getProvider", null);
tslib_1.__decorate([
    (0, common_1.Get)('/providers/:address/avatar'),
    (0, swagger_1.ApiOperation)({ summary: 'Provider avatar', description: 'Returns the avatar for a specific provider address' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Provider avatar not found' }),
    tslib_1.__param(0, (0, common_1.Param)('address')),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProviderController.prototype, "getIdentityAvatar", null);
ProviderController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('providers'),
    tslib_1.__metadata("design:paramtypes", [provider_service_1.ProviderService])
], ProviderController);
exports.ProviderController = ProviderController;
//# sourceMappingURL=provider.controller.js.map