"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const query_pagination_1 = require("../../common/entities/query.pagination");
const tag_1 = require("./entities/tag");
const tag_service_1 = require("./tag.service");
let TagController = class TagController {
    constructor(nftTagsService) {
        this.nftTagsService = nftTagsService;
    }
    async getTags(from, size, search) {
        return await this.nftTagsService.getNftTags(new query_pagination_1.QueryPagination({ from, size }), search);
    }
    async getTagCount(search) {
        return await this.nftTagsService.getNftTagCount(search);
    }
    async getTagDetails(tag) {
        try {
            return await this.nftTagsService.getNftTag(tag);
        }
        catch (_a) {
            throw new common_1.HttpException('Nft tag not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/tags"),
    (0, swagger_1.ApiOperation)({ summary: 'NFT Tags', description: 'Returns all distinct NFT tags' }),
    (0, swagger_1.ApiOkResponse)({ type: [tag_1.Tag] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by tag name', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)("size", new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('search')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TagController.prototype, "getTags", null);
tslib_1.__decorate([
    (0, common_1.Get)("/tags/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Total number of NFT Tags', description: 'Returns total number of distinct NFT Tags available on blockchain' }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by tag name', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TagController.prototype, "getTagCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/tags/:tag"),
    (0, swagger_1.ApiOperation)({ summary: 'Tag details', description: 'Return NFT tag details' }),
    (0, swagger_1.ApiOkResponse)({ type: tag_1.Tag }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Nft tag not found' }),
    tslib_1.__param(0, (0, common_1.Param)('tag')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TagController.prototype, "getTagDetails", null);
TagController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('tags'),
    tslib_1.__metadata("design:paramtypes", [tag_service_1.TagService])
], TagController);
exports.TagController = TagController;
//# sourceMappingURL=tag.controller.js.map