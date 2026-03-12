"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiConfigModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = tslib_1.__importDefault(require("../../../config/configuration"));
const api_config_service_1 = require("./api.config.service");
let ApiConfigModule = class ApiConfigModule {
};
ApiConfigModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
            }),
        ],
        providers: [
            api_config_service_1.ApiConfigService,
        ],
        exports: [
            api_config_service_1.ApiConfigService,
        ],
    })
], ApiConfigModule);
exports.ApiConfigModule = ApiConfigModule;
//# sourceMappingURL=api.config.module.js.map