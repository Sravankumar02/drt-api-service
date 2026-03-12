"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockDetailed = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const block_1 = require("./block");
class BlockDetailed extends block_1.Block {
    constructor(init) {
        super();
        this.miniBlocksHashes = [];
        this.notarizedBlocksHashes = [];
        this.validators = [];
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    tslib_1.__metadata("design:type", Array)
], BlockDetailed.prototype, "miniBlocksHashes", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    tslib_1.__metadata("design:type", Array)
], BlockDetailed.prototype, "notarizedBlocksHashes", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    tslib_1.__metadata("design:type", Array)
], BlockDetailed.prototype, "validators", void 0);
exports.BlockDetailed = BlockDetailed;
//# sourceMappingURL=block.detailed.js.map