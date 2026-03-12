"use strict";
var MoaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const configuration_1 = tslib_1.__importDefault(require("../../../config/configuration"));
const graphql_module_1 = require("../../common/graphql/graphql.module");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
const moa_economics_service_1 = require("./moa.economics.service");
const moa_farm_service_1 = require("./moa.farm.service");
const moa_pair_service_1 = require("./moa.pair.service");
const moa_settings_service_1 = require("./moa.settings.service");
const moa_token_charts_service_1 = require("./moa.token.charts.service");
const moa_token_service_1 = require("./moa.token.service");
const moa_warmer_service_1 = require("./moa.warmer.service");
let MoaModule = MoaModule_1 = class MoaModule {
    static forRoot() {
        var _a, _b, _c;
        const providers = [
            dynamic_module_utils_1.DynamicModuleUtils.getPubSubService(),
            moa_economics_service_1.MoaEconomicsService,
            moa_settings_service_1.MoaSettingsService,
            moa_pair_service_1.MoaPairService,
            moa_token_service_1.MoaTokenService,
            moa_farm_service_1.MoaFarmService,
            moa_token_charts_service_1.MoaTokenChartsService,
        ];
        const isExchangeEnabled = (_c = (_b = (_a = (0, configuration_1.default)().features) === null || _a === void 0 ? void 0 : _a.exchange) === null || _b === void 0 ? void 0 : _b.enabled) !== null && _c !== void 0 ? _c : false;
        if (isExchangeEnabled) {
            providers.push(moa_warmer_service_1.MoaWarmerService);
        }
        return {
            module: MoaModule_1,
            imports: [
                graphql_module_1.GraphQlModule,
            ],
            providers,
            exports: [
                moa_economics_service_1.MoaEconomicsService,
                moa_pair_service_1.MoaPairService,
                moa_settings_service_1.MoaSettingsService,
                moa_token_service_1.MoaTokenService,
                moa_farm_service_1.MoaFarmService,
                moa_token_charts_service_1.MoaTokenChartsService,
            ],
        };
    }
};
MoaModule = MoaModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({})
], MoaModule);
exports.MoaModule = MoaModule;
//# sourceMappingURL=moa.module.js.map