"use strict";
var TokenService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const token_with_balance_1 = require("./entities/token.with.balance");
const token_detailed_1 = require("./entities/token.detailed");
const query_pagination_1 = require("../../common/entities/query.pagination");
const token_helpers_1 = require("../../utils/token.helpers");
const dcdt_service_1 = require("../dcdt/dcdt.service");
const token_account_1 = require("./entities/token.account");
const dcdt_type_1 = require("../dcdt/entities/dcdt.type");
const dcdt_address_service_1 = require("../dcdt/dcdt.address.service");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const token_roles_1 = require("./entities/token.roles");
const token_detailed_with_balance_1 = require("./entities/token.detailed.with.balance");
const sort_order_1 = require("../../common/entities/sort.order");
const token_sort_1 = require("./entities/token.sort");
const token_with_roles_1 = require("./entities/token.with.roles");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const concurrency_utils_1 = require("../../utils/concurrency.utils");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const sdk_nestjs_common_2 = require("@sravankumar02/sdk-nestjs-common");
const token_logo_1 = require("./entities/token.logo");
const assets_service_1 = require("../../common/assets/assets.service");
const cache_info_1 = require("../../utils/cache.info");
const transaction_filter_1 = require("../transactions/entities/transaction.filter");
const transaction_service_1 = require("../transactions/transaction.service");
const moa_token_service_1 = require("../moa/moa.token.service");
const collection_service_1 = require("../collections/collection.service");
const nft_type_1 = require("../nfts/entities/nft.type");
const entities_1 = require("../../common/indexer/entities");
const token_assets_price_source_type_1 = require("../../common/assets/entities/token.assets.price.source.type");
const data_api_service_1 = require("../../common/data-api/data-api.service");
const trie_operations_timeout_error_1 = require("../dcdt/exceptions/trie.operations.timeout.error");
const transfer_service_1 = require("../transfers/transfer.service");
const moa_pair_service_1 = require("../moa/moa.pair.service");
const moa_pair_state_1 = require("../moa/entities/moa.pair.state");
const nft_sub_type_1 = require("../nfts/entities/nft.sub.type");
let TokenService = TokenService_1 = class TokenService {
    constructor(dcdtService, indexerService, dcdtAddressService, gatewayService, apiConfigService, assetsService, cachingService, transactionService, transferService, moaTokenService, collectionService, dataApiService, moaPairService, apiService) {
        this.dcdtService = dcdtService;
        this.indexerService = indexerService;
        this.dcdtAddressService = dcdtAddressService;
        this.gatewayService = gatewayService;
        this.apiConfigService = apiConfigService;
        this.assetsService = assetsService;
        this.cachingService = cachingService;
        this.transactionService = transactionService;
        this.transferService = transferService;
        this.moaTokenService = moaTokenService;
        this.collectionService = collectionService;
        this.dataApiService = dataApiService;
        this.moaPairService = moaPairService;
        this.apiService = apiService;
        this.logger = new sdk_nestjs_common_2.OriginLogger(TokenService_1.name);
        this.nftSubTypes = [nft_sub_type_1.NftSubType.DynamicNonFungibleDCDT, nft_sub_type_1.NftSubType.DynamicMetaDCDT, nft_sub_type_1.NftSubType.NonFungibleDCDTv2, nft_sub_type_1.NftSubType.DynamicSemiFungibleDCDT];
        this.rewaIdentifierInMultiTransfer = 'REWA-000000';
        this.thresholdFaultyMarketCap = 10000000000;
    }
    async isToken(identifier) {
        const tokens = await this.getAllTokens();
        const lowercaseIdentifier = identifier.toLowerCase();
        return tokens.find(x => x.identifier.toLowerCase() === lowercaseIdentifier) !== undefined;
    }
    async getToken(rawIdentifier, supplyOptions) {
        const tokens = await this.getAllTokens();
        const identifier = this.normalizeIdentifierCase(rawIdentifier);
        let token = tokens.find(x => x.identifier === identifier);
        if (!sdk_nestjs_common_1.TokenUtils.isToken(identifier)) {
            return undefined;
        }
        if (!token) {
            return undefined;
        }
        token = sdk_nestjs_http_1.ApiUtils.mergeObjects(new token_detailed_1.TokenDetailed(), token);
        this.applyTickerFromAssets(token);
        await Promise.all([
            this.applySupply(token, supplyOptions),
            (async () => {
                if (token.type === entities_1.TokenType.FungibleDCDT) {
                    token.roles = await this.getTokenRoles(identifier);
                }
                else if (token.type === entities_1.TokenType.MetaDCDT) {
                    const elasticCollection = await this.indexerService.getCollection(identifier);
                    if (elasticCollection) {
                        await this.collectionService.applyCollectionRoles(token, elasticCollection);
                    }
                }
            })(),
        ]);
        return token;
    }
    normalizeIdentifierCase(identifier) {
        const [ticker, randomSequence] = identifier.split("-");
        if (!ticker || !randomSequence) {
            return identifier.toUpperCase();
        }
        return `${ticker.toUpperCase()}-${randomSequence.toLowerCase()}`;
    }
    async getTokens(queryPagination, filter) {
        const { from, size } = queryPagination;
        let tokens = await this.getFilteredTokens(filter);
        tokens = tokens.slice(from, from + size);
        for (const token of tokens) {
            this.applyTickerFromAssets(token);
        }
        return tokens
            .map(item => sdk_nestjs_http_1.ApiUtils.mergeObjects(new token_detailed_1.TokenDetailed(), item))
            .filter(t => t.identifier !== this.rewaIdentifierInMultiTransfer);
    }
    applyTickerFromAssets(token) {
        if (token.assets) {
            token.ticker = token.identifier.split('-')[0];
        }
        else {
            token.ticker = token.identifier;
        }
    }
    async getFilteredTokens(filter) {
        var _a, _b;
        let tokens = await this.getAllTokens();
        if (filter.type) {
            tokens = tokens.filter(token => token.type === filter.type);
        }
        if (filter.subType) {
            tokens = tokens.filter(token => { var _a; return token.subType.toString() === ((_a = filter.subType) === null || _a === void 0 ? void 0 : _a.toString()); });
        }
        if (filter.search) {
            const searchLower = filter.search.toLowerCase();
            tokens = tokens.filter(token => token.name.toLowerCase().includes(searchLower) || token.identifier.toLowerCase().includes(searchLower));
        }
        if (filter.name) {
            const nameLower = filter.name.toLowerCase();
            tokens = tokens.filter(token => token.name.toLowerCase() === nameLower);
        }
        if (filter.identifier) {
            const identifierLower = filter.identifier.toLowerCase();
            tokens = tokens.filter(token => token.identifier.toLowerCase().includes(identifierLower));
        }
        if (filter.identifiers) {
            const identifierArray = filter.identifiers.map(identifier => identifier.toLowerCase());
            tokens = tokens.filter(token => identifierArray.includes(token.identifier.toLowerCase()));
        }
        if (filter.includeMetaDCDT !== true) {
            tokens = tokens.filter(token => token.type === entities_1.TokenType.FungibleDCDT);
        }
        if (filter.sort) {
            tokens = this.sortTokens(tokens, filter.sort, (_a = filter.order) !== null && _a !== void 0 ? _a : sort_order_1.SortOrder.desc);
        }
        const moaPairTypes = (_b = filter.moaPairType) !== null && _b !== void 0 ? _b : [];
        if (moaPairTypes.length > 0) {
            tokens = tokens.filter(token => moaPairTypes.includes(token.moaPairType));
        }
        if (filter.priceSource) {
            tokens = tokens.filter(token => { var _a, _b; return ((_b = (_a = token.assets) === null || _a === void 0 ? void 0 : _a.priceSource) === null || _b === void 0 ? void 0 : _b.type) === filter.priceSource; });
        }
        return tokens;
    }
    sortTokens(tokens, sort, order) {
        let criteria;
        switch (sort) {
            case token_sort_1.TokenSort.accounts:
                criteria = token => { var _a; return (_a = token.accounts) !== null && _a !== void 0 ? _a : 0; };
                break;
            case token_sort_1.TokenSort.transactions:
                criteria = token => { var _a; return (_a = token.transactions) !== null && _a !== void 0 ? _a : 0; };
                break;
            case token_sort_1.TokenSort.price:
                criteria = token => { var _a; return (_a = token.price) !== null && _a !== void 0 ? _a : 0; };
                break;
            case token_sort_1.TokenSort.marketCap:
                criteria = token => { var _a; return token.isLowLiquidity ? 0 : ((_a = token.marketCap) !== null && _a !== void 0 ? _a : 0); };
                break;
            default:
                throw new Error(`Unsupported sorting criteria '${sort}'`);
        }
        switch (order) {
            case sort_order_1.SortOrder.asc:
                tokens = tokens.sorted(criteria);
                break;
            case sort_order_1.SortOrder.desc:
                tokens = tokens.sortedDescending(criteria);
                break;
        }
        return tokens;
    }
    async getTokenCount(filter) {
        const tokens = await this.getFilteredTokens(filter);
        return tokens.length;
    }
    async getTokenCountForAddress(address, filter) {
        if (sdk_nestjs_common_1.AddressUtils.isSmartContractAddress(address)) {
            return await this.getTokenCountForAddressFromElastic(address, filter);
        }
        return await this.getTokenCountForAddressFromGateway(address, filter);
    }
    async getTokenCountForAddressFromElastic(address, filter) {
        return await this.indexerService.getTokenCountForAddress(address, filter);
    }
    async getTokenCountForAddressFromGateway(address, filter) {
        const tokens = await this.getAllTokensForAddress(address, filter);
        return tokens.length;
    }
    async getTokensForAddress(address, queryPagination, filter) {
        let tokens;
        if (sdk_nestjs_common_1.AddressUtils.isSmartContractAddress(address)) {
            tokens = await this.getTokensForAddressFromElastic(address, queryPagination, filter);
        }
        else {
            tokens = await this.getTokensForAddressFromGatewayWithElasticFallback(address, queryPagination, filter);
        }
        for (const token of tokens) {
            if (token.type === entities_1.TokenType.MetaDCDT) {
                token.collection = token.identifier.split('-').slice(0, 2).join('-');
                token.nonce = sdk_nestjs_common_1.BinaryUtils.hexToNumber(token.identifier.split('-').slice(2, 3)[0]);
            }
        }
        return tokens;
    }
    async getTokensForAddressFromElastic(address, queryPagination, filter) {
        var _a, _b;
        const elasticTokens = await this.indexerService.getTokensForAddress(address, queryPagination, filter);
        const allTokens = await this.getAllTokens();
        const allTokensIndexed = allTokens.toRecord(token => token.identifier);
        const result = [];
        for (const elasticToken of elasticTokens) {
            if (allTokensIndexed[elasticToken.token]) {
                const token = allTokensIndexed[elasticToken.token];
                const tokenWithBalance = Object.assign(Object.assign({}, token), { identifier: (_a = elasticToken.identifier) !== null && _a !== void 0 ? _a : elasticToken.token, ticker: elasticToken.identifier, balance: elasticToken.balance, attributes: (_b = elasticToken.data) === null || _b === void 0 ? void 0 : _b.attributes, valueUsd: undefined });
                this.applyValueUsd(tokenWithBalance);
                this.applyTickerFromAssets(tokenWithBalance);
                result.push(tokenWithBalance);
            }
        }
        return result;
    }
    applyValueUsd(tokenWithBalance) {
        if (tokenWithBalance.price) {
            tokenWithBalance.valueUsd = tokenWithBalance.price * sdk_nestjs_common_1.NumberUtils.denominateString(tokenWithBalance.balance, tokenWithBalance.decimals);
        }
    }
    async getTokensForAddressFromGatewayWithElasticFallback(address, queryPagination, filter) {
        const isTrieTimeout = await this.cachingService.get(cache_info_1.CacheInfo.AddressDcdtTrieTimeout(address).key);
        if (isTrieTimeout) {
            return await this.getTokensForAddressFromElastic(address, queryPagination, filter);
        }
        try {
            return await this.getTokensForAddressFromGateway(address, queryPagination, filter);
        }
        catch (error) {
            if (error instanceof trie_operations_timeout_error_1.TrieOperationsTimeoutError) {
                await this.cachingService.set(cache_info_1.CacheInfo.AddressDcdtTrieTimeout(address).key, true, cache_info_1.CacheInfo.AddressDcdtTrieTimeout(address).ttl);
                return await this.getTokensForAddressFromElastic(address, queryPagination, filter);
            }
            throw error;
        }
    }
    async getTokensForAddressFromGateway(address, queryPagination, filter) {
        let tokens = await this.getAllTokensForAddress(address, filter);
        tokens = tokens.slice(queryPagination.from, queryPagination.from + queryPagination.size);
        tokens = tokens.map(token => sdk_nestjs_http_1.ApiUtils.mergeObjects(new token_with_balance_1.TokenWithBalance(), token));
        for (const token of tokens) {
            this.applyTickerFromAssets(token);
            this.applyValueUsd(token);
        }
        return tokens;
    }
    async getTokenForAddress(address, identifier) {
        const dcdtIdentifier = identifier.split('-').slice(0, 2).join('-');
        const tokens = await this.getFilteredTokens({ identifier: dcdtIdentifier, includeMetaDCDT: true });
        if (!sdk_nestjs_common_1.TokenUtils.isToken(identifier) && !sdk_nestjs_common_1.TokenUtils.isNft(identifier)) {
            return undefined;
        }
        if (!tokens.length) {
            this.logger.log(`Error when fetching token ${identifier} details for address ${address}`);
            return undefined;
        }
        let tokenWithBalance;
        const token = tokens[0];
        if (sdk_nestjs_common_1.TokenUtils.isNft(identifier)) {
            const nftData = await this.gatewayService.getAddressNft(address, identifier);
            tokenWithBalance = new token_detailed_with_balance_1.TokenDetailedWithBalance(Object.assign(Object.assign({}, token), nftData));
        }
        else {
            const dcdtData = await this.gatewayService.getAddressDcdt(address, identifier);
            tokenWithBalance = new token_detailed_with_balance_1.TokenDetailedWithBalance(Object.assign(Object.assign({}, token), dcdtData));
        }
        const dcdt = await this.gatewayService.getAddressDcdt(address, identifier);
        if (!dcdt || dcdt.balance === '0') {
            return undefined;
        }
        tokenWithBalance = sdk_nestjs_http_1.ApiUtils.mergeObjects(new token_detailed_with_balance_1.TokenDetailedWithBalance(), tokenWithBalance);
        this.applyValueUsd(tokenWithBalance);
        tokenWithBalance.identifier = token.identifier;
        this.applyTickerFromAssets(tokenWithBalance);
        await this.applySupply(tokenWithBalance);
        return tokenWithBalance;
    }
    async getAllTokensForAddress(address, filter) {
        const tokens = await this.getFilteredTokens(filter);
        const tokensIndexed = {};
        for (const token of tokens) {
            tokensIndexed[token.identifier] = token;
        }
        const dcdts = await this.dcdtAddressService.getAllDcdtsForAddressFromGateway(address);
        const tokensWithBalance = [];
        for (const tokenIdentifier of Object.keys(dcdts)) {
            const identifier = tokenIdentifier.split('-').slice(0, 2).join('-');
            const dcdt = dcdts[tokenIdentifier];
            const token = tokensIndexed[identifier];
            if (!token) {
                continue;
            }
            if (dcdt.type && this.nftSubTypes.includes(dcdt.type)) {
                switch (dcdt.type) {
                    case nft_sub_type_1.NftSubType.DynamicNonFungibleDCDT:
                    case nft_sub_type_1.NftSubType.NonFungibleDCDTv2:
                        dcdt.type = nft_sub_type_1.NftSubType.NonFungibleDCDT;
                        dcdt.subType = dcdt.type;
                        break;
                    case nft_sub_type_1.NftSubType.DynamicMetaDCDT:
                        dcdt.type = nft_type_1.NftType.MetaDCDT;
                        dcdt.subType = nft_sub_type_1.NftSubType.DynamicMetaDCDT;
                        break;
                    case nft_sub_type_1.NftSubType.DynamicSemiFungibleDCDT:
                        dcdt.type = nft_type_1.NftType.SemiFungibleDCDT;
                        dcdt.subType = nft_sub_type_1.NftSubType.DynamicSemiFungibleDCDT;
                        break;
                    default:
                        dcdt.subType = nft_sub_type_1.NftSubType.None;
                        break;
                }
            }
            const tokenWithBalance = Object.assign(Object.assign({}, token), dcdt);
            if (dcdt.type === '') {
                tokenWithBalance.type = token.type;
            }
            tokensWithBalance.push(tokenWithBalance);
        }
        for (const token of tokensWithBalance) {
            token.identifier = token.tokenIdentifier;
            delete token.tokenIdentifier;
        }
        return tokensWithBalance;
    }
    async getTokenAccounts(pagination, identifier) {
        var _a;
        const properties = await this.getTokenProperties(identifier);
        if (!properties) {
            return undefined;
        }
        const tokenAccounts = await this.indexerService.getTokenAccounts(pagination, identifier);
        const assets = await this.assetsService.getAllAccountAssets();
        const result = [];
        for (const tokenAccount of tokenAccounts) {
            result.push(new token_account_1.TokenAccount({
                address: tokenAccount.address,
                balance: tokenAccount.balance,
                assets: assets[tokenAccount.address],
                attributes: (_a = tokenAccount.data) === null || _a === void 0 ? void 0 : _a.attributes,
                identifier: tokenAccount.type === entities_1.TokenType.MetaDCDT ? tokenAccount.identifier : undefined,
            }));
        }
        return result;
    }
    async getTokenAccountsCount(identifier) {
        const properties = await this.getTokenProperties(identifier);
        if (!properties) {
            return undefined;
        }
        const count = await this.indexerService.getTokenAccountsCount(identifier);
        return count;
    }
    async getTokenRolesFromElastic(identifier) {
        const token = await this.indexerService.getToken(identifier);
        if (!token) {
            return undefined;
        }
        if (!token.roles) {
            return [];
        }
        const roles = [];
        for (const role of Object.keys(token.roles)) {
            const addresses = token.roles[role].distinct();
            for (const address of addresses) {
                let addressRole = roles.find((addressRole) => addressRole.address === address);
                if (!addressRole) {
                    addressRole = new token_roles_1.TokenRoles();
                    addressRole.address = address;
                    roles.push(addressRole);
                }
                token_helpers_1.TokenHelpers.setTokenRole(addressRole, role);
            }
        }
        return roles;
    }
    async getTokenRoles(identifier) {
        return await this.getTokenRolesFromElastic(identifier);
    }
    async getTokenRolesForIdentifierAndAddress(identifier, address) {
        const token = await this.indexerService.getToken(identifier);
        if (!token) {
            return undefined;
        }
        if (!token.roles) {
            return undefined;
        }
        const addressRoles = new token_roles_1.TokenRoles();
        addressRoles.address = address;
        for (const role of Object.keys(token.roles)) {
            const addresses = token.roles[role].distinct();
            if (addresses.includes(address)) {
                token_helpers_1.TokenHelpers.setTokenRole(addressRoles, role);
            }
        }
        delete addressRoles.address;
        return addressRoles;
    }
    async applySupply(token, supplyOptions) {
        const supply = await this.dcdtService.getTokenSupply(token.identifier);
        const denominated = supplyOptions && supplyOptions.denominated;
        if (denominated === true) {
            token.supply = sdk_nestjs_common_1.NumberUtils.denominate(BigInt(supply.totalSupply), token.decimals);
            token.circulatingSupply = sdk_nestjs_common_1.NumberUtils.denominate(BigInt(supply.circulatingSupply), token.decimals);
        }
        else if (denominated === false) {
            token.supply = supply.totalSupply;
            token.circulatingSupply = supply.circulatingSupply;
        }
        else {
            token.supply = sdk_nestjs_common_1.NumberUtils.denominate(BigInt(supply.totalSupply), token.decimals).toFixed();
            token.circulatingSupply = sdk_nestjs_common_1.NumberUtils.denominate(BigInt(supply.circulatingSupply), token.decimals).toFixed();
        }
        if (supply.minted) {
            token.minted = supply.minted;
        }
        if (supply.burned) {
            token.burnt = supply.burned;
        }
        if (supply.initialMinted) {
            token.initialMinted = supply.initialMinted;
        }
    }
    async getTokenSupply(identifier, supplyOptions) {
        let totalSupply;
        let circulatingSupply;
        const properties = await this.getTokenProperties(identifier);
        if (!properties) {
            return undefined;
        }
        const result = await this.dcdtService.getTokenSupply(identifier);
        const denominated = supplyOptions && supplyOptions.denominated;
        if (denominated === true) {
            totalSupply = sdk_nestjs_common_1.NumberUtils.denominateString(result.totalSupply, properties.decimals);
            circulatingSupply = sdk_nestjs_common_1.NumberUtils.denominateString(result.circulatingSupply, properties.decimals);
        }
        else if (denominated === false) {
            totalSupply = result.totalSupply;
            circulatingSupply = result.circulatingSupply;
        }
        else {
            totalSupply = sdk_nestjs_common_1.NumberUtils.denominateString(result.totalSupply, properties.decimals).toFixed();
            circulatingSupply = sdk_nestjs_common_1.NumberUtils.denominateString(result.circulatingSupply, properties.decimals).toFixed();
        }
        let lockedAccounts = result.lockedAccounts;
        if (lockedAccounts !== undefined) {
            lockedAccounts = JSON.parse(JSON.stringify(lockedAccounts));
            if (denominated === true) {
                for (const lockedAccount of lockedAccounts) {
                    lockedAccount.balance = sdk_nestjs_common_1.NumberUtils.denominateString(lockedAccount.balance.toString(), properties.decimals);
                }
            }
        }
        return {
            supply: totalSupply,
            circulatingSupply: circulatingSupply,
            minted: denominated === true && result.minted ? sdk_nestjs_common_1.NumberUtils.denominateString(result.minted, properties.decimals) : result.minted,
            burnt: denominated === true && result.burned ? sdk_nestjs_common_1.NumberUtils.denominateString(result.burned, properties.decimals) : result.burned,
            initialMinted: denominated === true && result.initialMinted ? sdk_nestjs_common_1.NumberUtils.denominateString(result.initialMinted, properties.decimals) : result.initialMinted,
            lockedAccounts: lockedAccounts === null || lockedAccounts === void 0 ? void 0 : lockedAccounts.sortedDescending(account => Number(account.balance)),
        };
    }
    async getTokenProperties(identifier) {
        if (identifier.split('-').length !== 2) {
            return undefined;
        }
        const properties = await this.dcdtService.getDcdtTokenProperties(identifier);
        if (!properties) {
            return undefined;
        }
        if (![dcdt_type_1.DcdtType.FungibleDCDT, dcdt_type_1.DcdtType.MetaDCDT].includes(properties.type)) {
            return undefined;
        }
        return properties;
    }
    async getTokensWithRolesForAddressCount(address, filter) {
        return await this.indexerService.getTokensWithRolesForAddressCount(address, filter);
    }
    async getTokenWithRolesForAddress(address, identifier) {
        const tokens = await this.getTokensWithRolesForAddress(address, { identifier, includeMetaDCDT: true }, { from: 0, size: 1 });
        if (tokens.length === 0) {
            return undefined;
        }
        return tokens[0];
    }
    async getTokensWithRolesForAddress(address, filter, pagination) {
        const tokenList = await this.indexerService.getTokensWithRolesForAddress(address, filter, pagination);
        const allTokens = await this.getAllTokens();
        const result = [];
        for (const item of tokenList) {
            const token = allTokens.find(x => x.identifier === item.identifier);
            if (token) {
                this.applyTickerFromAssets(token);
                const resultItem = sdk_nestjs_http_1.ApiUtils.mergeObjects(new token_with_roles_1.TokenWithRoles(), token);
                if (item.roles) {
                    const addressRoles = Object.keys(item.roles).filter(key => item.roles[key].includes(address));
                    if (!item.roles['DCDTTransferRole']) {
                        resultItem.canTransfer = true;
                    }
                    resultItem.role = new token_roles_1.TokenRoles({
                        canLocalMint: token.type === entities_1.TokenType.FungibleDCDT ? addressRoles.includes('DCDTRoleLocalMint') : undefined,
                        canLocalBurn: token.type === entities_1.TokenType.FungibleDCDT ? addressRoles.includes('DCDTRoleLocalBurn') : undefined,
                        canAddQuantity: token.type === entities_1.TokenType.MetaDCDT ? addressRoles.includes('DCDTRoleNFTAddQuantity') : undefined,
                        canAddUri: token.type === entities_1.TokenType.MetaDCDT ? addressRoles.includes('DCDTRoleNFTAddURI') : undefined,
                        canCreate: token.type === entities_1.TokenType.MetaDCDT ? addressRoles.includes('DCDTRoleNFTCreate') : undefined,
                        canBurn: token.type === entities_1.TokenType.MetaDCDT ? addressRoles.includes('DCDTRoleNFTBurn') : undefined,
                        canUpdateAttributes: token.type === entities_1.TokenType.MetaDCDT ? addressRoles.includes('DCDTRoleNFTUpdateAttributes') : undefined,
                        canTransfer: resultItem.canTransfer === false ? addressRoles.includes('DCDTTransferRole') : undefined,
                        roles: addressRoles,
                    });
                    const clonedRoles = new token_roles_1.TokenRoles(resultItem.role);
                    delete clonedRoles.roles;
                    delete clonedRoles.canTransfer;
                    Object.assign(resultItem, clonedRoles);
                }
                result.push(resultItem);
            }
        }
        return result;
    }
    async getLogo(identifier) {
        const assets = await this.assetsService.getTokenAssets(identifier);
        if (!assets) {
            return;
        }
        return new token_logo_1.TokenLogo({ pngUrl: assets.pngUrl, svgUrl: assets.svgUrl });
    }
    async getLogoPng(identifier) {
        const logo = await this.getLogo(identifier);
        if (!logo) {
            return;
        }
        return logo.pngUrl;
    }
    async getLogoSvg(identifier) {
        const logo = await this.getLogo(identifier);
        if (!logo) {
            return;
        }
        return logo.svgUrl;
    }
    async getTokenMarketCap() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.TokenMarketCap.key, async () => await this.getTokenMarketCapRaw(), cache_info_1.CacheInfo.TokenMarketCap.ttl);
    }
    async getTokenMarketCapRaw() {
        var _a, _b;
        let totalMarketCap = 0;
        const tokens = await this.getAllTokens();
        for (const token of tokens) {
            if (token.price && token.marketCap && !token.isLowLiquidity && ((_b = (_a = token.assets) === null || _a === void 0 ? void 0 : _a.priceSource) === null || _b === void 0 ? void 0 : _b.type) !== token_assets_price_source_type_1.TokenAssetsPriceSourceType.customUrl) {
                totalMarketCap += token.marketCap;
            }
        }
        return totalMarketCap;
    }
    async getAllTokens() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.AllDcdtTokens.key, async () => await this.getAllTokensRaw(), cache_info_1.CacheInfo.AllDcdtTokens.ttl);
    }
    async getAllTokensRaw() {
        if (this.apiConfigService.isTokensFetchFeatureEnabled()) {
            return await this.getAllTokensFromApi();
        }
        this.logger.log(`Starting to fetch all tokens`);
        const startFungible = Date.now();
        const tokensProperties = await this.dcdtService.getAllFungibleTokenProperties();
        let tokens = tokensProperties.map(properties => sdk_nestjs_http_1.ApiUtils.mergeObjects(new token_detailed_1.TokenDetailed(), properties));
        this.logger.log(`Fetched ${tokens.length} fungible tokens in ${Date.now() - startFungible}ms`);
        const allAssets = await this.assetsService.getAllTokenAssets();
        for (const token of tokens) {
            const assets = allAssets[token.identifier];
            if (assets && assets.name) {
                token.name = assets.name;
            }
            token.type = entities_1.TokenType.FungibleDCDT;
        }
        this.logger.log(`Starting to fetch all meta tokens`);
        const collections = await this.collectionService.getNftCollections(new query_pagination_1.QueryPagination({ from: 0, size: 10000 }), { type: [nft_type_1.NftType.MetaDCDT] });
        for (const collection of collections) {
            tokens.push(new token_detailed_1.TokenDetailed({
                type: entities_1.TokenType.MetaDCDT,
                subType: collection.subType,
                identifier: collection.collection,
                name: collection.name,
                timestamp: collection.timestamp,
                owner: collection.owner,
                decimals: collection.decimals,
                canFreeze: collection.canFreeze,
                canPause: collection.canPause,
                canTransferNftCreateRole: collection.canTransferNftCreateRole,
                canWipe: collection.canWipe,
                canAddSpecialRoles: collection.canAddSpecialRoles,
                canChangeOwner: collection.canChangeOwner,
                canUpgrade: collection.canUpgrade,
            }));
        }
        await this.batchProcessTokens(tokens);
        const nonMetaDcdtTokens = tokens.filter(x => x.type !== entities_1.TokenType.MetaDCDT);
        this.logger.log(`Applying MOA data for ${nonMetaDcdtTokens.length} non-meta tokens`);
        await Promise.all([
            this.applyMoaLiquidity(nonMetaDcdtTokens),
            this.applyMoaPrices(nonMetaDcdtTokens),
            this.applyMoaPairType(nonMetaDcdtTokens),
            this.applyMoaPairTradesCount(nonMetaDcdtTokens),
        ]);
        this.logger.log(`Fetching assets for ${tokens.length} tokens`);
        await this.cachingService.batchApplyAll(tokens, token => cache_info_1.CacheInfo.DcdtAssets(token.identifier).key, async (token) => await this.getTokenAssetsRaw(token.identifier), (token, assets) => token.assets = assets, cache_info_1.CacheInfo.DcdtAssets('').ttl, 50);
        this.logger.log(`Processing price sources and supply for ${tokens.length} tokens`);
        await concurrency_utils_1.ConcurrencyUtils.executeWithConcurrencyLimit(tokens, async (token) => {
            var _a, _b, _c, _d, _e, _f, _g;
            try {
                const priceSourcetype = (_b = (_a = token.assets) === null || _a === void 0 ? void 0 : _a.priceSource) === null || _b === void 0 ? void 0 : _b.type;
                if (priceSourcetype === token_assets_price_source_type_1.TokenAssetsPriceSourceType.dataApi) {
                    token.price = await this.dataApiService.getDcdtTokenPrice(token.identifier);
                }
                else if (priceSourcetype === token_assets_price_source_type_1.TokenAssetsPriceSourceType.customUrl && ((_d = (_c = token.assets) === null || _c === void 0 ? void 0 : _c.priceSource) === null || _d === void 0 ? void 0 : _d.url)) {
                    const pathToPrice = (_g = (_f = (_e = token.assets) === null || _e === void 0 ? void 0 : _e.priceSource) === null || _f === void 0 ? void 0 : _f.path) !== null && _g !== void 0 ? _g : "0.usdPrice";
                    const customHeaders = this.apiConfigService.getHeadersForCustomUrl(token.assets.priceSource.url);
                    const tokenData = await this.fetchTokenDataFromUrl(token.assets.priceSource.url, pathToPrice, customHeaders);
                    if (tokenData) {
                        token.price = tokenData;
                    }
                }
                if (!token.price && token.type === entities_1.TokenType.FungibleDCDT) {
                    try {
                        const dataApiPrice = await this.dataApiService.getDcdtTokenPrice(token.identifier);
                        if (dataApiPrice) {
                            token.price = dataApiPrice;
                            this.logger.log(`Applied dataAPI fallback for ${token.identifier} token with price ${dataApiPrice}`);
                        }
                    }
                    catch (error) {
                        this.logger.error(`Error applying dataAPI fallback price for token ${token.identifier}: ${error}`);
                    }
                }
                const supply = await this.dcdtService.getTokenSupply(token.identifier);
                token.supply = supply.totalSupply;
                token.circulatingSupply = supply.circulatingSupply;
                if (token.price && token.circulatingSupply) {
                    token.marketCap = token.price * sdk_nestjs_common_1.NumberUtils.denominateString(token.circulatingSupply, token.decimals);
                    if (token.marketCap > this.thresholdFaultyMarketCap) {
                        this.logger.log(`Setting token market cap to 0 due to possibly faulty market cap. Token: ${token.identifier}. Circulating supply: ${token.circulatingSupply}. Price: ${token.price}. Market cap: ${token.marketCap}`);
                        token.marketCap = 0;
                    }
                }
            }
            catch (error) {
                this.logger.error(`Error processing price/supply for token ${token.identifier}: ${error}`);
            }
        }, 50, 'Token prices and supply calculation');
        this.logger.log(`Sorting and finalizing ${tokens.length} tokens`);
        tokens = tokens.sortedDescending(token => token.assets ? 1 : 0, token => token.marketCap ? 1 : 0, token => { var _a, _b, _c; return token.isLowLiquidity || ((_b = (_a = token.assets) === null || _a === void 0 ? void 0 : _a.priceSource) === null || _b === void 0 ? void 0 : _b.type) === token_assets_price_source_type_1.TokenAssetsPriceSourceType.customUrl ? 0 : ((_c = token.marketCap) !== null && _c !== void 0 ? _c : 0); }, token => { var _a; return (_a = token.transactions) !== null && _a !== void 0 ? _a : 0; });
        const rewaToken = new token_detailed_1.TokenDetailed({
            identifier: this.rewaIdentifierInMultiTransfer,
            name: 'REWA',
            type: entities_1.TokenType.FungibleDCDT,
            assets: await this.assetsService.getTokenAssets(this.rewaIdentifierInMultiTransfer),
            decimals: 18,
            isLowLiquidity: false,
            price: await this.dataApiService.getRewaPrice(),
            supply: '0',
            circulatingSupply: '0',
            marketCap: 0,
        });
        tokens = [...tokens, rewaToken];
        this.logger.log(`Total tokens processed: ${tokens.length}`);
        return tokens;
    }
    extractData(data, path) {
        const keys = path.split('.');
        let result = data;
        for (const key of keys) {
            if (result === undefined || result === null) {
                return undefined;
            }
            result = !isNaN(Number(key)) ? result[Number(key)] : result[key];
        }
        return result;
    }
    async fetchTokenDataFromUrl(url, path, customHeaders) {
        try {
            this.logger.log(`Fetching token data from URL: ${url} with custom headers: ${JSON.stringify(customHeaders)}`);
            const result = await this.apiService.get(url, customHeaders ? { headers: customHeaders } : undefined);
            if (!result || !result.data) {
                this.logger.error(`Invalid response received from URL: ${url}`);
                return;
            }
            const extractedValue = this.extractData(result.data, path);
            if (!extractedValue) {
                this.logger.error(`No valid data found at URL: ${url}`);
                return;
            }
            return extractedValue;
        }
        catch (error) {
            this.logger.error(`Failed to fetch token data from URL: ${url}`, error);
        }
    }
    async getTokenAssetsRaw(identifier) {
        return await this.assetsService.getTokenAssets(identifier);
    }
    async applyMoaPairType(tokens) {
        try {
            const moaTokens = await this.moaTokenService.getAllMoaTokenTypes();
            const moaTokensDictionary = moaTokens.toRecord(token => token.identifier);
            for (const token of tokens) {
                const moaTokenType = moaTokensDictionary[token.identifier];
                if (moaTokenType) {
                    token.moaPairType = moaTokenType.type;
                }
            }
        }
        catch (error) {
            this.logger.error('Could not apply moa pair types');
            this.logger.error(error);
        }
    }
    async batchProcessTokens(tokens) {
        this.logger.log(`Starting batch process for ${tokens.length} tokens`);
        await Promise.all([
            this.cachingService.batchApplyAll(tokens, token => cache_info_1.CacheInfo.TokenTransactions(token.identifier).key, async (token) => await this.getTotalTransactions(token), (token, result) => {
                token.transactions = result === null || result === void 0 ? void 0 : result.count;
                token.transactionsLastUpdatedAt = result === null || result === void 0 ? void 0 : result.lastUpdatedAt;
            }, cache_info_1.CacheInfo.TokenTransactions('').ttl, 50),
            this.cachingService.batchApplyAll(tokens, token => cache_info_1.CacheInfo.TokenAccounts(token.identifier).key, async (token) => await this.getTotalAccounts(token), (token, result) => {
                token.accounts = result === null || result === void 0 ? void 0 : result.count;
                token.accountsLastUpdatedAt = result === null || result === void 0 ? void 0 : result.lastUpdatedAt;
            }, cache_info_1.CacheInfo.TokenAccounts('').ttl, 50),
            this.cachingService.batchApplyAll(tokens, token => cache_info_1.CacheInfo.TokenTransfers(token.identifier).key, async (token) => await this.getTotalTransfers(token), (token, result) => {
                token.transfers = result === null || result === void 0 ? void 0 : result.count;
                token.transfersLastUpdatedAt = result === null || result === void 0 ? void 0 : result.lastUpdatedAt;
            }, cache_info_1.CacheInfo.TokenTransfers('').ttl, 50),
        ]);
        this.logger.log(`Batch process for ${tokens.length} tokens finished`);
    }
    async getAllTokensFromApi() {
        try {
            const { data } = await this.apiService.get(`${this.apiConfigService.getTokensFetchServiceUrl()}/tokens`, { params: { size: 10000 } });
            return data;
        }
        catch (error) {
            this.logger.error('An unhandled error occurred when getting tokens from API');
            this.logger.error(error);
            throw error;
        }
    }
    async getTotalTransactions(token) {
        var _a, _b;
        try {
            const count = await this.transactionService.getTransactionCount(new transaction_filter_1.TransactionFilter({ tokens: [token.identifier, ...(_b = (_a = token.assets) === null || _a === void 0 ? void 0 : _a.extraTokens) !== null && _b !== void 0 ? _b : []] }));
            return { count, lastUpdatedAt: new Date().getTimeInSeconds() };
        }
        catch (error) {
            this.logger.error(`An unhandled error occurred when getting transaction count for token '${token.identifier}'`);
            this.logger.error(error);
            return undefined;
        }
    }
    async getTotalTransfers(token) {
        var _a, _b;
        try {
            const filter = new transaction_filter_1.TransactionFilter({ tokens: [token.identifier, ...(_b = (_a = token.assets) === null || _a === void 0 ? void 0 : _a.extraTokens) !== null && _b !== void 0 ? _b : []] });
            const count = await this.transferService.getTransfersCount(filter);
            return { count, lastUpdatedAt: new Date().getTimeInSeconds() };
        }
        catch (error) {
            this.logger.error(`An unhandled error occurred when getting transfers count for token '${token.identifier}'`);
            this.logger.error(error);
            return undefined;
        }
    }
    async getTotalAccounts(token) {
        let accounts = await this.cachingService.getRemote(cache_info_1.CacheInfo.TokenAccountsExtra(token.identifier).key);
        if (!accounts) {
            accounts = await this.getDcdtAccountsCount(token.identifier);
        }
        if (!accounts) {
            return undefined;
        }
        return { count: accounts, lastUpdatedAt: new Date().getTimeInSeconds() };
    }
    async getDcdtAccountsCount(identifier) {
        try {
            return await this.indexerService.getDcdtAccountsCount(identifier);
        }
        catch (error) {
            this.logger.error(`An unhandled error occurred when getting account count for token '${identifier}'`);
            this.logger.error(error);
            return undefined;
        }
    }
    async applyMoaLiquidity(tokens) {
        try {
            const allPairs = await this.moaPairService.getAllMoaPairs();
            for (const token of tokens) {
                const pairs = allPairs.filter(x => x.baseId === token.identifier || x.quoteId === token.identifier);
                if (pairs.length > 0) {
                    token.totalLiquidity = pairs.sum(x => x.totalValue / 2);
                    token.totalVolume24h = pairs.sum(x => { var _a; return (_a = x.volume24h) !== null && _a !== void 0 ? _a : 0; });
                }
            }
        }
        catch (error) {
            this.logger.error('Could not apply moa liquidity');
            this.logger.error(error);
        }
    }
    async applyMoaPrices(tokens) {
        const LOW_LIQUIDITY_THRESHOLD = 0.005;
        try {
            const indexedTokens = await this.moaTokenService.getMoaPricesRaw();
            const tokensWithPrices = tokens.filter(token => indexedTokens[token.identifier]);
            this.logger.log(`Applying MOA prices for ${tokensWithPrices.length} tokens with parallel supply fetching`);
            await concurrency_utils_1.ConcurrencyUtils.executeWithConcurrencyLimit(tokensWithPrices, async (token) => {
                try {
                    const price = indexedTokens[token.identifier];
                    if (!price) {
                        return;
                    }
                    const supply = await this.dcdtService.getTokenSupply(token.identifier);
                    if (token.assets && token.identifier.split('-')[0] === 'REWAUSDC') {
                        price.price = price.price / (10 ** 12) * 2;
                    }
                    if (price.isToken) {
                        token.price = price.price;
                        token.marketCap = price.price * sdk_nestjs_common_1.NumberUtils.denominateString(supply.circulatingSupply, token.decimals);
                        if (token.marketCap > this.thresholdFaultyMarketCap) {
                            this.logger.log(`Setting token market cap to 0 due to possibly faulty market cap. Token: ${token.identifier}. Circulating supply: ${supply.circulatingSupply}. Price: ${token.price}. Market cap: ${token.marketCap}`);
                            token.marketCap = 0;
                        }
                        if (token.totalLiquidity && token.marketCap && (token.totalLiquidity / token.marketCap < LOW_LIQUIDITY_THRESHOLD)) {
                            token.isLowLiquidity = true;
                            token.lowLiquidityThresholdPercent = LOW_LIQUIDITY_THRESHOLD * 100;
                        }
                    }
                    token.supply = supply.totalSupply;
                    token.circulatingSupply = supply.circulatingSupply;
                }
                catch (error) {
                    this.logger.error(`Error applying MOA price for token ${token.identifier}: ${error}`);
                }
            }, 50, 'MOA prices and supply');
        }
        catch (error) {
            this.logger.error('Could not apply moa tokens prices');
            this.logger.error(error);
        }
    }
    async applyMoaPairTradesCount(tokens) {
        if (!tokens.length) {
            return;
        }
        try {
            const pairs = await this.moaPairService.getAllMoaPairs();
            const filteredPairs = pairs.filter(x => x.state === moa_pair_state_1.MoaPairState.active);
            if (!filteredPairs.length) {
                return;
            }
            for (const token of tokens) {
                const tokenPairs = filteredPairs.filter(x => x.baseId === token.identifier || x.quoteId === token.identifier);
                if (tokenPairs.length > 0) {
                    token.tradesCount = tokenPairs.sum(tokenPair => { var _a; return (_a = tokenPair.tradesCount) !== null && _a !== void 0 ? _a : 0; });
                }
            }
        }
        catch (error) {
            this.logger.error('Could not apply moa trades count');
            this.logger.error(error);
        }
    }
};
TokenService = TokenService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(7, (0, common_1.Inject)((0, common_1.forwardRef)(() => transaction_service_1.TransactionService))),
    tslib_1.__param(8, (0, common_1.Inject)((0, common_1.forwardRef)(() => transfer_service_1.TransferService))),
    tslib_1.__param(9, (0, common_1.Inject)((0, common_1.forwardRef)(() => moa_token_service_1.MoaTokenService))),
    tslib_1.__metadata("design:paramtypes", [dcdt_service_1.DcdtService,
        indexer_service_1.IndexerService,
        dcdt_address_service_1.DcdtAddressService,
        gateway_service_1.GatewayService,
        api_config_service_1.ApiConfigService,
        assets_service_1.AssetsService,
        sdk_nestjs_cache_1.CacheService,
        transaction_service_1.TransactionService,
        transfer_service_1.TransferService,
        moa_token_service_1.MoaTokenService,
        collection_service_1.CollectionService,
        data_api_service_1.DataApiService,
        moa_pair_service_1.MoaPairService,
        sdk_nestjs_http_1.ApiService])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map