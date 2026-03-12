"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaPairActionRecognizerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const transaction_action_category_1 = require("../../entities/transaction.action.category");
const moa_function_options_1 = require("./entities/moa.function.options");
const token_transfer_service_1 = require("../../../../tokens/token.transfer.service");
const moa_settings_service_1 = require("../../../../moa/moa.settings.service");
const transaction_action_dcdt_nft_recognizer_service_1 = require("../dcdt/transaction.action.dcdt.nft.recognizer.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
let MoaPairActionRecognizerService = class MoaPairActionRecognizerService {
    constructor(moaSettingsService, tokenTransferService, transactionActionDcdtNftRecognizerService) {
        this.moaSettingsService = moaSettingsService;
        this.tokenTransferService = tokenTransferService;
        this.transactionActionDcdtNftRecognizerService = transactionActionDcdtNftRecognizerService;
    }
    async recognize(settings, metadata) {
        if (!settings.pairContracts.includes(metadata.receiver) && settings.routerFactoryContract !== metadata.receiver) {
            return undefined;
        }
        switch (metadata.functionName) {
            case moa_function_options_1.MoaFunction.swapTokensFixedInput:
            case moa_function_options_1.MoaFunction.swapTokensFixedOutput:
                return await this.getSwapAction(metadata);
            case moa_function_options_1.MoaFunction.addLiquidity:
            case moa_function_options_1.MoaFunction.addLiquidityProxy:
                return this.getAddLiquidityAction(metadata);
            case moa_function_options_1.MoaFunction.removeLiquidity:
            case moa_function_options_1.MoaFunction.removeLiquidityProxy:
                return this.getRemoveLiquidityAction(metadata);
            case moa_function_options_1.MoaFunction.multiPairSwap:
                return this.getMultiSwapAction(metadata);
            default:
                return undefined;
        }
    }
    async getSwapAction(metadata) {
        var _a;
        const transfers = this.moaSettingsService.getTransfers(metadata);
        if (!transfers) {
            return undefined;
        }
        const pair1Properties = transfers[0].properties;
        if (!pair1Properties) {
            return undefined;
        }
        const value = transfers[0].value;
        const valueDenominated = sdk_nestjs_common_1.NumberUtils.toDenominatedString(value, pair1Properties.decimals);
        const destinationTokenIdentifier = sdk_nestjs_common_1.BinaryUtils.hexToString(metadata.functionArgs[0]);
        const destinationValue = sdk_nestjs_common_1.BinaryUtils.hexToBigInt(metadata.functionArgs[1]);
        const pair2Properties = await this.tokenTransferService.getTokenTransferProperties({ identifier: destinationTokenIdentifier });
        if (!pair2Properties) {
            return undefined;
        }
        const destinationValueDenominated = sdk_nestjs_common_1.NumberUtils.toDenominatedString(destinationValue, pair2Properties.decimals);
        (_a = metadata.transfers) === null || _a === void 0 ? void 0 : _a.push({
            value: destinationValue,
            properties: pair2Properties,
        });
        let description = `Swap ${valueDenominated} ${pair1Properties.ticker} for a minimum of ${destinationValueDenominated} ${pair2Properties.ticker}`;
        if (metadata.functionName === moa_function_options_1.MoaFunction.swapTokensFixedOutput) {
            description = `Swap a maximum of ${valueDenominated} ${pair1Properties.ticker} for ${destinationValueDenominated} ${pair2Properties.ticker}`;
        }
        return this.transactionActionDcdtNftRecognizerService.getMultiTransferAction(metadata, transaction_action_category_1.TransactionActionCategory.moa, 'swap', description);
    }
    async getMultiSwapAction(metadata) {
        var _a;
        const transfers = this.moaSettingsService.getTransfers(metadata);
        if (!transfers) {
            return undefined;
        }
        const pair1Properties = transfers[0].properties;
        if (!pair1Properties) {
            return undefined;
        }
        const pair1Value = transfers[0].value;
        const pair1ValueDenominated = sdk_nestjs_common_1.NumberUtils.toDenominatedString(pair1Value, pair1Properties.decimals);
        const numberOrArgumentsForOneSwap = 4;
        const numberOfSwaps = metadata.functionArgs.length / numberOrArgumentsForOneSwap;
        const swaps = [{
                properties: pair1Properties,
                value: pair1Value,
                denominatedValue: pair1ValueDenominated,
            }];
        for (let i = 0; i < numberOfSwaps; i++) {
            const tokenIdentifier = sdk_nestjs_common_1.BinaryUtils.hexToString(metadata.functionArgs[i * numberOrArgumentsForOneSwap + 2]);
            const value = sdk_nestjs_common_1.BinaryUtils.hexToBigInt(metadata.functionArgs[i * numberOrArgumentsForOneSwap + 3]);
            const pairProperties = await this.tokenTransferService.getTokenTransferProperties({ identifier: tokenIdentifier });
            if (!pairProperties) {
                return undefined;
            }
            const denominatedValue = sdk_nestjs_common_1.NumberUtils.toDenominatedString(value, pairProperties.decimals);
            (_a = metadata.transfers) === null || _a === void 0 ? void 0 : _a.push({
                value: value,
                properties: pairProperties,
            });
            swaps.push({
                denominatedValue,
                value,
                properties: pairProperties,
            });
        }
        const firstSwap = swaps[0];
        const lastSwap = swaps[swaps.length - 1];
        const intermediateSwaps = swaps.slice(1, swaps.length - 1);
        const description = `Swap ${firstSwap.denominatedValue} ${firstSwap.properties.ticker} for a minimum of ${lastSwap.denominatedValue} ${lastSwap.properties.ticker} with intermediate pair(s) ${intermediateSwaps.map(s => s.properties.ticker).join(', ')}`;
        return this.transactionActionDcdtNftRecognizerService.getMultiTransferAction(metadata, transaction_action_category_1.TransactionActionCategory.moa, 'multiSwap', description);
    }
    getAddLiquidityAction(metadata) {
        return this.transactionActionDcdtNftRecognizerService.getMultiTransferActionWithTicker(metadata, transaction_action_category_1.TransactionActionCategory.moa, moa_function_options_1.MoaFunction.addLiquidity, 'Added liquidity for');
    }
    getRemoveLiquidityAction(metadata) {
        return this.transactionActionDcdtNftRecognizerService.getMultiTransferActionWithTicker(metadata, transaction_action_category_1.TransactionActionCategory.moa, moa_function_options_1.MoaFunction.removeLiquidity, 'Removed liquidity with');
    }
};
MoaPairActionRecognizerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => token_transfer_service_1.TokenTransferService))),
    tslib_1.__metadata("design:paramtypes", [moa_settings_service_1.MoaSettingsService,
        token_transfer_service_1.TokenTransferService,
        transaction_action_dcdt_nft_recognizer_service_1.TransactionActionDcdtNftRecognizerService])
], MoaPairActionRecognizerService);
exports.MoaPairActionRecognizerService = MoaPairActionRecognizerService;
//# sourceMappingURL=moa.pair.action.recognizer.service.js.map