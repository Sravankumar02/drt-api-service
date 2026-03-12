"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheInfo = void 0;
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
class CacheInfo {
    constructor() {
        this.key = "";
        this.ttl = sdk_nestjs_common_1.Constants.oneSecond() * 6;
    }
    static ConfirmedIdentity(bls) {
        return {
            key: `confirmedIdentity:${bls}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour() * 6,
        };
    }
    static ConfirmedProvider(address) {
        return {
            key: `confirmedProvider:${address}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour() * 6,
        };
    }
    static ProviderOwner(address) {
        return {
            key: `providerOwner:${address}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour() * 6,
        };
    }
    static TxCount(address) {
        return {
            key: `txCount:${address}`,
            ttl: sdk_nestjs_common_1.Constants.oneSecond() * 30,
        };
    }
    static Transactions(queryPagination) {
        return {
            key: `transactions:${queryPagination.from}:${queryPagination.size}`,
            ttl: sdk_nestjs_common_1.Constants.oneSecond() * 6,
        };
    }
    static ShardAndEpochBlses(shard, epoch) {
        return {
            key: `${shard}_${epoch}`,
            ttl: sdk_nestjs_common_1.Constants.oneWeek(),
        };
    }
    static OwnerByEpochAndBls(epoch, bls) {
        return {
            key: `nodeOwner:${epoch}:${bls}`,
            ttl: sdk_nestjs_common_1.Constants.oneDay(),
        };
    }
    static TransactionProcessorShardNonce(shard) {
        return {
            key: `shardNonce:${shard}`,
            ttl: Number.MAX_SAFE_INTEGER,
        };
    }
    static TransactionCompletedShardNonce(shard) {
        return {
            key: `completedShardNonce:${shard}`,
            ttl: Number.MAX_SAFE_INTEGER,
        };
    }
    static TransactionBatchShardNonce(shard) {
        return {
            key: `batchShardNonce:${shard}`,
            ttl: Number.MAX_SAFE_INTEGER,
        };
    }
    static TokenHourChart(tokenIdentifier) {
        return {
            key: `tokenHourChart:${tokenIdentifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
        };
    }
    static TokenDailyChart(tokenIdentifier) {
        return {
            key: `tokenDailyChart:${tokenIdentifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneDay(),
        };
    }
    static Nfts(queryPagination) {
        return {
            key: `nfts:${queryPagination.from}:${queryPagination.size}`,
            ttl: sdk_nestjs_common_1.Constants.oneSecond() * 6,
        };
    }
    static TokenTransferProperties(identifier) {
        return {
            key: `token:transfer:properties:v2:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static DcdtProperties(identifier) {
        return {
            key: `dcdt:v2:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneDay(),
        };
    }
    static CollectionProperties(identifier) {
        return {
            key: `collection:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneDay(),
        };
    }
    static CollectionTraits(identifier) {
        return {
            key: `collectionTraits:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
        };
    }
    static CollectionRoles(identifier) {
        return {
            key: `collectionRoles:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute() * 5,
        };
    }
    static CollectionLogo(identifier) {
        return {
            key: `collectionLogo:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static CollectionRanksForIdentifier(identifier) {
        return {
            key: `collectionRanks:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
        };
    }
    static CollectionCountForAddress(address) {
        return {
            key: `collectionCount:${address}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute(),
        };
    }
    static CollectionRolesCountForAddress(address) {
        return {
            key: `collectionRolesCount:${address}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute(),
        };
    }
    static Collections(pagination) {
        return {
            key: `collections:${pagination.from}:${pagination.size}`,
            ttl: sdk_nestjs_common_1.Constants.oneSecond() * 6,
        };
    }
    static CollectionsForAddress(address, pagination) {
        return {
            key: `collectionsForAddress:${address}:${pagination.from}:${pagination.size}`,
            ttl: sdk_nestjs_common_1.Constants.oneSecond() * 6,
        };
    }
    static DcdtAddressesRoles(identifier) {
        return {
            key: `dcdt:roles:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneDay(),
        };
    }
    static DcdtAssets(identifier) {
        return {
            key: `dcdt:assets:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static HistoricalPrice(identifier, date) {
        const isCurrentDate = date.toISODateString() === new Date().toISODateString();
        const ttl = isCurrentDate ? sdk_nestjs_common_1.Constants.oneMinute() * 5 : sdk_nestjs_common_1.Constants.oneWeek();
        return {
            key: `historical-price:${identifier}:${date.toISODateString()}`,
            ttl,
        };
    }
    static NftMetadata(identifier) {
        return {
            key: `nftMetadata:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
        };
    }
    static NftMedia(identifier) {
        return {
            key: `nftMedia:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
        };
    }
    static NftMediaProperties(uri) {
        return {
            key: `nftMediaProperties:${uri}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static TokenLockedAccounts(identifier) {
        return {
            key: `tokenLockedAccounts:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static TokenSupply(identifier) {
        return {
            key: `tokenSupply:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static TokenTransactions(identifier) {
        return {
            key: `tokenTransactionsv2:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static TokenTransfers(identifier) {
        return {
            key: `tokenTransfersv2:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static TokenAccounts(identifier) {
        return {
            key: `tokenAccountsv2:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static TokenAccountsExtra(identifier) {
        return {
            key: `tokenAccountsExtra:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static TransactionPendingResults(hash) {
        return {
            key: `transaction:pendingresults:${hash}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute() * 20,
        };
    }
    static StakeTopup(address) {
        return {
            key: `stakeTopup:${address}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute() * 15,
        };
    }
    static CollectionType(collectionIdentifier) {
        return {
            key: `collectionType:${collectionIdentifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
        };
    }
    static GenerateThumbnails(identifier) {
        return {
            key: `generateThumbnails:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour() * 24,
        };
    }
    static CollectionNonScOwner(collection) {
        return {
            key: `collectionNonScOwner:${collection}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
        };
    }
    static TransactionBatch(sender, batchId) {
        return {
            key: `transactionbatch:${sender}:${batchId}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute() * 20,
        };
    }
    static PendingTransaction(hash) {
        return {
            key: `pendingtransaction:${hash}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute() * 15,
        };
    }
    static AccountUsername(address) {
        return {
            key: `account:${address}:username`,
            ttl: sdk_nestjs_common_1.Constants.oneWeek(),
        };
    }
    static AccountDeployedAt(address) {
        return {
            key: `accountDeployedAt:${address}`,
            ttl: sdk_nestjs_common_1.Constants.oneDay(),
        };
    }
    static AccountDeployTxHash(address) {
        return {
            key: `accountDeployTxHash:${address}`,
            ttl: sdk_nestjs_common_1.Constants.oneDay(),
        };
    }
    static AccountIsVerified(address) {
        return {
            key: `accountIsVerified:${address}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
        };
    }
    static Accounts(queryPagination) {
        return {
            key: `accounts:${queryPagination.from}:${queryPagination.size}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute(),
        };
    }
    static BlocksCount(filter) {
        return {
            key: `blocks:count:${JSON.stringify(filter)}`,
            ttl: sdk_nestjs_common_1.Constants.oneSecond() * 6,
        };
    }
    static BlocksLatest(ttl) {
        const cachingTtl = CacheInfo.computeBlocksLatestTtl(ttl);
        return {
            key: `blocks:latest:${cachingTtl}`,
            ttl: cachingTtl,
        };
    }
    static computeBlocksLatestTtl(ttl) {
        if (ttl === undefined || ttl <= sdk_nestjs_common_1.Constants.oneMinute() * 5) {
            return sdk_nestjs_common_1.Constants.oneSecond() * 12;
        }
        if (ttl <= sdk_nestjs_common_1.Constants.oneHour()) {
            return sdk_nestjs_common_1.Constants.oneMinute() * 5;
        }
        if (ttl <= sdk_nestjs_common_1.Constants.oneHour() * 6) {
            return sdk_nestjs_common_1.Constants.oneMinute() * 15;
        }
        if (ttl <= sdk_nestjs_common_1.Constants.oneDay()) {
            return sdk_nestjs_common_1.Constants.oneMinute() * 30;
        }
        return sdk_nestjs_common_1.Constants.oneHour();
    }
    static NftOwnersCount(identifier) {
        return {
            key: `nftOwnerCount:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute(),
        };
    }
    static NftTags(pagination) {
        return {
            key: `nftTags:${pagination.from}:${pagination.size}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static DelegationProvider(address) {
        return {
            key: `delegationProvider:${address}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute(),
        };
    }
    static PendingUploadAsset(identifier) {
        return {
            key: `pendingUploadAsset:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour() * 12,
        };
    }
    static PendingMediaGet(identifier) {
        return {
            key: `pendingMediaGet:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour() * 12,
        };
    }
    static PendingMetadataGet(identifier) {
        return {
            key: `pendingMetadataGet:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour() * 12,
        };
    }
    static PendingGenerateThumbnail(identifier) {
        return {
            key: `pendingGenerateThumbnail:${identifier}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour() * 12,
        };
    }
    static Username(address) {
        return {
            key: `username:${address}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static ContractUpgrades(address) {
        return {
            key: `contractUpgrades:${address}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static Setting(name) {
        return {
            key: `api:settings:${name}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static AddressDcdtTrieTimeout(address) {
        return {
            key: `addressDcdtTrieTimeout:${address}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static GithubKeysValidated(identity) {
        return {
            key: `githubKeysValidated:${identity}`,
            ttl: sdk_nestjs_common_1.Constants.oneDay(),
        };
    }
    static GithubProfileValidated(identity) {
        return {
            key: `githubProfileValidated:${identity}`,
            ttl: sdk_nestjs_common_1.Constants.oneDay(),
        };
    }
    static DataApiTokenPrice(identifier, timestamp) {
        const priceDate = timestamp ? new Date(timestamp * 1000) : new Date();
        const isCurrentDate = priceDate.toISODateString() === new Date().toISODateString();
        const ttl = isCurrentDate ? sdk_nestjs_common_1.Constants.oneMinute() * 5 : sdk_nestjs_common_1.Constants.oneWeek();
        const key = priceDate.toISODateString();
        return {
            key: `data-api:price:${identifier}:${key}`,
            ttl,
        };
    }
    static TpsNonceByShard(shardId) {
        return {
            key: `tpsCurrentNonce:${shardId}`,
            ttl: sdk_nestjs_common_1.Constants.oneDay(),
        };
    }
    static TpsByTimestampAndFrequency(timestamp, frequency) {
        return {
            key: `tpsTransactions:${timestamp}:${frequency}`,
            ttl: frequency * 300,
        };
    }
    static TpsHistoryByInterval(interval) {
        return {
            key: `tpsHistory:${interval}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute(),
        };
    }
    static TpsMaxByInterval(interval) {
        return {
            key: `tpsMax:${interval}`,
            ttl: sdk_nestjs_common_1.Constants.oneDay(),
        };
    }
    static TransactionCountByShard(shardId) {
        return {
            key: `transactionCount:${shardId}`,
            ttl: sdk_nestjs_common_1.Constants.oneHour(),
        };
    }
    static Applications(queryPagination) {
        return {
            key: `applications:${queryPagination.from}:${queryPagination.size}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute(),
        };
    }
    static DeepHistoryBlock(timestamp, shardId) {
        return {
            key: `deepHistoryBlock:${timestamp}:${shardId}`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
        };
    }
    static PpuMetadataByShard(shardId) {
        return {
            key: `ppuMetadata:shard:${shardId}`,
            ttl: sdk_nestjs_common_1.Constants.oneSecond() * 30,
        };
    }
    static WsTimestampMsToProcess() {
        return {
            key: `wsLastProcessedTimestampMs`,
            ttl: sdk_nestjs_common_1.Constants.oneMinute(),
        };
    }
}
exports.CacheInfo = CacheInfo;
CacheInfo.About = {
    key: 'about',
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.LastProcessedTimestamp = {
    key: 'lastProcessedTimestamp',
    ttl: sdk_nestjs_common_1.Constants.oneWeek() * 2,
};
CacheInfo.TokenMarketCap = {
    key: 'tokenMarketCap',
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.Nodes = {
    key: 'nodes',
    ttl: sdk_nestjs_common_1.Constants.oneHour(),
};
CacheInfo.ShardIds = {
    key: 'shardIds',
    ttl: sdk_nestjs_common_1.Constants.oneWeek(),
};
CacheInfo.ShardCount = {
    key: 'shardCount',
    ttl: sdk_nestjs_common_1.Constants.oneWeek(),
};
CacheInfo.GenesisTimestamp = {
    key: 'genesisTimestamp',
    ttl: sdk_nestjs_common_1.Constants.oneWeek(),
};
CacheInfo.ActiveShards = {
    key: 'shards',
    ttl: sdk_nestjs_common_1.Constants.oneMinute(),
};
CacheInfo.AllDcdtTokens = {
    key: 'allDcdtTokens',
    ttl: sdk_nestjs_common_1.Constants.oneHour(),
};
CacheInfo.TransactionPool = {
    key: 'txpool',
    ttl: sdk_nestjs_common_1.Constants.oneSecond() * 6,
};
CacheInfo.ApplicationMostUsed = {
    key: 'applicationMostUsed',
    ttl: sdk_nestjs_common_1.Constants.oneHour(),
};
CacheInfo.Identities = {
    key: 'identities',
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 15,
};
CacheInfo.Providers = {
    key: 'providers',
    ttl: sdk_nestjs_common_1.Constants.oneHour(),
};
CacheInfo.ProvidersWithStakeInformation = {
    key: 'providersWithStakeInformation',
    ttl: sdk_nestjs_common_1.Constants.oneHour(),
};
CacheInfo.TransactionsCount = {
    key: 'transactions:count',
    ttl: sdk_nestjs_common_1.Constants.oneSecond() * 6,
};
CacheInfo.IdentityProfilesKeybases = {
    key: 'identityProfilesKeybases',
    ttl: sdk_nestjs_common_1.Constants.oneHour(),
};
CacheInfo.CurrentPrice = {
    key: 'currentPrice',
    ttl: sdk_nestjs_common_1.Constants.oneHour(),
};
CacheInfo.Economics = {
    key: 'economics',
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.TokenAssets = {
    key: 'tokenAssets',
    ttl: sdk_nestjs_common_1.Constants.oneDay(),
};
CacheInfo.NftsCount = {
    key: 'nfts:count',
    ttl: sdk_nestjs_common_1.Constants.oneSecond() * 6,
};
CacheInfo.AccountAssets = {
    key: 'accountLabels',
    ttl: sdk_nestjs_common_1.Constants.oneDay(),
};
CacheInfo.MoaSettings = {
    key: 'moa:settings',
    ttl: sdk_nestjs_common_1.Constants.oneHour(),
};
CacheInfo.MoaContracts = {
    key: 'moa:contracts',
    ttl: sdk_nestjs_common_1.Constants.oneHour(),
};
CacheInfo.VerifiedAccounts = {
    key: "verifiedAccounts",
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.CollectionRanks = {
    key: 'collectionRanks',
    ttl: sdk_nestjs_common_1.Constants.oneDay(),
};
CacheInfo.CollectionsCount = {
    key: 'collectionsCount',
    ttl: sdk_nestjs_common_1.Constants.oneSecond() * 6,
};
CacheInfo.MoaEconomics = {
    key: "moaEconomics",
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.MoaPairs = {
    key: "moaPairs",
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.MoaPairsWithFarms = {
    key: 'moaPairsWithFarms',
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.MoaTokens = {
    key: "moaTokens",
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.MoaTokenTypes = {
    key: "moaTokenTypes",
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.MoaFarms = {
    key: "moaFarms",
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.StakingProxies = {
    key: "moaStakingProxies",
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.MoaTokensIndexed = {
    key: "moaTokensIndexed",
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.MoaPrices = {
    key: "moaPrices",
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.DelegationLegacy = {
    key: "delegationLegacy",
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.ExtendedAttributesActivationNonce = {
    key: "extendedAttributesActivationNonce2",
    ttl: sdk_nestjs_common_1.Constants.oneHour(),
};
CacheInfo.InitEpoch = {
    key: "initEpoch",
    ttl: sdk_nestjs_common_1.Constants.oneDay(),
};
CacheInfo.LockedTokenIDs = {
    key: "lockedTokenIDs",
    ttl: sdk_nestjs_common_1.Constants.oneHour(),
};
CacheInfo.CurrentEpoch = {
    key: "currentEpoch",
    ttl: sdk_nestjs_common_1.Constants.oneMinute(),
};
CacheInfo.AccountsCount = {
    key: "account:count",
    ttl: sdk_nestjs_common_1.Constants.oneMinute(),
};
CacheInfo.Delegation = {
    key: "delegation",
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.Constants = {
    key: 'constants',
    ttl: sdk_nestjs_common_1.Constants.oneDay(),
};
CacheInfo.NftTagCount = {
    key: 'nftTagsCount',
    ttl: sdk_nestjs_common_1.Constants.oneHour(),
};
CacheInfo.NodeVersions = {
    key: 'nodeVersions',
    ttl: sdk_nestjs_common_1.Constants.oneMinute(),
};
CacheInfo.DelegationProviders = {
    key: 'delegationProviders',
    ttl: sdk_nestjs_common_1.Constants.oneMinute(),
};
CacheInfo.GlobalStake = {
    key: 'stake',
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.FullWaitingList = {
    key: 'waiting-list',
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 5,
};
CacheInfo.DataApiTokens = {
    key: 'data-api:tokens',
    ttl: sdk_nestjs_common_1.Constants.oneMinute() * 10,
};
CacheInfo.NodesAuctions = {
    key: 'nodesAuctions',
    ttl: sdk_nestjs_common_1.Constants.oneMinute(),
};
CacheInfo.ValidatorAuctions = {
    key: 'validatorAuctions',
    ttl: sdk_nestjs_common_1.Constants.oneHour(),
};
//# sourceMappingURL=cache.info.js.map