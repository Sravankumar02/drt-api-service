"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShardController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shard_service_1 = require("./shard.service");
const shard_1 = require("./entities/shard");
const query_pagination_1 = require("../../common/entities/query.pagination");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
let ShardController = class ShardController {
    constructor(shardService) {
        this.shardService = shardService;
    }
    async getShards(from, size) {
        return await this.shardService.getShards(new query_pagination_1.QueryPagination({ from, size }));
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/shards"),
    (0, swagger_1.ApiOperation)({ summary: 'Shards', description: 'Returns all available shards' }),
    (0, swagger_1.ApiOkResponse)({ type: [shard_1.Shard] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ShardController.prototype, "getShards", null);
ShardController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('shards'),
    tslib_1.__metadata("design:paramtypes", [shard_service_1.ShardService])
], ShardController);
exports.ShardController = ShardController;
//# sourceMappingURL=shard.controller.js.map