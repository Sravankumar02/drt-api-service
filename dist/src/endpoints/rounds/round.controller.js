"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_elastic_1 = require("@sravankumar02/sdk-nestjs-elastic");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const round_1 = require("./entities/round");
const round_detailed_1 = require("./entities/round.detailed");
const round_filter_1 = require("./entities/round.filter");
const round_service_1 = require("./round.service");
let RoundController = class RoundController {
    constructor(roundService) {
        this.roundService = roundService;
    }
    getRounds(from, size, validator, condition, shard, epoch) {
        return this.roundService.getRounds(new round_filter_1.RoundFilter({ from, size, condition, validator, shard, epoch }));
    }
    getRoundCount(validator, condition, shard, epoch) {
        return this.roundService.getRoundCount(new round_filter_1.RoundFilter({ condition, validator, shard, epoch }));
    }
    getRoundCountAlternative(validator, condition, shard, epoch) {
        return this.roundService.getRoundCount(new round_filter_1.RoundFilter({ condition, validator, shard, epoch }));
    }
    async getRound(shard, round) {
        try {
            return await this.roundService.getRound(shard, round);
        }
        catch (_a) {
            throw new common_1.HttpException('Round not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/rounds"),
    (0, swagger_1.ApiOperation)({ summary: 'Rounds', description: 'Returns a list of all rounds available on blockchain' }),
    (0, swagger_1.ApiOkResponse)({ type: [round_1.Round] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'validator', description: 'Filter by validator', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'condition', description: 'Filter by condition', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'shard', description: 'Filter by shard identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'epoch', description: 'Filter by epoch number', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)("size", new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)("validator", sdk_nestjs_common_1.ParseBlsHashPipe)),
    tslib_1.__param(3, (0, common_1.Query)('condition', new sdk_nestjs_common_1.ParseEnumPipe(sdk_nestjs_elastic_1.QueryConditionOptions))),
    tslib_1.__param(4, (0, common_1.Query)("shard", sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)("epoch", sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], RoundController.prototype, "getRounds", null);
tslib_1.__decorate([
    (0, common_1.Get)("/rounds/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Rounds count', description: 'Returns total number of rounds' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'validator', description: 'Filter by validator', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'condition', description: 'Filter by condition', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'shard', description: 'Filter by shard identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'epoch', description: 'Filter by epoch number', required: false }),
    tslib_1.__param(0, (0, common_1.Query)("validator", sdk_nestjs_common_1.ParseBlsHashPipe)),
    tslib_1.__param(1, (0, common_1.Query)('condition', new sdk_nestjs_common_1.ParseEnumPipe(sdk_nestjs_elastic_1.QueryConditionOptions))),
    tslib_1.__param(2, (0, common_1.Query)("shard", sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)("epoch", sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], RoundController.prototype, "getRoundCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/rounds/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Query)("validator", sdk_nestjs_common_1.ParseBlsHashPipe)),
    tslib_1.__param(1, (0, common_1.Query)('condition', new sdk_nestjs_common_1.ParseEnumPipe(sdk_nestjs_elastic_1.QueryConditionOptions))),
    tslib_1.__param(2, (0, common_1.Query)("shard", sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)("epoch", sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], RoundController.prototype, "getRoundCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)("/rounds/:shard/:round"),
    (0, swagger_1.ApiOperation)({ summary: 'Round', description: 'Returns details of a given round from a specific shard' }),
    (0, swagger_1.ApiOkResponse)({ type: round_detailed_1.RoundDetailed }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Round not found' }),
    tslib_1.__param(0, (0, common_1.Param)('shard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Param)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], RoundController.prototype, "getRound", null);
RoundController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('rounds'),
    tslib_1.__metadata("design:paramtypes", [round_service_1.RoundService])
], RoundController);
exports.RoundController = RoundController;
//# sourceMappingURL=round.controller.js.map