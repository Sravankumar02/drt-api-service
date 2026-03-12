"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaDistributionActionRecognizerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const transaction_action_1 = require("../../entities/transaction.action");
const transaction_action_category_1 = require("../../entities/transaction.action.category");
const moa_function_options_1 = require("./entities/moa.function.options");
let MoaDistributionActionRecognizerService = class MoaDistributionActionRecognizerService {
    recognize(settings, metadata) {
        if (metadata.receiver === settings.distributionContract && metadata.functionName === moa_function_options_1.MoaFunction.claimLockedAssets) {
            return this.getClaimLockedAssetsAction();
        }
        return undefined;
    }
    getClaimLockedAssetsAction() {
        const result = new transaction_action_1.TransactionAction();
        result.category = transaction_action_category_1.TransactionActionCategory.moa;
        result.name = moa_function_options_1.MoaFunction.claimLockedAssets;
        result.description = 'Claim locked assets';
        return result;
    }
};
MoaDistributionActionRecognizerService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], MoaDistributionActionRecognizerService);
exports.MoaDistributionActionRecognizerService = MoaDistributionActionRecognizerService;
//# sourceMappingURL=moa.distribution.action.recognizer.service.js.map