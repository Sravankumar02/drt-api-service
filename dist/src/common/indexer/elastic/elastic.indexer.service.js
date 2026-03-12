"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticIndexerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_elastic_1 = require("@sravankumar02/sdk-nestjs-elastic");
const api_config_service_1 = require("../../api-config/api.config.service");
const dcdt_type_1 = require("../../../endpoints/dcdt/entities/dcdt.type");
const sort_order_1 = require("../../entities/sort.order");
const elastic_indexer_helper_1 = require("./elastic.indexer.helper");
const entities_1 = require("../entities");
const sort_collections_1 = require("../../../endpoints/collections/entities/sort.collections");
const account_sort_1 = require("../../../endpoints/accounts/entities/account.sort");
const not_writable_error_1 = require("../entities/not.writable.error");
const nft_type_1 = require("../entities/nft.type");
const circuit_breaker_proxy_service_1 = require("./circuit-breaker/circuit.breaker.proxy.service");
const time_utils_1 = require("../../../utils/time.utils");
let ElasticIndexerService = class ElasticIndexerService {
    constructor(apiConfigService, elasticService, indexerHelper) {
        this.apiConfigService = apiConfigService;
        this.elasticService = elasticService;
        this.indexerHelper = indexerHelper;
        this.nonFungibleDcdtTypes = [nft_type_1.NftType.NonFungibleDCDT, nft_type_1.NftType.NonFungibleDCDTv2, nft_type_1.NftType.DynamicNonFungibleDCDT];
        this.semiFungibleDcdtTypes = [nft_type_1.NftType.SemiFungibleDCDT, nft_type_1.NftType.DynamicSemiFungibleDCDT];
        this.metaDcdtTypes = [nft_type_1.NftType.MetaDCDT, nft_type_1.NftType.DynamicMetaDCDT];
    }
    async getAccountsCount(filter) {
        const query = this.indexerHelper.buildAccountFilterQuery(filter);
        return await this.elasticService.getCount('accounts', query);
    }
    async getScResultsCount(filter) {
        const query = this.indexerHelper.buildResultsFilterQuery(filter);
        return await this.elasticService.getCount('operations', query);
    }
    async getAccountDeploysCount(address) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [sdk_nestjs_elastic_1.QueryType.Match("deployer", address)]);
        return await this.elasticService.getCount('scdeploys', elasticQuery);
    }
    async getBlocksCount(filter) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, await this.indexerHelper.buildElasticBlocksFilter(filter));
        return await this.elasticService.getCount('blocks', elasticQuery);
    }
    async getBlocks(filter, queryPagination) {
        const order = filter.order === sort_order_1.SortOrder.asc ? sdk_nestjs_elastic_1.ElasticSortOrder.ascending : sdk_nestjs_elastic_1.ElasticSortOrder.descending;
        let elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withPagination(queryPagination)
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, await this.indexerHelper.buildElasticBlocksFilter(filter));
        elasticQuery = elasticQuery.withSort([
            { name: "timestamp", order: order },
            { name: "shardId", order: sdk_nestjs_elastic_1.ElasticSortOrder.ascending },
        ]);
        const result = await this.elasticService.getList('blocks', 'hash', elasticQuery);
        return result;
    }
    async getNftCollectionCount(filter) {
        const elasticQuery = this.indexerHelper.buildCollectionRolesFilter(filter);
        return await this.elasticService.getCount('tokens', elasticQuery);
    }
    async getNftCountForAddress(address, filter) {
        const elasticQuery = this.indexerHelper.buildElasticNftFilter(filter, undefined, address);
        return await this.elasticService.getCount('accountsdcdt', elasticQuery);
    }
    async getCollectionCountForAddress(address, filter) {
        const elasticQuery = this.indexerHelper.buildCollectionRolesFilter(filter, address);
        return await this.elasticService.getCount('tokens', elasticQuery);
    }
    async getNftCount(filter) {
        const elasticQuery = this.indexerHelper.buildElasticNftFilter(filter);
        return await this.elasticService.getCount('tokens', elasticQuery);
    }
    async getNftOwnersCount(identifier) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.mustNot, [sdk_nestjs_elastic_1.QueryType.Match('address', 'pending')])
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [sdk_nestjs_elastic_1.QueryType.Match('identifier', identifier, sdk_nestjs_elastic_1.QueryOperator.AND)]);
        return await this.elasticService.getCount('accountsdcdt', elasticQuery);
    }
    async getTransfersCount(filter) {
        const elasticQuery = this.indexerHelper.buildTransferFilterQuery(filter);
        return await this.elasticService.getCount('operations', elasticQuery);
    }
    async getTokenCountForAddress(address, filter) {
        let query = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withMustCondition(sdk_nestjs_elastic_1.QueryType.Match('address', address));
        query = this.buildTokenFilter(query, filter);
        return await this.elasticService.getCount('accountsdcdt', query);
    }
    async getTokensForAddress(address, queryPagination, filter) {
        let query = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withMustCondition(sdk_nestjs_elastic_1.QueryType.Match('address', address))
            .withPagination({ from: queryPagination.from, size: queryPagination.size });
        query = this.buildTokenFilter(query, filter);
        return await this.elasticService.getList('accountsdcdt', 'token', query);
    }
    async getTokenAccountsCount(identifier) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [sdk_nestjs_elastic_1.QueryType.Match("token", identifier, sdk_nestjs_elastic_1.QueryOperator.AND)]);
        const count = await this.elasticService.getCount("accountsdcdt", elasticQuery);
        return count;
    }
    async getTokenAccounts(pagination, identifier) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withPagination(pagination)
            .withSort([{ name: "balanceNum", order: sdk_nestjs_elastic_1.ElasticSortOrder.descending }])
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [sdk_nestjs_elastic_1.QueryType.Match("token", identifier, sdk_nestjs_elastic_1.QueryOperator.AND)])
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.mustNot, [sdk_nestjs_elastic_1.QueryType.Match('address', 'pending')]);
        return await this.elasticService.getList("accountsdcdt", identifier, elasticQuery);
    }
    async getTokensWithRolesForAddressCount(address, filter) {
        const elasticQuery = this.indexerHelper.buildTokensWithRolesForAddressQuery(address, filter);
        return await this.elasticService.getCount('tokens', elasticQuery);
    }
    async getNftTagCount(search) {
        const query = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withSearchWildcardCondition(search, ['tag']);
        return await this.elasticService.getCount('tags', query);
    }
    async getRoundCount(filter) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, await this.indexerHelper.buildElasticRoundsFilter(filter));
        return await this.elasticService.getCount('rounds', elasticQuery);
    }
    async getAccountScResultsCount(address) {
        const query = this.indexerHelper.buildSmartContractResultFilterQuery(address);
        return await this.elasticService.getCount('operations', query);
    }
    async getTransactionCountForAddress(address) {
        const queries = [
            sdk_nestjs_elastic_1.QueryType.Match('sender', address),
            sdk_nestjs_elastic_1.QueryType.Match('receiver', address),
        ];
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withMustMatchCondition('type', 'normal')
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.should, queries);
        return await this.elasticService.getCount('operations', elasticQuery);
    }
    async getTransactionCount(filter, address) {
        const elasticQuery = this.indexerHelper.buildTransactionFilterQuery(filter, address);
        return await this.elasticService.getCount('operations', elasticQuery);
    }
    async getRound(shard, round) {
        return await this.elasticService.getItem('rounds', 'round', `${shard}_${round}`);
    }
    async getToken(identifier) {
        return await this.elasticService.getItem('tokens', 'identifier', identifier);
    }
    async getCollection(identifier) {
        return await this.elasticService.getItem('tokens', '_id', identifier);
    }
    async getVersion() {
        const query = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withMustMatchCondition('key', 'indexer-version');
        const result = await this.elasticService.getList('values', '_search', query);
        if (result && result.length > 0) {
            return result[0].value;
        }
        else {
            return undefined;
        }
    }
    async getTransaction(txHash) {
        const transaction = await this.elasticService.getItem('operations', 'txHash', txHash);
        this.processTransaction(transaction);
        return transaction;
    }
    async getScDeploy(address) {
        return await this.elasticService.getItem('scdeploys', '_id', address);
    }
    async getScResult(scHash) {
        const result = await this.elasticService.getItem('operations', 'hash', scHash);
        if ((result === null || result === void 0 ? void 0 : result.type) !== 'unsigned') {
            return undefined;
        }
        this.processTransaction(result);
        return result;
    }
    async getBlock(hash) {
        return await this.elasticService.getItem('blocks', 'hash', hash);
    }
    async getBlockByMiniBlockHash(miniBlockHash) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [sdk_nestjs_elastic_1.QueryType.Match('miniBlocksHashes', miniBlockHash)])
            .withSort([{ name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending }]);
        const result = await this.elasticService.getList('blocks', '_search', elasticQuery);
        return result.length > 0 ? result[0] : undefined;
    }
    async getMiniBlock(miniBlockHash) {
        return await this.elasticService.getItem('miniblocks', 'miniBlockHash', miniBlockHash);
    }
    async getTag(tag) {
        return await this.elasticService.getItem('tags', 'tag', sdk_nestjs_common_1.BinaryUtils.base64Encode(tag));
    }
    async getTransfers(filter, pagination) {
        const sortOrder = !filter.order || filter.order === sort_order_1.SortOrder.desc ? sdk_nestjs_elastic_1.ElasticSortOrder.descending : sdk_nestjs_elastic_1.ElasticSortOrder.ascending;
        const timestamp = { name: 'timestamp', order: sortOrder };
        const nonce = { name: 'nonce', order: sortOrder };
        const elasticQuery = this.indexerHelper.buildTransferFilterQuery(filter)
            .withPagination({ from: pagination.from, size: pagination.size })
            .withSort([timestamp, nonce]);
        const elasticOperations = await this.elasticService.getList('operations', 'txHash', elasticQuery);
        this.bulkProcessTransactions(elasticOperations);
        return elasticOperations;
    }
    async getTokensWithRolesForAddress(address, filter, pagination) {
        const elasticQuery = this.indexerHelper.buildTokensWithRolesForAddressQuery(address, filter, pagination);
        const tokenList = await this.elasticService.getList('tokens', 'identifier', elasticQuery);
        return tokenList;
    }
    async getRounds(filter) {
        var _a;
        const { from, size } = filter;
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withPagination({ from, size })
            .withSort([{ name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending }])
            .withCondition((_a = filter.condition) !== null && _a !== void 0 ? _a : sdk_nestjs_elastic_1.QueryConditionOptions.must, await this.indexerHelper.buildElasticRoundsFilter(filter));
        return await this.elasticService.getList('rounds', 'round', elasticQuery);
    }
    async getNftCollections(pagination, filter, address) {
        var _a;
        let elasticQuery = this.indexerHelper.buildCollectionRolesFilter(filter, address)
            .withPagination(pagination);
        const sort = (_a = filter.sort) !== null && _a !== void 0 ? _a : sort_collections_1.SortCollections.timestamp;
        const order = filter.order === sort_order_1.SortOrder.asc ? sdk_nestjs_elastic_1.ElasticSortOrder.ascending : sdk_nestjs_elastic_1.ElasticSortOrder.descending;
        if (sort === sort_collections_1.SortCollections.verifiedAndHolderCount) {
            elasticQuery = elasticQuery.withSort([
                { name: 'api_isVerified', order },
                { name: 'api_holderCount', order },
            ]);
        }
        else {
            elasticQuery = elasticQuery.withSort([
                { name: 'timestamp', order },
            ]);
        }
        return await this.elasticService.getList('tokens', 'identifier', elasticQuery);
    }
    async getNftCollectionsByIds(identifiers) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withPagination({ from: 0, size: identifiers.length + 1 })
            .withMustNotExistCondition('identifier')
            .withMustMultiShouldCondition(identifiers, identifier => sdk_nestjs_elastic_1.QueryType.Match('token', identifier, sdk_nestjs_elastic_1.QueryOperator.AND));
        return await this.elasticService.getList('tokens', 'identifier', elasticQuery);
    }
    async getSmartContractResults(transactionHashes) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withMustMatchCondition('type', 'unsigned')
            .withPagination({ from: 0, size: transactionHashes.length + 1 })
            .withSort([{ name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.ascending }])
            .withMustMultiShouldCondition(transactionHashes, hash => sdk_nestjs_elastic_1.QueryType.Match('originalTxHash', hash));
        return await this.elasticService.getList('operations', 'scHash', elasticQuery);
    }
    async getAccountsForAddresses(addresses) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withPagination({ from: 0, size: addresses.length + 1 })
            .withMustMultiShouldCondition(addresses, address => sdk_nestjs_elastic_1.QueryType.Match('address', address));
        return await this.elasticService.getList('accounts', 'address', elasticQuery);
    }
    async getAccountDcdtByAddressesAndIdentifier(identifier, addresses) {
        const queries = [];
        for (const address of addresses) {
            queries.push(sdk_nestjs_elastic_1.QueryType.Match('address', address));
        }
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withPagination({ from: 0, size: addresses.length })
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.mustNot, [sdk_nestjs_elastic_1.QueryType.Match("address", "pending")])
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [sdk_nestjs_elastic_1.QueryType.Match('token', identifier, sdk_nestjs_elastic_1.QueryOperator.AND)])
            .withRangeFilter("balanceNum", new sdk_nestjs_elastic_1.RangeGreaterThanOrEqual(0))
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.should, queries);
        return await this.elasticService.getList('accountsdcdt', 'identifier', elasticQuery);
    }
    async getNftTags(pagination, search) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withPagination(pagination)
            .withSearchWildcardCondition(search, ['tag'])
            .withSort([{ name: 'count', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending }]);
        return await this.elasticService.getList('tags', 'tag', elasticQuery);
    }
    async getScResults(pagination, filter) {
        const elasticQuery = this.indexerHelper.buildResultsFilterQuery(filter)
            .withPagination(pagination);
        const results = await this.elasticService.getList('operations', 'hash', elasticQuery);
        this.bulkProcessTransactions(results);
        return results;
    }
    async getMiniBlocks(pagination, filter) {
        let query = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withPagination(pagination)
            .withSort([{ name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending }]);
        if (filter.hashes) {
            query = query.withShouldCondition(filter.hashes.map(hash => sdk_nestjs_elastic_1.QueryType.Match('_id', hash)));
        }
        if (filter.type) {
            query = query.withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [sdk_nestjs_elastic_1.QueryType.Match("type", filter.type)]);
        }
        return await this.elasticService.getList('miniblocks', 'miniBlockHash', query);
    }
    async getAccountScResults(address, pagination) {
        const elasticQuery = this.indexerHelper.buildSmartContractResultFilterQuery(address)
            .withPagination(pagination)
            .withSort([{ name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending }]);
        return await this.elasticService.getList('operations', 'hash', elasticQuery);
    }
    async getAccounts(queryPagination, filter, fields) {
        var _a;
        let elasticQuery = this.indexerHelper.buildAccountFilterQuery(filter);
        const sortOrder = !filter.order || filter.order === sort_order_1.SortOrder.desc ? sdk_nestjs_elastic_1.ElasticSortOrder.descending : sdk_nestjs_elastic_1.ElasticSortOrder.ascending;
        const sort = (_a = filter.sort) !== null && _a !== void 0 ? _a : account_sort_1.AccountSort.balance;
        switch (sort) {
            case account_sort_1.AccountSort.balance:
                elasticQuery = elasticQuery.withSort([{ name: 'balanceNum', order: sortOrder }]);
                break;
            case account_sort_1.AccountSort.transfersLast24h:
                if (this.apiConfigService.getAccountExtraDetailsTransfersLast24hUrl()) {
                    elasticQuery = elasticQuery.withSort([{ name: 'api_transfersLast24h', order: sortOrder }]);
                }
                else {
                    elasticQuery = elasticQuery
                        .withSort([{ name: 'timestamp', order: sortOrder }])
                        .withMustExistCondition('currentOwner');
                }
                break;
            default:
                elasticQuery = elasticQuery.withSort([{ name: sort.toString(), order: sortOrder }]);
                break;
        }
        elasticQuery = elasticQuery.withPagination(queryPagination);
        if (fields && fields.length > 0) {
            elasticQuery = elasticQuery.withFields(fields);
        }
        return await this.elasticService.getList('accounts', 'address', elasticQuery);
    }
    async getAccount(address) {
        return await this.elasticService.getItem('accounts', 'address', address);
    }
    async getAccountDeploys(pagination, address) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withPagination(pagination)
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [sdk_nestjs_elastic_1.QueryType.Match("deployer", address)])
            .withSort([{ name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending }]);
        return await this.elasticService.getList('scdeploys', "contract", elasticQuery);
    }
    async getAccountContracts(pagination, address) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withPagination(pagination)
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [sdk_nestjs_elastic_1.QueryType.Match("currentOwner", address)])
            .withSort([{ name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending }]);
        return await this.elasticService.getList('scdeploys', "contract", elasticQuery);
    }
    async getAccountContractsCount(address) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [sdk_nestjs_elastic_1.QueryType.Match("currentOwner", address)]);
        return await this.elasticService.getCount('scdeploys', elasticQuery);
    }
    async getProviderDelegators(address, pagination) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withPagination(pagination)
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [sdk_nestjs_elastic_1.QueryType.Match("contract", address)])
            .withSort([{ name: 'activeStake', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending }]);
        return await this.elasticService.getList("delegators", "contract", elasticQuery);
    }
    async getProviderDelegatorsCount(address) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [sdk_nestjs_elastic_1.QueryType.Match("contract", address)]);
        return await this.elasticService.getCount('delegators', elasticQuery);
    }
    async getAccountHistory(address, pagination, filter) {
        const elasticQuery = this.indexerHelper.buildAccountHistoryFilterQuery(address, undefined, filter)
            .withPagination(pagination)
            .withSort([{ name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending }]);
        return await this.elasticService.getList('accountshistory', 'address', elasticQuery);
    }
    async getAccountTokenHistory(address, tokenIdentifier, pagination, filter) {
        const elasticQuery = this.indexerHelper.buildAccountHistoryFilterQuery(address, tokenIdentifier, filter)
            .withPagination(pagination)
            .withSort([{ name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending }]);
        return await this.elasticService.getList('accountsdcdthistory', 'address', elasticQuery);
    }
    async getAccountHistoryCount(address, filter) {
        const elasticQuery = this.indexerHelper.buildAccountHistoryFilterQuery(address, undefined, filter);
        return await this.elasticService.getCount('accountshistory', elasticQuery);
    }
    async getAccountTokenHistoryCount(address, tokenIdentifier, filter) {
        const elasticQuery = this.indexerHelper.buildAccountHistoryFilterQuery(address, tokenIdentifier, filter);
        return await this.elasticService.getCount('accountsdcdthistory', elasticQuery);
    }
    async getAccountDcdtHistory(address, pagination, filter) {
        const elasticQuery = this.indexerHelper.buildAccountHistoryFilterQuery(address, undefined, filter)
            .withPagination(pagination)
            .withSort([{ name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending }]);
        return await this.elasticService.getList('accountsdcdthistory', 'address', elasticQuery);
    }
    async getAccountDcdtHistoryCount(address, filter) {
        const elasticQuery = this.indexerHelper.buildAccountHistoryFilterQuery(address, undefined, filter);
        return await this.elasticService.getCount('accountsdcdthistory', elasticQuery);
    }
    async getTransactions(filter, pagination, address) {
        const sortOrder = !filter.order || filter.order === sort_order_1.SortOrder.desc ? sdk_nestjs_elastic_1.ElasticSortOrder.descending : sdk_nestjs_elastic_1.ElasticSortOrder.ascending;
        const timestamp = { name: 'timestamp', order: sortOrder };
        const nonce = { name: 'nonce', order: sortOrder };
        const elasticQuery = this.indexerHelper.buildTransactionFilterQuery(filter, address)
            .withPagination({ from: pagination.from, size: pagination.size })
            .withSort([timestamp, nonce]);
        const transactions = await this.elasticService.getList('operations', 'txHash', elasticQuery);
        this.bulkProcessTransactions(transactions);
        return transactions;
    }
    processTransaction(transaction) {
        if (transaction && !transaction.function) {
            transaction.function = transaction.operation;
        }
    }
    bulkProcessTransactions(transactions) {
        if (!transactions || transactions.length === 0) {
            return;
        }
        for (let i = 0; i < transactions.length; i++) {
            const transaction = transactions[i];
            if (transaction && !transaction.function) {
                transaction.function = transaction.operation;
            }
        }
    }
    buildTokenFilter(query, filter) {
        if (filter.includeMetaDCDT === true) {
            query = query.withMustMultiShouldCondition([entities_1.TokenType.FungibleDCDT, entities_1.TokenType.MetaDCDT], type => sdk_nestjs_elastic_1.QueryType.Match('type', type));
        }
        else {
            query = query.withMustNotCondition(sdk_nestjs_elastic_1.QueryType.Exists('identifier'));
        }
        if (filter.type) {
            query = query.withMustMatchCondition('type', filter.type);
        }
        if (filter.identifier) {
            query = query.withMustCondition(sdk_nestjs_elastic_1.QueryType.Match('token', filter.identifier));
        }
        if (filter.identifiers) {
            query = query.withShouldCondition(filter.identifiers.map(identifier => sdk_nestjs_elastic_1.QueryType.Match('token', identifier)));
        }
        if (filter.name) {
            query = query.withMustCondition(sdk_nestjs_elastic_1.QueryType.Nested('data.name', [new sdk_nestjs_elastic_1.MatchQuery('data.name', filter.name)]));
        }
        if (filter.search) {
            query = query.withMustCondition(sdk_nestjs_elastic_1.QueryType.Nested('data.name', [new sdk_nestjs_elastic_1.MatchQuery('data.name', filter.name)]));
        }
        return query;
    }
    async getTransactionLogs(hashes, eventsIndex, txHashField) {
        const queries = [];
        for (const hash of hashes) {
            queries.push(sdk_nestjs_elastic_1.QueryType.Match(txHashField, hash));
        }
        const elasticQueryLogs = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withPagination({ from: 0, size: 10000 })
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.should, queries);
        return await this.elasticService.getList(eventsIndex, 'id', elasticQueryLogs);
    }
    async getTransactionScResults(txHash) {
        const originalTxHashQuery = sdk_nestjs_elastic_1.QueryType.Match('originalTxHash', txHash);
        const timestamp = { name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.ascending };
        const elasticQuerySc = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withMustMatchCondition('type', 'unsigned')
            .withPagination({ from: 0, size: 100 })
            .withSort([timestamp])
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [originalTxHashQuery]);
        const results = await this.elasticService.getList('operations', 'hash', elasticQuerySc);
        this.bulkProcessTransactions(results);
        return results;
    }
    async getScResultsForTransactions(elasticTransactions) {
        const hashes = elasticTransactions
            .filter(x => x.hasOperations === true || x.hasScResults === true)
            .map(x => x.txHash);
        if (hashes.length === 0) {
            return [];
        }
        const maxSize = Math.min(hashes.length * 10, 1000);
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withMustMatchCondition('type', 'unsigned')
            .withPagination({ from: 0, size: maxSize })
            .withSort([{ name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.ascending }])
            .withMustMultiShouldCondition(hashes, hash => sdk_nestjs_elastic_1.QueryType.Match('originalTxHash', hash));
        return await this.elasticService.getList('operations', 'scHash', elasticQuery);
    }
    async getAccountDcdtByIdentifiers(identifiers, pagination) {
        if (identifiers.length === 0) {
            return [];
        }
        let elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create();
        if (pagination) {
            elasticQuery = elasticQuery.withPagination(pagination);
        }
        elasticQuery = elasticQuery
            .withSort([
            { name: "balanceNum", order: sdk_nestjs_elastic_1.ElasticSortOrder.descending },
            { name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending },
        ])
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.mustNot, [sdk_nestjs_elastic_1.QueryType.Match('address', 'pending')])
            .withMustMultiShouldCondition(identifiers, identifier => sdk_nestjs_elastic_1.QueryType.Match('identifier', identifier, sdk_nestjs_elastic_1.QueryOperator.AND));
        return await this.elasticService.getList('accountsdcdt', 'identifier', elasticQuery);
    }
    async getAccountsDcdtByCollection(identifiers, pagination) {
        if (identifiers.length === 0) {
            return [];
        }
        let elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create();
        if (pagination) {
            elasticQuery = elasticQuery.withPagination(pagination);
        }
        elasticQuery = elasticQuery
            .withSort([
            { name: "balanceNum", order: sdk_nestjs_elastic_1.ElasticSortOrder.descending },
            { name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending },
        ])
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.mustNot, [sdk_nestjs_elastic_1.QueryType.Match('address', 'pending')])
            .withMustMultiShouldCondition(identifiers, identifier => sdk_nestjs_elastic_1.QueryType.Match('collection', identifier, sdk_nestjs_elastic_1.QueryOperator.AND));
        return await this.elasticService.getList('accountsdcdt', 'identifier', elasticQuery);
    }
    async getNftsForAddress(address, filter, pagination) {
        const elasticQuery = this.indexerHelper.buildElasticNftFilter(filter, undefined, address)
            .withPagination(pagination)
            .withSort([
            { name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending },
            { name: 'tokenNonce', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending },
        ]);
        return await this.elasticService.getList('accountsdcdt', 'identifier', elasticQuery);
    }
    async getNfts(pagination, filter, identifier) {
        let elasticQuery = this.indexerHelper.buildElasticNftFilter(filter, identifier)
            .withPagination(pagination);
        if (filter.sort) {
            elasticQuery = elasticQuery.withSort([
                { name: filter.sort, order: filter.order === sort_order_1.SortOrder.desc ? sdk_nestjs_elastic_1.ElasticSortOrder.descending : sdk_nestjs_elastic_1.ElasticSortOrder.ascending },
            ]);
        }
        else {
            elasticQuery = elasticQuery.withSort([
                { name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending },
                { name: 'nonce', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending },
            ]);
        }
        if (identifier !== undefined) {
            const [tokensResult, accountsResult] = await Promise.all([
                this.elasticService.getList('tokens', 'identifier', elasticQuery).catch(() => []),
                this.elasticService.getList('accountsdcdt', 'identifier', sdk_nestjs_elastic_1.ElasticQuery.create()
                    .withMustMatchCondition('identifier', identifier, sdk_nestjs_elastic_1.QueryOperator.AND)
                    .withPagination(pagination)).catch(() => []),
            ]);
            const elasticNfts = tokensResult.length > 0 ? tokensResult : accountsResult;
            return elasticNfts;
        }
        else {
            const elasticNfts = await this.elasticService.getList('tokens', 'identifier', elasticQuery);
            return elasticNfts;
        }
    }
    async getTransactionBySenderAndNonce(sender, nonce) {
        const queries = [
            sdk_nestjs_elastic_1.QueryType.Match('sender', sender),
            sdk_nestjs_elastic_1.QueryType.Match('nonce', nonce),
        ];
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withMustMatchCondition('type', 'normal')
            .withPagination({ from: 0, size: 1 })
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, queries);
        return await this.elasticService.getList('operations', 'txHash', elasticQuery);
    }
    async getTransactionReceipts(txHash) {
        const receiptHashQuery = sdk_nestjs_elastic_1.QueryType.Match('txHash', txHash);
        const elasticQueryReceipts = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withPagination({ from: 0, size: 1 })
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [receiptHashQuery]);
        return await this.elasticService.getList('receipts', 'receiptHash', elasticQueryReceipts);
    }
    async getAllTokensMetadata(action) {
        const query = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withFields([
            'api_isWhitelistedStorage',
            'api_media',
            'api_metadata',
            'data.uris',
        ])
            .withMustExistCondition('identifier')
            .withMustMultiShouldCondition([dcdt_type_1.DcdtType.NonFungibleDCDT, dcdt_type_1.DcdtType.SemiFungibleDCDT, dcdt_type_1.DcdtType.MetaDCDT], type => sdk_nestjs_elastic_1.QueryType.Match('type', type))
            .withPagination({ from: 0, size: 10000 });
        return await this.elasticService.getScrollableList('tokens', 'identifier', query, action);
    }
    async getDcdtAccountsCount(identifier) {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [sdk_nestjs_elastic_1.QueryType.Match("token", identifier, sdk_nestjs_elastic_1.QueryOperator.AND)]);
        const count = await this.elasticService.getCount("accountsdcdt", elasticQuery);
        return count;
    }
    async getAllAccountsWithToken(identifier, action) {
        const query = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withPagination({ from: 0, size: 10000 })
            .withMustMatchCondition('token', identifier, sdk_nestjs_elastic_1.QueryOperator.AND);
        return await this.elasticService.getScrollableList('accountsdcdt', 'id', query, action);
    }
    async getPublicKeys(shard, epoch) {
        var _a, _b;
        const key = `${shard}_${epoch}`;
        const url = `${this.apiConfigService.getElasticUrl()}/validators/_search?q=_id:${key}`;
        const result = await this.elasticService.get(url);
        const hits = (_b = (_a = result.data) === null || _a === void 0 ? void 0 : _a.hits) === null || _b === void 0 ? void 0 : _b.hits;
        if (hits && hits.length > 0) {
            const publicKeys = hits[0]._source.publicKeys;
            return publicKeys;
        }
        return undefined;
    }
    async getCollectionsForAddress(address, filter, pagination) {
        var _a, _b, _c, _d, _e;
        let filterTypes = [...this.nonFungibleDcdtTypes, ...this.semiFungibleDcdtTypes];
        if (!filter.excludeMetaDCDT) {
            filterTypes.push(...this.metaDcdtTypes);
        }
        if (filter.type && filter.type.length > 0) {
            filterTypes = [];
            for (const type of filter.type) {
                switch (type) {
                    case nft_type_1.NftType.NonFungibleDCDT:
                        filterTypes.push(...this.nonFungibleDcdtTypes);
                        break;
                    case nft_type_1.NftType.SemiFungibleDCDT:
                        filterTypes.push(...this.semiFungibleDcdtTypes);
                        break;
                    case nft_type_1.NftType.MetaDCDT:
                        filterTypes.push(...this.metaDcdtTypes);
                        break;
                    default:
                        filterTypes.push(type);
                }
            }
        }
        const data = [];
        let afterKey = null;
        let remainingToSkip = pagination.from;
        let remainingToCollect = pagination.size;
        while (data.length < pagination.size) {
            const batchSize = Math.min(1000, remainingToSkip + remainingToCollect);
            const compositeAgg = {
                size: batchSize,
                sources: [
                    {
                        collection: {
                            terms: {
                                field: 'token',
                                order: 'asc',
                            },
                        },
                    },
                ],
            };
            if (afterKey) {
                compositeAgg.after = afterKey;
            }
            const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
                .withMustExistCondition('identifier')
                .withMustMatchCondition('address', address)
                .withPagination({ from: 0, size: 0 })
                .withMustMatchCondition('token', filter.collection, sdk_nestjs_elastic_1.QueryOperator.AND)
                .withMustMultiShouldCondition(filter.identifiers, identifier => sdk_nestjs_elastic_1.QueryType.Match('token', identifier, sdk_nestjs_elastic_1.QueryOperator.AND))
                .withSearchWildcardCondition(filter.search, ['token', 'name'])
                .withMustMultiShouldCondition(filterTypes, type => sdk_nestjs_elastic_1.QueryType.Match('type', type))
                .withMustMultiShouldCondition(filter.subType, subType => sdk_nestjs_elastic_1.QueryType.Match('type', subType))
                .withExtra({
                aggs: {
                    collections: {
                        composite: compositeAgg,
                        aggs: {
                            balance: {
                                sum: {
                                    field: 'balanceNum',
                                },
                            },
                        },
                    },
                },
            });
            const result = await this.elasticService.post(`${this.apiConfigService.getElasticUrl()}/accountsdcdt/_search`, elasticQuery.toJson());
            const buckets = ((_c = (_b = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.aggregations) === null || _b === void 0 ? void 0 : _b.collections) === null || _c === void 0 ? void 0 : _c.buckets) || [];
            if (buckets.length === 0) {
                break;
            }
            const batchData = buckets.map((bucket) => ({
                collection: bucket.key.collection,
                count: bucket.doc_count,
                balance: bucket.balance.value,
            }));
            if (remainingToSkip > 0) {
                const skipFromBatch = Math.min(remainingToSkip, batchData.length);
                remainingToSkip -= skipFromBatch;
                if (remainingToSkip === 0) {
                    const collectFromBatch = Math.min(remainingToCollect, batchData.length - skipFromBatch);
                    data.push(...batchData.slice(skipFromBatch, skipFromBatch + collectFromBatch));
                    remainingToCollect -= collectFromBatch;
                }
            }
            else {
                const collectFromBatch = Math.min(remainingToCollect, batchData.length);
                data.push(...batchData.slice(0, collectFromBatch));
                remainingToCollect -= collectFromBatch;
            }
            if (remainingToCollect === 0) {
                break;
            }
            const aggregations = (_e = (_d = result === null || result === void 0 ? void 0 : result.data) === null || _d === void 0 ? void 0 : _d.aggregations) === null || _e === void 0 ? void 0 : _e.collections;
            if (aggregations === null || aggregations === void 0 ? void 0 : aggregations.after_key) {
                afterKey = aggregations.after_key;
            }
            else {
                break;
            }
            if (buckets.length < batchSize) {
                break;
            }
        }
        return data;
    }
    async getAssetsForToken(identifier) {
        return await this.elasticService.getCustomValue('tokens', identifier, 'assets');
    }
    async setAssetsForToken(identifier, value) {
        return await this.elasticService.setCustomValue('tokens', identifier, 'assets', value);
    }
    async setIsWhitelistedStorageForToken(identifier, value) {
        return await this.elasticService.setCustomValue('tokens', identifier, 'isWhitelistedStorage', value);
    }
    async setMediaForToken(identifier, value) {
        return await this.elasticService.setCustomValue('tokens', identifier, 'media', value);
    }
    async setMetadataForToken(identifier, value) {
        return await this.elasticService.setCustomValue('tokens', identifier, 'metadata', value);
    }
    async getDcdtProperties(identifier) {
        return await this.elasticService.getItem('tokens', 'identifier', identifier);
    }
    async getAllFungibleTokens() {
        const query = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withMustMatchCondition('type', entities_1.TokenType.FungibleDCDT)
            .withFields(["name", "type", "currentOwner", "numDecimals", "properties", "timestamp", "ownersHistory", "paused"])
            .withMustNotExistCondition('identifier')
            .withPagination({ from: 0, size: 1000 });
        const allTokens = [];
        await this.elasticService.getScrollableList('tokens', 'identifier', query, async (tokens) => allTokens.push(...tokens));
        return allTokens;
    }
    async setExtraCollectionFields(identifier, isVerified, holderCount, nftCount) {
        return await this.elasticService.setCustomValues('tokens', identifier, {
            isVerified,
            holderCount,
            nftCount,
        });
    }
    async setAccountAssetsFields(address, assets) {
        return await this.elasticService.setCustomValues('accounts', address, { assets });
    }
    async ensureAccountsWritable() {
        await this.ensureCollectionWritable('accounts');
    }
    async ensureTokensWritable() {
        await this.ensureCollectionWritable('tokens');
    }
    async ensureCollectionWritable(collection) {
        const query = new sdk_nestjs_elastic_1.ElasticQuery().withPagination({ from: 0, size: 1 });
        const items = await this.elasticService.getList(collection, 'id', query);
        if (items.length === 0) {
            throw new Error(`No entries available in the '${collection}' collection`);
        }
        const item = items[0];
        try {
            await this.elasticService.setCustomValue(collection, item.id, 'ensureWritable', undefined);
        }
        catch (error) {
            if (error.status === common_1.HttpStatus.FORBIDDEN) {
                throw new not_writable_error_1.NotWritableError(collection);
            }
        }
    }
    async setAccountTransfersLast24h(address, transfersLast24h) {
        return await this.elasticService.setCustomValues('accounts', address, {
            transfersLast24h,
        });
    }
    async getBlockByTimestampAndShardId(timestamp, shardId) {
        const timestampIdentifier = time_utils_1.TimeUtils.isTimestampInSeconds(timestamp) ? 'timestamp' : 'timestampMs';
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withRangeFilter(timestampIdentifier, new sdk_nestjs_elastic_1.RangeGreaterThanOrEqual(timestamp))
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [sdk_nestjs_elastic_1.QueryType.Match('shardId', shardId, sdk_nestjs_elastic_1.QueryOperator.AND)])
            .withSort([{ name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.ascending }]);
        const blocks = await this.elasticService.getList('blocks', '_search', elasticQuery);
        return blocks.at(0);
    }
    async getApplications(filter, pagination) {
        const elasticQuery = this.indexerHelper.buildApplicationFilter(filter)
            .withPagination(pagination)
            .withFields(['address', 'deployer', 'currentOwner', 'initialCodeHash', 'timestamp'])
            .withSort([{ name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending }]);
        return await this.elasticService.getList('scdeploys', 'address', elasticQuery);
    }
    async getApplication(address) {
        return await this.elasticService.getItem('scdeploys', 'address', address);
    }
    async getApplicationCount(filter) {
        const elasticQuery = this.indexerHelper.buildApplicationFilter(filter);
        return await this.elasticService.getCount('scdeploys', elasticQuery);
    }
    async getAddressesWithTransfersLast24h() {
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withFields(['address'])
            .withPagination({ from: 0, size: 10000 })
            .withMustExistCondition('api_transfersLast24h');
        const result = await this.elasticService.getList('accounts', 'address', elasticQuery);
        return result.map(x => x.address);
    }
    async getEvents(pagination, filter) {
        const elasticQuery = this.indexerHelper.buildEventsFilter(filter)
            .withPagination(pagination)
            .withSort([{ name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.descending }]);
        return await this.elasticService.getList('events', '_id', elasticQuery);
    }
    async getEvent(txHash) {
        return await this.elasticService.getItem('events', '_id', txHash);
    }
    async getEventsCount(filter) {
        const elasticQuery = this.indexerHelper.buildEventsFilter(filter);
        return await this.elasticService.getCount('events', elasticQuery);
    }
    async getAccountNftReceivedTimestamps(address, identifiers) {
        if (!identifiers || identifiers.length === 0) {
            return {};
        }
        const identifierToTimestamp = {};
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withMustMatchCondition('address', address)
            .withMustMultiShouldCondition(identifiers, identifier => sdk_nestjs_elastic_1.QueryType.Match('identifier', identifier, sdk_nestjs_elastic_1.QueryOperator.AND))
            .withSort([{ name: 'timestamp', order: sdk_nestjs_elastic_1.ElasticSortOrder.ascending }])
            .withPagination({ from: 0, size: 10000 });
        const history = await this.elasticService.getList('accountsdcdthistory', 'address', elasticQuery);
        for (const entry of history) {
            if (entry.identifier) {
                if (!identifierToTimestamp[entry.identifier] || entry.timestamp < identifierToTimestamp[entry.identifier]) {
                    identifierToTimestamp[entry.identifier] = entry.timestamp;
                }
            }
        }
        return identifierToTimestamp;
    }
};
ElasticIndexerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        circuit_breaker_proxy_service_1.EsCircuitBreakerProxy,
        elastic_indexer_helper_1.ElasticIndexerHelper])
], ElasticIndexerService);
exports.ElasticIndexerService = ElasticIndexerService;
//# sourceMappingURL=elastic.indexer.service.js.map