"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const cache_info_1 = require("../../utils/cache.info");
const transaction_type_1 = require("../transactions/entities/transaction.type");
const transaction_in_pool_dto_1 = require("./entities/transaction.in.pool.dto");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const protocol_service_1 = require("../../common/protocol/protocol.service");
const transaction_action_service_1 = require("../transactions/transaction-action/transaction.action.service");
const transaction_1 = require("../transactions/entities/transaction");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
let PoolService = class PoolService {
    constructor(gatewayService, apiConfigService, cacheService, protocolService, transactionActionService) {
        this.gatewayService = gatewayService;
        this.apiConfigService = apiConfigService;
        this.cacheService = cacheService;
        this.protocolService = protocolService;
        this.transactionActionService = transactionActionService;
    }
    async getTransactionFromPool(txHash) {
        const pool = await this.getPoolWithFilters();
        return pool.find(tx => tx.txHash === txHash);
    }
    async getPoolCount(filter) {
        const pool = await this.getPoolWithFilters(filter);
        return pool.length;
    }
    async getPool(queryPagination, filter) {
        if (!this.apiConfigService.isTransactionPoolEnabled()) {
            return [];
        }
        const { from, size } = queryPagination;
        const pool = await this.getPoolWithFilters(filter);
        return pool.slice(from, from + size);
    }
    async getPoolWithFilters(filter) {
        const pool = await this.cacheService.getOrSet(cache_info_1.CacheInfo.TransactionPool.key, async () => await this.getTxPoolRaw(), cache_info_1.CacheInfo.TransactionPool.ttl);
        return this.applyFilters(pool, filter);
    }
    async getTxPoolRaw() {
        const pool = await this.gatewayService.getTransactionPool();
        return this.parseTransactions(pool);
    }
    async parseTransactions(rawPool) {
        var _a, _b, _c;
        const transactionPool = [];
        if (rawPool === null || rawPool === void 0 ? void 0 : rawPool.txPool) {
            const regularTransactions = this.processTransactionsWithType((_a = rawPool.txPool.regularTransactions) !== null && _a !== void 0 ? _a : [], transaction_type_1.TransactionType.Transaction);
            const smartContractResults = this.processTransactionsWithType((_b = rawPool.txPool.smartContractResults) !== null && _b !== void 0 ? _b : [], transaction_type_1.TransactionType.SmartContractResult);
            const rewards = this.processTransactionsWithType((_c = rawPool.txPool.rewards) !== null && _c !== void 0 ? _c : [], transaction_type_1.TransactionType.Reward);
            const allTransactions = await Promise.all([regularTransactions, smartContractResults, rewards]);
            allTransactions.forEach(transactions => transactionPool.push(...transactions));
        }
        return transactionPool;
    }
    async processTransactionsWithType(transactions, transactionType) {
        return Promise.all(transactions.map(tx => this.parseTransaction(tx.txFields, transactionType)));
    }
    async parseTransaction(tx, type) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const transaction = new transaction_in_pool_dto_1.TransactionInPool({
            txHash: (_a = tx.hash) !== null && _a !== void 0 ? _a : '',
            sender: (_b = tx.sender) !== null && _b !== void 0 ? _b : '',
            receiver: (_c = tx.receiver) !== null && _c !== void 0 ? _c : '',
            receiverUsername: (_d = tx.receiverusername) !== null && _d !== void 0 ? _d : '',
            nonce: (_e = tx.nonce) !== null && _e !== void 0 ? _e : 0,
            value: (_f = tx.value) !== null && _f !== void 0 ? _f : '',
            gasPrice: (_g = tx.gasprice) !== null && _g !== void 0 ? _g : 0,
            gasLimit: (_h = tx.gaslimit) !== null && _h !== void 0 ? _h : 0,
            data: (_j = tx.data) !== null && _j !== void 0 ? _j : '',
            guardian: (_k = tx.guardian) !== null && _k !== void 0 ? _k : '',
            guardianSignature: (_l = tx.guardiansignature) !== null && _l !== void 0 ? _l : '',
            signature: (_m = tx.signature) !== null && _m !== void 0 ? _m : '',
            type: type !== null && type !== void 0 ? type : transaction_type_1.TransactionType.Transaction,
        });
        const shardCount = await this.protocolService.getShardCount();
        if (transaction.sender) {
            transaction.senderShard = sdk_nestjs_common_1.AddressUtils.computeShard(sdk_nestjs_common_1.AddressUtils.bech32Decode(transaction.sender), shardCount);
        }
        if (transaction.receiver) {
            transaction.receiverShard = sdk_nestjs_common_1.AddressUtils.computeShard(sdk_nestjs_common_1.AddressUtils.bech32Decode(transaction.receiver), shardCount);
        }
        const metadata = await this.transactionActionService.getTransactionMetadata(this.poolTransactionToTransaction(transaction), false);
        if (metadata && metadata.functionName) {
            transaction.function = metadata.functionName;
        }
        return transaction;
    }
    applyFilters(pool, filters) {
        if (!filters) {
            return pool;
        }
        return pool.filter((transaction) => {
            return ((!filters.sender || transaction.sender === filters.sender) &&
                (!filters.receiver || transaction.receiver === filters.receiver) &&
                (!filters.type || transaction.type === filters.type) &&
                (filters.senderShard === undefined || transaction.senderShard === filters.senderShard) &&
                (filters.receiverShard === undefined || transaction.receiverShard === filters.receiverShard) &&
                (filters.functions === undefined || transaction.function === undefined || filters.functions.indexOf(transaction.function) > -1));
        });
    }
    poolTransactionToTransaction(transaction) {
        return sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_1.Transaction(), transaction);
    }
};
PoolService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [gateway_service_1.GatewayService,
        api_config_service_1.ApiConfigService,
        sdk_nestjs_cache_1.CacheService,
        protocol_service_1.ProtocolService,
        transaction_action_service_1.TransactionActionService])
], PoolService);
exports.PoolService = PoolService;
//# sourceMappingURL=pool.service.js.map