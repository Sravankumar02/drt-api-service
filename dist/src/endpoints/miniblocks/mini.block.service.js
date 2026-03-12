"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniBlockService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const common_1 = require("@nestjs/common");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const mini_block_detailed_1 = require("./entities/mini.block.detailed");
let MiniBlockService = class MiniBlockService {
    constructor(indexerService) {
        this.indexerService = indexerService;
    }
    async getMiniBlock(miniBlockHash) {
        const result = await this.indexerService.getMiniBlock(miniBlockHash);
        return sdk_nestjs_http_1.ApiUtils.mergeObjects(new mini_block_detailed_1.MiniBlockDetailed(), result);
    }
    async getMiniBlocks(pagination, filter) {
        const results = await this.indexerService.getMiniBlocks(pagination, filter);
        return results.map(item => sdk_nestjs_http_1.ApiUtils.mergeObjects(new mini_block_detailed_1.MiniBlockDetailed(), item));
    }
};
MiniBlockService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [indexer_service_1.IndexerService])
], MiniBlockService);
exports.MiniBlockService = MiniBlockService;
//# sourceMappingURL=mini.block.service.js.map