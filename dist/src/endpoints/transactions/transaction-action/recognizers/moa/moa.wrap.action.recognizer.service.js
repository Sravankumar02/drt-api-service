"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaWrapActionRecognizerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const dcdt_type_1 = require("../../../../dcdt/entities/dcdt.type");
const transaction_action_1 = require("../../entities/transaction.action");
const transaction_action_category_1 = require("../../entities/transaction.action.category");
const transaction_action_dcdt_nft_recognizer_service_1 = require("../dcdt/transaction.action.dcdt.nft.recognizer.service");
const moa_function_options_1 = require("./entities/moa.function.options");
const moa_settings_service_1 = require("../../../../moa/moa.settings.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
let MoaWrapActionRecognizerService = class MoaWrapActionRecognizerService {
    constructor(transactionActionDcdtNftRecognizerService, moaSettingsService) {
        this.transactionActionDcdtNftRecognizerService = transactionActionDcdtNftRecognizerService;
        this.moaSettingsService = moaSettingsService;
    }
    recognize(settings, metadata) {
        if (!settings.wrapContracts.includes(metadata.receiver)) {
            return undefined;
        }
        switch (metadata.functionName) {
            case moa_function_options_1.MoaFunction.wrapRewa:
                return this.getWrapAction(metadata);
            case moa_function_options_1.MoaFunction.unwrapRewa:
                return this.getUnwrapAction(metadata);
            default:
                return undefined;
        }
    }
    getWrapAction(metadata) {
        const wrewaId = this.moaSettingsService.getWrewaId();
        if (!wrewaId) {
            return undefined;
        }
        const valueDenominated = sdk_nestjs_common_1.NumberUtils.toDenominatedString(metadata.value);
        const result = new transaction_action_1.TransactionAction();
        result.category = transaction_action_category_1.TransactionActionCategory.moa;
        result.name = moa_function_options_1.MoaFunction.wrapRewa;
        result.description = `Wrap ${valueDenominated} REWA`;
        result.arguments = {
            token: {
                type: dcdt_type_1.DcdtType.FungibleDCDT,
                name: 'WrappedREWA',
                token: wrewaId,
                ticker: wrewaId.split('-')[0],
                decimals: 18,
                value: metadata.value.toString(),
            },
            receiver: metadata.receiver,
        };
        return result;
    }
    getUnwrapAction(metadata) {
        return this.transactionActionDcdtNftRecognizerService.getMultiTransferActionWithTicker(metadata, transaction_action_category_1.TransactionActionCategory.moa, moa_function_options_1.MoaFunction.unwrapRewa, 'Unwrap');
    }
};
MoaWrapActionRecognizerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [transaction_action_dcdt_nft_recognizer_service_1.TransactionActionDcdtNftRecognizerService,
        moa_settings_service_1.MoaSettingsService])
], MoaWrapActionRecognizerService);
exports.MoaWrapActionRecognizerService = MoaWrapActionRecognizerService;
//# sourceMappingURL=moa.wrap.action.recognizer.service.js.map