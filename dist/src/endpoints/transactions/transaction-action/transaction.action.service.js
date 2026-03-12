"use strict";
var TransactionActionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionActionService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const transaction_1 = require("../entities/transaction");
const transaction_metadata_1 = require("./entities/transaction.metadata");
const transaction_action_moa_recognizer_service_1 = require("./recognizers/moa/transaction.action.moa.recognizer.service");
const transaction_action_stake_recognizer_service_1 = require("./recognizers/staking/transaction.action.stake.recognizer.service");
const transaction_action_sc_calls_recognizer_service_1 = require("./recognizers/sc-calls/transaction.action.sc-calls.recognizer.service");
const transaction_action_dcdt_nft_recognizer_service_1 = require("./recognizers/dcdt/transaction.action.dcdt.nft.recognizer.service");
const token_transfer_service_1 = require("../../tokens/token.transfer.service");
const transaction_type_1 = require("../entities/transaction.type");
const moa_metabonding_action_recognizer_service_1 = require("./recognizers/moa/moa.metabonding.action.recognizer.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_common_2 = require("@sravankumar02/sdk-nestjs-common");
let TransactionActionService = TransactionActionService_1 = class TransactionActionService {
    constructor(moaRecognizer, dcdtNftRecognizer, stakeRecognizer, scCallRecognizer, tokenTransferService, metabondingRecognizer) {
        this.moaRecognizer = moaRecognizer;
        this.dcdtNftRecognizer = dcdtNftRecognizer;
        this.stakeRecognizer = stakeRecognizer;
        this.scCallRecognizer = scCallRecognizer;
        this.tokenTransferService = tokenTransferService;
        this.metabondingRecognizer = metabondingRecognizer;
        this.recognizers = [];
        this.logger = new sdk_nestjs_common_2.OriginLogger(TransactionActionService_1.name);
    }
    async getRecognizers() {
        if (this.recognizers.length === 0) {
            const isMoaActive = await this.moaRecognizer.isActive();
            if (isMoaActive) {
                this.recognizers.push(this.moaRecognizer);
            }
            this.recognizers.push(this.metabondingRecognizer);
            this.recognizers.push(this.dcdtNftRecognizer);
            this.recognizers.push(this.stakeRecognizer);
            this.recognizers.push(this.scCallRecognizer);
        }
        return this.recognizers;
    }
    async getTransactionAction(transaction, applyValue = false) {
        const metadata = await this.getTransactionMetadata(transaction, applyValue);
        const recognizers = await this.getRecognizers();
        for (const recognizer of recognizers) {
            const action = await recognizer.recognize(metadata);
            if (action !== undefined) {
                return action;
            }
        }
        return undefined;
    }
    async getTransactionMetadata(transaction, applyValue = false) {
        const metadata = this.getNormalTransactionMetadata(transaction);
        const dcdtMetadata = await this.getDcdtTransactionMetadata(metadata, applyValue);
        if (dcdtMetadata) {
            return dcdtMetadata;
        }
        const nftMetadata = await this.getNftTransferMetadata(metadata);
        if (nftMetadata) {
            return nftMetadata;
        }
        const multiMetadata = await this.getMultiTransferMetadata(metadata, applyValue);
        if (multiMetadata) {
            return multiMetadata;
        }
        return metadata;
    }
    getNormalTransactionMetadata(transaction) {
        const metadata = new transaction_metadata_1.TransactionMetadata();
        metadata.sender = transaction.sender;
        metadata.receiver = transaction.receiver;
        metadata.timestamp = transaction.timestamp;
        metadata.value = BigInt(transaction.value);
        if (transaction.data) {
            const decodedData = sdk_nestjs_common_1.BinaryUtils.base64Decode(transaction.data);
            const dataComponents = decodedData.split('@');
            const args = dataComponents.slice(1);
            if (args.every(x => this.isSmartContractArgument(x))) {
                metadata.functionName = dataComponents[0];
                metadata.functionArgs = args;
            }
            if (metadata.functionName === 'relayedTx' && metadata.functionArgs.length === 1) {
                try {
                    const relayedTransaction = JSON.parse(sdk_nestjs_common_1.BinaryUtils.hexToString(metadata.functionArgs[0]));
                    relayedTransaction.value = relayedTransaction.value.toString();
                    relayedTransaction.sender = sdk_nestjs_common_1.AddressUtils.bech32Encode(sdk_nestjs_common_1.BinaryUtils.base64ToHex(relayedTransaction.sender));
                    relayedTransaction.receiver = sdk_nestjs_common_1.AddressUtils.bech32Encode(sdk_nestjs_common_1.BinaryUtils.base64ToHex(relayedTransaction.receiver));
                    return this.getNormalTransactionMetadata(relayedTransaction);
                }
                catch (error) {
                    this.logger.error(`Unhandled error when interpreting relayed transaction with hash '${transaction.txHash}'`);
                    this.logger.error(error);
                }
            }
            if (metadata.functionName === 'relayedTxV2' && metadata.functionArgs.length === 4) {
                try {
                    const relayedTransaction = new transaction_1.Transaction();
                    relayedTransaction.sender = transaction.receiver;
                    relayedTransaction.receiver = sdk_nestjs_common_1.AddressUtils.bech32Encode(metadata.functionArgs[0]);
                    relayedTransaction.data = sdk_nestjs_common_1.BinaryUtils.base64Encode(sdk_nestjs_common_1.BinaryUtils.hexToString(metadata.functionArgs[2]));
                    relayedTransaction.value = '0';
                    return this.getNormalTransactionMetadata(relayedTransaction);
                }
                catch (error) {
                    this.logger.error(`Unhandled error when interpreting relayed transaction v2 with hash '${transaction.txHash}'`);
                    this.logger.error(error);
                }
            }
        }
        try {
            if (transaction.type === transaction_type_1.TransactionType.SmartContractResult) {
                if (metadata.functionName === 'MultiDCDTNFTTransfer' &&
                    metadata.functionArgs.length > 0) {
                    if (metadata.functionArgs[0].length <= 4) {
                        metadata.functionArgs.splice(0, 0, sdk_nestjs_common_1.AddressUtils.bech32Decode(metadata.receiver));
                    }
                    metadata.receiver = metadata.sender;
                }
                if (metadata.functionName === 'DCDTNFTTransfer' &&
                    metadata.functionArgs.length > 3) {
                    metadata.functionArgs[3] = sdk_nestjs_common_1.AddressUtils.bech32Decode(metadata.receiver);
                    metadata.receiver = metadata.sender;
                }
            }
        }
        catch (error) {
            this.logger.error(`Unhandled error when interpreting MultiDCDTNFTTransfer / DCDTNFTTransfer for smart contract result with hash '${transaction.txHash}'`);
            this.logger.error(error);
        }
        return metadata;
    }
    isSmartContractArgument(arg) {
        if (!sdk_nestjs_common_1.StringUtils.isHex(arg)) {
            return false;
        }
        if (arg.length % 2 !== 0) {
            return false;
        }
        return true;
    }
    async getMultiTransferMetadata(metadata, applyValue = false) {
        if (metadata.sender !== metadata.receiver) {
            return undefined;
        }
        if (metadata.functionName !== 'MultiDCDTNFTTransfer') {
            return undefined;
        }
        const args = metadata.functionArgs;
        if (args.length < 3) {
            return undefined;
        }
        if (!sdk_nestjs_common_1.AddressUtils.isValidHexAddress(args[0])) {
            return undefined;
        }
        const receiver = sdk_nestjs_common_1.AddressUtils.bech32Encode(args[0]);
        const transferCount = sdk_nestjs_common_1.BinaryUtils.hexToNumber(args[1]);
        const result = new transaction_metadata_1.TransactionMetadata();
        if (!result.transfers) {
            result.transfers = [];
        }
        let index = 2;
        for (let i = 0; i < transferCount; i++) {
            const identifier = sdk_nestjs_common_1.BinaryUtils.hexToString(args[index++]);
            const nonce = args[index++];
            const value = this.parseValueFromMultiTransferValueArg(args[index++]);
            if (nonce && nonce !== "00") {
                const properties = await this.tokenTransferService.getTokenTransferProperties({ identifier, nonce });
                if (properties) {
                    result.transfers.push({
                        value,
                        properties,
                    });
                }
            }
            else {
                const properties = await this.tokenTransferService.getTokenTransferProperties({ identifier, timestamp: metadata.timestamp, value: value.toString(), applyValue });
                if (properties) {
                    result.transfers.push({
                        value,
                        properties,
                    });
                }
            }
        }
        result.sender = metadata.sender;
        result.receiver = receiver;
        if (args.length > index) {
            result.functionName = sdk_nestjs_common_1.BinaryUtils.hexToString(args[index++]);
            result.functionArgs = args.slice(index++);
        }
        return result;
    }
    parseValueFromMultiTransferValueArg(rawData) {
        if (rawData.length > 64) {
            const valueLength = sdk_nestjs_common_1.BinaryUtils.hexToNumber(rawData.slice(6, 8));
            const valueStartPosition = 8;
            const valueEndPosition = 8 + (valueLength * 2);
            return sdk_nestjs_common_1.BinaryUtils.hexToBigInt(rawData.slice(valueStartPosition, valueEndPosition));
        }
        return sdk_nestjs_common_1.BinaryUtils.hexToBigInt(rawData);
    }
    async getNftTransferMetadata(metadata) {
        if (metadata.sender !== metadata.receiver) {
            return undefined;
        }
        if (metadata.functionName !== 'DCDTNFTTransfer') {
            return undefined;
        }
        const args = metadata.functionArgs;
        if (args.length < 4) {
            return undefined;
        }
        if (!sdk_nestjs_common_1.AddressUtils.isValidHexAddress(args[3])) {
            return undefined;
        }
        const collectionIdentifier = sdk_nestjs_common_1.BinaryUtils.hexToString(args[0]);
        const nonce = args[1];
        const value = sdk_nestjs_common_1.BinaryUtils.hexToBigInt(args[2]);
        const receiver = sdk_nestjs_common_1.AddressUtils.bech32Encode(args[3]);
        const properties = await this.tokenTransferService.getTokenTransferProperties({ identifier: collectionIdentifier, nonce });
        if (!properties) {
            return undefined;
        }
        const result = new transaction_metadata_1.TransactionMetadata();
        result.sender = metadata.sender;
        result.receiver = receiver;
        result.value = value;
        if (args.length > 4) {
            result.functionName = sdk_nestjs_common_1.BinaryUtils.hexToString(args[4]);
            result.functionArgs = args.slice(5);
        }
        result.transfers = [{
                value,
                properties,
            }];
        return result;
    }
    async getDcdtTransactionMetadata(metadata, applyValue = false) {
        if (metadata.functionName !== 'DCDTTransfer') {
            return undefined;
        }
        const args = metadata.functionArgs;
        if (args.length < 2) {
            return undefined;
        }
        const tokenIdentifier = sdk_nestjs_common_1.BinaryUtils.hexToString(args[0]);
        const value = sdk_nestjs_common_1.BinaryUtils.hexToBigInt(args[1]);
        const properties = await this.tokenTransferService.getTokenTransferProperties({ identifier: tokenIdentifier, timestamp: metadata.timestamp, value: value.toString(), applyValue });
        if (!properties) {
            return undefined;
        }
        const result = new transaction_metadata_1.TransactionMetadata();
        result.sender = metadata.sender;
        result.receiver = metadata.receiver;
        if (args.length > 2) {
            result.functionName = sdk_nestjs_common_1.BinaryUtils.hexToString(args[2]);
            result.functionArgs = args.slice(3);
        }
        result.transfers = [{
                value,
                properties,
            }];
        result.value = metadata.value;
        return result;
    }
};
TransactionActionService = TransactionActionService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => token_transfer_service_1.TokenTransferService))),
    tslib_1.__metadata("design:paramtypes", [transaction_action_moa_recognizer_service_1.TransactionActionMoaRecognizerService,
        transaction_action_dcdt_nft_recognizer_service_1.TransactionActionDcdtNftRecognizerService,
        transaction_action_stake_recognizer_service_1.StakeActionRecognizerService,
        transaction_action_sc_calls_recognizer_service_1.SCCallActionRecognizerService,
        token_transfer_service_1.TokenTransferService,
        moa_metabonding_action_recognizer_service_1.MetabondingActionRecognizerService])
], TransactionActionService);
exports.TransactionActionService = TransactionActionService;
//# sourceMappingURL=transaction.action.service.js.map