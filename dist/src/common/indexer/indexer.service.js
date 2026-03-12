"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const block_filter_1 = require("../../endpoints/blocks/entities/block.filter");
const collection_filter_1 = require("../../endpoints/collections/entities/collection.filter");
const nft_filter_1 = require("../../endpoints/nfts/entities/nft.filter");
const round_filter_1 = require("../../endpoints/rounds/entities/round.filter");
const smart_contract_result_filter_1 = require("../../endpoints/sc-results/entities/smart.contract.result.filter");
const token_filter_1 = require("../../endpoints/tokens/entities/token.filter");
const token_with_roles_filter_1 = require("../../endpoints/tokens/entities/token.with.roles.filter");
const transaction_filter_1 = require("../../endpoints/transactions/entities/transaction.filter");
const metrics_events_constants_1 = require("../../utils/metrics-events.constants");
const token_assets_1 = require("../assets/entities/token.assets");
const query_pagination_1 = require("../entities/query.pagination");
const log_performance_decorator_1 = require("../../utils/log.performance.decorator");
const account_query_options_1 = require("../../endpoints/accounts/entities/account.query.options");
const mini_block_filter_1 = require("../../endpoints/miniblocks/entities/mini.block.filter");
const account_history_filter_1 = require("../../endpoints/accounts/entities/account.history.filter");
const account_assets_1 = require("../assets/entities/account.assets");
const application_filter_1 = require("../../endpoints/applications/entities/application.filter");
const events_filter_1 = require("../../endpoints/events/entities/events.filter");
let IndexerService = class IndexerService {
    constructor(indexerInterface) {
        this.indexerInterface = indexerInterface;
    }
    async getAccountsCount(filter) {
        return await this.indexerInterface.getAccountsCount(filter);
    }
    async getScResultsCount(filter) {
        return await this.indexerInterface.getScResultsCount(filter);
    }
    async getAccountDeploysCount(address) {
        return await this.indexerInterface.getAccountDeploysCount(address);
    }
    async getBlocksCount(filter) {
        return await this.indexerInterface.getBlocksCount(filter);
    }
    async getBlocks(filter, queryPagination) {
        return await this.indexerInterface.getBlocks(filter, queryPagination);
    }
    async getNftCollectionCount(filter) {
        return await this.indexerInterface.getNftCollectionCount(filter);
    }
    async getNftCountForAddress(address, filter) {
        return await this.indexerInterface.getNftCountForAddress(address, filter);
    }
    async getCollectionCountForAddress(address, filter) {
        return await this.indexerInterface.getCollectionCountForAddress(address, filter);
    }
    async getNftCount(filter) {
        return await this.indexerInterface.getNftCount(filter);
    }
    async getNftOwnersCount(identifier) {
        return await this.indexerInterface.getNftOwnersCount(identifier);
    }
    async getTransfersCount(filter) {
        return await this.indexerInterface.getTransfersCount(filter);
    }
    async getTokenCountForAddress(address, filter) {
        return await this.indexerInterface.getTokenCountForAddress(address, filter);
    }
    async getTokenAccountsCount(identifier) {
        return await this.indexerInterface.getTokenAccountsCount(identifier);
    }
    async getTokenAccounts(pagination, identifier) {
        return await this.indexerInterface.getTokenAccounts(pagination, identifier);
    }
    async getTokensWithRolesForAddressCount(address, filter) {
        return await this.indexerInterface.getTokensWithRolesForAddressCount(address, filter);
    }
    async getNftTagCount(search) {
        return await this.indexerInterface.getNftTagCount(search);
    }
    async getRoundCount(filter) {
        return await this.indexerInterface.getRoundCount(filter);
    }
    async getAccountScResultsCount(address) {
        return await this.indexerInterface.getAccountScResultsCount(address);
    }
    async getTransactionCountForAddress(address) {
        return await this.indexerInterface.getTransactionCountForAddress(address);
    }
    async getTransactionCount(filter, address) {
        return await this.indexerInterface.getTransactionCount(filter, address);
    }
    async getRound(shard, round) {
        return await this.indexerInterface.getRound(shard, round);
    }
    async getToken(identifier) {
        return await this.indexerInterface.getToken(identifier);
    }
    async getCollection(identifier) {
        return await this.indexerInterface.getCollection(identifier);
    }
    async getTransaction(txHash) {
        return await this.indexerInterface.getTransaction(txHash);
    }
    async getScDeploy(address) {
        return await this.indexerInterface.getScDeploy(address);
    }
    async getScResult(scHash) {
        return await this.indexerInterface.getScResult(scHash);
    }
    async getBlock(hash) {
        return await this.indexerInterface.getBlock(hash);
    }
    async getBlockByMiniBlockHash(miniBlockHash) {
        return await this.indexerInterface.getBlockByMiniBlockHash(miniBlockHash);
    }
    async getMiniBlock(miniBlockHash) {
        return await this.indexerInterface.getMiniBlock(miniBlockHash);
    }
    async getMiniBlocks(pagination, filter) {
        return await this.indexerInterface.getMiniBlocks(pagination, filter);
    }
    async getTag(tag) {
        return await this.indexerInterface.getTag(tag);
    }
    async getTransfers(filter, pagination) {
        return await this.indexerInterface.getTransfers(filter, pagination);
    }
    async getTokensWithRolesForAddress(address, filter, pagination) {
        return await this.indexerInterface.getTokensWithRolesForAddress(address, filter, pagination);
    }
    async getRounds(filter) {
        return await this.indexerInterface.getRounds(filter);
    }
    async getNftCollections(pagination, filter, address) {
        return await this.indexerInterface.getNftCollections(pagination, filter, address);
    }
    async getAccountDcdtByAddressesAndIdentifier(identifier, addresses) {
        return await this.indexerInterface.getAccountDcdtByAddressesAndIdentifier(identifier, addresses);
    }
    async getNftTags(pagination, search) {
        return await this.indexerInterface.getNftTags(pagination, search);
    }
    async getScResults(pagination, filter) {
        return await this.indexerInterface.getScResults(pagination, filter);
    }
    async getAccountScResults(address, pagination) {
        return await this.indexerInterface.getAccountScResults(address, pagination);
    }
    async getAccount(address) {
        return await this.indexerInterface.getAccount(address);
    }
    async getAccounts(queryPagination, filter, fields) {
        return await this.indexerInterface.getAccounts(queryPagination, filter, fields);
    }
    async getAccountDeploys(pagination, address) {
        return await this.indexerInterface.getAccountDeploys(pagination, address);
    }
    async getAccountContracts(pagination, address) {
        return await this.indexerInterface.getAccountContracts(pagination, address);
    }
    async getAccountContractsCount(address) {
        return await this.indexerInterface.getAccountContractsCount(address);
    }
    async getAccountHistory(address, pagination, filter) {
        return await this.indexerInterface.getAccountHistory(address, pagination, filter);
    }
    async getProviderDelegators(address, pagination) {
        return await this.indexerInterface.getProviderDelegators(address, pagination);
    }
    async getProviderDelegatorsCount(address) {
        return await this.indexerInterface.getProviderDelegatorsCount(address);
    }
    async getAccountHistoryCount(address, filter) {
        return await this.indexerInterface.getAccountHistoryCount(address, filter);
    }
    async getAccountTokenHistoryCount(address, tokenIdentifier, filter) {
        return await this.indexerInterface.getAccountTokenHistoryCount(address, tokenIdentifier, filter);
    }
    async getAccountTokenHistory(address, tokenIdentifier, pagination, filter) {
        return await this.indexerInterface.getAccountTokenHistory(address, tokenIdentifier, pagination, filter);
    }
    async getAccountDcdtHistory(address, pagination, filter) {
        return await this.indexerInterface.getAccountDcdtHistory(address, pagination, filter);
    }
    async getAccountDcdtHistoryCount(address, filter) {
        return await this.indexerInterface.getAccountDcdtHistoryCount(address, filter);
    }
    async getTransactions(filter, pagination, address) {
        return await this.indexerInterface.getTransactions(filter, pagination, address);
    }
    async getTokensForAddress(address, queryPagination, filter) {
        return await this.indexerInterface.getTokensForAddress(address, queryPagination, filter);
    }
    async getTransactionLogs(hashes, eventsIndex, txHashField) {
        return await this.indexerInterface.getTransactionLogs(hashes, eventsIndex, txHashField);
    }
    async getTransactionScResults(txHash) {
        return await this.indexerInterface.getTransactionScResults(txHash);
    }
    async getScResultsForTransactions(elasticTransactions) {
        return await this.indexerInterface.getScResultsForTransactions(elasticTransactions);
    }
    async getAccountDcdtByIdentifiers(identifiers, pagination) {
        return await this.indexerInterface.getAccountDcdtByIdentifiers(identifiers, pagination);
    }
    async getAccountsDcdtByCollection(identifiers, pagination) {
        return await this.indexerInterface.getAccountsDcdtByCollection(identifiers, pagination);
    }
    async getNftsForAddress(address, filter, pagination) {
        return await this.indexerInterface.getNftsForAddress(address, filter, pagination);
    }
    async getNfts(pagination, filter, identifier) {
        return await this.indexerInterface.getNfts(pagination, filter, identifier);
    }
    async getTransactionBySenderAndNonce(sender, nonce) {
        return await this.indexerInterface.getTransactionBySenderAndNonce(sender, nonce);
    }
    async getTransactionReceipts(txHash) {
        return await this.indexerInterface.getTransactionReceipts(txHash);
    }
    async getAllTokensMetadata(action) {
        return await this.indexerInterface.getAllTokensMetadata(action);
    }
    async getDcdtAccountsCount(identifier) {
        return await this.indexerInterface.getDcdtAccountsCount(identifier);
    }
    async getAllAccountsWithToken(identifier, action) {
        return await this.indexerInterface.getAllAccountsWithToken(identifier, action);
    }
    async getPublicKeys(shard, epoch) {
        return await this.indexerInterface.getPublicKeys(shard, epoch);
    }
    async getCollectionsForAddress(address, filter, pagination) {
        return await this.indexerInterface.getCollectionsForAddress(address, filter, pagination);
    }
    async getAssetsForToken(identifier) {
        return await this.indexerInterface.getAssetsForToken(identifier);
    }
    async setAssetsForToken(identifier, value) {
        return await this.indexerInterface.setAssetsForToken(identifier, value);
    }
    async setIsWhitelistedStorageForToken(identifier, value) {
        return await this.indexerInterface.setIsWhitelistedStorageForToken(identifier, value);
    }
    async setMediaForToken(identifier, value) {
        return await this.indexerInterface.setMediaForToken(identifier, value);
    }
    async setMetadataForToken(identifier, value) {
        return await this.indexerInterface.setMetadataForToken(identifier, value);
    }
    async setExtraCollectionFields(identifier, isVerified, holderCount, nftCount) {
        return await this.indexerInterface.setExtraCollectionFields(identifier, isVerified, holderCount, nftCount);
    }
    async setAccountTransfersLast24h(address, transfersLast24h) {
        return await this.indexerInterface.setAccountTransfersLast24h(address, transfersLast24h);
    }
    async getNftCollectionsByIds(identifiers) {
        return await this.indexerInterface.getNftCollectionsByIds(identifiers);
    }
    async getSmartContractResults(transactionHashes) {
        return await this.indexerInterface.getSmartContractResults(transactionHashes);
    }
    async getAccountsForAddresses(addresses) {
        return await this.indexerInterface.getAccountsForAddresses(addresses);
    }
    async setAccountAssetsFields(address, assets) {
        return await this.indexerInterface.setAccountAssetsFields(address, assets);
    }
    async ensureAccountsWritable() {
        return await this.indexerInterface.ensureAccountsWritable();
    }
    async ensureTokensWritable() {
        return await this.indexerInterface.ensureTokensWritable();
    }
    async getBlockByTimestampAndShardId(timestamp, shardId) {
        return await this.indexerInterface.getBlockByTimestampAndShardId(timestamp, shardId);
    }
    async getVersion() {
        return await this.indexerInterface.getVersion();
    }
    async getApplications(filter, pagination) {
        return await this.indexerInterface.getApplications(filter, pagination);
    }
    async getApplication(address) {
        return await this.indexerInterface.getApplication(address);
    }
    async getApplicationCount(filter) {
        return await this.indexerInterface.getApplicationCount(filter);
    }
    async getAddressesWithTransfersLast24h() {
        return await this.indexerInterface.getAddressesWithTransfersLast24h();
    }
    async getEvents(pagination, filter) {
        return await this.indexerInterface.getEvents(pagination, filter);
    }
    async getEvent(txHash) {
        return await this.indexerInterface.getEvent(txHash);
    }
    async getEventsCount(filter) {
        return await this.indexerInterface.getEventsCount(filter);
    }
    async getAccountNftReceivedTimestamps(address, identifiers) {
        return await this.indexerInterface.getAccountNftReceivedTimestamps(address, identifiers);
    }
};
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [account_query_options_1.AccountQueryOptions]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountsCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [smart_contract_result_filter_1.SmartContractResultFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getScResultsCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountDeploysCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [block_filter_1.BlockFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getBlocksCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [block_filter_1.BlockFilter, query_pagination_1.QueryPagination]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getBlocks", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [collection_filter_1.CollectionFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getNftCollectionCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, nft_filter_1.NftFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getNftCountForAddress", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, collection_filter_1.CollectionFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getCollectionCountForAddress", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [nft_filter_1.NftFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getNftCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getNftOwnersCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [transaction_filter_1.TransactionFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTransfersCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, token_filter_1.TokenFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTokenCountForAddress", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTokenAccountsCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [query_pagination_1.QueryPagination, String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTokenAccounts", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, token_with_roles_filter_1.TokenWithRolesFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTokensWithRolesForAddressCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getNftTagCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [round_filter_1.RoundFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getRoundCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountScResultsCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTransactionCountForAddress", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [transaction_filter_1.TransactionFilter, String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTransactionCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getRound", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getToken", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getCollection", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTransaction", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getScDeploy", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getScResult", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getBlock", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getBlockByMiniBlockHash", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getMiniBlock", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [query_pagination_1.QueryPagination, mini_block_filter_1.MiniBlockFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getMiniBlocks", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTag", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [transaction_filter_1.TransactionFilter, query_pagination_1.QueryPagination]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTransfers", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, token_with_roles_filter_1.TokenWithRolesFilter, query_pagination_1.QueryPagination]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTokensWithRolesForAddress", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [round_filter_1.RoundFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getRounds", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [query_pagination_1.QueryPagination, collection_filter_1.CollectionFilter, String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getNftCollections", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountDcdtByAddressesAndIdentifier", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [query_pagination_1.QueryPagination, String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getNftTags", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [query_pagination_1.QueryPagination, smart_contract_result_filter_1.SmartContractResultFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getScResults", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, query_pagination_1.QueryPagination]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountScResults", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [query_pagination_1.QueryPagination, account_query_options_1.AccountQueryOptions, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccounts", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [query_pagination_1.QueryPagination, String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountDeploys", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [query_pagination_1.QueryPagination, String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountContracts", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountContractsCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, query_pagination_1.QueryPagination, account_history_filter_1.AccountHistoryFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountHistory", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, query_pagination_1.QueryPagination]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getProviderDelegators", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getProviderDelegatorsCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, account_history_filter_1.AccountHistoryFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountHistoryCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, account_history_filter_1.AccountHistoryFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountTokenHistoryCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, query_pagination_1.QueryPagination, account_history_filter_1.AccountHistoryFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountTokenHistory", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, query_pagination_1.QueryPagination, account_history_filter_1.AccountHistoryFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountDcdtHistory", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, account_history_filter_1.AccountHistoryFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountDcdtHistoryCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [transaction_filter_1.TransactionFilter, query_pagination_1.QueryPagination, String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTransactions", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, query_pagination_1.QueryPagination, token_filter_1.TokenFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTokensForAddress", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTransactionLogs", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTransactionScResults", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getScResultsForTransactions", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, query_pagination_1.QueryPagination]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountDcdtByIdentifiers", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, query_pagination_1.QueryPagination]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountsDcdtByCollection", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, nft_filter_1.NftFilter, query_pagination_1.QueryPagination]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getNftsForAddress", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [query_pagination_1.QueryPagination, nft_filter_1.NftFilter, String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getNfts", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTransactionBySenderAndNonce", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getTransactionReceipts", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Function]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAllTokensMetadata", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getDcdtAccountsCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAllAccountsWithToken", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getPublicKeys", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, collection_filter_1.CollectionFilter, query_pagination_1.QueryPagination]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getCollectionsForAddress", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAssetsForToken", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, token_assets_1.TokenAssets]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "setAssetsForToken", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "setIsWhitelistedStorageForToken", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "setMediaForToken", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "setMetadataForToken", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Boolean, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "setExtraCollectionFields", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "setAccountTransfersLast24h", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getNftCollectionsByIds", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getSmartContractResults", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountsForAddresses", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, account_assets_1.AccountAssets]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "setAccountAssetsFields", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "ensureAccountsWritable", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "ensureTokensWritable", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getBlockByTimestampAndShardId", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getVersion", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [application_filter_1.ApplicationFilter, query_pagination_1.QueryPagination]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getApplications", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getApplication", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [application_filter_1.ApplicationFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getApplicationCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAddressesWithTransfersLast24h", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getEvent", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [events_filter_1.EventsFilter]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getEventsCount", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetIndexerDuration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexerService.prototype, "getAccountNftReceivedTimestamps", null);
IndexerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)('IndexerInterface')),
    tslib_1.__metadata("design:paramtypes", [Object])
], IndexerService);
exports.IndexerService = IndexerService;
//# sourceMappingURL=indexer.service.js.map