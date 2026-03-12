"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const application_service_1 = require("./application.service");
const query_pagination_1 = require("../../common/entities/query.pagination");
const application_filter_1 = require("./entities/application.filter");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const application_1 = require("./entities/application");
const timestamp_parse_pipe_1 = require("../../utils/timestamp.parse.pipe");
let ApplicationController = class ApplicationController {
    constructor(applicationService) {
        this.applicationService = applicationService;
    }
    async getApplications(from, size, before, after, withTxCount) {
        const applicationFilter = new application_filter_1.ApplicationFilter({ before, after, withTxCount });
        return await this.applicationService.getApplications(new query_pagination_1.QueryPagination({ size, from }), applicationFilter);
    }
    async getApplicationsCount(before, after) {
        const filter = new application_filter_1.ApplicationFilter({ before, after });
        return await this.applicationService.getApplicationsCount(filter);
    }
    async getApplication(address) {
        return await this.applicationService.getApplication(address);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("applications"),
    (0, swagger_1.ApiOperation)({ summary: 'Applications details', description: 'Returns all smart contracts available on blockchain. By default it returns 25 smart contracts' }),
    (0, swagger_1.ApiOkResponse)({ type: [application_1.Application] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withTxCount', description: 'Include transaction count', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)("size", new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(3, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(4, (0, common_1.Query)('withTxCount', new sdk_nestjs_common_1.ParseBoolPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Number, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], ApplicationController.prototype, "getApplications", null);
tslib_1.__decorate([
    (0, common_1.Get)("applications/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Applications count', description: 'Returns total number of smart contracts' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(1, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ApplicationController.prototype, "getApplicationsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("applications/:address"),
    (0, swagger_1.ApiOperation)({ summary: 'Application details', description: 'Returns details of a smart contract' }),
    (0, swagger_1.ApiOkResponse)({ type: application_1.Application }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ApplicationController.prototype, "getApplication", null);
ApplicationController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('applications'),
    tslib_1.__metadata("design:paramtypes", [application_service_1.ApplicationService])
], ApplicationController);
exports.ApplicationController = ApplicationController;
//# sourceMappingURL=application.controller.js.map