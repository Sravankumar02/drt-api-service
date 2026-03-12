"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegationController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const delegation_service_1 = require("./delegation.service");
const delegation_1 = require("./entities/delegation");
let DelegationController = class DelegationController {
    constructor(delegationService) {
        this.delegationService = delegationService;
    }
    async getDelegationDetails() {
        return await this.delegationService.getDelegation();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/delegation"),
    (0, swagger_1.ApiOperation)({ summary: 'Delegation statistics', description: 'Returns delegation staking contract information' }),
    (0, swagger_1.ApiOkResponse)({ type: delegation_1.Delegation }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DelegationController.prototype, "getDelegationDetails", null);
DelegationController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('delegation'),
    tslib_1.__metadata("design:paramtypes", [delegation_service_1.DelegationService])
], DelegationController);
exports.DelegationController = DelegationController;
//# sourceMappingURL=delegation.controller.js.map