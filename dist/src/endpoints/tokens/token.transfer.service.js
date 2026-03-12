"use strict";
var TokenTransferService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenTransferService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const cache_info_1 = require("../../utils/cache.info");
const dcdt_service_1 = require("../dcdt/dcdt.service");
const assets_service_1 = require("../../common/assets/assets.service");
const transaction_log_event_identifier_1 = require("../transactions/entities/transaction.log.event.identifier");
const transaction_operation_1 = require("../transactions/entities/transaction.operation");
const transaction_operation_action_1 = require("../transactions/entities/transaction.operation.action");
const transaction_operation_type_1 = require("../transactions/entities/transaction.operation.type");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_2 = require("@sravankumar02/sdk-nestjs-common");
const data_api_service_1 = require("../../common/data-api/data-api.service");
const bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
const dcdt_type_1 = require("../dcdt/entities/dcdt.type");
let TokenTransferService = TokenTransferService_1 = class TokenTransferService {
    constructor(cachingService, dcdtService, assetsService, dataApiService) {
        this.cachingService = cachingService;
        this.dcdtService = dcdtService;
        this.assetsService = assetsService;
        this.dataApiService = dataApiService;
        this.logger = new sdk_nestjs_common_2.OriginLogger(TokenTransferService_1.name);
    }
    getTokenTransfer(elasticTransaction) {
        if (!elasticTransaction.data) {
            return undefined;
        }
        const tokens = elasticTransaction.tokens;
        if (!tokens || tokens.length === 0) {
            return undefined;
        }
        const dcdtValues = elasticTransaction.dcdtValues;
        if (!dcdtValues || dcdtValues.length === 0) {
            return undefined;
        }
        const decodedData = sdk_nestjs_common_1.BinaryUtils.base64Decode(elasticTransaction.data);
        if (!decodedData.startsWith('DCDTTransfer@')) {
            return undefined;
        }
        const token = tokens[0];
        const dcdtValue = dcdtValues[0];
        return { tokenIdentifier: token, tokenAmount: dcdtValue };
    }
    async getTokenTransferPropertiesFromLogs(logs) {
        const identifiers = [];
        for (const log of logs) {
            for (const event of log.events) {
                const action = this.getOperationDcdtActionByEventIdentifier(event.identifier);
                if (action) {
                    identifiers.push(sdk_nestjs_common_1.BinaryUtils.base64Decode(event.topics[0]));
                }
                if (event.identifier === transaction_log_event_identifier_1.TransactionLogEventIdentifier.MultiDCDTNFTTransfer) {
                    for (let i = 1; i < (event.topics.length - 1) / 3; i++) {
                        identifiers.push(sdk_nestjs_common_1.BinaryUtils.base64Decode(event.topics[i * 3]));
                    }
                }
            }
        }
        const tokenProperties = {};
        await this.cachingService.batchApplyAll(identifiers, identifier => cache_info_1.CacheInfo.TokenTransferProperties(identifier).key, identifier => this.getTokenTransferPropertiesRaw(identifier), (identifier, value) => tokenProperties[identifier] = value, cache_info_1.CacheInfo.TokenTransferProperties('').ttl);
        return tokenProperties;
    }
    async getOperationsForTransaction(transaction, logs) {
        var _a;
        const scResultsOperations = this.getOperationsForTransactionScResults((_a = transaction.results) !== null && _a !== void 0 ? _a : []);
        const logsOperations = await this.getOperationsForTransactionLogs(transaction.txHash, logs, transaction.sender);
        return [...scResultsOperations, ...logsOperations];
    }
    getOperationsForTransactionScResults(scResults) {
        if (!scResults.length) {
            return [];
        }
        const operations = [];
        for (const scResult of scResults) {
            if (scResult.nonce !== 0 || scResult.value === undefined || scResult.value === '0') {
                continue;
            }
            const operation = new transaction_operation_1.TransactionOperation();
            operation.action = transaction_operation_action_1.TransactionOperationAction.transfer;
            operation.type = transaction_operation_type_1.TransactionOperationType.rewa;
            operation.id = scResult.hash;
            operation.sender = scResult.sender;
            operation.receiver = scResult.receiver;
            operation.value = scResult.value;
            operations.push(operation);
        }
        return operations;
    }
    async getOperationsForTransactionLogs(txHash, logs, sender) {
        if (!logs.length) {
            return [];
        }
        const tokensProperties = await this.getTokenTransferPropertiesFromLogs(logs);
        const operations = [];
        for (const log of logs) {
            for (const event of log.events) {
                let operation;
                if (event.identifier === transaction_operation_action_1.TransactionOperationAction.writeLog || event.identifier === transaction_operation_action_1.TransactionOperationAction.signalError) {
                    operation = this.getTransactionLogOperation(log, event, event.identifier, sender);
                }
                else if (event.identifier === transaction_operation_action_1.TransactionOperationAction.transferValueOnly) {
                    operation = this.getTransactionTransferValueOperation(txHash, log, event, event.identifier);
                }
                if (!operation) {
                    const action = this.getOperationDcdtActionByEventIdentifier(event.identifier);
                    if (action) {
                        if (event.identifier === transaction_log_event_identifier_1.TransactionLogEventIdentifier.MultiDCDTNFTTransfer) {
                            const multiDCDTNFTOperations = this.getTransactionMultiDCDTNFTOperations(txHash, log, event.address, event.topics, action, tokensProperties);
                            operations.push(...multiDCDTNFTOperations);
                        }
                        else {
                            operation = this.getTransactionNftOperation(txHash, log, event.address, event.topics, action, tokensProperties);
                        }
                    }
                }
                if (operation) {
                    operation.additionalData = event.additionalData;
                    operations.push(operation);
                }
            }
        }
        return operations;
    }
    getTransactionLogOperation(log, event, action, receiver) {
        var _a;
        const operation = new transaction_operation_1.TransactionOperation();
        operation.id = (_a = log.id) !== null && _a !== void 0 ? _a : '';
        operation.action = action;
        if (action === transaction_operation_action_1.TransactionOperationAction.writeLog) {
            operation.type = transaction_operation_type_1.TransactionOperationType.log;
        }
        if (action === transaction_operation_action_1.TransactionOperationAction.signalError) {
            operation.type = transaction_operation_type_1.TransactionOperationType.error;
        }
        operation.sender = event.address;
        operation.receiver = receiver;
        if (event.data) {
            operation.data = sdk_nestjs_common_1.BinaryUtils.base64Decode(event.data);
        }
        if (event.topics && event.topics.length > 1 && event.topics[1]) {
            operation.message = sdk_nestjs_common_1.BinaryUtils.base64Decode(event.topics[1]);
        }
        return operation;
    }
    getOperationDcdtActionByEventIdentifier(identifier) {
        switch (identifier) {
            case transaction_log_event_identifier_1.TransactionLogEventIdentifier.DCDTNFTTransfer:
                return transaction_operation_action_1.TransactionOperationAction.transfer;
            case transaction_log_event_identifier_1.TransactionLogEventIdentifier.DCDTNFTBurn:
                return transaction_operation_action_1.TransactionOperationAction.burn;
            case transaction_log_event_identifier_1.TransactionLogEventIdentifier.DCDTNFTAddQuantity:
                return transaction_operation_action_1.TransactionOperationAction.addQuantity;
            case transaction_log_event_identifier_1.TransactionLogEventIdentifier.DCDTNFTCreate:
                return transaction_operation_action_1.TransactionOperationAction.create;
            case transaction_log_event_identifier_1.TransactionLogEventIdentifier.MultiDCDTNFTTransfer:
                return transaction_operation_action_1.TransactionOperationAction.transfer;
            case transaction_log_event_identifier_1.TransactionLogEventIdentifier.DCDTTransfer:
                return transaction_operation_action_1.TransactionOperationAction.transfer;
            case transaction_log_event_identifier_1.TransactionLogEventIdentifier.DCDTBurn:
                return transaction_operation_action_1.TransactionOperationAction.burn;
            case transaction_log_event_identifier_1.TransactionLogEventIdentifier.DCDTLocalMint:
                return transaction_operation_action_1.TransactionOperationAction.localMint;
            case transaction_log_event_identifier_1.TransactionLogEventIdentifier.DCDTLocalBurn:
                return transaction_operation_action_1.TransactionOperationAction.localBurn;
            case transaction_log_event_identifier_1.TransactionLogEventIdentifier.DCDTWipe:
                return transaction_operation_action_1.TransactionOperationAction.wipe;
            case transaction_log_event_identifier_1.TransactionLogEventIdentifier.DCDTFreeze:
                return transaction_operation_action_1.TransactionOperationAction.freeze;
            default:
                return null;
        }
    }
    getTransactionMultiDCDTNFTOperations(txHash, log, address, topics, action, tokensProperties) {
        const operations = [];
        const receiverTopic = topics.last();
        for (let i = 0; i < (topics.length - 1) / 3; i++) {
            const eventTopics = [
                topics[i * 3],
                topics[i * 3 + 1],
                topics[i * 3 + 2],
                receiverTopic,
            ];
            const operation = this.getTransactionNftOperation(txHash, log, address, eventTopics, action, tokensProperties);
            if (operation) {
                operations.push(operation);
            }
        }
        return operations;
    }
    getTransactionNftOperation(txHash, log, address, topics, action, tokensProperties) {
        var _a, _b, _c;
        try {
            let identifier = sdk_nestjs_common_1.BinaryUtils.base64Decode(topics[0]);
            const nonce = sdk_nestjs_common_1.BinaryUtils.tryBase64ToHex(topics[1]);
            const value = (_a = sdk_nestjs_common_1.BinaryUtils.tryBase64ToBigInt(topics[2])) === null || _a === void 0 ? void 0 : _a.toString();
            const receiver = (_b = sdk_nestjs_common_1.BinaryUtils.tryBase64ToAddress(topics[3])) !== null && _b !== void 0 ? _b : log.address;
            const properties = tokensProperties[identifier];
            const decimals = properties ? properties.decimals : undefined;
            const name = properties ? properties.name : undefined;
            const dcdtType = properties ? properties.type : undefined;
            const svgUrl = properties ? properties.svgUrl : undefined;
            const ticker = properties ? properties.ticker : undefined;
            let collection = undefined;
            if (nonce) {
                collection = identifier;
                identifier = `${collection}-${nonce}`;
            }
            const type = nonce ? transaction_operation_type_1.TransactionOperationType.nft : transaction_operation_type_1.TransactionOperationType.dcdt;
            return { id: (_c = log.id) !== null && _c !== void 0 ? _c : '', action, type, dcdtType, collection, identifier, ticker, name, sender: address, receiver, value, decimals, svgUrl, senderAssets: undefined, receiverAssets: undefined };
        }
        catch (error) {
            this.logger.error(`Error when parsing NFT transaction log for tx hash '${txHash}' with action '${action}' and topics: ${topics}`);
            this.logger.error(error);
            return undefined;
        }
    }
    getTransactionTransferValueOperation(txHash, log, event, action) {
        var _a;
        try {
            let sender;
            let receiver;
            let value;
            if (event.topics.length === 2) {
                sender = event.address;
                receiver = sdk_nestjs_common_1.BinaryUtils.base64ToAddress(event.topics[1]);
                value = sdk_nestjs_common_1.BinaryUtils.base64ToBigInt(event.topics[0]).toString();
            }
            else if (event.topics.length === 3) {
                sender = sdk_nestjs_common_1.BinaryUtils.base64ToAddress(event.topics[0]);
                receiver = sdk_nestjs_common_1.BinaryUtils.base64ToAddress(event.topics[1]);
                value = sdk_nestjs_common_1.BinaryUtils.base64ToBigInt(event.topics[2]).toString();
            }
            else {
                throw new Error(`Unrecognized topic count when interpreting transferValue event`);
            }
            const operation = new transaction_operation_1.TransactionOperation();
            operation.id = (_a = log.id) !== null && _a !== void 0 ? _a : '';
            operation.action = transaction_operation_action_1.TransactionOperationAction.transfer;
            operation.type = transaction_operation_type_1.TransactionOperationType.rewa;
            operation.sender = sender;
            operation.receiver = receiver;
            operation.value = value;
            return operation;
        }
        catch (error) {
            this.logger.error(`Error when parsing valueTransferOnly transaction log for tx hash '${txHash}' with action '${action}' and topics: ${event.topics}`);
            this.logger.error(error);
            return undefined;
        }
    }
    async getTokenTransferProperties(options) {
        var _a;
        let properties = await this.cachingService.getOrSet(cache_info_1.CacheInfo.TokenTransferProperties(options.identifier).key, async () => await this.getTokenTransferPropertiesRaw(options.identifier), cache_info_1.CacheInfo.TokenTransferProperties(options.identifier).ttl);
        properties = JSON.parse(JSON.stringify(properties));
        if (properties && properties.type !== dcdt_type_1.DcdtType.FungibleDCDT && options.nonce) {
            properties.identifier = `${options.identifier}-${options.nonce}`;
        }
        if (properties && options.applyValue && options.timestamp && options.value) {
            const dcdtPrice = await this.dataApiService.getDcdtTokenPrice(options.identifier, options.timestamp);
            if (dcdtPrice) {
                properties.valueUsd = new bignumber_js_1.default(dcdtPrice).multipliedBy(options.value).shiftedBy(-((_a = properties.decimals) !== null && _a !== void 0 ? _a : 0)).toNumber();
                const rewaPrice = await this.dataApiService.getRewaPrice(options.timestamp);
                if (rewaPrice) {
                    properties.valueRewa = properties.valueUsd / rewaPrice;
                }
            }
        }
        return properties;
    }
    async getTokenTransferPropertiesRaw(identifier) {
        var _a, _b;
        const properties = await this.dcdtService.getDcdtTokenProperties(identifier);
        if (!properties) {
            return null;
        }
        const assets = await this.assetsService.getTokenAssets(identifier);
        const result = {
            type: properties.type,
            name: (_a = assets === null || assets === void 0 ? void 0 : assets.name) !== null && _a !== void 0 ? _a : properties.name,
            ticker: assets ? identifier.split('-')[0] : identifier,
            svgUrl: (_b = assets === null || assets === void 0 ? void 0 : assets.svgUrl) !== null && _b !== void 0 ? _b : '',
        };
        if (properties.type === dcdt_type_1.DcdtType.FungibleDCDT) {
            result.token = identifier;
        }
        else {
            result.collection = identifier;
        }
        if ([dcdt_type_1.DcdtType.FungibleDCDT, dcdt_type_1.DcdtType.MetaDCDT].includes(properties.type)) {
            result.decimals = properties.decimals;
        }
        return result;
    }
};
TokenTransferService = TokenTransferService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => dcdt_service_1.DcdtService))),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        dcdt_service_1.DcdtService,
        assets_service_1.AssetsService,
        data_api_service_1.DataApiService])
], TokenTransferService);
exports.TokenTransferService = TokenTransferService;
//# sourceMappingURL=token.transfer.service.js.map