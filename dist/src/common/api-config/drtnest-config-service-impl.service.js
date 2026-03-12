"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrtnestConfigServiceImpl = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("./api.config.service");
let DrtnestConfigServiceImpl = class DrtnestConfigServiceImpl {
    constructor(apiConfigService) {
        this.apiConfigService = apiConfigService;
    }
    getSecurityAdmins() {
        return this.apiConfigService.getSecurityAdmins();
    }
    getJwtSecret() {
        return this.apiConfigService.getJwtSecret();
    }
    getApiUrl() {
        return this.apiConfigService.getSelfUrl();
    }
    getNativeAuthMaxExpirySeconds() {
        return this.apiConfigService.getNativeAuthMaxExpirySeconds();
    }
    getNativeAuthAcceptedOrigins() {
        return this.apiConfigService.getNativeAuthAcceptedOrigins();
    }
};
DrtnestConfigServiceImpl = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService])
], DrtnestConfigServiceImpl);
exports.DrtnestConfigServiceImpl = DrtnestConfigServiceImpl;
//# sourceMappingURL=drtnest-config-service-impl.service.js.map