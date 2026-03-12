"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexProxyController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const api_config_service_1 = require("../../common/api-config/api.config.service");
let IndexProxyController = class IndexProxyController {
    constructor(apiService, apiConfigService) {
        this.apiService = apiService;
        this.apiConfigService = apiConfigService;
    }
    async forwardIndexSearchGet(collection, request) {
        return await this.performIndexGetRequest(collection, '_search', request.query);
    }
    async forwardIndexCountGet(collection, request) {
        return await this.performIndexGetRequest(collection, '_count', request.query);
    }
    async forwardIndexSearchPost(collection, body, request) {
        return await this.performIndexPostRequest(collection, '_search', request.query, body);
    }
    async forwardIndexCountPost(collection, body, request) {
        return await this.performIndexPostRequest(collection, '_count', request.query, body);
    }
    async performIndexGetRequest(collection, suffix, params) {
        const url = `${this.apiConfigService.getElasticUrl()}/${collection}/${suffix}`;
        try {
            const { data } = await this.apiService.get(url, { params });
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response, error.status);
        }
    }
    async performIndexPostRequest(collection, suffix, params, body) {
        const url = `${this.apiConfigService.getElasticUrl()}/${collection}/${suffix}`;
        try {
            const { data } = await this.apiService.post(url, body, { params });
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response, error.status);
        }
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('/:collection/_search'),
    tslib_1.__param(0, (0, common_1.Param)('collection')),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexProxyController.prototype, "forwardIndexSearchGet", null);
tslib_1.__decorate([
    (0, common_1.Get)('/:collection/_count'),
    tslib_1.__param(0, (0, common_1.Param)('collection')),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexProxyController.prototype, "forwardIndexCountGet", null);
tslib_1.__decorate([
    (0, common_1.Post)('/:collection/_search'),
    tslib_1.__param(0, (0, common_1.Param)('collection')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexProxyController.prototype, "forwardIndexSearchPost", null);
tslib_1.__decorate([
    (0, common_1.Post)('/:collection/_count'),
    tslib_1.__param(0, (0, common_1.Param)('collection')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexProxyController.prototype, "forwardIndexCountPost", null);
IndexProxyController = tslib_1.__decorate([
    (0, common_1.Controller)('index'),
    (0, swagger_1.ApiTags)('proxy'),
    (0, swagger_1.ApiExcludeController)(),
    (0, sdk_nestjs_http_1.DisableFieldsInterceptorOnController)(),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_http_1.ApiService,
        api_config_service_1.ApiConfigService])
], IndexProxyController);
exports.IndexProxyController = IndexProxyController;
//# sourceMappingURL=index.proxy.controller.js.map