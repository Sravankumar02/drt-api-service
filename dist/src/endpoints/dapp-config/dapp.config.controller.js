"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DappConfigController = void 0;
const tslib_1 = require("tslib");
const dapp_config_1 = require("./entities/dapp-config");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dapp_config_service_1 = require("./dapp.config.service");
let DappConfigController = class DappConfigController {
    constructor(dappConfigService) {
        this.dappConfigService = dappConfigService;
    }
    async getDappConfiguration() {
        const configuration = await this.dappConfigService.getDappConfiguration();
        if (!configuration) {
            throw new common_1.NotFoundException(`Network configuration not found`);
        }
        return configuration;
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/dapp/config"),
    (0, swagger_1.ApiOperation)({ summary: 'Dapp configuration', description: 'Returns configuration used in dapps' }),
    (0, swagger_1.ApiOkResponse)({ type: dapp_config_1.DappConfig }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Network configuration not found' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DappConfigController.prototype, "getDappConfiguration", null);
DappConfigController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('dapp/config'),
    tslib_1.__metadata("design:paramtypes", [dapp_config_service_1.DappConfigService])
], DappConfigController);
exports.DappConfigController = DappConfigController;
//# sourceMappingURL=dapp.config.controller.js.map