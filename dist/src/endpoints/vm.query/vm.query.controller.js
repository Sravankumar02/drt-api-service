"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VmQueryController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vm_query_request_1 = require("./entities/vm.query.request");
const vm_query_service_1 = require("./vm.query.service");
const deep_history_interceptor_1 = require("../../interceptors/deep-history.interceptor");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
let VmQueryController = class VmQueryController {
    constructor(vmQueryService) {
        this.vmQueryService = vmQueryService;
    }
    async query(query, timestamp) {
        let result;
        try {
            result = await this.vmQueryService.vmQueryFullResult(query.scAddress, query.funcName, query.caller, query.args, query.value, timestamp);
        }
        catch (error) {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                code: error.response.data.code,
                message: error.response.data.error,
            });
        }
        const data = result.data.data;
        if (data.returnData !== null) {
            return data;
        }
        else {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                code: data.returnCode,
                message: data.returnMessage,
            });
        }
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('/query'),
    (0, swagger_1.ApiOperation)({ summary: 'VM query', description: 'Performs a vm query on a given smart contract and returns its results' }),
    (0, swagger_1.ApiCreatedResponse)(),
    (0, common_1.UseInterceptors)(deep_history_interceptor_1.DeepHistoryInterceptor),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Query)('timestamp', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [vm_query_request_1.VmQueryRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VmQueryController.prototype, "query", null);
VmQueryController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('query'),
    tslib_1.__metadata("design:paramtypes", [vm_query_service_1.VmQueryService])
], VmQueryController);
exports.VmQueryController = VmQueryController;
//# sourceMappingURL=vm.query.controller.js.map