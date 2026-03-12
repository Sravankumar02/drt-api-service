"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
const assets_service_1 = require("../../common/assets/assets.service");
const api_config_module_1 = require("../api-config/api.config.module");
let AssetsModule = class AssetsModule {
};
AssetsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            dynamic_module_utils_1.DynamicModuleUtils.getCacheModule(),
            api_config_module_1.ApiConfigModule,
        ],
        providers: [
            assets_service_1.AssetsService,
        ],
        exports: [
            assets_service_1.AssetsService,
        ],
    })
], AssetsModule);
exports.AssetsModule = AssetsModule;
//# sourceMappingURL=assets.module.js.map