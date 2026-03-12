"use strict";
var TransactionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const transaction_1 = require("./entities/transaction");
const transaction_detailed_1 = require("./entities/transaction.detailed");
const transaction_get_service_1 = require("./transaction.get.service");
const token_transfer_service_1 = require("../tokens/token.transfer.service");
const transaction_price_service_1 = require("./transaction.price.service");
const smart_contract_result_1 = require("../sc-results/entities/smart.contract.result");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const query_pagination_1 = require("../../common/entities/query.pagination");
const plugin_service_1 = require("../../common/plugins/plugin.service");
const cache_info_1 = require("../../utils/cache.info");
const gateway_component_request_1 = require("../../common/gateway/entities/gateway.component.request");
const transaction_action_service_1 = require("./transaction-action/transaction.action.service");
const transaction_status_1 = require("./entities/transaction.status");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const transaction_utils_1 = require("./transaction.utils");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const transaction_operation_1 = require("./entities/transaction.operation");
const assets_service_1 = require("../../common/assets/assets.service");
const account_assets_1 = require("../../common/assets/entities/account.assets");
const crypto_js_1 = tslib_1.__importDefault(require("crypto-js"));
const sdk_nestjs_common_2 = require("@sravankumar02/sdk-nestjs-common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const username_service_1 = require("../usernames/username.service");
const protocol_service_1 = require("../../common/protocol/protocol.service");
const ppu_metadata_1 = require("./entities/ppu.metadata");
const block_service_1 = require("../blocks/block.service");
const block_filter_1 = require("../blocks/entities/block.filter");
const sort_order_1 = require("../../common/entities/sort.order");
const pool_service_1 = require("../pool/pool.service");
const network_service_1 = require("../network/network.service");
const gas_bucket_constants_1 = require("./constants/gas.bucket.constants");
const transaction_action_1 = require("./transaction-action/entities/transaction.action");
const transaction_action_category_1 = require("./transaction-action/entities/transaction.action.category");
let TransactionService = TransactionService_1 = class TransactionService {
    constructor(indexerService, gatewayService, transactionPriceService, transactionGetService, tokenTransferService, pluginsService, cachingService, transactionActionService, assetsService, apiConfigService, usernameService, protocolService, blockService, poolService, networkService) {
        this.indexerService = indexerService;
        this.gatewayService = gatewayService;
        this.transactionPriceService = transactionPriceService;
        this.transactionGetService = transactionGetService;
        this.tokenTransferService = tokenTransferService;
        this.pluginsService = pluginsService;
        this.cachingService = cachingService;
        this.transactionActionService = transactionActionService;
        this.assetsService = assetsService;
        this.apiConfigService = apiConfigService;
        this.usernameService = usernameService;
        this.protocolService = protocolService;
        this.blockService = blockService;
        this.poolService = poolService;
        this.networkService = networkService;
        this.logger = new sdk_nestjs_common_2.OriginLogger(TransactionService_1.name);
        this.smartContractResultsExecutor = new sdk_nestjs_common_1.PendingExecuter();
    }
    async getTransactionCountForAddress(address) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.TxCount(address).key, async () => await this.getTransactionCountForAddressRaw(address), cache_info_1.CacheInfo.TxCount(address).ttl, sdk_nestjs_common_1.Constants.oneSecond());
    }
    async getTransactionCountForAddressRaw(address) {
        return await this.indexerService.getTransactionCountForAddress(address);
    }
    async getTransactionCount(filter, address) {
        var _a;
        if (transaction_utils_1.TransactionUtils.isTransactionCountQueryWithAddressOnly(filter, address)) {
            return this.getTransactionCountForAddress(address !== null && address !== void 0 ? address : '');
        }
        if (transaction_utils_1.TransactionUtils.isTransactionCountQueryWithSenderAndReceiver(filter)) {
            return this.getTransactionCountForAddress((_a = filter.sender) !== null && _a !== void 0 ? _a : '');
        }
        if (this.isCacheableTransactionCount(filter, address)) {
            return await this.cachingService.getOrSet(cache_info_1.CacheInfo.TransactionsCount.key, async () => await this.indexerService.getTransactionCount(filter, address), cache_info_1.CacheInfo.TransactionsCount.ttl, sdk_nestjs_common_1.Constants.oneSecond());
        }
        return await this.indexerService.getTransactionCount(filter, address);
    }
    reorderAccountSentTransactionsByNonce(transactions, accountAddress) {
        const sentPositions = [];
        const sentTransactions = [];
        transactions.forEach((tx, index) => {
            if (tx.sender === accountAddress) {
                sentPositions.push(index);
                sentTransactions.push(tx);
            }
        });
        sentTransactions.sort((a, b) => {
            var _a, _b;
            const nonceA = (_a = a.nonce) !== null && _a !== void 0 ? _a : 0;
            const nonceB = (_b = b.nonce) !== null && _b !== void 0 ? _b : 0;
            return nonceB - nonceA;
        });
        const result = [...transactions];
        sentPositions.forEach((position, index) => {
            result[position] = sentTransactions[index];
        });
        return result;
    }
    getDistinctUserAddressesFromTransactions(transactions) {
        var _a, _b;
        const allAddresses = [];
        for (const transaction of transactions) {
            allAddresses.push(transaction.sender);
            allAddresses.push(transaction.receiver);
            const actionReceiver = (_b = (_a = transaction.action) === null || _a === void 0 ? void 0 : _a.arguments) === null || _b === void 0 ? void 0 : _b.receiver;
            if (actionReceiver) {
                allAddresses.push(actionReceiver);
            }
            if (transaction instanceof transaction_detailed_1.TransactionDetailed) {
                if (transaction.results) {
                    for (const result of transaction.results) {
                        allAddresses.push(result.sender);
                        allAddresses.push(result.receiver);
                    }
                }
                if (transaction.operations) {
                    for (const operation of transaction.operations) {
                        if (operation.sender) {
                            allAddresses.push(operation.sender);
                        }
                        if (operation.receiver) {
                            allAddresses.push(operation.receiver);
                        }
                    }
                }
                if (transaction.logs) {
                    allAddresses.push(transaction.logs.address);
                    for (const event of transaction.logs.events) {
                        allAddresses.push(event.address);
                    }
                }
            }
        }
        return allAddresses.distinct().filter(x => !sdk_nestjs_common_1.AddressUtils.isSmartContractAddress(x));
    }
    async getUsernameAssetsForAddresses(addresses) {
        const resultDict = await this.cachingService.batchGetAll(addresses, address => cache_info_1.CacheInfo.Username(address).key, async (address) => await this.usernameService.getUsernameForAddressRaw(address), cache_info_1.CacheInfo.Username('').ttl);
        const result = {};
        for (const address of addresses) {
            const username = resultDict[cache_info_1.CacheInfo.Username(address).key];
            if (username) {
                const assets = this.getAssetsFromUsername(username);
                if (assets) {
                    result[address] = assets;
                }
            }
        }
        return result;
    }
    async getTransactions(filter, pagination, queryOptions, address, fields) {
        if (this.isCacheableTransactionList(filter, queryOptions, fields, address)) {
            const cacheInfo = cache_info_1.CacheInfo.Transactions(pagination);
            return await this.cachingService.getOrSet(cacheInfo.key, () => this.computeTransactions(filter, pagination, queryOptions, address, fields), cacheInfo.ttl, sdk_nestjs_common_1.Constants.oneSecond());
        }
        return await this.computeTransactions(filter, pagination, queryOptions, address, fields);
    }
    async computeTransactions(filter, pagination, queryOptions, address, fields) {
        var _a, _b, _c;
        const elasticTransactions = await this.indexerService.getTransactions(filter, pagination, address);
        let transactions = [];
        transactions = elasticTransactions.map(x => sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_detailed_1.TransactionDetailed(), x));
        const hasSenderFilter = filter.sender || (filter.senders && filter.senders.length > 0);
        const hasReceiverFilter = filter.receivers && filter.receivers.length > 0;
        if (address && !hasSenderFilter && !hasReceiverFilter) {
            transactions = this.reorderAccountSentTransactionsByNonce(transactions, address);
        }
        if (filter.hashes) {
            const txHashes = filter.hashes;
            const elasticHashes = elasticTransactions.map(({ txHash }) => txHash);
            const missingHashes = txHashes.except(elasticHashes);
            const gatewayTransactions = await Promise.all(missingHashes.map((txHash) => this.transactionGetService.tryGetTransactionFromGatewayForList(txHash)));
            for (const gatewayTransaction of gatewayTransactions) {
                if (gatewayTransaction) {
                    transactions.push(sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_detailed_1.TransactionDetailed(), gatewayTransaction));
                }
            }
        }
        if ((queryOptions && queryOptions.withBlockInfo) || (fields && fields.includesSome(['senderBlockHash', 'receiverBlockHash', 'senderBlockNonce', 'receiverBlockNonce']))) {
            await this.applyBlockInfo(transactions);
        }
        if (queryOptions && (queryOptions.withScResults || queryOptions.withOperations || queryOptions.withLogs)) {
            queryOptions.withScResultLogs = queryOptions.withLogs;
            transactions = await this.getExtraDetailsForTransactions(elasticTransactions, transactions, queryOptions);
        }
        for (const transaction of transactions) {
            transaction.type = undefined;
        }
        await this.processTransactions(transactions, {
            withScamInfo: (_a = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.withScamInfo) !== null && _a !== void 0 ? _a : false,
            withUsername: (_b = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.withUsername) !== null && _b !== void 0 ? _b : false,
            withActionTransferValue: (_c = queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.withActionTransferValue) !== null && _c !== void 0 ? _c : false,
        });
        this.processRelayedInfo(transactions);
        return transactions;
    }
    getAssetsFromUsername(username) {
        if (!username) {
            return undefined;
        }
        return new account_assets_1.AccountAssets({
            name: username,
            tags: ['dns', 'username'],
        });
    }
    async getTransaction(txHash, fields, withActionTransferValue = false) {
        let transaction = await this.transactionGetService.tryGetTransactionFromElastic(txHash, fields);
        if (transaction === null) {
            transaction = await this.transactionGetService.tryGetTransactionFromGateway(txHash);
        }
        if (transaction !== null) {
            transaction.price = await this.getTransactionPrice(transaction);
            await this.processTransactions([transaction], { withScamInfo: true, withUsername: true, withActionTransferValue });
            this.processRelayedInfo([transaction]);
            if (transaction.pendingResults === true && transaction.results) {
                for (const result of transaction.results) {
                    if (!result.logs || !result.logs.events) {
                        continue;
                    }
                    for (const event of result.logs.events) {
                        if (event.identifier === 'completedTxEvent') {
                            transaction.pendingResults = undefined;
                        }
                    }
                }
            }
        }
        return transaction;
    }
    async applyAssets(transactions, options) {
        var _a, _b;
        function getAssets(address) {
            var _a;
            return (_a = accountAssets[address]) !== null && _a !== void 0 ? _a : usernameAssets[address];
        }
        const accountAssets = await this.assetsService.getAllAccountAssets();
        let usernameAssets = {};
        if (options.withUsernameAssets && this.apiConfigService.getMaiarIdUrl()) {
            const addresses = this.getDistinctUserAddressesFromTransactions(transactions);
            usernameAssets = await this.getUsernameAssetsForAddresses(addresses);
        }
        for (const transaction of transactions) {
            transaction.senderAssets = getAssets(transaction.sender);
            transaction.receiverAssets = getAssets(transaction.receiver);
            if ((_b = (_a = transaction.action) === null || _a === void 0 ? void 0 : _a.arguments) === null || _b === void 0 ? void 0 : _b.receiver) {
                transaction.action.arguments.receiverAssets = getAssets(transaction.action.arguments.receiver);
            }
            if (transaction instanceof transaction_detailed_1.TransactionDetailed) {
                if (transaction.results) {
                    for (const result of transaction.results) {
                        result.senderAssets = getAssets(result.sender);
                        result.receiverAssets = getAssets(result.receiver);
                    }
                }
                if (transaction.operations) {
                    for (const operation of transaction.operations) {
                        if (operation.sender) {
                            operation.senderAssets = getAssets(operation.sender);
                        }
                        if (operation.receiver) {
                            operation.receiverAssets = getAssets(operation.receiver);
                        }
                    }
                }
                if (transaction.logs) {
                    transaction.logs.addressAssets = getAssets(transaction.logs.address);
                    for (const event of transaction.logs.events) {
                        event.addressAssets = getAssets(event.address);
                    }
                }
            }
        }
    }
    async createTransaction(transaction) {
        var _a, _b, _c, _d, _e;
        const shardCount = await this.protocolService.getShardCount();
        const receiverShard = sdk_nestjs_common_1.AddressUtils.computeShard(sdk_nestjs_common_1.AddressUtils.bech32Decode(transaction.receiver), shardCount);
        const senderShard = sdk_nestjs_common_1.AddressUtils.computeShard(sdk_nestjs_common_1.AddressUtils.bech32Decode(transaction.sender), shardCount);
        const pluginTransaction = await this.pluginsService.processTransactionSend(transaction);
        if (pluginTransaction) {
            return pluginTransaction;
        }
        let txHash;
        try {
            const result = await this.gatewayService.create('transaction/send', gateway_component_request_1.GatewayComponentRequest.sendTransaction, transaction);
            txHash = result === null || result === void 0 ? void 0 : result.txHash;
        }
        catch (error) {
            return (_e = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.error) !== null && _b !== void 0 ? _b : (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.error) !== null && _e !== void 0 ? _e : '';
        }
        return {
            txHash,
            receiver: transaction.receiver,
            sender: transaction.sender,
            receiverShard,
            senderShard,
            status: 'Pending',
        };
    }
    async decodeTransaction(transactionDecode) {
        const transaction = sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_1.Transaction(), Object.assign({}, transactionDecode));
        transactionDecode.action = await this.transactionActionService.getTransactionAction(transaction);
        return transactionDecode;
    }
    async getTransactionPrice(transaction) {
        try {
            return await this.transactionPriceService.getTransactionPrice(transaction);
        }
        catch (error) {
            this.logger.error(`Error when fetching transaction price for transaction with hash '${transaction.txHash}'`);
            this.logger.error(error);
            return;
        }
    }
    processRelayedInfo(transactions) {
        var _a;
        for (const transaction of transactions) {
            transaction.relayedVersion = this.extractRelayedVersion(transaction);
            if (transaction.relayedVersion && ["v1", "v2"].includes(transaction.relayedVersion)) {
                const shouldSkip = this.apiConfigService.shouldDeprecateRelayedV1V2((_a = transaction.epoch) !== null && _a !== void 0 ? _a : 0);
                if (shouldSkip) {
                    transaction.function = undefined;
                    transaction.action = new transaction_action_1.TransactionAction({
                        category: transaction_action_category_1.TransactionActionCategory.deprecatedRelayedV1V2,
                        name: "Deprecated transaction action",
                        description: `Relayed v1/v2 transactions are deprecated`,
                    });
                }
            }
            if (!transaction.isRelayed) {
                transaction.relayedVersion = undefined;
            }
        }
    }
    async processTransactions(transactions, options) {
        this.normalizeTimestampMs(transactions);
        try {
            await this.pluginsService.processTransactions(transactions, options.withScamInfo);
        }
        catch (error) {
            this.logger.error(`Unhandled error when processing plugin transaction for transactions with hashes '${transactions.map(x => x.txHash).join(',')}'`);
            this.logger.error(error);
        }
        for (const transaction of transactions) {
            try {
                transaction.action = await this.transactionActionService.getTransactionAction(transaction, options.withActionTransferValue);
                transaction.pendingResults = await this.getPendingResults(transaction);
                if (transaction.pendingResults === true) {
                    transaction.status = transaction_status_1.TransactionStatus.pending;
                }
            }
            catch (error) {
                this.logger.error(`Unhandled error when processing transaction for transaction with hash '${transaction.txHash}'`);
                this.logger.error(error);
            }
        }
        await this.applyAssets(transactions, { withUsernameAssets: options.withUsername });
    }
    normalizeTimestampMs(transactions) {
        for (const transaction of transactions) {
            if ((!transaction.timestampMs || transaction.timestampMs === 0) && transaction.timestamp) {
                transaction.timestampMs = transaction.timestamp * 1000;
            }
        }
    }
    async getPendingResults(transaction) {
        const twentyMinutes = sdk_nestjs_common_1.Constants.oneMinute() * 20 * 1000;
        const timestampLimit = (new Date().getTime() - twentyMinutes) / 1000;
        if (transaction.timestamp < timestampLimit) {
            return undefined;
        }
        const pendingResult = await this.cachingService.get(cache_info_1.CacheInfo.TransactionPendingResults(transaction.txHash).key);
        if (!pendingResult) {
            return undefined;
        }
        return true;
    }
    async getExtraDetailsForTransactions(elasticTransactions, transactions, queryOptions) {
        const scResults = await this.indexerService.getScResultsForTransactions(elasticTransactions);
        for (const scResult of scResults) {
            scResult.hash = scResult.scHash;
            delete scResult.scHash;
        }
        const hashes = [...transactions.map((transaction) => transaction.txHash), ...scResults.map((scResult) => scResult.hash)];
        const logs = await this.transactionGetService.getTransactionLogsFromElastic(hashes);
        const detailedTransactions = [];
        for (const transaction of transactions) {
            const transactionDetailed = sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_detailed_1.TransactionDetailed(), transaction);
            const transactionScResults = scResults.filter(({ originalTxHash }) => originalTxHash == transaction.txHash);
            if (queryOptions.withScResults) {
                transactionDetailed.results = transactionScResults.map((scResult) => sdk_nestjs_http_1.ApiUtils.mergeObjects(new smart_contract_result_1.SmartContractResult(), scResult));
            }
            if (queryOptions.withOperations) {
                const transactionHashes = [transactionDetailed.txHash];
                const previousHashes = {};
                for (const scResult of transactionScResults) {
                    transactionHashes.push(scResult.hash);
                    previousHashes[scResult.hash] = scResult.prevTxHash;
                }
                const transactionLogs = logs.filter((log) => { var _a; return transactionHashes.includes((_a = log.id) !== null && _a !== void 0 ? _a : ''); });
                transactionDetailed.operations = await this.tokenTransferService.getOperationsForTransaction(transactionDetailed, transactionLogs);
                transactionDetailed.operations = transaction_utils_1.TransactionUtils.trimOperations(transactionDetailed.sender, transactionDetailed.operations, previousHashes);
            }
            if (queryOptions.withLogs) {
                for (const log of logs) {
                    if (log.id === transactionDetailed.txHash) {
                        transactionDetailed.logs = log;
                    }
                }
            }
            if (queryOptions.withScResultLogs) {
                for (const log of logs) {
                    if (log.id !== transactionDetailed.txHash && transactionDetailed.results) {
                        const foundScResult = transactionDetailed.results.find(({ hash }) => log.id === hash);
                        if (foundScResult) {
                            foundScResult.logs = log;
                        }
                    }
                }
            }
            detailedTransactions.push(transactionDetailed);
        }
        await this.transactionGetService.applyNftNameOnTransactionOperations(detailedTransactions);
        return detailedTransactions;
    }
    async getSmartContractResults(hashes) {
        return await this.smartContractResultsExecutor.execute(crypto_js_1.default.MD5(hashes.join(',')).toString(), async () => await this.getSmartContractResultsRaw(hashes));
    }
    async getSmartContractResultsRaw(transactionHashes) {
        var _a;
        const resultsRaw = await this.indexerService.getSmartContractResults(transactionHashes);
        const resultsByHash = new Map();
        for (const result of resultsRaw) {
            result.hash = result.scHash;
            delete result.scHash;
            const txHash = result.originalTxHash;
            if (!resultsByHash.has(txHash)) {
                resultsByHash.set(txHash, []);
            }
            (_a = resultsByHash.get(txHash)) === null || _a === void 0 ? void 0 : _a.push(result);
        }
        const results = [];
        for (const transactionHash of transactionHashes) {
            const resultRaw = resultsByHash.get(transactionHash);
            if (resultRaw && resultRaw.length > 0) {
                results.push(resultRaw.map((result) => sdk_nestjs_http_1.ApiUtils.mergeObjects(new smart_contract_result_1.SmartContractResult(), result)));
            }
            else {
                results.push(undefined);
            }
        }
        return results;
    }
    async getOperations(transactions) {
        var _a, _b;
        const smartContractResults = await this.getSmartContractResults(transactions.map((transaction) => transaction.txHash));
        const logs = await this.transactionGetService.getTransactionLogsFromElastic([
            ...transactions.map((transaction) => transaction.txHash),
            ...smartContractResults.filter((item) => item != null).flat().map((result) => { var _a; return (_a = result === null || result === void 0 ? void 0 : result.hash) !== null && _a !== void 0 ? _a : ''; }),
        ]);
        const operations = [];
        for (const transaction of transactions) {
            transaction.results = (_a = smartContractResults.at(transactions.indexOf(transaction))) !== null && _a !== void 0 ? _a : undefined;
            const transactionHashes = [transaction.txHash];
            const previousTransactionHashes = {};
            for (const result of (_b = transaction.results) !== null && _b !== void 0 ? _b : []) {
                transactionHashes.push(result.hash);
                previousTransactionHashes[result.hash] = result.prevTxHash;
            }
            const transactionLogs = logs.filter((log) => { var _a; return transactionHashes.includes((_a = log.id) !== null && _a !== void 0 ? _a : ''); });
            let operationsRaw = await this.tokenTransferService.getOperationsForTransaction(transaction, transactionLogs);
            operationsRaw = transaction_utils_1.TransactionUtils.trimOperations(transaction.sender, operationsRaw, previousTransactionHashes);
            if (operationsRaw.length > 0) {
                operations.push(operationsRaw.map((operation) => sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_operation_1.TransactionOperation(), operation)));
            }
            else {
                operations.push(undefined);
            }
        }
        await this.transactionGetService.applyNftNameOnTransactionOperations(transactions);
        return operations;
    }
    async getLogs(hashes) {
        const logsRaw = await this.transactionGetService.getTransactionLogsFromElastic(hashes);
        const logs = [];
        for (const hash of hashes) {
            const log = logsRaw.filter((log) => hash === log.id)[0];
            if (log !== undefined) {
                logs.push(log);
            }
            else {
                logs.push(undefined);
            }
        }
        return logs;
    }
    async applyBlockInfo(transactions) {
        var _a;
        const miniBlockHashes = transactions
            .filter(x => x.miniBlockHash)
            .map(x => { var _a; return (_a = x.miniBlockHash) !== null && _a !== void 0 ? _a : ''; })
            .distinct();
        if (miniBlockHashes.length > 0) {
            const miniBlocks = await this.indexerService.getMiniBlocks({ from: 0, size: miniBlockHashes.length }, { hashes: miniBlockHashes });
            const indexedMiniBlocks = miniBlocks.toRecord(x => x.miniBlockHash);
            const senderBlockHashes = miniBlocks.map(x => x.senderBlockHash);
            const receiverBlockHashes = miniBlocks.map(x => x.receiverBlockHash);
            const blockHashes = [...senderBlockHashes, ...receiverBlockHashes].distinct().filter(x => x);
            const blocks = await this.indexerService.getBlocks({ hashes: blockHashes }, { from: 0, size: blockHashes.length });
            const indexedBlocks = blocks.toRecord(x => x.hash);
            for (const transaction of transactions) {
                const miniBlock = indexedMiniBlocks[(_a = transaction.miniBlockHash) !== null && _a !== void 0 ? _a : ''];
                if (miniBlock) {
                    transaction.senderBlockHash = miniBlock.senderBlockHash;
                    transaction.receiverBlockHash = miniBlock.receiverBlockHash;
                    const senderBlock = indexedBlocks[miniBlock.senderBlockHash];
                    if (senderBlock) {
                        transaction.senderBlockNonce = senderBlock.nonce;
                    }
                    const receiverBlock = indexedBlocks[miniBlock.receiverBlockHash];
                    if (receiverBlock) {
                        transaction.receiverBlockNonce = receiverBlock.nonce;
                    }
                }
            }
        }
    }
    extractRelayedVersion(transaction) {
        if (transaction.data) {
            const decodedData = sdk_nestjs_common_1.BinaryUtils.base64Decode(transaction.data);
            if (decodedData.startsWith('relayedTx@')) {
                return 'v1';
            }
            else if (decodedData.startsWith('relayedTxV2@')) {
                return 'v2';
            }
        }
        if (transaction.relayer) {
            return 'v3';
        }
        return undefined;
    }
    async getPpuByShardId(shardId) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.PpuMetadataByShard(shardId).key, async () => await this.getPpuByShardIdRaw(shardId), cache_info_1.CacheInfo.PpuMetadataByShard(shardId).ttl, sdk_nestjs_common_1.Constants.oneSecond());
    }
    async getPpuByShardIdRaw(shardId) {
        try {
            if (shardId < 0 || shardId > 2) {
                return null;
            }
            const blocks = await this.blockService.getBlocks(new block_filter_1.BlockFilter({ shard: shardId, order: sort_order_1.SortOrder.desc }), new query_pagination_1.QueryPagination({ from: 0, size: 1 }));
            if (!blocks || blocks.length === 0) {
                this.logger.error(`No blocks found for shard ${shardId}`);
                return null;
            }
            const lastBlock = blocks[0].nonce;
            const networkConstants = await this.networkService.getConstants();
            const { minGasLimit, gasPerDataByte, gasPriceModifier } = networkConstants;
            const gasPriceModifierNumber = Number(gasPriceModifier);
            const { GAS_BUCKET_SIZE, FAST_BUCKET_INDEX, FASTER_BUCKET_INDEX } = gas_bucket_constants_1.GasBucketConstants;
            const poolTransactions = await this.poolService.getPoolWithFilters({ senderShard: shardId });
            if (!poolTransactions || poolTransactions.length === 0) {
                return new ppu_metadata_1.PpuMetadata({
                    lastBlock: lastBlock,
                    fast: 0,
                    faster: 0,
                });
            }
            const transactionsWithPpu = this.calculatePpuForTransactions(poolTransactions, minGasLimit, gasPerDataByte, gasPriceModifierNumber);
            const sortedTransactions = this.sortTransactionsByPriority(transactionsWithPpu);
            const gasBuckets = this.distributeTransactionsIntoGasBuckets(sortedTransactions, GAS_BUCKET_SIZE);
            const fastPpu = gasBuckets.length > FAST_BUCKET_INDEX && gasBuckets[FAST_BUCKET_INDEX].ppuEnd
                ? gasBuckets[FAST_BUCKET_INDEX].ppuEnd
                : 0;
            const fasterPpu = gasBuckets.length > FASTER_BUCKET_INDEX && gasBuckets[FASTER_BUCKET_INDEX].ppuEnd
                ? gasBuckets[FASTER_BUCKET_INDEX].ppuEnd
                : 0;
            return new ppu_metadata_1.PpuMetadata({
                lastBlock: lastBlock,
                fast: fastPpu,
                faster: fasterPpu,
            });
        }
        catch (error) {
            this.logger.error(`Error getting price per unit metadata for shard ${shardId}`, {
                path: 'transactionService.getPpuByShardIdRaw',
                shardId,
                error,
            });
            return null;
        }
    }
    calculatePpuForTransactions(transactions, minGasLimit, gasPerDataByte, gasPriceModifier) {
        return transactions.map(tx => {
            const data = tx.data ? sdk_nestjs_common_1.BinaryUtils.base64Decode(tx.data) : '';
            const gasLimit = Number(tx.gasLimit);
            const gasPrice = Number(tx.gasPrice);
            const dataCost = minGasLimit + data.length * gasPerDataByte;
            const executionCost = gasLimit - dataCost;
            const initiallyPaidFee = dataCost * gasPrice + executionCost * gasPrice * gasPriceModifier;
            const ppu = Math.floor(initiallyPaidFee / gasLimit);
            return Object.assign(Object.assign({}, tx), { ppu });
        });
    }
    sortTransactionsByPriority(transactions) {
        return [...transactions].sort((a, b) => {
            if (a.sender === b.sender) {
                return a.nonce - b.nonce;
            }
            if (a.ppu !== b.ppu) {
                return b.ppu - a.ppu;
            }
            if (a.gasLimit !== b.gasLimit) {
                return b.gasLimit - a.gasLimit;
            }
            return a.txHash.localeCompare(b.txHash);
        });
    }
    distributeTransactionsIntoGasBuckets(transactions, gasBucketSize) {
        const buckets = [];
        let currentBucket = {
            index: 0,
            gasAccumulated: 0,
            ppuBegin: 0,
            numTransactions: 0,
        };
        for (const transaction of transactions) {
            const gasLimit = Number(transaction.gasLimit);
            currentBucket.gasAccumulated += gasLimit;
            currentBucket.numTransactions += 1;
            if (currentBucket.numTransactions === 1) {
                currentBucket.ppuBegin = transaction.ppu;
            }
            if (currentBucket.gasAccumulated >= gasBucketSize) {
                currentBucket.ppuEnd = transaction.ppu;
                buckets.push(currentBucket);
                currentBucket = {
                    index: currentBucket.index + 1,
                    gasAccumulated: 0,
                    ppuBegin: 0,
                    numTransactions: 0,
                };
            }
        }
        if (currentBucket.numTransactions > 0) {
            currentBucket.ppuEnd = transactions[transactions.length - 1].ppu;
            buckets.push(currentBucket);
        }
        for (const bucket of buckets) {
            this.logger.log(`Bucket ${bucket.index}, gas = ${bucket.gasAccumulated}, num_txs = ${bucket.numTransactions}, ppu: ${bucket.ppuBegin} .. ${bucket.ppuEnd}`);
        }
        return buckets;
    }
    isEmptyTransactionFilter(filter) {
        return !filter.address &&
            !filter.sender &&
            !(filter.senders && filter.senders.length > 0) &&
            !(filter.receivers && filter.receivers.length > 0) &&
            !filter.token &&
            !(filter.tokens && filter.tokens.length > 0) &&
            !(filter.functions && filter.functions.length > 0) &&
            filter.senderShard === undefined &&
            filter.receiverShard === undefined &&
            !filter.miniBlockHash &&
            !(filter.hashes && filter.hashes.length > 0) &&
            filter.status === undefined &&
            filter.before === undefined &&
            filter.after === undefined &&
            filter.condition === undefined &&
            filter.order === undefined &&
            filter.senderOrReceiver === undefined &&
            filter.isScCall === undefined &&
            filter.isRelayed === undefined &&
            filter.relayer === undefined &&
            filter.round === undefined &&
            filter.withRefunds === undefined &&
            filter.withRelayedScresults === undefined &&
            filter.withTxsRelayedByAddress === undefined;
    }
    isCacheableTransactionList(filter, queryOptions, fields, address) {
        const hasFieldSelection = Array.isArray(fields) && fields.length > 0;
        if (address || hasFieldSelection || !this.isEmptyTransactionFilter(filter) || !queryOptions) {
            return false;
        }
        const hasAnyEnrichmentOption = queryOptions.withScResults ||
            queryOptions.withBlockInfo ||
            queryOptions.withActionTransferValue ||
            queryOptions.withUsername ||
            queryOptions.withTxsOrder ||
            queryOptions.withOperations !== undefined ||
            queryOptions.withLogs !== undefined;
        return !hasAnyEnrichmentOption;
    }
    isCacheableTransactionCount(filter, address) {
        return !address && this.isEmptyTransactionFilter(filter);
    }
};
TransactionService = TransactionService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => transaction_get_service_1.TransactionGetService))),
    tslib_1.__param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => token_transfer_service_1.TokenTransferService))),
    tslib_1.__param(7, (0, common_1.Inject)((0, common_1.forwardRef)(() => transaction_action_service_1.TransactionActionService))),
    tslib_1.__param(12, (0, common_1.Inject)((0, common_1.forwardRef)(() => block_service_1.BlockService))),
    tslib_1.__param(13, (0, common_1.Inject)((0, common_1.forwardRef)(() => pool_service_1.PoolService))),
    tslib_1.__param(14, (0, common_1.Inject)((0, common_1.forwardRef)(() => network_service_1.NetworkService))),
    tslib_1.__metadata("design:paramtypes", [indexer_service_1.IndexerService,
        gateway_service_1.GatewayService,
        transaction_price_service_1.TransactionPriceService,
        transaction_get_service_1.TransactionGetService,
        token_transfer_service_1.TokenTransferService,
        plugin_service_1.PluginService,
        sdk_nestjs_cache_1.CacheService,
        transaction_action_service_1.TransactionActionService,
        assets_service_1.AssetsService,
        api_config_service_1.ApiConfigService,
        username_service_1.UsernameService,
        protocol_service_1.ProtocolService,
        block_service_1.BlockService,
        pool_service_1.PoolService,
        network_service_1.NetworkService])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map