"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionActionDcdtNftRecognizerService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../../../../common/api-config/api.config.service");
const dcdt_type_1 = require("../../../../dcdt/entities/dcdt.type");
const token_transfer_service_1 = require("../../../../tokens/token.transfer.service");
const transaction_action_1 = require("../../entities/transaction.action");
const transaction_action_category_1 = require("../../entities/transaction.action.category");
let TransactionActionDcdtNftRecognizerService = class TransactionActionDcdtNftRecognizerService {
    constructor(apiConfigService, tokenTransferService) {
        this.apiConfigService = apiConfigService;
        this.tokenTransferService = tokenTransferService;
    }
    async recognize(metadata) {
        var _a, _b;
        return (_b = (_a = this.recognizeTransfer(metadata)) !== null && _a !== void 0 ? _a : await this.recognizeFreeze(metadata)) !== null && _b !== void 0 ? _b : await this.recognizeBurn(metadata);
    }
    async recognizeFreeze(metadata) {
        if (!metadata || metadata.functionName !== 'freeze' || metadata.receiver !== this.apiConfigService.getDcdtContractAddress()) {
            return undefined;
        }
        const tokenIdentifier = sdk_nestjs_common_1.BinaryUtils.hexToString(metadata.functionArgs[0]);
        const tokenProperties = await this.tokenTransferService.getTokenTransferProperties({ identifier: tokenIdentifier });
        if (!tokenProperties) {
            return undefined;
        }
        if (!sdk_nestjs_common_1.AddressUtils.isValidHexAddress(metadata.functionArgs[1])) {
            return undefined;
        }
        const address = sdk_nestjs_common_1.AddressUtils.bech32Encode(metadata.functionArgs[1]);
        const result = new transaction_action_1.TransactionAction();
        result.category = transaction_action_category_1.TransactionActionCategory.dcdtNft;
        result.name = 'freeze';
        result.description = `Freezed token ${tokenIdentifier} balance for address ${address}`;
        result.arguments = {
            address,
            token: Object.assign({}, tokenProperties),
        };
        return result;
    }
    async recognizeBurn(metadata) {
        if (!metadata || metadata.functionName !== 'DCDTNFTBurn') {
            return undefined;
        }
        const identifier = sdk_nestjs_common_1.BinaryUtils.hexToString(metadata.functionArgs[0]);
        const value = sdk_nestjs_common_1.BinaryUtils.hexToNumber(metadata.functionArgs[2]);
        const nonce = metadata.functionArgs[1];
        const tokenProperties = await this.tokenTransferService.getTokenTransferProperties({ identifier });
        if (!tokenProperties) {
            return undefined;
        }
        const result = new transaction_action_1.TransactionAction();
        result.category = transaction_action_category_1.TransactionActionCategory.dcdtNft;
        result.name = 'burn';
        result.description = `Burned token ${identifier}`;
        result.arguments = {
            token: Object.assign(Object.assign({}, tokenProperties), { identifier: `${identifier}-${nonce}`, value: value }),
        };
        return result;
    }
    recognizeTransfer(metadata) {
        return this.getMultiTransferAction(metadata, transaction_action_category_1.TransactionActionCategory.dcdtNft, 'transfer', 'Transfer');
    }
    getMultiTransferActionWithTicker(metadata, category, name, action) {
        const multiTransfers = metadata.transfers;
        if (!multiTransfers) {
            return undefined;
        }
        const description = `${action} ${multiTransfers.map(x => { var _a, _b; return `${sdk_nestjs_common_1.NumberUtils.toDenominatedString(x.value, (_a = x.properties) === null || _a === void 0 ? void 0 : _a.decimals)} ${(_b = x.properties) === null || _b === void 0 ? void 0 : _b.ticker}`; }).filter(x => x !== undefined).join(', ')}`;
        return this.getMultiTransferAction(metadata, category, name, description);
    }
    getMultiTransferActionWithFullDescription(metadata, category, name, action) {
        const multiTransfers = metadata.transfers;
        if (!multiTransfers) {
            return undefined;
        }
        const description = `${action} ${multiTransfers.map(x => this.getMultiTransferDescription(x)).filter(x => x !== undefined).join(', ')} to ${metadata.receiver}`;
        return this.getMultiTransferAction(metadata, category, name, description);
    }
    getMultiTransferAction(metadata, category, name, description) {
        const multiTransfers = metadata.transfers;
        if (!multiTransfers) {
            return undefined;
        }
        const result = new transaction_action_1.TransactionAction();
        result.category = category;
        result.name = name;
        result.description = description;
        result.arguments = {
            transfers: multiTransfers.map(x => this.getNftTransferDetails(x)).filter(x => x !== undefined),
            receiver: metadata.receiver,
            functionName: metadata.functionName && sdk_nestjs_common_1.StringUtils.isFunctionName(metadata.functionName) ? metadata.functionName : undefined,
            functionArgs: metadata.functionArgs && metadata.functionArgs.every(x => sdk_nestjs_common_1.StringUtils.isHex(x)) ? metadata.functionArgs : undefined,
        };
        return result;
    }
    getNftTransferDetails(transfer) {
        const properties = transfer.properties;
        if (properties) {
            return Object.assign(Object.assign({}, properties), { value: transfer.value.toString() });
        }
        return undefined;
    }
    getMultiTransferDescription(transfer) {
        const properties = transfer.properties;
        if (!properties) {
            return undefined;
        }
        if (properties.type === 'FungibleDCDT') {
            return this.getTokenTransferDescription(properties, transfer.value);
        }
        else {
            return this.getNftTransferDescription(properties, transfer.value);
        }
    }
    getTokenTransferDescription(properties, value) {
        const denominatedValue = sdk_nestjs_common_1.NumberUtils.toDenominatedString(value, properties.decimals);
        return `${denominatedValue} ${properties.name} (${properties.ticker})`;
    }
    getNftTransferDescription(properties, value) {
        switch (properties.type) {
            case dcdt_type_1.DcdtType.MetaDCDT:
                const denominatedValue = sdk_nestjs_common_1.NumberUtils.toDenominatedString(value, properties.decimals);
                return `${denominatedValue} ${properties.name} (${properties.identifier})`;
            case dcdt_type_1.DcdtType.NonFungibleDCDT:
                return `NFT of collection ${properties.name} (${properties.identifier})`;
            case dcdt_type_1.DcdtType.SemiFungibleDCDT:
                return `quantity ${value.toString()} for NFT of collection ${properties.name} (${properties.identifier})`;
            default:
                return 'Unknown';
        }
    }
};
TransactionActionDcdtNftRecognizerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => token_transfer_service_1.TokenTransferService))),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        token_transfer_service_1.TokenTransferService])
], TransactionActionDcdtNftRecognizerService);
exports.TransactionActionDcdtNftRecognizerService = TransactionActionDcdtNftRecognizerService;
//# sourceMappingURL=transaction.action.dcdt.nft.recognizer.service.js.map