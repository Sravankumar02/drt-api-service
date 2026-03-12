"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const key_unbond_period_1 = require("./entities/key.unbond.period");
const keys_service_1 = require("./keys.service");
let KeysController = class KeysController {
    constructor(keysService) {
        this.keysService = keysService;
    }
    async getKeyUnbondPeriod(key) {
        const result = await this.keysService.getKeyUnbondPeriod(key);
        if (!result) {
            throw new common_1.HttpException('Key not found', common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/keys/:key/unbond-period"),
    (0, swagger_1.ApiOperation)({ summary: 'Unbonding period', description: 'Returns remaining unbonding period for a given bls key' }),
    (0, swagger_1.ApiParam)({ name: 'key', description: 'The BLS key of the node', required: true }),
    (0, swagger_1.ApiOkResponse)({ type: key_unbond_period_1.KeyUnbondPeriod }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Key not found' }),
    tslib_1.__param(0, (0, common_1.Param)('key', sdk_nestjs_common_1.ParseBlsHashPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], KeysController.prototype, "getKeyUnbondPeriod", null);
KeysController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('keys'),
    tslib_1.__metadata("design:paramtypes", [keys_service_1.KeysService])
], KeysController);
exports.KeysController = KeysController;
//# sourceMappingURL=keys.controller.js.map