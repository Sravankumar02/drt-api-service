"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionActionModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const token_module_1 = require("../../tokens/token.module");
const transaction_action_dcdt_nft_recognizer_service_1 = require("./recognizers/dcdt/transaction.action.dcdt.nft.recognizer.service");
const transaction_action_service_1 = require("./transaction.action.service");
const transaction_action_moa_recognizer_module_1 = require("./recognizers/moa/transaction.action.moa.recognizer.module");
const transaction_action_stake_recognizer_service_1 = require("./recognizers/staking/transaction.action.stake.recognizer.service");
const transaction_action_sc_calls_recognizer_service_1 = require("./recognizers/sc-calls/transaction.action.sc-calls.recognizer.service");
const provider_module_1 = require("../../providers/provider.module");
const identities_module_1 = require("../../identities/identities.module");
const moa_metabonding_action_recognizer_service_1 = require("./recognizers/moa/moa.metabonding.action.recognizer.service");
let TransactionActionModule = class TransactionActionModule {
};
TransactionActionModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => token_module_1.TokenModule),
            config_1.ConfigModule,
            transaction_action_moa_recognizer_module_1.TransactionActionMoaRecognizerModule,
            (0, common_1.forwardRef)(() => provider_module_1.ProviderModule),
            (0, common_1.forwardRef)(() => identities_module_1.IdentitiesModule),
        ],
        providers: [
            transaction_action_service_1.TransactionActionService,
            transaction_action_dcdt_nft_recognizer_service_1.TransactionActionDcdtNftRecognizerService,
            transaction_action_stake_recognizer_service_1.StakeActionRecognizerService,
            transaction_action_sc_calls_recognizer_service_1.SCCallActionRecognizerService,
            moa_metabonding_action_recognizer_service_1.MetabondingActionRecognizerService,
        ],
        exports: [
            transaction_action_service_1.TransactionActionService,
            transaction_action_dcdt_nft_recognizer_service_1.TransactionActionDcdtNftRecognizerService,
        ],
    })
], TransactionActionModule);
exports.TransactionActionModule = TransactionActionModule;
//# sourceMappingURL=transaction.action.module.js.map