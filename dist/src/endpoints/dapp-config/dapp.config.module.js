"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DappConfigModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const dapp_config_service_1 = require("./dapp.config.service");
let DappConfigModule = class DappConfigModule {
};
DappConfigModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [
            dapp_config_service_1.DappConfigService,
        ],
        exports: [
            dapp_config_service_1.DappConfigService,
        ],
    })
], DappConfigModule);
exports.DappConfigModule = DappConfigModule;
//# sourceMappingURL=dapp.config.module.js.map