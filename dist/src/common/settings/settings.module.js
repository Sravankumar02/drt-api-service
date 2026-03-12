"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_module_1 = require("../api-config/api.config.module");
const settings_service_1 = require("./settings.service");
let SettingsModule = class SettingsModule {
};
SettingsModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            api_config_module_1.ApiConfigModule,
        ],
        providers: [
            settings_service_1.SettingsService,
        ],
        exports: [
            settings_service_1.SettingsService,
        ],
    })
], SettingsModule);
exports.SettingsModule = SettingsModule;
//# sourceMappingURL=settings.module.js.map