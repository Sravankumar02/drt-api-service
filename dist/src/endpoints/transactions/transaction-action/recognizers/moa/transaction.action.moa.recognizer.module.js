"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionActionMoaRecognizerModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const token_module_1 = require("../../../../tokens/token.module");
const moa_farm_action_recognizer_service_1 = require("./moa.farm.action.recognizer.service");
const moa_pair_action_recognizer_service_1 = require("./moa.pair.action.recognizer.service");
const transaction_action_moa_recognizer_service_1 = require("./transaction.action.moa.recognizer.service");
const moa_wrap_action_recognizer_service_1 = require("./moa.wrap.action.recognizer.service");
const moa_distribution_action_recognizer_service_1 = require("./moa.distribution.action.recognizer.service");
const transaction_action_module_1 = require("../../transaction.action.module");
const moa_locked_asset_action_recognizer_service_1 = require("./moa.locked.asset.action.recognizer.service");
const api_config_module_1 = require("../../../../../common/api-config/api.config.module");
const moa_module_1 = require("../../../../moa/moa.module");
let TransactionActionMoaRecognizerModule = class TransactionActionMoaRecognizerModule {
};
TransactionActionMoaRecognizerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => token_module_1.TokenModule),
            (0, common_1.forwardRef)(() => transaction_action_module_1.TransactionActionModule),
            api_config_module_1.ApiConfigModule,
            moa_module_1.MoaModule.forRoot(),
        ],
        providers: [
            transaction_action_moa_recognizer_service_1.TransactionActionMoaRecognizerService,
            moa_pair_action_recognizer_service_1.MoaPairActionRecognizerService,
            moa_farm_action_recognizer_service_1.MoaFarmActionRecognizerService,
            moa_wrap_action_recognizer_service_1.MoaWrapActionRecognizerService,
            moa_distribution_action_recognizer_service_1.MoaDistributionActionRecognizerService,
            moa_locked_asset_action_recognizer_service_1.MoaLockedAssetActionRecognizerService,
        ],
        exports: [transaction_action_moa_recognizer_service_1.TransactionActionMoaRecognizerService],
    })
], TransactionActionMoaRecognizerModule);
exports.TransactionActionMoaRecognizerModule = TransactionActionMoaRecognizerModule;
//# sourceMappingURL=transaction.action.moa.recognizer.module.js.map