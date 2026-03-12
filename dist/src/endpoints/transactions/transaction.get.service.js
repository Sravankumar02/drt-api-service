"use strict";
var TransactionGetService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionGetService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const smart_contract_result_1 = require("../sc-results/entities/smart.contract.result");
const transaction_1 = require("./entities/transaction");
const transaction_detailed_1 = require("./entities/transaction.detailed");
const transaction_log_1 = require("./entities/transaction.log");
const transaction_optional_field_options_1 = require("./entities/transaction.optional.field.options");
const transaction_receipt_1 = require("./entities/transaction.receipt");
const token_transfer_service_1 = require("../tokens/token.transfer.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const transaction_utils_1 = require("./transaction.utils");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const mini_block_type_1 = require("../miniblocks/entities/mini.block.type");
const transaction_status_1 = require("./entities/transaction.status");
const username_utils_1 = require("../usernames/username.utils");
const transaction_log_event_1 = require("./entities/transaction.log.event");
const transaction_operation_type_1 = require("./entities/transaction.operation.type");
const query_pagination_1 = require("../../common/entities/query.pagination");
const nft_filter_1 = require("../nfts/entities/nft.filter");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const crypto_js_1 = tslib_1.__importDefault(require("crypto-js"));
let TransactionGetService = TransactionGetService_1 = class TransactionGetService {
    constructor(indexerService, gatewayService, tokenTransferService, apiConfigService) {
        this.indexerService = indexerService;
        this.gatewayService = gatewayService;
        this.tokenTransferService = tokenTransferService;
        this.apiConfigService = apiConfigService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(TransactionGetService_1.name);
    }
    async tryGetTransactionFromElasticBySenderAndNonce(sender, nonce) {
        const transactions = await this.indexerService.getTransactionBySenderAndNonce(sender, nonce);
        return transactions.firstOrUndefined();
    }
    async getTransactionLogsFromElastic(hashes) {
        let currentHashes = hashes.slice(0, 1000);
        const result = [];
        while (currentHashes.length > 0) {
            const items = await this.getTransactionLogsFromElasticInternal(currentHashes);
            result.push(...items);
            hashes = hashes.slice(1000);
            currentHashes = hashes.slice(0, 1000);
        }
        return result.map(x => sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_log_1.TransactionLog(), x));
    }
    async getTransactionLogsFromElasticInternal(hashes) {
        var _a;
        const esMigratedIndices = this.apiConfigService.getElasticMigratedIndicesConfig();
        const index = (_a = esMigratedIndices === null || esMigratedIndices === void 0 ? void 0 : esMigratedIndices['logs']) !== null && _a !== void 0 ? _a : 'logs';
        if (index === 'events') {
            return await this.getTransactionLogsFromElasticInternalEventsIndex(hashes);
        }
        return await this.getTransactionLogsFromElasticInternalLogsIndex(hashes);
    }
    async getTransactionLogsFromElasticInternalLogsIndex(hashes) {
        return await this.indexerService.getTransactionLogs(hashes, 'logs', '_id');
    }
    async getTransactionLogsFromElasticInternalEventsIndex(hashes) {
        var _a, _b, _c, _d, _e;
        const rawHits = await this.indexerService.getTransactionLogs(hashes, 'events', 'txHash');
        const logsMap = new Map();
        for (const source of rawHits) {
            const txHash = source.txHash;
            if (!logsMap.has(txHash)) {
                logsMap.set(txHash, new transaction_log_1.TransactionLog({
                    id: txHash,
                    address: source.logAddress,
                    events: [],
                }));
            }
            const event = {
                identifier: source.identifier,
                address: source.address,
                data: source.data && source.data.length > 0 ? sdk_nestjs_common_1.BinaryUtils.hexToBase64((_a = source.data) !== null && _a !== void 0 ? _a : '') : source.data,
                additionalData: (_b = source.additionalData) === null || _b === void 0 ? void 0 : _b.map(d => d && d.length > 0 ? sdk_nestjs_common_1.BinaryUtils.hexToBase64(d) : d),
                topics: (_c = source.topics) === null || _c === void 0 ? void 0 : _c.map(t => t && t.length > 0 ? sdk_nestjs_common_1.BinaryUtils.hexToBase64(t) : t),
                order: (_d = source.order) !== null && _d !== void 0 ? _d : 0,
            };
            (_e = logsMap.get(txHash)) === null || _e === void 0 ? void 0 : _e.events.push(sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_log_event_1.TransactionLogEvent(), event));
        }
        return Array.from(logsMap.values());
    }
    async getTransactionScResultsFromElastic(txHash) {
        const scResults = await this.indexerService.getTransactionScResults(txHash);
        return scResults.map(scResult => sdk_nestjs_http_1.ApiUtils.mergeObjects(new smart_contract_result_1.SmartContractResult(), scResult));
    }
    async tryGetTransactionFromElastic(txHash, fields) {
        let transaction;
        try {
            transaction = await this.indexerService.getTransaction(txHash);
            if (!transaction) {
                return null;
            }
        }
        catch (error) {
            this.logger.error(`Unexpected error when getting transaction from elastic, hash '${txHash}'`);
            this.logger.error(error);
            throw error;
        }
        try {
            if (transaction.scResults) {
                transaction.results = transaction.scResults;
            }
            if (transaction.relayerAddr) {
                transaction.relayer = transaction.relayerAddr;
            }
            const transactionDetailed = sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_detailed_1.TransactionDetailed(), transaction);
            const hashes = [];
            hashes.push(txHash);
            const previousHashes = {};
            if (transaction.hasScResults === true || transaction.hasOperations === true &&
                (!fields || fields.length === 0 || fields.includes(transaction_optional_field_options_1.TransactionOptionalFieldOption.results))) {
                transactionDetailed.results = await this.getTransactionScResultsFromElastic(transactionDetailed.txHash);
                for (const scResult of transactionDetailed.results) {
                    hashes.push(scResult.hash);
                    previousHashes[scResult.hash] = scResult.prevTxHash;
                }
            }
            if (!fields || fields.length === 0 || fields.includes(transaction_optional_field_options_1.TransactionOptionalFieldOption.receipt)) {
                const receipts = await this.indexerService.getTransactionReceipts(txHash);
                if (receipts.length > 0) {
                    const receipt = receipts[0];
                    transactionDetailed.receipt = sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_receipt_1.TransactionReceipt(), receipt);
                }
            }
            if (!fields || fields.length === 0 || fields.includesSome([transaction_optional_field_options_1.TransactionOptionalFieldOption.logs, transaction_optional_field_options_1.TransactionOptionalFieldOption.operations])) {
                const logs = await this.getTransactionLogsFromElastic(hashes);
                for (const log of logs) {
                    this.alterDuplicatedTransferValueOnlyEvents(log.events);
                    this.removeDuplicatedDCDTTransferEvents(log.events);
                }
                if (!fields || fields.length === 0 || fields.includes(transaction_optional_field_options_1.TransactionOptionalFieldOption.operations)) {
                    transactionDetailed.operations = await this.tokenTransferService.getOperationsForTransaction(transactionDetailed, logs);
                    transactionDetailed.operations = transaction_utils_1.TransactionUtils.trimOperations(transactionDetailed.sender, transactionDetailed.operations, previousHashes);
                }
                for (const log of logs) {
                    if (log.id === txHash) {
                        transactionDetailed.logs = log;
                    }
                    else if (transactionDetailed.results) {
                        const foundScResult = transactionDetailed.results.find(({ hash }) => log.id === hash);
                        if (foundScResult) {
                            foundScResult.logs = log;
                        }
                    }
                }
            }
            this.applyUsernamesToDetailedTransaction(transaction, transactionDetailed);
            await this.applyNftNameOnTransactionOperations([transactionDetailed]);
            return sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_detailed_1.TransactionDetailed(), transactionDetailed);
        }
        catch (error) {
            this.logger.error(error);
            return null;
        }
    }
    alterDuplicatedTransferValueOnlyEvents(events) {
        const backTransferEncoded = sdk_nestjs_common_1.BinaryUtils.base64Encode('BackTransfer');
        const asyncCallbackEncoded = sdk_nestjs_common_1.BinaryUtils.base64Encode('AsyncCallback');
        const transferValueOnlyEvents = events.filter(x => x.identifier === 'transferValueOnly');
        const backTransferEvents = transferValueOnlyEvents.filter(x => x.data === backTransferEncoded);
        const asyncCallbackEvents = transferValueOnlyEvents.filter(x => x.data == asyncCallbackEncoded);
        if (backTransferEvents.length === 1 && asyncCallbackEvents.length === 1 &&
            asyncCallbackEvents[0].topics.length > 1 &&
            JSON.stringify(backTransferEvents[0].topics) === JSON.stringify(asyncCallbackEvents[0].topics)) {
            asyncCallbackEvents[0].topics[0] = sdk_nestjs_common_1.BinaryUtils.hexToBase64(sdk_nestjs_common_1.BinaryUtils.numberToHex(0));
        }
    }
    removeDuplicatedDCDTTransferEvents(events) {
        const dcdtTransferEvents = events.filter(x => x.identifier === 'DCDTTransfer');
        if (dcdtTransferEvents.length <= 1) {
            return;
        }
        const eventGroups = new Map();
        for (const event of dcdtTransferEvents) {
            const contentHash = this.getEventContentHash(event);
            if (!eventGroups.has(contentHash)) {
                eventGroups.set(contentHash, []);
            }
            const group = eventGroups.get(contentHash);
            if (group) {
                group.push(event);
            }
        }
        const duplicateEvents = new Set();
        for (const [, eventGroup] of eventGroups) {
            if (eventGroup.length > 1) {
                for (let i = 1; i < eventGroup.length; i++) {
                    duplicateEvents.add(eventGroup[i]);
                }
            }
        }
        for (let i = events.length - 1; i >= 0; i--) {
            if (duplicateEvents.has(events[i])) {
                events.splice(i, 1);
            }
        }
    }
    getEventContentHash(event) {
        const content = {
            address: event.address,
            identifier: event.identifier,
            topics: event.topics,
            data: event.data,
            additionalData: event.additionalData,
        };
        return crypto_js_1.default.MD5(JSON.stringify(content)).toString();
    }
    applyUsernamesToDetailedTransaction(transaction, transactionDetailed) {
        if (transaction.senderUserName) {
            transactionDetailed.senderUsername = username_utils_1.UsernameUtils.extractUsernameFromRawBase64(transaction.senderUserName);
        }
        if (transaction.senderUsername) {
            transactionDetailed.senderUsername = username_utils_1.UsernameUtils.extractUsernameFromRawBase64(transaction.senderUsername);
        }
        if (transaction.receiverUserName) {
            transactionDetailed.receiverUsername = username_utils_1.UsernameUtils.extractUsernameFromRawBase64(transaction.receiverUserName);
        }
        if (transaction.receiverUsername) {
            transactionDetailed.receiverUsername = username_utils_1.UsernameUtils.extractUsernameFromRawBase64(transaction.receiverUsername);
        }
    }
    async tryGetTransactionFromGatewayForList(txHash) {
        const gatewayTransaction = await this.tryGetTransactionFromGateway(txHash, false);
        if (gatewayTransaction) {
            return sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_1.Transaction(), gatewayTransaction);
        }
        return undefined;
    }
    async tryGetTransactionFromGateway(txHash, queryInElastic = true) {
        try {
            const transactionResult = await this.gatewayService.getTransaction(txHash);
            if (!transactionResult) {
                return null;
            }
            const transaction = transactionResult;
            if (!transaction) {
                return null;
            }
            if (transaction.miniblockType === mini_block_type_1.MiniBlockType.SmartContractResultBlock) {
                return null;
            }
            if (transaction.status === 'pending' && queryInElastic) {
                const existingTransaction = await this.tryGetTransactionFromElasticBySenderAndNonce(transaction.sender, transaction.nonce);
                if (existingTransaction && existingTransaction.txHash !== txHash) {
                    return null;
                }
            }
            if (transaction.receipt) {
                transaction.receipt.value = transaction.receipt.value.toString();
            }
            if (transaction.smartContractResults) {
                for (const smartContractResult of transaction.smartContractResults) {
                    smartContractResult.callType = smartContractResult.callType.toString();
                    smartContractResult.value = smartContractResult.value.toString();
                    if (smartContractResult.data) {
                        smartContractResult.data = sdk_nestjs_common_1.BinaryUtils.base64Encode(smartContractResult.data);
                    }
                }
            }
            const result = {
                txHash: txHash,
                data: transaction.data,
                gasLimit: transaction.gasLimit,
                gasPrice: transaction.gasPrice,
                gasUsed: transaction.gasUsed,
                miniBlockHash: transaction.miniblockHash,
                senderShard: transaction.sourceShard,
                receiverShard: transaction.destinationShard,
                nonce: transaction.nonce,
                receiver: transaction.receiver,
                receiverUsername: username_utils_1.UsernameUtils.extractUsernameFromRawBase64(transaction.receiverUsername),
                sender: transaction.sender,
                senderUsername: username_utils_1.UsernameUtils.extractUsernameFromRawBase64(transaction.senderUsername),
                signature: transaction.signature,
                status: transaction.status,
                value: transaction.value,
                round: transaction.round,
                fee: transaction.fee,
                timestamp: transaction.timestamp,
                scResults: transaction.smartContractResults ? transaction.smartContractResults.map((scResult) => sdk_nestjs_http_1.ApiUtils.mergeObjects(new smart_contract_result_1.SmartContractResult(), scResult)) : [],
                receipt: transaction.receipt ? sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_receipt_1.TransactionReceipt(), transaction.receipt) : undefined,
                logs: transaction.logs,
                guardianAddress: transaction.guardian,
                guardianSignature: transaction.guardianSignature,
                inTransit: transaction.miniblockHash !== undefined && transaction.status === transaction_status_1.TransactionStatus.pending,
                relayer: transaction.relayerAddress,
                relayerSignature: transaction.relayerSignature,
            };
            return sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_detailed_1.TransactionDetailed(), result);
        }
        catch (error) {
            this.logger.error(error);
            return null;
        }
    }
    async applyNftNameOnTransactionOperations(transactions) {
        var _a, _b;
        const operations = transactions.selectMany(x => { var _a; return (_a = x.operations) !== null && _a !== void 0 ? _a : []; });
        const distinctNftIdentifiers = operations.filter(x => x.type === transaction_operation_type_1.TransactionOperationType.nft).map(x => x.identifier).distinct();
        if (distinctNftIdentifiers.length > 0) {
            const elasticNfts = await this.indexerService.getNfts(new query_pagination_1.QueryPagination({ from: 0, size: distinctNftIdentifiers.length }), new nft_filter_1.NftFilter({ identifiers: distinctNftIdentifiers }));
            const elasticNftsDict = elasticNfts.toRecord(x => x.identifier);
            for (const operation of operations) {
                if (elasticNftsDict[operation.identifier]) {
                    operation.name = (_b = (_a = elasticNftsDict[operation.identifier].data) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : operation.name;
                }
            }
        }
    }
};
TransactionGetService = TransactionGetService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => token_transfer_service_1.TokenTransferService))),
    tslib_1.__metadata("design:paramtypes", [indexer_service_1.IndexerService,
        gateway_service_1.GatewayService,
        token_transfer_service_1.TokenTransferService,
        api_config_service_1.ApiConfigService])
], TransactionGetService);
exports.TransactionGetService = TransactionGetService;
//# sourceMappingURL=transaction.get.service.js.map