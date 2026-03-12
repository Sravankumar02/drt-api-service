"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticIndexerHelper = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_elastic_1 = require("@sravankumar02/sdk-nestjs-elastic");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../api-config/api.config.service");
const bls_service_1 = require("../../../endpoints/bls/bls.service");
const dcdt_type_1 = require("../../../endpoints/dcdt/entities/dcdt.type");
const transaction_type_1 = require("../../../endpoints/transactions/entities/transaction.type");
const nft_type_1 = require("../entities/nft.type");
const script_query_1 = require("./script.query");
const time_utils_1 = require("../../../utils/time.utils");
let ElasticIndexerHelper = class ElasticIndexerHelper {
    constructor(apiConfigService, blsService) {
        this.apiConfigService = apiConfigService;
        this.blsService = blsService;
        this.nonFungibleDcdtTypes = [nft_type_1.NftType.NonFungibleDCDT, nft_type_1.NftType.NonFungibleDCDTv2, nft_type_1.NftType.DynamicNonFungibleDCDT];
        this.semiFungibleDcdtTypes = [nft_type_1.NftType.SemiFungibleDCDT, nft_type_1.NftType.DynamicSemiFungibleDCDT];
        this.metaDcdtTypes = [nft_type_1.NftType.MetaDCDT, nft_type_1.NftType.DynamicMetaDCDT];
    }
    async buildElasticBlocksFilter(filter) {
        const queries = [];
        if (filter.nonce !== undefined) {
            const nonceQuery = sdk_nestjs_elastic_1.QueryType.Match("nonce", filter.nonce);
            queries.push(nonceQuery);
        }
        if (filter.beforeNonce !== undefined) {
            const beforeNonceQuery = sdk_nestjs_elastic_1.QueryType.Range('nonce', new sdk_nestjs_elastic_1.RangeLowerThanOrEqual(filter.beforeNonce));
            queries.push(beforeNonceQuery);
        }
        if (filter.afterNonce !== undefined) {
            const afterNonceQuery = sdk_nestjs_elastic_1.QueryType.Range('nonce', new sdk_nestjs_elastic_1.RangeGreaterThanOrEqual(filter.afterNonce));
            queries.push(afterNonceQuery);
        }
        if (filter.shard !== undefined) {
            const shardIdQuery = sdk_nestjs_elastic_1.QueryType.Match('shardId', filter.shard);
            queries.push(shardIdQuery);
        }
        if (filter.epoch !== undefined) {
            const epochQuery = sdk_nestjs_elastic_1.QueryType.Match('epoch', filter.epoch);
            queries.push(epochQuery);
        }
        if (filter.proposer && filter.shard !== undefined && filter.epoch !== undefined) {
            const index = await this.blsService.getBlsIndex(filter.proposer, filter.shard, filter.epoch);
            const proposerQuery = sdk_nestjs_elastic_1.QueryType.Match('proposer', index);
            queries.push(proposerQuery);
        }
        if (filter.validator && filter.shard !== undefined && filter.epoch !== undefined) {
            const index = await this.blsService.getBlsIndex(filter.validator, filter.shard, filter.epoch);
            const validatorsQuery = sdk_nestjs_elastic_1.QueryType.Match('validators', index);
            queries.push(validatorsQuery);
        }
        if (filter.hashes !== undefined && filter.hashes.length > 0) {
            const hashQueries = filter.hashes.map(hash => sdk_nestjs_elastic_1.QueryType.Match('_id', hash));
            const shouldQuery = sdk_nestjs_elastic_1.QueryType.Should(hashQueries);
            queries.push(shouldQuery);
        }
        return queries;
    }
    buildCollectionRolesFilter(filter, address) {
        let elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create();
        elasticQuery = elasticQuery.withMustNotExistCondition('identifier')
            .withMustMultiShouldCondition(Object.values(nft_type_1.NftType), type => sdk_nestjs_elastic_1.QueryType.Match('type', type));
        if (address) {
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Should([
                sdk_nestjs_elastic_1.QueryType.Match('currentOwner', address),
                sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTRoleNFTCreate', address)]),
                sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTRoleNFTBurn', address)]),
                sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTRoleNFTAddQuantity', address)]),
                sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTRoleNFTUpdateAttributes', address)]),
                sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTRoleNFTAddURI', address)]),
                sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTTransferRole', address)]),
            ]));
        }
        if (filter.before || filter.after) {
            if (filter.before) {
                const timestampBeforeIdentifier = time_utils_1.TimeUtils.isTimestampInSeconds(filter.before) ? 'timestamp' : 'timestampMs';
                elasticQuery = elasticQuery.withRangeFilter(timestampBeforeIdentifier, new sdk_nestjs_elastic_1.RangeLowerThanOrEqual(filter.before));
            }
            if (filter.after) {
                const timestampAfterIdentifier = time_utils_1.TimeUtils.isTimestampInSeconds(filter.after) ? 'timestamp' : 'timestampMs';
                elasticQuery = elasticQuery.withRangeFilter(timestampAfterIdentifier, new sdk_nestjs_elastic_1.RangeGreaterThanOrEqual(filter.after));
            }
        }
        if (filter.canCreate !== undefined) {
            elasticQuery = this.getRoleCondition(elasticQuery, 'DCDTRoleNFTCreate', address, filter.canCreate);
        }
        if (filter.canBurn !== undefined) {
            elasticQuery = this.getRoleCondition(elasticQuery, 'DCDTRoleNFTBurn', address, filter.canBurn);
        }
        if (filter.canAddQuantity !== undefined) {
            elasticQuery = this.getRoleCondition(elasticQuery, 'DCDTRoleNFTAddQuantity', address, filter.canAddQuantity);
        }
        if (filter.canUpdateAttributes !== undefined) {
            elasticQuery = this.getRoleCondition(elasticQuery, 'DCDTRoleNFTUpdateAttributes', address, filter.canUpdateAttributes);
        }
        if (filter.canAddUri !== undefined) {
            elasticQuery = this.getRoleCondition(elasticQuery, 'DCDTRoleNFTAddURI', address, filter.canAddUri);
        }
        if (filter.canTransferRole !== undefined) {
            elasticQuery = this.getRoleCondition(elasticQuery, 'DCDTTransferRole', address, filter.canTransferRole);
        }
        if (filter.excludeMetaDCDT === true && !filter.type) {
            elasticQuery = elasticQuery.withMustMultiShouldCondition([
                ...this.nonFungibleDcdtTypes,
                ...this.semiFungibleDcdtTypes,
            ], type => sdk_nestjs_elastic_1.QueryType.Match('type', type));
        }
        if (filter.type) {
            const types = [];
            for (const type of filter.type) {
                switch (type) {
                    case nft_type_1.NftType.NonFungibleDCDT:
                        types.push(...this.nonFungibleDcdtTypes);
                        break;
                    case nft_type_1.NftType.SemiFungibleDCDT:
                        types.push(...this.semiFungibleDcdtTypes);
                        break;
                    case nft_type_1.NftType.MetaDCDT:
                        types.push(...this.metaDcdtTypes);
                        break;
                }
            }
            elasticQuery = elasticQuery.withMustMultiShouldCondition(types, type => sdk_nestjs_elastic_1.QueryType.Match('type', type));
        }
        if (filter.subType) {
            elasticQuery = elasticQuery.withMustMultiShouldCondition(filter.subType, subType => sdk_nestjs_elastic_1.QueryType.Match('type', subType));
        }
        return elasticQuery.withMustMatchCondition('token', filter.collection, sdk_nestjs_elastic_1.QueryOperator.AND)
            .withMustMultiShouldCondition(filter.identifiers, identifier => sdk_nestjs_elastic_1.QueryType.Match('token', identifier, sdk_nestjs_elastic_1.QueryOperator.AND))
            .withSearchWildcardCondition(filter.search, ['token', 'name']);
    }
    getRoleCondition(query, name, address, value) {
        const condition = value === false ? sdk_nestjs_elastic_1.QueryConditionOptions.mustNot : sdk_nestjs_elastic_1.QueryConditionOptions.must;
        const targetAddress = typeof value === 'string' ? value : address;
        return query.withCondition(condition, sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery(`roles.${name}`, targetAddress)]));
    }
    buildElasticNftFilter(filter, identifier, address) {
        let elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, sdk_nestjs_elastic_1.QueryType.Exists('identifier'));
        if (address) {
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Match('address', address));
        }
        if (filter.search !== undefined) {
            const searchable = filter.search;
            const conditions = [];
            conditions.push(sdk_nestjs_elastic_1.QueryType.Wildcard('data.name', `*${searchable.toLowerCase()}*`));
            conditions.push(sdk_nestjs_elastic_1.QueryType.Wildcard('data.token', `*${searchable.toLowerCase()}*`));
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.NestedShould('data', conditions));
        }
        if (filter.type) {
            const types = [];
            for (const type of filter.type) {
                switch (type) {
                    case nft_type_1.NftType.NonFungibleDCDT:
                        types.push(...this.nonFungibleDcdtTypes);
                        break;
                    case nft_type_1.NftType.SemiFungibleDCDT:
                        types.push(...this.semiFungibleDcdtTypes);
                        break;
                    case nft_type_1.NftType.MetaDCDT:
                        types.push(...this.metaDcdtTypes);
                        break;
                    default:
                        types.push(filter.type);
                }
            }
            elasticQuery = elasticQuery.withMustMultiShouldCondition(types, type => sdk_nestjs_elastic_1.QueryType.Match('type', type));
        }
        if (filter.subType) {
            elasticQuery = elasticQuery.withMustMultiShouldCondition(filter.subType, subType => sdk_nestjs_elastic_1.QueryType.Match('type', subType, sdk_nestjs_elastic_1.QueryOperator.AND));
        }
        if (identifier !== undefined) {
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Match('identifier', identifier, sdk_nestjs_elastic_1.QueryOperator.AND));
        }
        if (filter.collection !== undefined && filter.collection !== '') {
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Match('token', filter.collection, sdk_nestjs_elastic_1.QueryOperator.AND));
        }
        if (filter.collections !== undefined && filter.collections.length !== 0) {
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Should(filter.collections.map(collection => sdk_nestjs_elastic_1.QueryType.Match('token', collection, sdk_nestjs_elastic_1.QueryOperator.AND))));
        }
        if (filter.name !== undefined && filter.name !== '') {
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Nested('data', [new sdk_nestjs_elastic_1.MatchQuery("data.name", filter.name)]));
        }
        if (filter.hasUris !== undefined) {
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Nested('data', [new sdk_nestjs_elastic_1.MatchQuery("data.nonEmptyURIs", filter.hasUris)]));
        }
        if (filter.tags) {
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Should(filter.tags.map(tag => sdk_nestjs_elastic_1.QueryType.Nested("data", [new sdk_nestjs_elastic_1.MatchQuery("data.tags", tag, sdk_nestjs_elastic_1.QueryOperator.AND)]))));
        }
        if (filter.creator !== undefined) {
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Nested("data", [new sdk_nestjs_elastic_1.MatchQuery("data.creator", filter.creator)]));
        }
        if (filter.identifiers) {
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Should(filter.identifiers.map(identifier => sdk_nestjs_elastic_1.QueryType.Match('identifier', identifier, sdk_nestjs_elastic_1.QueryOperator.AND))));
        }
        if (filter.isWhitelistedStorage !== undefined) {
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Nested("data", [new sdk_nestjs_elastic_1.MatchQuery("data.whiteListedStorage", filter.isWhitelistedStorage)]));
        }
        if (this.apiConfigService.getIsNftScamInfoEnabled() && filter.isScam) {
            elasticQuery = elasticQuery.withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, sdk_nestjs_elastic_1.QueryType.Should([
                sdk_nestjs_elastic_1.QueryType.Match('nft_scamInfoType', 'scam'),
                sdk_nestjs_elastic_1.QueryType.Match('nft_scamInfoType', 'potentialScam'),
            ]));
        }
        if (filter.scamType) {
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Match('nft_scamInfoType', filter.scamType));
        }
        if (filter.traits !== undefined) {
            for (const [key, value] of Object.entries(filter.traits)) {
                elasticQuery = elasticQuery.withMustMatchCondition('nft_traitValues', sdk_nestjs_common_1.BinaryUtils.base64Encode(`${key}_${value}`));
            }
        }
        if (filter.isNsfw !== undefined) {
            const nsfwThreshold = this.apiConfigService.getNftExtendedAttributesNsfwThreshold();
            if (filter.isNsfw === true) {
                elasticQuery = elasticQuery.withRangeFilter('nft_nsfw_mark', new sdk_nestjs_elastic_1.RangeGreaterThanOrEqual(nsfwThreshold));
            }
            else {
                elasticQuery = elasticQuery.withRangeFilter('nft_nsfw_mark', new sdk_nestjs_elastic_1.RangeLowerThan(nsfwThreshold));
            }
        }
        if (filter.before) {
            const timestampBeforeIdentifier = time_utils_1.TimeUtils.isTimestampInSeconds(filter.before) ? 'timestamp' : 'timestampMs';
            elasticQuery = elasticQuery.withRangeFilter(timestampBeforeIdentifier, new sdk_nestjs_elastic_1.RangeLowerThanOrEqual(filter.before));
        }
        if (filter.after) {
            const timestampAfterIdentifier = time_utils_1.TimeUtils.isTimestampInSeconds(filter.after) ? 'timestamp' : 'timestampMs';
            elasticQuery = elasticQuery.withRangeFilter(timestampAfterIdentifier, new sdk_nestjs_elastic_1.RangeGreaterThanOrEqual(filter.after));
        }
        if (filter.nonceBefore) {
            elasticQuery = elasticQuery.withRangeFilter('nonce', new sdk_nestjs_elastic_1.RangeLowerThanOrEqual(filter.nonceBefore));
        }
        if (filter.nonceAfter) {
            elasticQuery = elasticQuery.withRangeFilter('nonce', new sdk_nestjs_elastic_1.RangeGreaterThanOrEqual(filter.nonceAfter));
        }
        if (filter.excludeMetaDCDT === true) {
            elasticQuery = elasticQuery.withMustMultiShouldCondition([...this.nonFungibleDcdtTypes, ...this.semiFungibleDcdtTypes], type => sdk_nestjs_elastic_1.QueryType.Match('type', type));
        }
        return elasticQuery;
    }
    buildTransferFilterQuery(filter) {
        let elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create();
        if (filter.address) {
            const smartContractResultConditions = [
                sdk_nestjs_elastic_1.QueryType.Match('receiver', filter.address),
                sdk_nestjs_elastic_1.QueryType.Match('receivers', filter.address),
            ];
            if (sdk_nestjs_common_1.AddressUtils.isSmartContractAddress(filter.address)) {
                smartContractResultConditions.push(sdk_nestjs_elastic_1.QueryType.Match('sender', filter.address));
            }
            let mustNotQueries = [
                sdk_nestjs_elastic_1.QueryType.Exists('canBeIgnored'),
            ];
            if (filter.withRefunds) {
                mustNotQueries = [];
            }
            const shouldConditions = [
                sdk_nestjs_elastic_1.QueryType.Match('sender', filter.address),
                sdk_nestjs_elastic_1.QueryType.Match('receiver', filter.address),
                sdk_nestjs_elastic_1.QueryType.Match('receivers', filter.address),
            ];
            if (filter.withTxsRelayedByAddress) {
                shouldConditions.push(sdk_nestjs_elastic_1.QueryType.Match('relayer', filter.address));
            }
            elasticQuery = elasticQuery.withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.should, sdk_nestjs_elastic_1.QueryType.Must([
                sdk_nestjs_elastic_1.QueryType.Match('type', 'unsigned'),
                sdk_nestjs_elastic_1.QueryType.Should(smartContractResultConditions),
            ], mustNotQueries))
                .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.should, sdk_nestjs_elastic_1.QueryType.Must([
                sdk_nestjs_elastic_1.QueryType.Should([sdk_nestjs_elastic_1.QueryType.Match('type', 'normal')]),
                sdk_nestjs_elastic_1.QueryType.Should(shouldConditions),
            ]));
        }
        if (filter.relayer) {
            elasticQuery = elasticQuery.withMustMatchCondition('relayerAddr', filter.relayer);
        }
        if (filter.isRelayed !== undefined) {
            const relayedConditions = sdk_nestjs_elastic_1.QueryType.Should([
                sdk_nestjs_elastic_1.QueryType.Match('isRelayed', true),
                sdk_nestjs_elastic_1.QueryType.Exists('relayer'),
            ]);
            if (filter.isRelayed === true) {
                elasticQuery = elasticQuery.withMustCondition(relayedConditions);
            }
            else if (filter.isRelayed === false) {
                elasticQuery = elasticQuery.withMustNotCondition(relayedConditions);
            }
        }
        if (filter.type) {
            elasticQuery = elasticQuery.withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, sdk_nestjs_elastic_1.QueryType.Match('type', filter.type === transaction_type_1.TransactionType.Transaction ? 'normal' : 'unsigned'));
        }
        if (filter.senders) {
            elasticQuery = elasticQuery.withMustMultiShouldCondition(filter.senders, sender => sdk_nestjs_elastic_1.QueryType.Match('sender', sender));
        }
        if (filter.receivers) {
            const queries = [];
            for (const receiver of filter.receivers) {
                queries.push(sdk_nestjs_elastic_1.QueryType.Match('receiver', receiver));
                queries.push(sdk_nestjs_elastic_1.QueryType.Match('receivers', receiver));
            }
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Should(queries));
        }
        if (filter.token === 'REWA') {
            elasticQuery = elasticQuery.withMustNotCondition(sdk_nestjs_elastic_1.QueryType.Match('value', '0'));
        }
        else {
            elasticQuery = elasticQuery.withMustMatchCondition('tokens', filter.token, sdk_nestjs_elastic_1.QueryOperator.AND);
        }
        if (filter.tokens && filter.tokens.length > 0) {
            elasticQuery = elasticQuery.withMustMultiShouldCondition(filter.tokens, token => sdk_nestjs_elastic_1.QueryType.Match('tokens', token, sdk_nestjs_elastic_1.QueryOperator.AND));
        }
        if (filter.functions && filter.functions.length > 0) {
            if (filter.functions.length === 1 && filter.functions[0] === '') {
                elasticQuery = elasticQuery.withMustNotExistCondition('function');
            }
            else {
                elasticQuery = this.applyFunctionFilter(elasticQuery, filter.functions);
            }
        }
        if (filter.senderShard !== undefined) {
            elasticQuery = elasticQuery.withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, sdk_nestjs_elastic_1.QueryType.Match('senderShard', filter.senderShard));
        }
        if (filter.receiverShard !== undefined) {
            elasticQuery = elasticQuery.withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, sdk_nestjs_elastic_1.QueryType.Match('receiverShard', filter.receiverShard));
        }
        if (filter.miniBlockHash) {
            elasticQuery = elasticQuery.withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, sdk_nestjs_elastic_1.QueryType.Match('miniBlockHash', filter.miniBlockHash));
        }
        if (filter.hashes) {
            elasticQuery = elasticQuery.withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, sdk_nestjs_elastic_1.QueryType.Should(filter.hashes.map(hash => sdk_nestjs_elastic_1.QueryType.Match('_id', hash))));
        }
        if (filter.status) {
            elasticQuery = elasticQuery.withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, sdk_nestjs_elastic_1.QueryType.Match('status', filter.status));
        }
        if (filter.before) {
            const timestampBeforeIdentifier = time_utils_1.TimeUtils.isTimestampInSeconds(filter.before) ? 'timestamp' : 'timestampMs';
            elasticQuery = elasticQuery.withRangeFilter(timestampBeforeIdentifier, new sdk_nestjs_elastic_1.RangeLowerThanOrEqual(filter.before));
        }
        if (filter.after) {
            const timestampAfterIdentifier = time_utils_1.TimeUtils.isTimestampInSeconds(filter.after) ? 'timestamp' : 'timestampMs';
            elasticQuery = elasticQuery.withRangeFilter(timestampAfterIdentifier, new sdk_nestjs_elastic_1.RangeGreaterThanOrEqual(filter.after));
        }
        if (filter.senderOrReceiver) {
            elasticQuery = elasticQuery
                .withMustCondition(sdk_nestjs_elastic_1.QueryType.Should([
                sdk_nestjs_elastic_1.QueryType.Match('sender', filter.senderOrReceiver),
                sdk_nestjs_elastic_1.QueryType.Match('receiver', filter.senderOrReceiver),
            ]));
        }
        if (filter.round) {
            elasticQuery = elasticQuery.withMustMatchCondition('round', filter.round);
        }
        if (filter.isScCall !== undefined) {
            elasticQuery = filter.isScCall
                ? elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Match('isScCall', true))
                : elasticQuery.withMustNotCondition(sdk_nestjs_elastic_1.QueryType.Match('isScCall', true));
        }
        return elasticQuery;
    }
    buildTokensWithRolesForAddressQuery(address, filter, pagination) {
        const rolesConditions = [
            sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTRoleLocalMint', address)]),
            sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTRoleLocalBurn', address)]),
            sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTTransferRole', address)]),
        ];
        if (filter.includeMetaDCDT === true) {
            rolesConditions.push(sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTRoleNFTAddQuantity', address)]));
            rolesConditions.push(sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTRoleNFTAddURI', address)]));
            rolesConditions.push(sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTRoleNFTCreate', address)]));
            rolesConditions.push(sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTRoleNFTBurn', address)]));
            rolesConditions.push(sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTRoleNFTUpdateAttributes', address)]));
        }
        let elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withMustNotExistCondition('identifier')
            .withMustCondition(sdk_nestjs_elastic_1.QueryType.Should([
            sdk_nestjs_elastic_1.QueryType.Match('currentOwner', address),
            ...rolesConditions,
        ]))
            .withMustMatchCondition('token', filter.identifier)
            .withMustMatchCondition('currentOwner', filter.owner);
        if (filter.includeMetaDCDT === true) {
            elasticQuery = elasticQuery.withMustMultiShouldCondition([dcdt_type_1.DcdtType.FungibleDCDT, dcdt_type_1.DcdtType.MetaDCDT], type => sdk_nestjs_elastic_1.QueryType.Match('type', type));
        }
        else {
            elasticQuery = elasticQuery.withMustMatchCondition('type', dcdt_type_1.DcdtType.FungibleDCDT);
        }
        if (filter.search) {
            elasticQuery = elasticQuery
                .withShouldCondition([
                sdk_nestjs_elastic_1.QueryType.Wildcard('token', filter.search),
                sdk_nestjs_elastic_1.QueryType.Wildcard('name', filter.search),
            ]);
        }
        if (filter.canMint !== undefined) {
            const condition = filter.canMint === true ? sdk_nestjs_elastic_1.QueryConditionOptions.must : sdk_nestjs_elastic_1.QueryConditionOptions.mustNot;
            elasticQuery = elasticQuery.withCondition(condition, sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTRoleLocalMint', address)]));
        }
        if (filter.canBurn !== undefined) {
            const condition = filter.canBurn === true ? sdk_nestjs_elastic_1.QueryConditionOptions.must : sdk_nestjs_elastic_1.QueryConditionOptions.mustNot;
            elasticQuery = elasticQuery.withCondition(condition, sdk_nestjs_elastic_1.QueryType.Nested('roles', [new sdk_nestjs_elastic_1.MatchQuery('roles.DCDTRoleLocalBurn', address)]));
        }
        if (pagination) {
            elasticQuery = elasticQuery.withPagination(pagination);
        }
        return elasticQuery;
    }
    async buildElasticRoundsFilter(filter) {
        const queries = [];
        if (filter.shard !== undefined) {
            const shardIdQuery = sdk_nestjs_elastic_1.QueryType.Match('shardId', filter.shard);
            queries.push(shardIdQuery);
        }
        if (filter.epoch !== undefined) {
            const epochQuery = sdk_nestjs_elastic_1.QueryType.Match('epoch', filter.epoch);
            queries.push(epochQuery);
        }
        if (filter.validator !== undefined && filter.shard !== undefined && filter.epoch !== undefined) {
            const index = await this.blsService.getBlsIndex(filter.validator, filter.shard, filter.epoch);
            const signersIndexesQuery = sdk_nestjs_elastic_1.QueryType.Match('signersIndexes', index);
            queries.push(signersIndexesQuery);
        }
        return queries;
    }
    buildSmartContractResultFilterQuery(address) {
        const shouldQueries = [];
        const mustQueries = [];
        if (address) {
            shouldQueries.push(sdk_nestjs_elastic_1.QueryType.Match('sender', address));
            shouldQueries.push(sdk_nestjs_elastic_1.QueryType.Match('receiver', address));
            shouldQueries.push(sdk_nestjs_elastic_1.QueryType.Match('receivers', address));
        }
        const elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withMustMatchCondition('type', 'unsigned')
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.should, shouldQueries)
            .withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, mustQueries);
        return elasticQuery;
    }
    buildTransactionFilterQuery(filter, address) {
        let elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create();
        if (!filter.withRelayedScresults) {
            elasticQuery = elasticQuery.withMustMatchCondition('type', 'normal');
        }
        else {
            elasticQuery = elasticQuery.withShouldCondition([
                sdk_nestjs_elastic_1.QueryType.Match('type', 'normal'),
                sdk_nestjs_elastic_1.QueryType.Must([
                    sdk_nestjs_elastic_1.QueryType.Exists('relayerAddr'),
                    sdk_nestjs_elastic_1.QueryType.Match('type', 'unsigned'),
                    new script_query_1.ScriptQuery(`doc['originalTxHash'].size() > 0 && doc['prevTxHash'].size() > 0 && doc['originalTxHash'].value == doc['prevTxHash'].value`),
                ]),
            ]);
        }
        elasticQuery = elasticQuery.withMustMatchCondition('senderShard', filter.senderShard)
            .withMustMatchCondition('receiverShard', filter.receiverShard)
            .withMustMatchCondition('miniBlockHash', filter.miniBlockHash)
            .withMustMultiShouldCondition(filter.hashes, hash => sdk_nestjs_elastic_1.QueryType.Match('_id', hash))
            .withMustMatchCondition('status', filter.status)
            .withMustMultiShouldCondition(filter.tokens, token => sdk_nestjs_elastic_1.QueryType.Match('tokens', token, sdk_nestjs_elastic_1.QueryOperator.AND));
        if (filter.before) {
            const timestampBeforeIdentifier = time_utils_1.TimeUtils.isTimestampInSeconds(filter.before) ? 'timestamp' : 'timestampMs';
            elasticQuery = elasticQuery.withRangeFilter(timestampBeforeIdentifier, new sdk_nestjs_elastic_1.RangeLowerThanOrEqual(filter.before));
        }
        if (filter.after) {
            const timestampAfterIdentifier = time_utils_1.TimeUtils.isTimestampInSeconds(filter.after) ? 'timestamp' : 'timestampMs';
            elasticQuery = elasticQuery.withRangeFilter(timestampAfterIdentifier, new sdk_nestjs_elastic_1.RangeGreaterThanOrEqual(filter.after));
        }
        if (filter.functions && filter.functions.length > 0) {
            if (filter.functions.length === 1 && filter.functions[0] === '') {
                elasticQuery = elasticQuery.withMustNotExistCondition('function');
            }
            else {
                elasticQuery = this.applyFunctionFilter(elasticQuery, filter.functions);
            }
        }
        if (filter.token === 'REWA') {
            elasticQuery = elasticQuery.withMustNotCondition(sdk_nestjs_elastic_1.QueryType.Match('value', '0'));
        }
        else {
            elasticQuery = elasticQuery.withMustMatchCondition('tokens', filter.token, sdk_nestjs_elastic_1.QueryOperator.AND);
        }
        if (filter.isRelayed !== undefined) {
            const relayedConditions = sdk_nestjs_elastic_1.QueryType.Should([
                sdk_nestjs_elastic_1.QueryType.Match('isRelayed', true),
                sdk_nestjs_elastic_1.QueryType.Exists('relayer'),
            ]);
            if (filter.isRelayed === true) {
                elasticQuery = elasticQuery.withMustCondition(relayedConditions);
            }
            else if (filter.isRelayed === false) {
                elasticQuery = elasticQuery.withMustNotCondition(relayedConditions);
            }
        }
        if (filter.relayer) {
            elasticQuery = elasticQuery.withShouldCondition(sdk_nestjs_elastic_1.QueryType.Match('relayer', filter.relayer));
        }
        if (filter.round) {
            elasticQuery = elasticQuery.withMustMatchCondition('round', filter.round);
        }
        if (filter.condition === sdk_nestjs_elastic_1.QueryConditionOptions.should) {
            if (filter.sender) {
                elasticQuery = elasticQuery.withShouldCondition(sdk_nestjs_elastic_1.QueryType.Match('sender', filter.sender));
            }
            if (filter.receivers) {
                const keys = ['receiver', 'receivers'];
                for (const receiver of filter.receivers) {
                    for (const key of keys) {
                        elasticQuery = elasticQuery.withShouldCondition(sdk_nestjs_elastic_1.QueryType.Match(key, receiver));
                    }
                }
            }
        }
        else {
            elasticQuery = elasticQuery.withMustMatchCondition('sender', filter.sender);
            if (filter.receivers) {
                const keys = ['receiver', 'receivers'];
                const queries = [];
                for (const receiver of filter.receivers) {
                    for (const key of keys) {
                        queries.push(sdk_nestjs_elastic_1.QueryType.Match(key, receiver));
                    }
                }
                elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Should(queries));
            }
        }
        if (address) {
            const keys = ['sender', 'receiver', 'receivers'];
            elasticQuery = elasticQuery.withMustMultiShouldCondition(keys, key => sdk_nestjs_elastic_1.QueryType.Match(key, address));
        }
        if (filter.senderOrReceiver) {
            elasticQuery = elasticQuery
                .withMustCondition(sdk_nestjs_elastic_1.QueryType.Should([
                sdk_nestjs_elastic_1.QueryType.Match('sender', filter.senderOrReceiver),
                sdk_nestjs_elastic_1.QueryType.Match('receiver', filter.senderOrReceiver),
            ]));
        }
        if (filter.isScCall !== undefined) {
            elasticQuery = filter.isScCall
                ? elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Match('isScCall', true))
                : elasticQuery.withMustNotCondition(sdk_nestjs_elastic_1.QueryType.Match('isScCall', true));
        }
        return elasticQuery;
    }
    buildAccountHistoryFilterQuery(address, token, filter) {
        const mustQueries = [];
        if (address) {
            mustQueries.push(sdk_nestjs_elastic_1.QueryType.Match('address', address));
        }
        if (token) {
            const field = token.split('-').length === 2 ? 'token' : 'identifier';
            mustQueries.push(sdk_nestjs_elastic_1.QueryType.Match(field, token, sdk_nestjs_elastic_1.QueryOperator.AND));
        }
        let elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create().withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, mustQueries);
        if (filter && filter.before) {
            const timestampBeforeIdentifier = time_utils_1.TimeUtils.isTimestampInSeconds(filter.before) ? 'timestamp' : 'timestampMs';
            elasticQuery = elasticQuery.withRangeFilter(timestampBeforeIdentifier, new sdk_nestjs_elastic_1.RangeLowerThanOrEqual(filter.before));
        }
        if (filter && filter.after) {
            const timestampAfterIdentifier = time_utils_1.TimeUtils.isTimestampInSeconds(filter.after) ? 'timestamp' : 'timestampMs';
            elasticQuery = elasticQuery.withRangeFilter(timestampAfterIdentifier, new sdk_nestjs_elastic_1.RangeGreaterThanOrEqual(filter.after));
        }
        if (filter && filter.identifiers) {
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Should(filter.identifiers.map(identifier => sdk_nestjs_elastic_1.QueryType.Match('identifier', identifier, sdk_nestjs_elastic_1.QueryOperator.AND))));
        }
        if (filter && filter.token) {
            elasticQuery = elasticQuery.withMustMatchCondition('token', filter.token);
        }
        return elasticQuery;
    }
    buildAccountFilterQuery(filter) {
        let elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create();
        if (filter.ownerAddress) {
            elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Match('currentOwner', filter.ownerAddress, sdk_nestjs_elastic_1.QueryOperator.AND));
        }
        if (filter.isSmartContract !== undefined) {
            if (filter.isSmartContract) {
                elasticQuery = elasticQuery.withMustExistCondition('currentOwner');
            }
            else {
                elasticQuery = elasticQuery.withMustNotExistCondition('currentOwner');
            }
        }
        if (filter.name) {
            elasticQuery = elasticQuery.withMustWildcardCondition('api_assets.name', filter.name);
        }
        if (filter.tags && filter.tags.length > 0) {
            return elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Should(filter.tags.map(tag => sdk_nestjs_elastic_1.QueryType.Match('api_assets.tags', tag))));
        }
        if (filter.excludeTags && filter.excludeTags.length > 0) {
            return elasticQuery.withMustNotCondition(sdk_nestjs_elastic_1.QueryType.Should(filter.excludeTags.map(tag => sdk_nestjs_elastic_1.QueryType.Match('api_assets.tags', tag))));
        }
        if (filter.hasAssets !== undefined) {
            if (filter.hasAssets) {
                elasticQuery = elasticQuery.withMustExistCondition('api_assets');
            }
            else {
                elasticQuery = elasticQuery.withMustNotExistCondition('api_assets');
            }
        }
        if (filter.addresses !== undefined && filter.addresses.length > 0) {
            elasticQuery = elasticQuery.withMustMultiShouldCondition(filter.addresses, address => sdk_nestjs_elastic_1.QueryType.Match('address', address));
        }
        if (filter.search) {
            elasticQuery = elasticQuery.withSearchWildcardCondition(filter.search, ['address', 'api_assets.name']);
        }
        if (filter.withBalance !== undefined) {
            if (filter.withBalance) {
                elasticQuery = elasticQuery.withRangeFilter('balanceNum', new sdk_nestjs_elastic_1.RangeGreaterThan(0));
            }
            else {
                elasticQuery = elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Match('balanceNum', 0));
            }
        }
        return elasticQuery;
    }
    buildResultsFilterQuery(filter) {
        let elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create()
            .withMustMatchCondition('type', 'unsigned');
        if (filter.miniBlockHash) {
            elasticQuery = elasticQuery.withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, [sdk_nestjs_elastic_1.QueryType.Match('miniBlockHash', filter.miniBlockHash)]);
        }
        if (filter.originalTxHashes) {
            elasticQuery = elasticQuery.withShouldCondition(filter.originalTxHashes.map(originalTxHash => sdk_nestjs_elastic_1.QueryType.Match('originalTxHash', originalTxHash)));
        }
        if (filter.sender) {
            elasticQuery = elasticQuery.withShouldCondition(sdk_nestjs_elastic_1.QueryType.Match('sender', filter.sender));
        }
        if (filter.receiver) {
            elasticQuery = elasticQuery.withShouldCondition(sdk_nestjs_elastic_1.QueryType.Match('receiver', filter.receiver));
        }
        if (filter.functions && filter.functions.length > 0) {
            if (filter.functions.length === 1 && filter.functions[0] === '') {
                elasticQuery = elasticQuery.withMustNotExistCondition('function');
            }
            else {
                elasticQuery = this.applyFunctionFilter(elasticQuery, filter.functions);
            }
        }
        return elasticQuery;
    }
    buildApplicationFilter(filter) {
        let elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create();
        if (filter.after) {
            const timestampIdentifier = time_utils_1.TimeUtils.isTimestampInSeconds(filter.after) ? 'timestamp' : 'timestampMs';
            elasticQuery = elasticQuery.withRangeFilter(timestampIdentifier, new sdk_nestjs_elastic_1.RangeGreaterThanOrEqual(filter.after));
        }
        if (filter.before) {
            const timestampIdentifier = time_utils_1.TimeUtils.isTimestampInSeconds(filter.before) ? 'timestamp' : 'timestampMs';
            elasticQuery = elasticQuery.withRangeFilter(timestampIdentifier, new sdk_nestjs_elastic_1.RangeLowerThanOrEqual(filter.before));
        }
        return elasticQuery;
    }
    applyFunctionFilter(elasticQuery, functions) {
        const functionConditions = [];
        for (const field of functions) {
            functionConditions.push(sdk_nestjs_elastic_1.QueryType.Match('function', field, sdk_nestjs_elastic_1.QueryOperator.AND));
            functionConditions.push(sdk_nestjs_elastic_1.QueryType.Must([sdk_nestjs_elastic_1.QueryType.Match('operation', field, sdk_nestjs_elastic_1.QueryOperator.AND)], [sdk_nestjs_elastic_1.QueryType.Exists('function')]));
        }
        return elasticQuery.withMustCondition(sdk_nestjs_elastic_1.QueryType.Should(functionConditions));
    }
    buildEventsFilter(filter) {
        let elasticQuery = sdk_nestjs_elastic_1.ElasticQuery.create();
        if (filter.before) {
            const timestampIdentifier = time_utils_1.TimeUtils.isTimestampInSeconds(filter.before) ? 'timestamp' : 'timestampMs';
            elasticQuery = elasticQuery.withRangeFilter(timestampIdentifier, new sdk_nestjs_elastic_1.RangeLowerThanOrEqual(filter.before));
        }
        if (filter.after) {
            const timestampIdentifier = time_utils_1.TimeUtils.isTimestampInSeconds(filter.after) ? 'timestamp' : 'timestampMs';
            elasticQuery = elasticQuery.withRangeFilter(timestampIdentifier, new sdk_nestjs_elastic_1.RangeGreaterThanOrEqual(filter.after));
        }
        if (filter.identifier) {
            elasticQuery = elasticQuery.withMustMatchCondition('identifier', filter.identifier);
        }
        if (filter.txHash) {
            elasticQuery = elasticQuery.withMustMatchCondition('txHash', filter.txHash);
        }
        if (filter.shard) {
            elasticQuery = elasticQuery.withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, sdk_nestjs_elastic_1.QueryType.Match('shardID', filter.shard));
        }
        if (filter.address) {
            elasticQuery = elasticQuery.withMustMatchCondition('address', filter.address);
        }
        if (filter.order) {
            elasticQuery = elasticQuery.withCondition(sdk_nestjs_elastic_1.QueryConditionOptions.must, sdk_nestjs_elastic_1.QueryType.Match('order', filter.order));
        }
        if (filter.logAddress) {
            elasticQuery = elasticQuery.withMustMatchCondition('logAddress', filter.logAddress);
        }
        if (filter.topics && filter.topics.length > 0) {
            for (const topic of filter.topics) {
                elasticQuery = elasticQuery.withMustMatchCondition('topics', topic);
            }
        }
        return elasticQuery;
    }
};
ElasticIndexerHelper = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        bls_service_1.BlsService])
], ElasticIndexerHelper);
exports.ElasticIndexerHelper = ElasticIndexerHelper;
//# sourceMappingURL=elastic.indexer.helper.js.map