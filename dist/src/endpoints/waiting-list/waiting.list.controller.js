"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitingListController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const query_pagination_1 = require("../../common/entities/query.pagination");
const waiting_list_1 = require("./entities/waiting.list");
const waiting_list_service_1 = require("./waiting.list.service");
let WaitingListController = class WaitingListController {
    constructor(waitingListService) {
        this.waitingListService = waitingListService;
    }
    getWaitingList(from, size) {
        return this.waitingListService.getWaitingList(new query_pagination_1.QueryPagination({ from, size }));
    }
    getWaitingListCount() {
        return this.waitingListService.getWaitingListCount();
    }
    getWaitingListCountAlternative() {
        return this.waitingListService.getWaitingListCount();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/waiting-list"),
    (0, swagger_1.ApiOperation)({ summary: 'Waiting list', description: 'Returns node waiting list' }),
    (0, swagger_1.ApiOkResponse)({ type: [waiting_list_1.WaitingList] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)("size", new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], WaitingListController.prototype, "getWaitingList", null);
tslib_1.__decorate([
    (0, common_1.Get)("/waiting-list/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Waiting list count', description: 'Returns count of node waiting list' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], WaitingListController.prototype, "getWaitingListCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/waiting-list/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], WaitingListController.prototype, "getWaitingListCountAlternative", null);
WaitingListController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('waiting-list'),
    tslib_1.__metadata("design:paramtypes", [waiting_list_service_1.WaitingListService])
], WaitingListController);
exports.WaitingListController = WaitingListController;
//# sourceMappingURL=waiting.list.controller.js.map