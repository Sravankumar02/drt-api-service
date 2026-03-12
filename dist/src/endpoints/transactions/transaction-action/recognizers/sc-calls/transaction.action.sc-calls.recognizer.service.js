"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCCallActionRecognizerService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const transaction_action_1 = require("../../entities/transaction.action");
const transaction_action_category_1 = require("../../entities/transaction.action.category");
let SCCallActionRecognizerService = class SCCallActionRecognizerService {
    constructor() {
        this.builtInSelfFunctions = [
            'DCDTLocalMint',
            'DCDTLocalBurn',
            'DCDTNFTCreate',
            'DCDTNFTAddQuantity',
            'DCDTNFTAddURI',
            'DCDTNFTUpdateAttributes',
            'SaveKeyValue',
        ];
    }
    async recognize(metadata) {
        var _a;
        return (_a = this.getSCDeployAction(metadata)) !== null && _a !== void 0 ? _a : this.getSCCallAction(metadata);
    }
    getSCDeployAction(metadata) {
        if (metadata.receiver !== 'drt1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq85hk5z') {
            return undefined;
        }
        const result = new transaction_action_1.TransactionAction();
        result.category = transaction_action_category_1.TransactionActionCategory.scCall;
        result.name = 'deploy';
        result.description = 'Smart contract deployment';
        return result;
    }
    getSCCallAction(metadata) {
        if (!this.isSmartContractCall(metadata)) {
            return undefined;
        }
        if (!metadata.functionName) {
            return undefined;
        }
        const result = new transaction_action_1.TransactionAction();
        result.category = transaction_action_category_1.TransactionActionCategory.scCall;
        if (metadata.functionName) {
            result.name = metadata.functionName;
        }
        return result;
    }
    isSmartContractCall(metadata) {
        return sdk_nestjs_common_1.AddressUtils.isSmartContractAddress(metadata.receiver) || this.isSelfBuiltInFunctionCall(metadata);
    }
    isSelfBuiltInFunctionCall(metadata) {
        var _a;
        return metadata.sender === metadata.receiver && this.builtInSelfFunctions.includes((_a = metadata.functionName) !== null && _a !== void 0 ? _a : '');
    }
};
SCCallActionRecognizerService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], SCCallActionRecognizerService);
exports.SCCallActionRecognizerService = SCCallActionRecognizerService;
//# sourceMappingURL=transaction.action.sc-calls.recognizer.service.js.map