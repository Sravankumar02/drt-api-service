"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DappConfigService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const gateway_service_1 = require("../../common/gateway/gateway.service");
let DappConfigService = class DappConfigService {
    constructor(apiConfigService, gatewayService) {
        this.apiConfigService = apiConfigService;
        this.gatewayService = gatewayService;
        this.dappConfig = this.getDappConfigurationRaw();
    }
    async getDappConfiguration() {
        if (!this.dappConfig) {
            return undefined;
        }
        const networkConfig = await this.gatewayService.getNetworkConfig();
        const refreshRate = networkConfig.drt_round_duration;
        if (refreshRate) {
            return Object.assign(Object.assign({}, this.dappConfig), { refreshRate });
        }
        return this.dappConfig;
    }
    getDappConfigurationRaw() {
        const network = this.apiConfigService.getNetwork();
        const configuration = sdk_nestjs_common_1.FileUtils.parseJSONFile(`./config/dapp.config.${network}.json`);
        return configuration;
    }
};
DappConfigService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        gateway_service_1.GatewayService])
], DappConfigService);
exports.DappConfigService = DappConfigService;
//# sourceMappingURL=dapp.config.service.js.map