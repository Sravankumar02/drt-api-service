"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaFarmActionRecognizerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const transaction_action_category_1 = require("../../entities/transaction.action.category");
const transaction_action_dcdt_nft_recognizer_service_1 = require("../dcdt/transaction.action.dcdt.nft.recognizer.service");
const moa_function_options_1 = require("./entities/moa.function.options");
let MoaFarmActionRecognizerService = class MoaFarmActionRecognizerService {
    constructor(transactionActionDcdtNftRecognizerService) {
        this.transactionActionDcdtNftRecognizerService = transactionActionDcdtNftRecognizerService;
    }
    recognize(settings, metadata) {
        if (!settings.farmContracts.includes(metadata.receiver)) {
            return undefined;
        }
        switch (metadata.functionName) {
            case moa_function_options_1.MoaFunction.enterFarm:
            case moa_function_options_1.MoaFunction.enterFarmProxy:
                return this.getFarmAction(metadata, moa_function_options_1.MoaFunction.enterFarm, 'Enter farm with');
            case moa_function_options_1.MoaFunction.enterFarmAndLockRewards:
            case moa_function_options_1.MoaFunction.enterFarmAndLockRewardsProxy:
                return this.getFarmAction(metadata, moa_function_options_1.MoaFunction.enterFarm, 'Enter farm and lock rewards with');
            case moa_function_options_1.MoaFunction.exitFarm:
            case moa_function_options_1.MoaFunction.exitFarmProxy:
                return this.getFarmAction(metadata, moa_function_options_1.MoaFunction.exitFarm, 'Exit farm with');
            case moa_function_options_1.MoaFunction.claimRewards:
            case moa_function_options_1.MoaFunction.claimRewardsProxy:
                return this.getFarmAction(metadata, moa_function_options_1.MoaFunction.claimRewards, 'Claim rewards for');
            case moa_function_options_1.MoaFunction.compoundRewards:
            case moa_function_options_1.MoaFunction.compoundRewardsProxy:
                return this.getFarmAction(metadata, moa_function_options_1.MoaFunction.compoundRewards, 'Reinvest rewards for');
            case moa_function_options_1.MoaFunction.stakeFarm:
            case moa_function_options_1.MoaFunction.stakeFarmProxy:
                return this.getFarmAction(metadata, moa_function_options_1.MoaFunction.enterFarm, 'Stake farm with');
            case moa_function_options_1.MoaFunction.stakeFarmTokens:
            case moa_function_options_1.MoaFunction.stakeFarmTokensProxy:
                return this.getFarmAction(metadata, moa_function_options_1.MoaFunction.enterFarm, 'Stake farm tokens with');
            case moa_function_options_1.MoaFunction.unstakeFarm:
            case moa_function_options_1.MoaFunction.unstakeFarmProxy:
                return this.getFarmAction(metadata, moa_function_options_1.MoaFunction.exitFarm, 'Unstake farm with');
            case moa_function_options_1.MoaFunction.unstakeFarmTokens:
            case moa_function_options_1.MoaFunction.unstakeFarmTokensProxy:
                return this.getFarmAction(metadata, moa_function_options_1.MoaFunction.exitFarm, 'Unstake farm tokens with');
            case moa_function_options_1.MoaFunction.claimDualYield:
            case moa_function_options_1.MoaFunction.claimDualYieldProxy:
                return this.getFarmAction(metadata, moa_function_options_1.MoaFunction.claimRewards, 'Claim dual yield for');
            case moa_function_options_1.MoaFunction.unbondFarm:
                return this.getFarmAction(metadata, moa_function_options_1.MoaFunction.unbondFarm, 'Unbond farm with');
            default:
                return undefined;
        }
    }
    getFarmAction(metadata, name, action) {
        return this.transactionActionDcdtNftRecognizerService.getMultiTransferActionWithTicker(metadata, transaction_action_category_1.TransactionActionCategory.moa, name, action);
    }
};
MoaFarmActionRecognizerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [transaction_action_dcdt_nft_recognizer_service_1.TransactionActionDcdtNftRecognizerService])
], MoaFarmActionRecognizerService);
exports.MoaFarmActionRecognizerService = MoaFarmActionRecognizerService;
//# sourceMappingURL=moa.farm.action.recognizer.service.js.map