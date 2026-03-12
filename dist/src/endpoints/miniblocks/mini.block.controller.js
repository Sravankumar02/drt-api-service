"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniBlockController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const query_pagination_1 = require("../../common/entities/query.pagination");
const mini_block_detailed_1 = require("./entities/mini.block.detailed");
const mini_block_filter_1 = require("./entities/mini.block.filter");
const mini_block_service_1 = require("./mini.block.service");
const parse_enum_pipe_1 = require("@sravankumar02/sdk-nestjs-common/lib/pipes/parse.enum.pipe");
const mini_block_type_1 = require("./entities/mini.block.type");
let MiniBlockController = class MiniBlockController {
    constructor(miniBlockService) {
        this.miniBlockService = miniBlockService;
    }
    async getMiniBlocks(from, size, hashes, type) {
        return await this.miniBlockService.getMiniBlocks(new query_pagination_1.QueryPagination({ from, size }), new mini_block_filter_1.MiniBlockFilter({ hashes, type }));
    }
    async getBlock(miniBlockHash) {
        try {
            return await this.miniBlockService.getMiniBlock(miniBlockHash);
        }
        catch (_a) {
            throw new common_1.HttpException('Miniblock not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/miniblocks"),
    (0, swagger_1.ApiOperation)({ summary: 'Miniblocks details', description: 'Returns all distinct miniblocks' }),
    (0, swagger_1.ApiOkResponse)({ type: [mini_block_detailed_1.MiniBlockDetailed] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of miniblocks hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Sorting criteria by type', required: false, enum: mini_block_type_1.MiniBlockType }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)("size", new common_1.DefaultValuePipe(25), common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(3, (0, common_1.Query)('type', new parse_enum_pipe_1.ParseEnumPipe(mini_block_type_1.MiniBlockType))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Array, String]),
    tslib_1.__metadata("design:returntype", Promise)
], MiniBlockController.prototype, "getMiniBlocks", null);
tslib_1.__decorate([
    (0, common_1.Get)("/miniblocks/:miniBlockHash"),
    (0, swagger_1.ApiOperation)({ summary: 'Miniblock details', description: 'Returns miniblock details for a given miniBlockHash.' }),
    (0, swagger_1.ApiOkResponse)({ type: mini_block_detailed_1.MiniBlockDetailed }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Miniblock not found' }),
    tslib_1.__param(0, (0, common_1.Param)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], MiniBlockController.prototype, "getBlock", null);
MiniBlockController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('miniblocks'),
    tslib_1.__metadata("design:paramtypes", [mini_block_service_1.MiniBlockService])
], MiniBlockController);
exports.MiniBlockController = MiniBlockController;
//# sourceMappingURL=mini.block.controller.js.map