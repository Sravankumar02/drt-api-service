"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const query_pagination_1 = require("../../common/entities/query.pagination");
const block_service_1 = require("./block.service");
const block_1 = require("./entities/block");
const block_detailed_1 = require("./entities/block.detailed");
const block_filter_1 = require("./entities/block.filter");
const sort_order_1 = require("../../common/entities/sort.order");
let BlockController = class BlockController {
    constructor(blockService) {
        this.blockService = blockService;
    }
    getBlocks(from, size, shard, proposer, validator, epoch, nonce, hashes, order, withProposerIdentity) {
        return this.blockService.getBlocks(new block_filter_1.BlockFilter({ shard, proposer, validator, epoch, nonce, hashes, order }), new query_pagination_1.QueryPagination({ from, size }), withProposerIdentity);
    }
    getBlocksCount(shard, proposer, validator, epoch, nonce) {
        return this.blockService.getBlocksCount(new block_filter_1.BlockFilter({ shard, proposer, validator, epoch, nonce }));
    }
    getBlocksCountAlternative(shard, proposer, validator, epoch, nonce) {
        return this.blockService.getBlocksCount(new block_filter_1.BlockFilter({ shard, proposer, validator, epoch, nonce }));
    }
    async getLatestBlock(ttl) {
        const block = await this.blockService.getLatestBlock(ttl);
        if (!block) {
            throw new common_1.NotFoundException("Block not found");
        }
        return block;
    }
    async getBlock(hash) {
        try {
            return await this.blockService.getBlock(hash);
        }
        catch (_a) {
            throw new common_1.HttpException('Block not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/blocks"),
    (0, swagger_1.ApiOperation)({ summary: 'Blocks', description: 'Returns a list of all blocks from all shards' }),
    (0, swagger_1.ApiOkResponse)({ type: [block_1.Block] }),
    (0, swagger_1.ApiQuery)({ name: 'shard', description: 'Id of the shard the block belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'proposer', description: 'Filter by proposer', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'validator', description: 'Filter by validator', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'epoch', description: 'Filter by epoch', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'nonce', description: 'Filter by nonce', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Search by blocks hashes, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Order blocks (asc/desc) by timestamp', required: false, enum: sort_order_1.SortOrder }),
    (0, swagger_1.ApiQuery)({ name: 'withProposerIdentity', description: 'Provide identity information for proposer node', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)("size", new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('shard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('proposer', sdk_nestjs_common_1.ParseBlsHashPipe)),
    tslib_1.__param(4, (0, common_1.Query)('validator', sdk_nestjs_common_1.ParseBlsHashPipe)),
    tslib_1.__param(5, (0, common_1.Query)('epoch', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(6, (0, common_1.Query)('nonce', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(7, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(8, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__param(9, (0, common_1.Query)('withProposerIdentity', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, String, String, Number, Number, Array, String, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], BlockController.prototype, "getBlocks", null);
tslib_1.__decorate([
    (0, common_1.Get)("/blocks/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Blocks count', description: 'Returns count of all blocks from all shards' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'shard', description: 'Id of the shard the block belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'proposer', description: 'Filter by proposer', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'validator', description: 'Filter by validator', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'epoch', description: 'Filter by epoch', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'nonce', description: 'Filter by nonce', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('shard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('proposer', sdk_nestjs_common_1.ParseBlsHashPipe)),
    tslib_1.__param(2, (0, common_1.Query)('validator', sdk_nestjs_common_1.ParseBlsHashPipe)),
    tslib_1.__param(3, (0, common_1.Query)('epoch', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('nonce', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BlockController.prototype, "getBlocksCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/blocks/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Query)('shard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('proposer', sdk_nestjs_common_1.ParseBlsHashPipe)),
    tslib_1.__param(2, (0, common_1.Query)('validator', sdk_nestjs_common_1.ParseBlsHashPipe)),
    tslib_1.__param(3, (0, common_1.Query)('epoch', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('nonce', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BlockController.prototype, "getBlocksCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)("/blocks/latest"),
    (0, swagger_1.ApiOperation)({ summary: 'Block details', description: 'Returns latest block information details' }),
    (0, swagger_1.ApiOkResponse)({ type: block_detailed_1.BlockDetailed }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Block not found' }),
    (0, swagger_1.ApiQuery)({ name: 'ttl', description: 'Compute the nonce frequency based on ttl value. If not specified the latest block may be 1h old', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('ttl', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BlockController.prototype, "getLatestBlock", null);
tslib_1.__decorate([
    (0, common_1.Get)("/blocks/:hash"),
    (0, swagger_1.ApiOperation)({ summary: 'Block details', description: 'Returns block information details for a given hash' }),
    (0, swagger_1.ApiOkResponse)({ type: block_detailed_1.BlockDetailed }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Block not found' }),
    tslib_1.__param(0, (0, common_1.Param)('hash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BlockController.prototype, "getBlock", null);
BlockController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('blocks'),
    tslib_1.__metadata("design:paramtypes", [block_service_1.BlockService])
], BlockController);
exports.BlockController = BlockController;
//# sourceMappingURL=block.controller.js.map