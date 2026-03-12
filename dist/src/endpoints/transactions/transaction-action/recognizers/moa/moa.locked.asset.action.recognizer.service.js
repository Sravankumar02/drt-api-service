"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaLockedAssetActionRecognizerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const transaction_action_category_1 = require("../../entities/transaction.action.category");
const transaction_action_dcdt_nft_recognizer_service_1 = require("../dcdt/transaction.action.dcdt.nft.recognizer.service");
const moa_function_options_1 = require("./entities/moa.function.options");
const moa_settings_service_1 = require("../../../../moa/moa.settings.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
let MoaLockedAssetActionRecognizerService = class MoaLockedAssetActionRecognizerService {
    constructor(moaSettingsService, transactionActionDcdtNftRecognizerService) {
        this.moaSettingsService = moaSettingsService;
        this.transactionActionDcdtNftRecognizerService = transactionActionDcdtNftRecognizerService;
    }
    recognize(settings, metadata) {
        if (metadata.receiver !== settings.lockedAssetContract) {
            return undefined;
        }
        switch (metadata.functionName) {
            case moa_function_options_1.MoaFunction.lockAssets:
                return this.getAssetsAction(metadata, 'Lock');
            case moa_function_options_1.MoaFunction.unlockAssets:
                const action = this.getAssetsAction(metadata, 'Unlock');
                if (action) {
                    action.description = 'Unlock assets';
                }
                return action;
            case moa_function_options_1.MoaFunction.mergeLockedAssetTokens:
                return this.getMergeLockedAssetTokens(metadata);
            default:
                return undefined;
        }
    }
    getMergeLockedAssetTokens(metadata) {
        const transfers = this.moaSettingsService.getTransfers(metadata);
        if (!transfers) {
            return undefined;
        }
        const value = transfers.sumBigInt(x => BigInt(x.value.toString()));
        const valueDenominated = sdk_nestjs_common_1.NumberUtils.toDenominatedString(value);
        const description = `Merge ${transfers.length} LKMOA positions into a single LKMOA position of value ${valueDenominated}`;
        return this.transactionActionDcdtNftRecognizerService.getMultiTransferAction(metadata, transaction_action_category_1.TransactionActionCategory.moa, moa_function_options_1.MoaFunction.mergeLockedAssetTokens, description);
    }
    getAssetsAction(metadata, action) {
        var _a;
        return this.transactionActionDcdtNftRecognizerService.getMultiTransferActionWithTicker(metadata, transaction_action_category_1.TransactionActionCategory.moa, (_a = metadata.functionName) !== null && _a !== void 0 ? _a : '', action);
    }
};
MoaLockedAssetActionRecognizerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [moa_settings_service_1.MoaSettingsService,
        transaction_action_dcdt_nft_recognizer_service_1.TransactionActionDcdtNftRecognizerService])
], MoaLockedAssetActionRecognizerService);
exports.MoaLockedAssetActionRecognizerService = MoaLockedAssetActionRecognizerService;
//# sourceMappingURL=moa.locked.asset.action.recognizer.service.js.map