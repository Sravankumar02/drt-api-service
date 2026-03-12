"use strict";
var AccountController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const account_service_1 = require("./account.service");
const account_detailed_1 = require("./entities/account.detailed");
const account_1 = require("./entities/account");
const account_deferred_1 = require("./entities/account.deferred");
const token_service_1 = require("../tokens/token.service");
const token_with_balance_1 = require("../tokens/entities/token.with.balance");
const delegation_legacy_service_1 = require("../delegation.legacy/delegation.legacy.service");
const account_delegation_legacy_1 = require("../delegation.legacy/entities/account.delegation.legacy");
const account_key_1 = require("./entities/account.key");
const nft_account_1 = require("../nfts/entities/nft.account");
const nft_type_1 = require("../nfts/entities/nft.type");
const waiting_list_1 = require("../waiting-list/entities/waiting.list");
const waiting_list_service_1 = require("../waiting-list/waiting.list.service");
const stake_service_1 = require("../stake/stake.service");
const nft_service_1 = require("../nfts/nft.service");
const transaction_status_1 = require("../transactions/entities/transaction.status");
const transaction_service_1 = require("../transactions/transaction.service");
const deployed_contract_1 = require("./entities/deployed.contract");
const smart_contract_result_1 = require("../sc-results/entities/smart.contract.result");
const scresult_service_1 = require("../sc-results/scresult.service");
const collection_service_1 = require("../collections/collection.service");
const nft_collection_with_roles_1 = require("../collections/entities/nft.collection.with.roles");
const sort_order_1 = require("../../common/entities/sort.order");
const account_history_1 = require("./entities/account.history");
const account_dcdt_history_1 = require("./entities/account.dcdt.history");
const dcdt_data_source_1 = require("../dcdt/entities/dcdt.data.source");
const transfer_service_1 = require("../transfers/transfer.service");
const transaction_1 = require("../transactions/entities/transaction");
const provider_stake_1 = require("../stake/entities/provider.stake");
const nft_collection_account_1 = require("../collections/entities/nft.collection.account");
const token_with_roles_1 = require("../tokens/entities/token.with.roles");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const query_pagination_1 = require("../../common/entities/query.pagination");
const transactions_query_options_1 = require("../transactions/entities/transactions.query.options");
const token_with_roles_filter_1 = require("../tokens/entities/token.with.roles.filter");
const collection_filter_1 = require("../collections/entities/collection.filter");
const token_filter_1 = require("../tokens/entities/token.filter");
const nft_filter_1 = require("../nfts/entities/nft.filter");
const nft_query_options_1 = require("../nfts/entities/nft.query.options");
const transaction_filter_1 = require("../transactions/entities/transaction.filter");
const transaction_detailed_1 = require("../transactions/entities/transaction.detailed");
const account_delegation_1 = require("../stake/entities/account.delegation");
const delegation_service_1 = require("../delegation/delegation.service");
const token_type_1 = require("../tokens/entities/token.type");
const contract_upgrades_1 = require("./entities/contract.upgrades");
const account_verification_1 = require("./entities/account.verification");
const account_query_options_1 = require("./entities/account.query.options");
const account_sort_1 = require("./entities/account.sort");
const account_history_filter_1 = require("./entities/account.history.filter");
const parse_array_options_1 = require("@sravankumar02/sdk-nestjs-common/lib/pipes/entities/parse.array.options");
const node_status_1 = require("../nodes/entities/node.status");
const account_key_filter_1 = require("./entities/account.key.filter");
const scam_type_enum_1 = require("../../common/entities/scam-type.enum");
const deep_history_interceptor_1 = require("../../interceptors/deep-history.interceptor");
const moa_pair_type_1 = require("../moa/entities/moa.pair.type");
const nft_sub_type_1 = require("../nfts/entities/nft.sub.type");
const account_fetch_options_1 = require("./entities/account.fetch.options");
const timestamp_parse_pipe_1 = require("../../utils/timestamp.parse.pipe");
let AccountController = AccountController_1 = class AccountController {
    constructor(accountService, tokenService, nftService, delegationLegacyService, waitingListService, stakeService, transactionService, scResultService, collectionService, transferService, delegationService) {
        this.accountService = accountService;
        this.tokenService = tokenService;
        this.nftService = nftService;
        this.delegationLegacyService = delegationLegacyService;
        this.waitingListService = waitingListService;
        this.stakeService = stakeService;
        this.transactionService = transactionService;
        this.scResultService = scResultService;
        this.collectionService = collectionService;
        this.transferService = transferService;
        this.delegationService = delegationService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(AccountController_1.name);
    }
    getAccounts(from, size, ownerAddress, name, tags, sort, order, isSmartContract, withOwnerAssets, withDeployInfo, withTxCount, withScrCount, excludeTags, hasAssets, search, addresses) {
        const queryOptions = new account_query_options_1.AccountQueryOptions({
            ownerAddress,
            addresses,
            sort,
            order,
            isSmartContract,
            withOwnerAssets,
            withDeployInfo,
            withTxCount,
            withScrCount,
            name,
            tags,
            excludeTags,
            hasAssets,
            search,
        });
        queryOptions.validate(size);
        return this.accountService.getAccounts(new query_pagination_1.QueryPagination({ from, size }), queryOptions);
    }
    async getAccountsCount(ownerAddress, isSmartContract, name, tags, excludeTags, hasAssets, search, withBalance) {
        return await this.accountService.getAccountsCount(new account_query_options_1.AccountQueryOptions({
            ownerAddress,
            isSmartContract,
            name,
            tags,
            excludeTags,
            hasAssets,
            search,
            withBalance,
        }));
    }
    async getAccountsCountAlternative(ownerAddress, isSmartContract, name, tags, excludeTags, hasAssets, search, withBalance) {
        return await this.accountService.getAccountsCount(new account_query_options_1.AccountQueryOptions({
            ownerAddress,
            isSmartContract,
            name,
            tags,
            excludeTags,
            hasAssets,
            search,
            withBalance,
        }));
    }
    async getAccountDetails(address, withGuardianInfo, withTxCount, withScrCount, withTimestamp, withAssets, _timestamp) {
        const account = await this.accountService.getAccount(address, new account_fetch_options_1.AccountFetchOptions({ withGuardianInfo, withTxCount, withScrCount, withTimestamp, withAssets }));
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        return account;
    }
    async getAccountDeferred(address) {
        try {
            return await this.accountService.getDeferredAccount(address);
        }
        catch (error) {
            this.logger.error(`Error in getAccountDeferred for address ${address}`);
            this.logger.error(error);
            throw new common_1.HttpException('Account not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAccountVerification(address) {
        try {
            return await this.accountService.getAccountVerification(address);
        }
        catch (error) {
            this.logger.error(`Error in getAccountVerification for address ${address}`);
            this.logger.error(error);
            throw new common_1.HttpException('Account verification not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAccountTokens(address, from, size, type, subType, search, name, identifier, identifiers, includeMetaDCDT, _timestamp, moaPairType) {
        try {
            return await this.tokenService.getTokensForAddress(address, new query_pagination_1.QueryPagination({ from, size }), new token_filter_1.TokenFilter({ type, subType, search, name, identifier, identifiers, includeMetaDCDT, moaPairType }));
        }
        catch (error) {
            this.logger.error(`Error in getAccountTokens for address ${address}`);
            this.logger.error(error);
            return [];
        }
    }
    async getTokenCount(address, type, search, name, identifier, identifiers, includeMetaDCDT, _timestamp, moaPairType) {
        try {
            return await this.tokenService.getTokenCountForAddress(address, new token_filter_1.TokenFilter({ type, search, name, identifier, identifiers, includeMetaDCDT, moaPairType }));
        }
        catch (error) {
            this.logger.error(`Error in getTokenCount for address ${address}`);
            this.logger.error(error);
            return 0;
        }
    }
    async getTokenCountAlternative(address, type, search, name, identifier, identifiers, includeMetaDCDT, _timestamp, moaPairType) {
        try {
            return await this.tokenService.getTokenCountForAddress(address, new token_filter_1.TokenFilter({ type, search, name, identifier, identifiers, includeMetaDCDT, moaPairType }));
        }
        catch (error) {
            this.logger.error(`Error in getTokenCount for address ${address}`);
            this.logger.error(error);
            return 0;
        }
    }
    async getAccountToken(address, token, _timestamp) {
        const result = await this.tokenService.getTokenForAddress(address, token);
        if (!result) {
            throw new common_1.HttpException('Token for given account not found', common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
    async getAccountCollectionsWithRoles(address, from, size, search, type, subType, owner, canCreate, canBurn, canAddQuantity, canUpdateAttributes, canAddUri, canTransferRole, excludeMetaDCDT) {
        return await this.collectionService.getCollectionsWithRolesForAddress(address, new collection_filter_1.CollectionFilter({
            search,
            type,
            subType,
            owner,
            canCreate,
            canBurn,
            canAddQuantity,
            canUpdateAttributes,
            canAddUri,
            canTransferRole,
            excludeMetaDCDT,
        }), new query_pagination_1.QueryPagination({ from, size }));
    }
    async getCollectionWithRolesCount(address, search, type, subType, owner, canCreate, canBurn, canAddQuantity, excludeMetaDCDT) {
        return await this.collectionService.getCollectionCountForAddressWithRoles(address, new collection_filter_1.CollectionFilter({ search, type, subType, owner, canCreate, canBurn, canAddQuantity, excludeMetaDCDT }));
    }
    async getCollectionCountAlternative(address, search, type, subType, owner, canCreate, canBurn, canAddQuantity, excludeMetaDCDT) {
        return await this.collectionService.getCollectionCountForAddressWithRoles(address, new collection_filter_1.CollectionFilter({
            search, type, subType, owner, canCreate, canBurn, canAddQuantity, excludeMetaDCDT,
        }));
    }
    async getAccountCollection(address, collection) {
        const result = await this.collectionService.getCollectionForAddressWithRole(address, collection);
        if (!result) {
            throw new common_1.NotFoundException('Collection for given account not found');
        }
        return result;
    }
    async getAccountTokensWithRoles(address, from, size, search, owner, canMint, canBurn, includeMetaDCDT) {
        return await this.tokenService.getTokensWithRolesForAddress(address, new token_with_roles_filter_1.TokenWithRolesFilter({ search, owner, canMint, canBurn, includeMetaDCDT }), new query_pagination_1.QueryPagination({ from, size }));
    }
    async getTokensWithRolesCount(address, search, owner, canMint, canBurn, includeMetaDCDT) {
        return await this.tokenService.getTokensWithRolesForAddressCount(address, new token_with_roles_filter_1.TokenWithRolesFilter({ search, owner, canMint, canBurn, includeMetaDCDT }));
    }
    async getTokensWithRolesCountAlternative(address, search, owner, canMint, canBurn, includeMetaDCDT) {
        return await this.tokenService.getTokensWithRolesForAddressCount(address, new token_with_roles_filter_1.TokenWithRolesFilter({ search, owner, canMint, canBurn, includeMetaDCDT }));
    }
    async getTokenWithRoles(address, identifier) {
        const result = await this.tokenService.getTokenWithRolesForAddress(address, identifier);
        if (!result) {
            throw new common_1.NotFoundException('Token with roles for given account not found');
        }
        return result;
    }
    async getAccountNftCollections(address, from, size, search, type, subType, excludeMetaDCDT) {
        return await this.collectionService.getCollectionsForAddress(address, new collection_filter_1.CollectionFilter({ search, type, subType, excludeMetaDCDT }), new query_pagination_1.QueryPagination({ from, size }));
    }
    async getNftCollectionCount(address, search, type, subType, excludeMetaDCDT) {
        return await this.collectionService.getCollectionCountForAddress(address, new collection_filter_1.CollectionFilter({ search, type, subType, excludeMetaDCDT }));
    }
    async getNftCollectionCountAlternative(address, search, type, subType, excludeMetaDCDT) {
        return await this.collectionService.getCollectionCountForAddress(address, new collection_filter_1.CollectionFilter({ search, type, subType, excludeMetaDCDT }));
    }
    async getAccountNftCollection(address, collection) {
        const result = await this.collectionService.getCollectionForAddress(address, collection);
        if (!result) {
            throw new common_1.NotFoundException('Collection for given account not found');
        }
        return result;
    }
    async getAccountNfts(address, from, size, search, identifiers, type, subType, collection, collections, name, tags, creator, hasUris, includeFlagged, withSupply, source, excludeMetaDCDT, fields, isScam, scamType, _timestamp, withReceivedAt) {
        const queryOptions = new nft_query_options_1.NftQueryOptions({ withSupply, withReceivedAt });
        queryOptions.validate(size);
        return await this.nftService.getNftsForAddress(address, new query_pagination_1.QueryPagination({ from, size }), new nft_filter_1.NftFilter({
            search,
            identifiers,
            type,
            subType,
            collection,
            name,
            collections,
            tags,
            creator,
            hasUris,
            includeFlagged,
            excludeMetaDCDT,
            isScam,
            scamType,
        }), fields, queryOptions, source);
    }
    async getNftCount(address, identifiers, search, type, subType, collection, collections, name, tags, creator, hasUris, includeFlagged, excludeMetaDCDT, isScam, scamType, _timestamp) {
        return await this.nftService.getNftCountForAddress(address, new nft_filter_1.NftFilter({
            search,
            identifiers,
            type,
            subType,
            collection,
            collections,
            name,
            tags,
            creator,
            hasUris,
            includeFlagged,
            excludeMetaDCDT,
            isScam,
            scamType,
        }));
    }
    async getNftCountAlternative(address, search, identifiers, type, subType, collection, collections, name, tags, creator, hasUris, includeFlagged, excludeMetaDCDT, isScam, scamType, _timestamp) {
        return await this.nftService.getNftCountForAddress(address, new nft_filter_1.NftFilter({ search, identifiers, type, subType, collection, collections, name, tags, creator, hasUris, includeFlagged, excludeMetaDCDT, isScam, scamType }));
    }
    async getAccountNft(address, nft, fields, extract, _timestamp) {
        const actualFields = extract ? [extract] : fields;
        const result = await this.nftService.getNftForAddress(address, nft, actualFields);
        if (!result) {
            throw new common_1.HttpException('Token for given account not found', common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
    async getAccountStake(address, _timestamp) {
        return await this.stakeService.getStakeForAddress(address);
    }
    async getDelegationForAddress(address) {
        return await this.delegationService.getDelegationForAddress(address);
    }
    async getAccountDelegationLegacy(address, _timestamp) {
        return await this.delegationLegacyService.getDelegationForAddress(address);
    }
    async getAccountKeys(address, from, size, status) {
        return await this.accountService.getKeys(address, new account_key_filter_1.AccountKeyFilter({ status }), new query_pagination_1.QueryPagination({ from, size }));
    }
    async getAccountWaitingList(address) {
        return await this.waitingListService.getWaitingListForAddress(address);
    }
    async getAccountTransactions(address, from, size, sender, receiver, token, senderShard, receiverShard, miniBlockHash, hashes, status, functions, before, after, round, order, fields, withScResults, withOperations, withLogs, withScamInfo, withUsername, withBlockInfo, senderOrReceiver, isRelayed, isScCall, withActionTransferValue, withRelayedScresults) {
        const options = transactions_query_options_1.TransactionQueryOptions.applyDefaultOptions(size, { withScResults, withOperations, withLogs, withScamInfo, withUsername, withBlockInfo, withActionTransferValue });
        const transactionFilter = new transaction_filter_1.TransactionFilter({
            sender,
            receivers: receiver,
            token,
            functions,
            senderShard,
            receiverShard,
            miniBlockHash,
            hashes,
            status,
            before,
            after,
            order,
            senderOrReceiver,
            isRelayed,
            isScCall,
            round,
            withRelayedScresults,
        });
        transaction_filter_1.TransactionFilter.validate(transactionFilter, size);
        return await this.transactionService.getTransactions(transactionFilter, new query_pagination_1.QueryPagination({ from, size }), options, address, fields);
    }
    async getAccountTransactionsCount(address, sender, receiver, token, senderShard, receiverShard, miniBlockHash, hashes, status, functions, before, after, round, senderOrReceiver, isRelayed, isScCall, withRelayedScresults) {
        return await this.transactionService.getTransactionCount(new transaction_filter_1.TransactionFilter({
            sender,
            receivers: receiver,
            token,
            functions,
            senderShard,
            receiverShard,
            miniBlockHash,
            hashes,
            status,
            before,
            after,
            senderOrReceiver,
            isRelayed,
            isScCall,
            round,
            withRelayedScresults,
        }), address);
    }
    async getAccountTransfers(address, from, size, sender, receiver, token, senderShard, receiverShard, miniBlockHash, hashes, status, functions, before, after, round, fields, order, relayer, withScamInfo, withUsername, withBlockInfo, senderOrReceiver, isScCall, withLogs, withOperations, withActionTransferValue, withRefunds, withTxsRelayedByAddress) {
        const options = transactions_query_options_1.TransactionQueryOptions.applyDefaultOptions(size, { withScamInfo, withUsername, withBlockInfo, withOperations, withLogs, withActionTransferValue });
        return await this.transferService.getTransfers(new transaction_filter_1.TransactionFilter({
            address,
            senders: sender,
            receivers: receiver,
            token,
            functions,
            senderShard,
            receiverShard,
            miniBlockHash,
            hashes,
            status,
            before,
            after,
            order,
            senderOrReceiver,
            relayer,
            round,
            withRefunds,
            withTxsRelayedByAddress,
            isScCall,
        }), new query_pagination_1.QueryPagination({ from, size }), options, fields);
    }
    async getAccountTransfersCount(address, sender, receiver, token, senderShard, receiverShard, miniBlockHash, hashes, status, functions, before, after, round, senderOrReceiver, isScCall, withRefunds, withTxsRelayedByAddress) {
        return await this.transferService.getTransfersCount(new transaction_filter_1.TransactionFilter({
            address,
            senders: sender,
            receivers: receiver,
            token,
            functions,
            senderShard,
            receiverShard,
            miniBlockHash,
            hashes,
            status,
            before,
            after,
            senderOrReceiver,
            round,
            isScCall,
            withRefunds,
            withTxsRelayedByAddress,
        }));
    }
    async getAccountTransfersCountAlternative(address, sender, receiver, token, senderShard, receiverShard, miniBlockHash, hashes, status, functions, before, after, round, senderOrReceiver, withRefunds, isScCall, withTxsRelayedByAddress) {
        return await this.transferService.getTransfersCount(new transaction_filter_1.TransactionFilter({
            address,
            senders: sender,
            receivers: receiver,
            token,
            functions,
            senderShard,
            receiverShard,
            miniBlockHash,
            hashes,
            status,
            before,
            after,
            senderOrReceiver,
            round,
            withRefunds,
            isScCall,
            withTxsRelayedByAddress,
        }));
    }
    getAccountDeploys(address, from, size) {
        return this.accountService.getAccountDeploys(new query_pagination_1.QueryPagination({ from, size }), address);
    }
    getAccountDeploysCount(address) {
        return this.accountService.getAccountDeploysCount(address);
    }
    getAccountDeploysCountAlternative(address) {
        return this.accountService.getAccountDeploysCount(address);
    }
    getAccountContracts(address, from, size) {
        return this.accountService.getAccountContracts(new query_pagination_1.QueryPagination({ from, size }), address);
    }
    getAccountContractsCount(address) {
        return this.accountService.getAccountContractsCount(address);
    }
    getAccountContractsCountAlternative(address) {
        return this.accountService.getAccountContractsCount(address);
    }
    getContractUpgrades(address, from, size) {
        return this.accountService.getContractUpgrades(new query_pagination_1.QueryPagination({ from, size }), address);
    }
    getAccountScResults(address, from, size) {
        return this.scResultService.getAccountScResults(address, new query_pagination_1.QueryPagination({ from, size }));
    }
    getAccountScResultsCount(address) {
        return this.scResultService.getAccountScResultsCount(address);
    }
    async getAccountScResult(address, scHash) {
        const scResult = await this.scResultService.getScResult(scHash);
        if (!scResult || (scResult.sender !== address && scResult.receiver !== address)) {
            throw new common_1.NotFoundException('Smart contract result not found');
        }
        return scResult;
    }
    getAccountHistory(address, from, size, before, after) {
        return this.accountService.getAccountHistory(address, new query_pagination_1.QueryPagination({ from, size }), new account_history_filter_1.AccountHistoryFilter({ before, after }));
    }
    getAccountHistoryCount(address, before, after) {
        return this.accountService.getAccountHistoryCount(address, new account_history_filter_1.AccountHistoryFilter({ before, after }));
    }
    async getAccountTokenHistoryCount(address, tokenIdentifier, before, after) {
        const isToken = await this.tokenService.isToken(tokenIdentifier) || await this.collectionService.isCollection(tokenIdentifier) || await this.nftService.isNft(tokenIdentifier);
        if (!isToken) {
            throw new common_1.NotFoundException(`Token '${tokenIdentifier}' not found`);
        }
        return this.accountService.getAccountTokenHistoryCount(address, tokenIdentifier, new account_history_filter_1.AccountHistoryFilter({ before, after }));
    }
    async getAccountDcdtHistory(address, from, size, before, after, identifier, token) {
        return await this.accountService.getAccountDcdtHistory(address, new query_pagination_1.QueryPagination({ from, size }), new account_history_filter_1.AccountHistoryFilter({ before, after, identifiers: identifier, token }));
    }
    async getAccountDcdtHistoryCount(address, before, after, identifier, token) {
        return await this.accountService.getAccountDcdtHistoryCount(address, new account_history_filter_1.AccountHistoryFilter({ before, after, identifiers: identifier, token }));
    }
    async getAccountTokenHistory(address, tokenIdentifier, from, size, before, after) {
        const isToken = await this.tokenService.isToken(tokenIdentifier) || await this.collectionService.isCollection(tokenIdentifier) || await this.nftService.isNft(tokenIdentifier);
        if (!isToken) {
            throw new common_1.NotFoundException(`Token '${tokenIdentifier}' not found`);
        }
        return await this.accountService.getAccountTokenHistory(address, tokenIdentifier, new query_pagination_1.QueryPagination({ from, size }), new account_history_filter_1.AccountHistoryFilter({ before, after }));
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/accounts"),
    (0, swagger_1.ApiOperation)({ summary: 'Accounts details', description: 'Returns all accounts available on blockchain. By default it returns 25 accounts' }),
    (0, swagger_1.ApiOkResponse)({ type: [account_1.Account] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'ownerAddress', description: 'Search by owner address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'sort', description: 'Sort criteria (balance / timestamp)', required: false, enum: account_sort_1.AccountSort }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sort order (asc/desc)', required: false, enum: sort_order_1.SortOrder }),
    (0, swagger_1.ApiQuery)({ name: 'isSmartContract', description: 'Filter accounts by whether they are smart contract or not', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withOwnerAssets', description: 'Return a list accounts with owner assets', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withDeployInfo', description: 'Include deployedAt and deployTxHash fields in the result', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withTxCount', description: 'Include txCount field in the result', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withScrCount', description: 'Include scrCount field in the result', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', description: 'Filter accounts by assets name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'tags', description: 'Filter accounts by assets tags', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'excludeTags', description: 'Exclude specific tags from result', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hasAssets', description: 'Returns a list of accounts that have assets', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by account address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'addresses', description: 'A comma-separated list of addresses to filter by', required: false, type: String }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)("size", new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)("ownerAddress", sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(3, (0, common_1.Query)("name")),
    tslib_1.__param(4, (0, common_1.Query)("tags", sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(5, (0, common_1.Query)('sort', new sdk_nestjs_common_1.ParseEnumPipe(account_sort_1.AccountSort))),
    tslib_1.__param(6, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__param(7, (0, common_1.Query)("isSmartContract", sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(8, (0, common_1.Query)("withOwnerAssets", sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(9, (0, common_1.Query)("withDeployInfo", sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(10, (0, common_1.Query)("withTxCount", sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(11, (0, common_1.Query)("withScrCount", sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(12, (0, common_1.Query)("excludeTags", sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(13, (0, common_1.Query)("hasAssets", sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(14, (0, common_1.Query)("search")),
    tslib_1.__param(15, (0, common_1.Query)("addresses", sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Array, String, String, Boolean, Boolean, Boolean, Boolean, Boolean, Array, Boolean, String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccounts", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Total number of accounts', description: 'Returns total number of accounts available on blockchain' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'ownerAddress', description: 'Search by owner address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isSmartContract', description: 'Return total smart contracts count', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', description: 'Filter accounts by assets name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'tags', description: 'Filter accounts by assets tags', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by account address, assets name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'excludeTags', description: 'Exclude specific tags from result', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hasAssets', description: 'Returns a list of accounts that have assets', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withBalance', description: 'Filter accounts by balance (true = balance > 0, false = balance = 0)', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Query)("ownerAddress", sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)("isSmartContract", sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(2, (0, common_1.Query)("name")),
    tslib_1.__param(3, (0, common_1.Query)("tags", sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(4, (0, common_1.Query)("excludeTags", sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(5, (0, common_1.Query)("hasAssets", sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(6, (0, common_1.Query)("search")),
    tslib_1.__param(7, (0, common_1.Query)("withBalance", sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Boolean, String, Array, Array, Boolean, String, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Query)("ownerAddress", sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)("isSmartContract", sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(2, (0, common_1.Query)("name")),
    tslib_1.__param(3, (0, common_1.Query)("tags", sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(4, (0, common_1.Query)("excludeTags", sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(5, (0, common_1.Query)("hasAssets", sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(6, (0, common_1.Query)("search")),
    tslib_1.__param(7, (0, common_1.Query)("withBalance", sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Boolean, String, Array, Array, Boolean, String, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountsCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address"),
    (0, common_1.UseInterceptors)(deep_history_interceptor_1.DeepHistoryInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Account details', description: 'Returns account details for a given address' }),
    (0, swagger_1.ApiQuery)({ name: 'withGuardianInfo', description: 'Returns guardian data for a given address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withTxCount', description: 'Returns the count of the transactions for a given address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withScrCount', description: 'Returns the sc results count for a given address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withTimestamp', description: 'Returns the timestamp of the last activity for a given address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withAssets', description: 'Returns the assets for a given address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'timestamp', description: 'Retrieve entry from timestamp', required: false, type: Number }),
    (0, swagger_1.ApiOkResponse)({ type: account_detailed_1.AccountDetailed }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('withGuardianInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(2, (0, common_1.Query)('withTxCount', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(3, (0, common_1.Query)('withScrCount', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(4, (0, common_1.Query)('withTimestamp', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(5, (0, common_1.Query)('withAssets', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(6, (0, common_1.Query)('timestamp', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Boolean, Boolean, Boolean, Boolean, Boolean, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountDetails", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/deferred"),
    (0, swagger_1.ApiOperation)({ summary: 'Account deferred payment details', description: 'Returns deferred payments from legacy staking' }),
    (0, swagger_1.ApiOkResponse)({ type: [account_deferred_1.AccountDeferred] }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountDeferred", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/verification"),
    (0, swagger_1.ApiOperation)({ summary: 'Account verification details', description: 'Returns contract verification details' }),
    (0, swagger_1.ApiOkResponse)({ type: account_verification_1.AccountVerification }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountVerification", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/tokens"),
    (0, common_1.UseInterceptors)(deep_history_interceptor_1.DeepHistoryInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Account tokens', description: 'Returns a list of all available fungible tokens for a given address, together with their balance' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Token type', required: false, enum: token_type_1.TokenType }),
    (0, swagger_1.ApiQuery)({ name: 'subType', description: 'Token sub type', required: false, enum: nft_sub_type_1.NftSubType }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', description: 'Search by token name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifier', description: 'Search by token identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifiers', description: 'A comma-separated list of identifiers to filter by', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'includeMetaDCDT', description: 'Include MetaDCDTs in response', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'timestamp', description: 'Retrieve entries from timestamp', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'moaPairType', description: 'Token Moa Pair', required: false, enum: moa_pair_type_1.MoaPairType }),
    (0, swagger_1.ApiOkResponse)({ type: [token_with_balance_1.TokenWithBalance] }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumPipe(token_type_1.TokenType))),
    tslib_1.__param(4, (0, common_1.Query)('subType', new sdk_nestjs_common_1.ParseEnumPipe(nft_sub_type_1.NftSubType))),
    tslib_1.__param(5, (0, common_1.Query)('search')),
    tslib_1.__param(6, (0, common_1.Query)('name')),
    tslib_1.__param(7, (0, common_1.Query)('identifier')),
    tslib_1.__param(8, (0, common_1.Query)('identifiers', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(9, (0, common_1.Query)('includeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(10, (0, common_1.Query)('timestamp', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(11, (0, common_1.Query)('moaPairType', new sdk_nestjs_common_1.ParseEnumArrayPipe(moa_pair_type_1.MoaPairType))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String, String, String, String, String, Array, Boolean, Number, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountTokens", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/tokens/count"),
    (0, common_1.UseInterceptors)(deep_history_interceptor_1.DeepHistoryInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Account token count', description: 'Returns the total number of tokens for a given address' }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Token type', required: false, enum: token_type_1.TokenType }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', description: 'Search by token name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifier', description: 'Search by token identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifiers', description: 'A comma-separated list of identifiers to filter by', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'includeMetaDCDT', description: 'Include MetaDCDTs in response', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'timestamp', description: 'Retrieve entries from timestamp', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'moaPairType', description: 'Token Moa Pair', required: false, enum: moa_pair_type_1.MoaPairType }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumPipe(token_type_1.TokenType))),
    tslib_1.__param(2, (0, common_1.Query)('search')),
    tslib_1.__param(3, (0, common_1.Query)('name')),
    tslib_1.__param(4, (0, common_1.Query)('identifier')),
    tslib_1.__param(5, (0, common_1.Query)('identifiers', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(6, (0, common_1.Query)('includeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(7, (0, common_1.Query)('timestamp', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(8, (0, common_1.Query)('moaPairType', new sdk_nestjs_common_1.ParseEnumArrayPipe(moa_pair_type_1.MoaPairType))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, Array, Boolean, Number, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getTokenCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/tokens/c"),
    (0, common_1.UseInterceptors)(deep_history_interceptor_1.DeepHistoryInterceptor),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumPipe(token_type_1.TokenType))),
    tslib_1.__param(2, (0, common_1.Query)('search')),
    tslib_1.__param(3, (0, common_1.Query)('name')),
    tslib_1.__param(4, (0, common_1.Query)('identifier')),
    tslib_1.__param(5, (0, common_1.Query)('identifiers', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(6, (0, common_1.Query)('includeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(7, (0, common_1.Query)('timestamp', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(8, (0, common_1.Query)('moaPairType', new sdk_nestjs_common_1.ParseEnumArrayPipe(moa_pair_type_1.MoaPairType))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, Array, Boolean, Number, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getTokenCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/tokens/:token"),
    (0, common_1.UseInterceptors)(deep_history_interceptor_1.DeepHistoryInterceptor),
    (0, swagger_1.ApiOkResponse)({ type: token_with_balance_1.TokenWithBalance }),
    (0, swagger_1.ApiOperation)({ summary: 'Account token details', description: 'Returns details about a specific fungible token from a given address' }),
    (0, swagger_1.ApiQuery)({ name: 'timestamp', description: 'Retrieve entries from timestamp', required: false, type: Number }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Param)('token', sdk_nestjs_common_1.ParseTokenOrNftPipe)),
    tslib_1.__param(2, (0, common_1.Query)('timestamp', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountToken", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/roles/collections"),
    (0, swagger_1.ApiOperation)({ summary: 'Account collections', description: 'Returns NFT/SFT/MetaDCDT collections where the account is owner or has some special roles assigned to it' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Filter by type (NonFungibleDCDT/SemiFungibleDCDT/MetaDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'subType', description: 'Filter by type (NonFungibleDCDTv2/DynamicNonFungibleDCDT/DynamicSemiFungibleDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'owner', description: 'Filter by collection owner', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canCreate', description: 'Filter by property canCreate (boolean)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canBurn', description: 'Filter by property canBurn (boolean)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canAddQuantity', description: 'Filter by property canAddQuantity (boolean)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canUpdateAttributes', description: 'Filter by property canUpdateAttributes (boolean)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canAddUri', description: 'Filter by property canAddUri (boolean)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canTransferRole', description: 'Filter by property canTransferRole (boolean)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'excludeMetaDCDT', description: 'Exclude collections of type "MetaDCDT" in the response', required: false, type: Boolean }),
    (0, swagger_1.ApiOkResponse)({ type: [nft_collection_with_roles_1.NftCollectionWithRoles] }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('search')),
    tslib_1.__param(4, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_type_1.NftType))),
    tslib_1.__param(5, (0, common_1.Query)('subType', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_sub_type_1.NftSubType))),
    tslib_1.__param(6, (0, common_1.Query)('owner', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(7, (0, common_1.Query)('canCreate', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(8, (0, common_1.Query)('canBurn', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(9, (0, common_1.Query)('canAddQuantity', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(10, (0, common_1.Query)('canUpdateAttributes', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(11, (0, common_1.Query)('canAddUri', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(12, (0, common_1.Query)('canTransferRole', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(13, (0, common_1.Query)('excludeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String, Array, Array, String, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountCollectionsWithRoles", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/roles/collections/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Account collection count', description: 'Returns the total number of NFT/SFT/MetaDCDT collections where the account is owner or has some special roles assigned to it' }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Filter by type (NonFungibleDCDT/SemiFungibleDCDT/MetaDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'subType', description: 'Filter by type (NonFungibleDCDTv2/DynamicNonFungibleDCDT/DynamicSemiFungibleDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'owner', description: 'Filter by collection owner', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canCreate', description: 'Filter by property canCreate (boolean)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canBurn', description: 'Filter by property canCreate (boolean)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canAddQuantity', description: 'Filter by property canAddQuantity (boolean)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'excludeMetaDCDT', description: 'Exclude collections of type "MetaDCDT" in the response', required: false, type: Boolean }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('search')),
    tslib_1.__param(2, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_type_1.NftType))),
    tslib_1.__param(3, (0, common_1.Query)('subType', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_sub_type_1.NftSubType))),
    tslib_1.__param(4, (0, common_1.Query)('owner', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(5, (0, common_1.Query)('canCreate', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(6, (0, common_1.Query)('canBurn', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(7, (0, common_1.Query)('canAddQuantity', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(8, (0, common_1.Query)('excludeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array, Array, String, Boolean, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getCollectionWithRolesCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/roles/collections/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('search')),
    tslib_1.__param(2, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_type_1.NftType))),
    tslib_1.__param(3, (0, common_1.Query)('subType', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_sub_type_1.NftSubType))),
    tslib_1.__param(4, (0, common_1.Query)('owner', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(5, (0, common_1.Query)('canCreate', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(6, (0, common_1.Query)('canBurn', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(7, (0, common_1.Query)('canAddQuantity', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(8, (0, common_1.Query)('excludeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array, Array, String, Boolean, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getCollectionCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/roles/collections/:collection"),
    (0, swagger_1.ApiOperation)({ summary: 'Account collection details', description: 'Returns details about a specific NFT/SFT/MetaDCDT collection from a given address' }),
    (0, swagger_1.ApiOkResponse)({ type: nft_collection_with_roles_1.NftCollectionWithRoles }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Param)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountCollection", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/roles/tokens"),
    (0, swagger_1.ApiOperation)({ summary: 'Account token roles', description: 'Returns fungible token roles where the account is owner or has some special roles assigned to it' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by token identifier or name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'owner', description: 'Filter by token owner', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canMint', description: 'Filter by property canMint (boolean)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canBurn', description: 'Filter by property canBurn (boolean)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'includeMetaDCDT', description: 'Include MetaDCDTs in response', required: false, type: Boolean }),
    (0, swagger_1.ApiOkResponse)({ type: [token_with_roles_1.TokenWithRoles] }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('search')),
    tslib_1.__param(4, (0, common_1.Query)('owner', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(5, (0, common_1.Query)('canMint', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(6, (0, common_1.Query)('canBurn', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(7, (0, common_1.Query)('includeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String, String, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountTokensWithRoles", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/roles/tokens/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Account token roles count', description: 'Returns the total number of fungible token roles where the account is owner or has some special roles assigned to it' }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by token identifier or name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'owner', description: 'Filter by token owner', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canMint', description: 'Filter by property canMint (boolean)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'canBurn', description: 'Filter by property canCreate (boolean)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'includeMetaDCDT', description: 'Include MetaDCDTs in response', required: false, type: Boolean }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('search')),
    tslib_1.__param(2, (0, common_1.Query)('owner', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(3, (0, common_1.Query)('canMint', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(4, (0, common_1.Query)('canBurn', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(5, (0, common_1.Query)('includeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getTokensWithRolesCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/roles/tokens/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('search')),
    tslib_1.__param(2, (0, common_1.Query)('owner', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(3, (0, common_1.Query)('canMint', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(4, (0, common_1.Query)('canBurn', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(5, (0, common_1.Query)('includeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getTokensWithRolesCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/roles/tokens/:identifier"),
    (0, swagger_1.ApiOperation)({ summary: 'Account token roles details', description: 'Returns details about fungible token roles where the account is owner or has some special roles assigned to it' }),
    (0, swagger_1.ApiOkResponse)({ type: token_with_roles_1.TokenWithRoles }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Param)('identifier', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getTokenWithRoles", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/collections"),
    (0, swagger_1.ApiOperation)({ summary: 'Account collections', description: 'Returns NFT/SFT/MetaDCDT collections where the account owns one or more NFTs' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Filter by type (NonFungibleDCDT/SemiFungibleDCDT/MetaDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'subType', description: 'Filter by type (NonFungibleDCDTv2/DynamicNonFungibleDCDT/DynamicSemiFungibleDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'excludeMetaDCDT', description: 'Exclude collections of type "MetaDCDT" in the response', required: false, type: Boolean }),
    (0, swagger_1.ApiOkResponse)({ type: [nft_collection_account_1.NftCollectionAccount] }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('search')),
    tslib_1.__param(4, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_type_1.NftType))),
    tslib_1.__param(5, (0, common_1.Query)('subType', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_sub_type_1.NftSubType))),
    tslib_1.__param(6, (0, common_1.Query)('excludeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String, Array, Array, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountNftCollections", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/collections/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Account collection count', description: 'Returns the total number of NFT/SFT/MetaDCDT collections where the account is owner or has some special roles assigned to it' }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Filter by type (NonFungibleDCDT/SemiFungibleDCDT/MetaDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'subType', description: 'Filter by type (NonFungibleDCDTv2/DynamicNonFungibleDCDT/DynamicSemiFungibleDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'excludeMetaDCDT', description: 'Exclude collections of type "MetaDCDT" in the response', required: false, type: Boolean }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('search')),
    tslib_1.__param(2, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_type_1.NftType))),
    tslib_1.__param(3, (0, common_1.Query)('subType', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_sub_type_1.NftSubType))),
    tslib_1.__param(4, (0, common_1.Query)('excludeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array, Array, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getNftCollectionCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/collections/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('search')),
    tslib_1.__param(2, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_type_1.NftType))),
    tslib_1.__param(3, (0, common_1.Query)('subType', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_sub_type_1.NftSubType))),
    tslib_1.__param(4, (0, common_1.Query)('excludeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array, Array, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getNftCollectionCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/collections/:collection"),
    (0, swagger_1.ApiOperation)({ summary: 'Account collection details', description: 'Returns details about a specific NFT/SFT/MetaDCDT collection from a given address' }),
    (0, swagger_1.ApiOkResponse)({ type: nft_collection_account_1.NftCollectionAccount }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Param)('collection', sdk_nestjs_common_1.ParseCollectionPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountNftCollection", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/nfts"),
    (0, common_1.UseInterceptors)(deep_history_interceptor_1.DeepHistoryInterceptor),
    (0, swagger_1.ApiOkResponse)({ type: [nft_account_1.NftAccount] }),
    (0, swagger_1.ApiOperation)({ summary: 'Account NFTs', description: 'Returns a list of all available NFTs/SFTs/MetaDCDTs owned by the provided address' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifiers', description: 'Filter by identifiers, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Filter by type (NonFungibleDCDT/SemiFungibleDCDT/MetaDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'subType', description: 'Filter by type (NonFungibleDCDTv2/DynamicNonFungibleDCDT/DynamicSemiFungibleDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'collection', description: 'Get all tokens by token collection. Deprecated, replaced by collections parameter', required: false, deprecated: true }),
    (0, swagger_1.ApiQuery)({ name: 'collections', description: 'Get all tokens by token collections, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', description: 'Get all nfts by name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'tags', description: 'Filter by one or more comma-separated tags', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'creator', description: 'Return all NFTs associated with a given creator', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hasUris', description: 'Return all NFTs that have one or more uris', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'includeFlagged', description: 'Include NFTs that are flagged or not', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withSupply', description: 'Return supply where type = SemiFungibleDCDT', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'source', description: 'Data source of request', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withScamInfo', description: 'Include scam info in the response', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'computeScamInfo', description: 'Compute scam info in the response', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'excludeMetaDCDT', description: 'Exclude NFTs of type "MetaDCDT" in the response', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'fields', description: 'List of fields to filter by', required: false, isArray: true, style: 'form', explode: false }),
    (0, swagger_1.ApiQuery)({ name: 'isScam', description: 'Filter by scam status', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'scamType', description: 'Filter by type (scam/potentialScam)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'timestamp', description: 'Retrieve entry from timestamp', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'withReceivedAt', description: 'Include receivedAt timestamp in the response (when the NFT was received by the address)', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('search')),
    tslib_1.__param(4, (0, common_1.Query)('identifiers', sdk_nestjs_common_1.ParseNftArrayPipe)),
    tslib_1.__param(5, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_type_1.NftType))),
    tslib_1.__param(6, (0, common_1.Query)('subType', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_sub_type_1.NftSubType))),
    tslib_1.__param(7, (0, common_1.Query)('collection')),
    tslib_1.__param(8, (0, common_1.Query)('collections', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(9, (0, common_1.Query)('name')),
    tslib_1.__param(10, (0, common_1.Query)('tags', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(11, (0, common_1.Query)('creator', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(12, (0, common_1.Query)('hasUris', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(13, (0, common_1.Query)('includeFlagged', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(14, (0, common_1.Query)('withSupply', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(15, (0, common_1.Query)('source', new sdk_nestjs_common_1.ParseEnumPipe(dcdt_data_source_1.DcdtDataSource))),
    tslib_1.__param(16, (0, common_1.Query)('excludeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(17, (0, common_1.Query)('fields', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(18, (0, common_1.Query)('isScam', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(19, (0, common_1.Query)('scamType', new sdk_nestjs_common_1.ParseEnumPipe(scam_type_enum_1.ScamType))),
    tslib_1.__param(20, (0, common_1.Query)('timestamp', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(21, (0, common_1.Query)('withReceivedAt', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String, Array, Array, Array, String, Array, String, Array, String, Boolean, Boolean, Boolean, String, Boolean, Array, Boolean, String, Number, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountNfts", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/nfts/count"),
    (0, common_1.UseInterceptors)(deep_history_interceptor_1.DeepHistoryInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Account NFT/SFT tokens count', description: 'Returns the total number of NFT/SFT tokens from a given address, as well as the total number of a certain type of DCDT ' }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by collection identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifiers', description: 'Filter by identifiers, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Filter by type (NonFungibleDCDT/SemiFungibleDCDT/MetaDCDT)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'subType', description: 'Filter by subType', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'collection', description: 'Get all tokens by token collection', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'collections', description: 'Get all tokens by token collections, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', description: 'Get all nfts by name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'tags', description: 'Filter by one or more comma-separated tags', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'creator', description: 'Return all NFTs associated with a given creator', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hasUris', description: 'Return all NFTs that have one or more uris', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'includeFlagged', description: 'Include NFTs that are flagged or not', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'excludeMetaDCDT', description: 'Exclude NFTs of type "MetaDCDT" in the response', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'isScam', description: 'Filter by scam status', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'scamType', description: 'Filter by type (scam/potentialScam)', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'timestamp', description: 'Retrieve entry from timestamp', required: false, type: Number }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('identifiers', sdk_nestjs_common_1.ParseNftArrayPipe)),
    tslib_1.__param(2, (0, common_1.Query)('search')),
    tslib_1.__param(3, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_type_1.NftType))),
    tslib_1.__param(4, (0, common_1.Query)('subType', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_sub_type_1.NftSubType))),
    tslib_1.__param(5, (0, common_1.Query)('collection')),
    tslib_1.__param(6, (0, common_1.Query)('collections', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(7, (0, common_1.Query)('name')),
    tslib_1.__param(8, (0, common_1.Query)('tags', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(9, (0, common_1.Query)('creator', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(10, (0, common_1.Query)('hasUris', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(11, (0, common_1.Query)('includeFlagged', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(12, (0, common_1.Query)('excludeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(13, (0, common_1.Query)('isScam', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(14, (0, common_1.Query)('scamType', new sdk_nestjs_common_1.ParseEnumPipe(scam_type_enum_1.ScamType))),
    tslib_1.__param(15, (0, common_1.Query)('timestamp', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array, String, Array, Array, String, Array, String, Array, String, Boolean, Boolean, Boolean, Boolean, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getNftCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/nfts/c"),
    (0, common_1.UseInterceptors)(deep_history_interceptor_1.DeepHistoryInterceptor),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('search')),
    tslib_1.__param(2, (0, common_1.Query)('identifiers', sdk_nestjs_common_1.ParseNftArrayPipe)),
    tslib_1.__param(3, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_type_1.NftType))),
    tslib_1.__param(4, (0, common_1.Query)('subType', new sdk_nestjs_common_1.ParseEnumArrayPipe(nft_sub_type_1.NftSubType))),
    tslib_1.__param(5, (0, common_1.Query)('collection')),
    tslib_1.__param(6, (0, common_1.Query)('collections', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(7, (0, common_1.Query)('name')),
    tslib_1.__param(8, (0, common_1.Query)('tags', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(9, (0, common_1.Query)('creator', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(10, (0, common_1.Query)('hasUris', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(11, (0, common_1.Query)('includeFlagged', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(12, (0, common_1.Query)('excludeMetaDCDT', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(13, (0, common_1.Query)('isScam', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(14, (0, common_1.Query)('scamType', new sdk_nestjs_common_1.ParseEnumPipe(scam_type_enum_1.ScamType))),
    tslib_1.__param(15, (0, common_1.Query)('timestamp', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array, Array, Array, String, Array, String, Array, String, Boolean, Boolean, Boolean, Boolean, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getNftCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/nfts/:nft"),
    (0, common_1.UseInterceptors)(deep_history_interceptor_1.DeepHistoryInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Account NFT/SFT token details', description: 'Returns details about a specific fungible token for a given address' }),
    (0, swagger_1.ApiQuery)({ name: 'fields', description: 'List of fields to filter by', required: false, isArray: true, style: 'form', explode: false }),
    (0, swagger_1.ApiQuery)({ name: 'extract', description: 'Extract a specific field', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'timestamp', description: 'Retrieve entry from timestamp', required: false, type: Number }),
    (0, swagger_1.ApiOkResponse)({ type: nft_account_1.NftAccount }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Param)('nft', sdk_nestjs_common_1.ParseNftPipe)),
    tslib_1.__param(2, (0, common_1.Query)('fields', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(3, (0, common_1.Query)('extract')),
    tslib_1.__param(4, (0, common_1.Query)('timestamp', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountNft", null);
tslib_1.__decorate([
    (0, common_1.Get)('/accounts/:address/stake'),
    (0, common_1.UseInterceptors)(deep_history_interceptor_1.DeepHistoryInterceptor),
    (0, swagger_1.ApiOperation)({
        summary: 'Account stake details',
        description: 'Summarizes total staked amount for the given provider, as well as when and how much unbond will be performed',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'timestamp',
        description: 'Retrieve entry from timestamp',
        required: false,
        type: Number,
    }),
    (0, swagger_1.ApiOkResponse)({ type: provider_stake_1.ProviderStake }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('timestamp', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountStake", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/delegation"),
    (0, swagger_1.ApiOperation)({ summary: 'Account delegations with staking providers', description: 'Summarizes all delegation positions with staking providers, together with unDelegation positions' }),
    (0, swagger_1.ApiOkResponse)({ type: account_delegation_1.AccountDelegation, isArray: true }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getDelegationForAddress", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/delegation-legacy"),
    (0, common_1.UseInterceptors)(deep_history_interceptor_1.DeepHistoryInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Account legacy delegation details', description: 'Returns staking information related to the legacy delegation pool' }),
    (0, swagger_1.ApiOkResponse)({ type: account_delegation_legacy_1.AccountDelegationLegacy }),
    (0, swagger_1.ApiQuery)({ name: 'timestamp', description: 'Retrieve entry from timestamp', required: false, type: Number }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('timestamp', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountDelegationLegacy", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/keys"),
    (0, swagger_1.ApiOperation)({ summary: 'Account nodes', description: 'Returns all active / queued nodes where the account is owner' }),
    (0, swagger_1.ApiOkResponse)({ type: [account_key_1.AccountKey] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Key status', required: false, enum: node_status_1.NodeStatusRaw }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumArrayPipe(node_status_1.NodeStatusRaw))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountKeys", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/waiting-list"),
    (0, swagger_1.ApiOperation)({ summary: 'Account queued nodes', description: 'Returns all nodes in the node queue where the account is owner' }),
    (0, swagger_1.ApiOkResponse)({ type: [waiting_list_1.WaitingList] }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountWaitingList", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/transactions"),
    (0, swagger_1.ApiOperation)({ summary: 'Account transaction list', description: 'Returns details of all transactions where the account is sender or receiver' }),
    (0, sdk_nestjs_common_1.ApplyComplexity)({ target: transaction_detailed_1.TransactionDetailed }),
    (0, swagger_1.ApiOkResponse)({ type: [transaction_1.Transaction] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Address of the transaction sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'token', description: 'Identifier of the token', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transaction hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transaction (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter transactions by function name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sort order (asc/desc)', required: false, enum: sort_order_1.SortOrder }),
    (0, swagger_1.ApiQuery)({ name: 'fields', description: 'List of fields to filter by', required: false, isArray: true, style: 'form', explode: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Round number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withScResults', description: 'Return scResults for transactions. When "withScresults" parameter is applied, complexity estimation is 200', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withOperations', description: 'Return operations for transactions. When "withOperations" parameter is applied, complexity estimation is 200', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withLogs', description: 'Return logs for transactions. When "withLogs" parameter is applied, complexity estimation is 200', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withScamInfo', description: 'Returns scam information', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withUsername', description: 'Integrates username in assets for all addresses present in the transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withBlockInfo', description: 'Returns sender / receiver block details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'computeScamInfo', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'senderOrReceiver', description: 'One address that current address interacted with', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isRelayed', description: 'Returns isRelayed transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'isScCall', description: 'Returns sc call transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withActionTransferValue', description: 'Returns value in USD and REWA for transferred tokens within the action attribute', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withRelayedScresults', description: 'If set to true, will include smart contract results that resemble relayed transactions', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(4, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(5, (0, common_1.Query)('token')),
    tslib_1.__param(6, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(7, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(8, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(9, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(10, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(11, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(12, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(13, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(14, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(15, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__param(16, (0, common_1.Query)('fields', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(17, (0, common_1.Query)('withScResults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(18, (0, common_1.Query)('withOperations', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(19, (0, common_1.Query)('withLogs', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(20, (0, common_1.Query)('withScamInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(21, (0, common_1.Query)('withUsername', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(22, (0, common_1.Query)('withBlockInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(23, (0, common_1.Query)('senderOrReceiver', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(24, (0, common_1.Query)('isRelayed', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(25, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(26, (0, common_1.Query)('withActionTransferValue', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(27, (0, common_1.Query)('withRelayedScresults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, String, Array, String, Number, Number, String, Array, String, Array, Number, Number, Number, String, Array, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, String, Boolean, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountTransactions", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/transactions/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Account transactions count', description: 'Returns total number of transactions for a given address where the account is sender or receiver, as well as total transactions count that have a certain status' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Address of the transaction sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'token', description: 'Identifier of the token', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transaction hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transaction (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter transactions by function name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Round number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderOrReceiver', description: 'One address that current address interacted with', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isRelayed', description: 'Returns isRelayed transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'isScCall', description: 'Returns sc call transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withRelayedScresults', description: 'If set to true, will include smart contract results that resemble relayed transactions', required: false, type: Boolean }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(2, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(3, (0, common_1.Query)('token')),
    tslib_1.__param(4, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(6, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(7, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(8, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(9, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(10, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(11, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(12, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(13, (0, common_1.Query)('senderOrReceiver', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(14, (0, common_1.Query)('isRelayed', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(15, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(16, (0, common_1.Query)('withRelayedScresults', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array, String, Number, Number, String, Array, String, Array, Number, Number, Number, String, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountTransactionsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/transfers"),
    (0, swagger_1.ApiOperation)({ summary: 'Account value transfers', description: 'Returns both transfers triggerred by a user account (type = Transaction), as well as transfers triggerred by smart contracts (type = SmartContractResult), thus providing a full picture of all in/out value transfers for a given account' }),
    (0, swagger_1.ApiOkResponse)({ type: [transaction_1.Transaction] }),
    (0, sdk_nestjs_common_1.ApplyComplexity)({ target: transaction_detailed_1.TransactionDetailed }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Address of the transfer sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'token', description: 'Identifier of the token', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transfer hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transaction (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter transactions by function name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sort order (asc/desc)', required: false, enum: sort_order_1.SortOrder }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Round number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'fields', description: 'List of fields to filter by', required: false, isArray: true, style: 'form', explode: false }),
    (0, swagger_1.ApiQuery)({ name: 'relayer', description: 'Address of the relayer', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isScCall', description: 'Returns sc call transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withScamInfo', description: 'Returns scam information', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withUsername', description: 'Integrates username in assets for all addresses present in the transactions', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'withBlockInfo', description: 'Returns sender / receiver block details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'senderOrReceiver', description: 'One address that current address interacted with', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withLogs', description: 'Return logs for transfers. When "withLogs" parameter is applied, complexity estimation is 200', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withOperations', description: 'Return operations for transfers. When "withOperations" parameter is applied, complexity estimation is 200', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withActionTransferValue', description: 'Returns value in USD and REWA for transferred tokens within the action attribute', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withRefunds', description: 'Include refund transactions', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withTxsRelayedByAddress', description: 'Include transactions that were relayed by the address', required: false }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(4, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(5, (0, common_1.Query)('token')),
    tslib_1.__param(6, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(7, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(8, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(9, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(10, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(11, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(12, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(13, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(14, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(15, (0, common_1.Query)('fields', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(16, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__param(17, (0, common_1.Query)('relayer', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(18, (0, common_1.Query)('withScamInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(19, (0, common_1.Query)('withUsername', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(20, (0, common_1.Query)('withBlockInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(21, (0, common_1.Query)('senderOrReceiver', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(22, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(23, (0, common_1.Query)('withLogs', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(24, (0, common_1.Query)('withOperations', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(25, (0, common_1.Query)('withActionTransferValue', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(26, (0, common_1.Query)('withRefunds', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(27, (0, common_1.Query)('withTxsRelayedByAddress', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, Array, Array, String, Number, Number, String, Array, String, Array, Number, Number, Number, Array, String, String, Boolean, Boolean, Boolean, String, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountTransfers", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/transfers/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Account transfer count', description: 'Return total count of transfers triggerred by a user account (type = Transaction), as well as transfers triggerred by smart contracts (type = SmartContractResult)' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Address of the transfer sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Search by multiple receiver addresses, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'token', description: 'Identifier of the token', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'senderShard', description: 'Id of the shard the sender address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiverShard', description: 'Id of the shard the receiver address belongs to', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'Filter by miniblock hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'hashes', description: 'Filter by a comma-separated list of transfer hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Status of the transaction (success / pending / invalid / fail)', required: false, enum: transaction_status_1.TransactionStatus }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter transfers by function name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'round', description: 'Round number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isScCall', description: 'Returns sc call transactions details', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'senderOrReceiver', description: 'One address that current address interacted with', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withRefunds', description: 'Include refund transactions', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withTxsRelayedByAddress', description: 'Include transactions that were relayed by the address', required: false }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(2, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(3, (0, common_1.Query)('token')),
    tslib_1.__param(4, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(6, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(7, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(8, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(9, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(10, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(11, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(12, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(13, (0, common_1.Query)('senderOrReceiver', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(14, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(15, (0, common_1.Query)('withRefunds', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(16, (0, common_1.Query)('withTxsRelayedByAddress', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array, Array, String, Number, Number, String, Array, String, Array, Number, Number, Number, String, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountTransfersCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/transfers/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(2, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressArrayPipe)),
    tslib_1.__param(3, (0, common_1.Query)('token')),
    tslib_1.__param(4, (0, common_1.Query)('senderShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('receiverShard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(6, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(7, (0, common_1.Query)('hashes', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(8, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(transaction_status_1.TransactionStatus))),
    tslib_1.__param(9, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(10, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(11, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(12, (0, common_1.Query)('round', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(13, (0, common_1.Query)('senderOrReceiver', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(14, (0, common_1.Query)('withRefunds', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(15, (0, common_1.Query)('isScCall', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(16, (0, common_1.Query)('withTxsRelayedByAddress', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array, Array, String, Number, Number, String, Array, String, Array, Number, Number, Number, String, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountTransfersCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/deploys"),
    (0, swagger_1.ApiOperation)({ summary: 'Account deploys details', description: 'Returns deploys details for a given account' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: [deployed_contract_1.DeployedContract] }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountDeploys", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/deploys/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Account deploys count', description: 'Returns total number of deploys for a given address' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountDeploysCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/deploys/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountDeploysCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/contracts"),
    (0, swagger_1.ApiOperation)({ summary: 'Account contracts details', description: 'Returns contracts details for a given account' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: [deployed_contract_1.DeployedContract] }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountContracts", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/contracts/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Account contracts count', description: 'Returns total number of contracts for a given address' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountContractsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/contracts/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountContractsCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/upgrades"),
    (0, swagger_1.ApiOperation)({ summary: 'Account upgrades details', description: 'Returns all upgrades details for a specific contract address' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: contract_upgrades_1.ContractUpgrades }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getContractUpgrades", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/results"),
    (0, swagger_1.ApiOperation)({ summary: 'Account smart contract results', description: 'Returns smart contract results where the account is sender or receiver' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: [smart_contract_result_1.SmartContractResult] }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountScResults", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/results/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Account smart contracts results count', description: 'Returns number of smart contract results where the account is sender or receiver' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountScResultsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/results/:scHash"),
    (0, swagger_1.ApiOperation)({ summary: 'Account smart contract result', description: 'Returns details of a smart contract result where the account is sender or receiver' }),
    (0, swagger_1.ApiOkResponse)({ type: smart_contract_result_1.SmartContractResult }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Param)('scHash', sdk_nestjs_common_1.ParseTransactionHashPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountScResult", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/history"),
    (0, swagger_1.ApiOperation)({ summary: 'Account history', description: 'Return account REWA balance history' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: [account_history_1.AccountHistory] }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(4, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountHistory", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/history/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Account history count', description: 'Return account REWA balance history count' }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(2, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountHistoryCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/history/:tokenIdentifier/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Account token history count', description: 'Return account token balance history count' }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Param)('tokenIdentifier', sdk_nestjs_common_1.ParseTokenOrNftPipe)),
    tslib_1.__param(2, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(3, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountTokenHistoryCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/dcdthistory"),
    (0, swagger_1.ApiOperation)({ summary: 'Account dcdts history', description: 'Returns account dcdts balance history' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifier', description: 'Filter by multiple dcdt identifiers, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'token', description: 'Token identifier', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: [account_dcdt_history_1.AccountDcdtHistory] }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(4, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(5, (0, common_1.Query)('identifier', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(6, (0, common_1.Query)('token', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, Number, Number, Array, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountDcdtHistory", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/dcdthistory/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Account dcdts history count', description: 'Returns account dcdts balance history count' }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifier', description: 'Filter by multiple dcdt identifiers, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'token', description: 'Token identifier', required: false }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(2, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(3, (0, common_1.Query)('identifier', sdk_nestjs_common_1.ParseArrayPipe)),
    tslib_1.__param(4, (0, common_1.Query)('token', sdk_nestjs_common_1.ParseTokenPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, Array, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountDcdtHistoryCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/accounts/:address/history/:tokenIdentifier"),
    (0, swagger_1.ApiOperation)({ summary: 'Account token history', description: 'Returns account token balance history' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'After timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: [account_dcdt_history_1.AccountDcdtHistory] }),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Param)('tokenIdentifier', sdk_nestjs_common_1.ParseTokenOrNftPipe)),
    tslib_1.__param(2, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(3, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(5, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Number, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountTokenHistory", null);
AccountController = AccountController_1 = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('accounts'),
    tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService,
        token_service_1.TokenService,
        nft_service_1.NftService,
        delegation_legacy_service_1.DelegationLegacyService,
        waiting_list_service_1.WaitingListService,
        stake_service_1.StakeService,
        transaction_service_1.TransactionService,
        scresult_service_1.SmartContractResultService,
        collection_service_1.CollectionService,
        transfer_service_1.TransferService,
        delegation_service_1.DelegationService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map