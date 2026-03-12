"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegationLegacyController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const delegation_legacy_service_1 = require("./delegation.legacy.service");
const delegation_legacy_1 = require("./entities/delegation.legacy");
let DelegationLegacyController = class DelegationLegacyController {
    constructor(delegationLegacyService) {
        this.delegationLegacyService = delegationLegacyService;
    }
    async getBlock() {
        return await this.delegationLegacyService.getDelegation();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/delegation-legacy"),
    (0, swagger_1.ApiOperation)({ summary: 'Legacy delegation statistics', description: 'Returns legacy delegation contract global information' }),
    (0, swagger_1.ApiOkResponse)({ type: delegation_legacy_1.DelegationLegacy }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DelegationLegacyController.prototype, "getBlock", null);
DelegationLegacyController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('delegation'),
    tslib_1.__metadata("design:paramtypes", [delegation_legacy_service_1.DelegationLegacyService])
], DelegationLegacyController);
exports.DelegationLegacyController = DelegationLegacyController;
//# sourceMappingURL=delegation.legacy.controller.js.map