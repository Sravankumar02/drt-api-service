"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetabondingActionRecognizerService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../../../../common/api-config/api.config.service");
const transaction_action_1 = require("../../entities/transaction.action");
const transaction_action_category_1 = require("../../entities/transaction.action.category");
const metabonding_week_1 = require("./entities/metabonding.week");
const moa_function_options_1 = require("./entities/moa.function.options");
let MetabondingActionRecognizerService = class MetabondingActionRecognizerService {
    constructor(apiConfigService) {
        this.apiConfigService = apiConfigService;
    }
    async recognize(metadata) {
        if (metadata.receiver !== this.apiConfigService.getMetabondingContractAddress()) {
            return undefined;
        }
        switch (metadata.functionName) {
            case moa_function_options_1.MoaFunction.claimRewards:
                return this.getClaimRewardsAction(metadata);
            default:
                return undefined;
        }
    }
    getClaimRewardsAction(metadata) {
        const args = metadata.functionArgs;
        if (!args) {
            return undefined;
        }
        const chunks = sdk_nestjs_common_1.BatchUtils.splitArrayIntoChunks(args, 4);
        const metabondingWeeks = [];
        for (const chunk of chunks) {
            const week = new metabonding_week_1.MetabondingWeek();
            week.week = sdk_nestjs_common_1.BinaryUtils.hexToNumber(chunk[0]);
            week.rewaStaked = sdk_nestjs_common_1.BinaryUtils.hexToBigInt(chunk[1]).toString();
            week.lkmoaStaked = sdk_nestjs_common_1.BinaryUtils.hexToBigInt(chunk[2]).toString();
            metabondingWeeks.push(week);
        }
        const result = new transaction_action_1.TransactionAction();
        result.name = moa_function_options_1.MoaFunction.claimRewards;
        result.category = transaction_action_category_1.TransactionActionCategory.moa;
        result.description = `Eligible stake for ${metabondingWeeks.map((week) => `week ${week.week}: REWA ${sdk_nestjs_common_1.NumberUtils.toDenominatedString(BigInt(week.rewaStaked))}, LKMOA ${sdk_nestjs_common_1.NumberUtils.toDenominatedString(BigInt(week.lkmoaStaked))}`).join('; ')}`;
        result.arguments = {
            weeks: metabondingWeeks,
            functionName: metadata.functionName,
            functionArgs: metadata.functionArgs,
        };
        return result;
    }
};
MetabondingActionRecognizerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService])
], MetabondingActionRecognizerService);
exports.MetabondingActionRecognizerService = MetabondingActionRecognizerService;
//# sourceMappingURL=moa.metabonding.action.recognizer.service.js.map