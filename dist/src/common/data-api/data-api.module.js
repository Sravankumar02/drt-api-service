"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataApiModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
const api_config_module_1 = require("../api-config/api.config.module");
const data_api_service_1 = require("./data-api.service");
let DataApiModule = class DataApiModule {
};
DataApiModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            api_config_module_1.ApiConfigModule,
            dynamic_module_utils_1.DynamicModuleUtils.getApiModule(),
            dynamic_module_utils_1.DynamicModuleUtils.getCacheModule(),
        ],
        providers: [
            data_api_service_1.DataApiService,
        ],
        exports: [
            data_api_service_1.DataApiService,
        ],
    })
], DataApiModule);
exports.DataApiModule = DataApiModule;
//# sourceMappingURL=data-api.module.js.map