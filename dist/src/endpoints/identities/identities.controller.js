"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentitiesController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const identity_1 = require("./entities/identity");
const identities_service_1 = require("./identities.service");
const identity_sort_criteria_1 = require("./entities/identity.sort.criteria");
const query_pagination_1 = require("../../common/entities/query.pagination");
let IdentitiesController = class IdentitiesController {
    constructor(identitiesService) {
        this.identitiesService = identitiesService;
    }
    async getIdentities(from, size, identities = [], sort) {
        return await this.identitiesService.getIdentities(new query_pagination_1.QueryPagination({ from, size }), identities, sort);
    }
    async getIdentity(identifier) {
        const identity = await this.identitiesService.getIdentity(identifier);
        if (identity === undefined) {
            throw new common_1.HttpException('Identity not found', common_1.HttpStatus.NOT_FOUND);
        }
        return identity;
    }
    async getIdentityAvatar(identifier, response) {
        const url = await this.identitiesService.getIdentityAvatar(identifier);
        if (!url) {
            throw new common_1.HttpException('Identity avatar not found', common_1.HttpStatus.NOT_FOUND);
        }
        response.redirect(url);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/identities"),
    (0, swagger_1.ApiOperation)({ summary: 'Identities', description: 'List of all node identities, used to group nodes by the same entity. "Free-floating" nodes that do not belong to any identity will also be returned' }),
    (0, swagger_1.ApiOkResponse)({ type: [identity_1.Identity] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identities', description: 'Filter by comma-separated list of identities', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'sort', description: 'Sort criteria (comma-separated list: validators,stake,locked)', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(10000), common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('identities', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(3, (0, common_1.Query)('sort', new sdk_nestjs_common_1.ParseEnumArrayPipe(identity_sort_criteria_1.IdentitySortCriteria))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Array, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], IdentitiesController.prototype, "getIdentities", null);
tslib_1.__decorate([
    (0, common_1.Get)('/identities/:identifier'),
    (0, swagger_1.ApiOperation)({ summary: 'Identity details', description: 'Returns the details of a single identity' }),
    (0, swagger_1.ApiOkResponse)({ type: identity_1.Identity }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Identity not found' }),
    tslib_1.__param(0, (0, common_1.Param)('identifier')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IdentitiesController.prototype, "getIdentity", null);
tslib_1.__decorate([
    (0, common_1.Get)('/identities/:identifier/avatar'),
    (0, swagger_1.ApiOperation)({ summary: 'Identity avatar', description: 'Returns the avatar of a specific identity' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Identity not found' }),
    tslib_1.__param(0, (0, common_1.Param)('identifier')),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IdentitiesController.prototype, "getIdentityAvatar", null);
IdentitiesController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('identities'),
    tslib_1.__metadata("design:paramtypes", [identities_service_1.IdentitiesService])
], IdentitiesController);
exports.IdentitiesController = IdentitiesController;
//# sourceMappingURL=identities.controller.js.map