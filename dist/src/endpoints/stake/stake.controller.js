"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const global_stake_1 = require("./entities/global.stake");
const stake_service_1 = require("./stake.service");
let StakeController = class StakeController {
    constructor(stakeService) {
        this.stakeService = stakeService;
    }
    async getGlobalStake() {
        return await this.stakeService.getGlobalStake();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('/stake'),
    (0, swagger_1.ApiOperation)({ summary: 'Stake', description: 'Returns general staking information' }),
    (0, swagger_1.ApiOkResponse)({ type: global_stake_1.GlobalStake }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StakeController.prototype, "getGlobalStake", null);
StakeController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('stake'),
    tslib_1.__metadata("design:paramtypes", [stake_service_1.StakeService])
], StakeController);
exports.StakeController = StakeController;
//# sourceMappingURL=stake.controller.js.map