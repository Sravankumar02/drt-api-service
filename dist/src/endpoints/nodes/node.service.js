"use strict";
var NodeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const node_1 = require("./entities/node");
const node_type_1 = require("./entities/node.type");
const node_status_1 = require("./entities/node.status");
const vm_query_service_1 = require("../vm.query/vm.query.service");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const node_filter_1 = require("./entities/node.filter");
const stake_service_1 = require("../stake/stake.service");
const sort_order_1 = require("../../common/entities/sort.order");
const query_pagination_1 = require("../../common/entities/query.pagination");
const block_service_1 = require("../blocks/block.service");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const cache_info_1 = require("../../utils/cache.info");
const stake_1 = require("../stake/entities/stake");
const gateway_component_request_1 = require("../../common/gateway/entities/gateway.component.request");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const node_sort_1 = require("./entities/node.sort");
const protocol_service_1 = require("../../common/protocol/protocol.service");
const keys_service_1 = require("../keys/keys.service");
const identities_service_1 = require("../identities/identities.service");
const node_auction_1 = require("./entities/node.auction");
const node_sort_auction_1 = require("./entities/node.sort.auction");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
let NodeService = NodeService_1 = class NodeService {
    constructor(gatewayService, vmQueryService, apiConfigService, cacheService, stakeService, blockService, protocolService, keysService, identitiesService, apiService) {
        this.gatewayService = gatewayService;
        this.vmQueryService = vmQueryService;
        this.apiConfigService = apiConfigService;
        this.cacheService = cacheService;
        this.stakeService = stakeService;
        this.blockService = blockService;
        this.protocolService = protocolService;
        this.keysService = keysService;
        this.identitiesService = identitiesService;
        this.apiService = apiService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(NodeService_1.name);
    }
    getIssues(node, version) {
        const issues = [];
        if (version && version !== node.version) {
            issues.push('versionMismatch');
        }
        return issues;
    }
    async getNode(bls) {
        const allNodes = await this.getAllNodes();
        const node = allNodes.find(x => x.bls === bls);
        if (this.apiConfigService.isNodeEpochsLeftEnabled()) {
            if (node && node.status === node_status_1.NodeStatus.waiting) {
                node.epochsLeft = await this.gatewayService.getNodeWaitingEpochsLeft(bls);
            }
        }
        return node;
    }
    async getNodeCount(query) {
        const allNodes = await this.getFilteredNodes(query);
        return allNodes.length;
    }
    async getNodeVersions() {
        return await this.cacheService.getOrSet(cache_info_1.CacheInfo.NodeVersions.key, async () => await this.getNodeVersionsRaw(), cache_info_1.CacheInfo.NodeVersions.ttl);
    }
    async getNodeVersionsRaw() {
        const allNodes = await this.getAllNodes();
        const data = allNodes
            .filter(({ type }) => type === node_type_1.NodeType.validator)
            .reduce((accumulator, item) => {
            if (item.version) {
                if (!accumulator[item.version]) {
                    accumulator[item.version] = 1;
                }
                else {
                    accumulator[item.version] += 1;
                }
            }
            return accumulator;
        }, {});
        const sum = Object.keys(data).reduce((accumulator, item) => {
            return accumulator + data[item];
        }, 0);
        Object.keys(data).forEach((key) => {
            data[key] = parseFloat((data[key] / sum).toFixed(4));
        });
        const numbers = Object.values(data);
        const totalSum = numbers.reduce((previous, current) => previous + current, 0);
        const largestNumber = numbers.sort((a, b) => b - a)[0];
        for (const key of Object.keys(data)) {
            if (data[key] === largestNumber) {
                data[key] = parseFloat((largestNumber + 1 - totalSum).toFixed(4));
                break;
            }
        }
        return data;
    }
    async getFilteredNodes(query) {
        const allNodes = await this.getAllNodes();
        const filteredNodes = allNodes.filter(node => {
            if (query.search !== undefined) {
                const nodeMatches = node.bls && node.bls.toLowerCase().includes(query.search.toLowerCase());
                const nameMatches = node.name && node.name.toLowerCase().includes(query.search.toLowerCase());
                const versionMatches = node.version && node.version.toLowerCase().includes(query.search.toLowerCase());
                if (!nodeMatches && !nameMatches && !versionMatches) {
                    return false;
                }
            }
            if (query.online !== undefined && node.online !== query.online) {
                return false;
            }
            if (query.type !== undefined && node.type !== query.type) {
                return false;
            }
            if (query.status !== undefined && node.status !== query.status) {
                return false;
            }
            if (query.shard !== undefined && node.shard !== query.shard) {
                return false;
            }
            if (query.issues !== undefined) {
                if (query.issues === true && (node.issues === undefined || node.issues.length === 0)) {
                    return false;
                }
                else if (query.issues === false && node.issues !== undefined && node.issues.length > 0) {
                    return false;
                }
            }
            if (query.identity && node.identity !== query.identity) {
                return false;
            }
            if (query.provider && node.provider !== query.provider) {
                return false;
            }
            if (query.owner && node.owner !== query.owner) {
                return false;
            }
            if (query.auctioned !== undefined && node.auctioned !== query.auctioned) {
                return false;
            }
            if (query.fullHistory !== undefined) {
                if (query.fullHistory === true && !node.fullHistory) {
                    return false;
                }
                if (query.fullHistory === false && node.fullHistory === true) {
                    return false;
                }
            }
            if (query.isAuctionDangerZone !== undefined) {
                if (query.isAuctionDangerZone === true && !node.isInDangerZone) {
                    return false;
                }
            }
            if (query.keys !== undefined && !query.keys.includes(node.bls)) {
                return false;
            }
            if (query.isQualified !== undefined && node.auctionQualified !== query.isQualified) {
                return false;
            }
            if (query.isAuctioned !== undefined && node.auctioned !== query.isAuctioned) {
                return false;
            }
            return true;
        });
        const sort = query.sort;
        if (sort) {
            filteredNodes.sort((a, b) => {
                var _a, _b;
                let asort = a[(_a = query.sort) !== null && _a !== void 0 ? _a : ''];
                let bsort = b[(_b = query.sort) !== null && _b !== void 0 ? _b : ''];
                if (sort === node_sort_1.NodeSort.locked) {
                    asort = Number(asort);
                    bsort = Number(bsort);
                }
                if (asort && typeof asort === 'string') {
                    asort = asort.toLowerCase();
                }
                if (bsort && typeof bsort === 'string') {
                    bsort = bsort.toLowerCase();
                }
                return asort > bsort ? 1 : bsort > asort ? -1 : 0;
            });
            if (query.order === sort_order_1.SortOrder.desc) {
                filteredNodes.reverse();
            }
        }
        return filteredNodes;
    }
    async getNodes(queryPagination, query) {
        const { from, size } = queryPagination;
        const filteredNodes = await this.getFilteredNodes(query);
        const resultNodes = filteredNodes.slice(from, from + size);
        if (query.withIdentityInfo) {
            const allIdentities = await this.identitiesService.getAllIdentities();
            const allIdentitiesDict = allIdentities.toRecord(x => { var _a; return (_a = x.identity) !== null && _a !== void 0 ? _a : ''; });
            for (const [index, node] of resultNodes.entries()) {
                if (node.identity) {
                    const identity = allIdentitiesDict[node.identity];
                    if (identity) {
                        resultNodes[index] = new node_1.Node(Object.assign(Object.assign({}, node), { identityInfo: identity }));
                    }
                }
            }
        }
        return resultNodes;
    }
    async getAllNodes() {
        return await this.cacheService.getOrSet(cache_info_1.CacheInfo.Nodes.key, async () => await this.getAllNodesRaw(), cache_info_1.CacheInfo.Nodes.ttl);
    }
    processQueuedNodes(nodes, queue) {
        for (const queueItem of queue) {
            const node = nodes.find(node => node.bls === queueItem.bls);
            if (node) {
                node.type = node_type_1.NodeType.validator;
                node.status = node_status_1.NodeStatus.queued;
                node.position = queueItem.position;
            }
            else {
                const newNode = new node_1.Node();
                newNode.bls = queueItem.bls;
                newNode.position = queueItem.position;
                newNode.type = node_type_1.NodeType.validator;
                newNode.status = node_status_1.NodeStatus.queued;
                nodes.push(newNode);
            }
        }
    }
    async applyNodeIdentities(nodes) {
        for (const node of nodes) {
            if (node.status !== node_status_1.NodeStatus.inactive) {
                node.identity = await this.cacheService.getRemote(cache_info_1.CacheInfo.ConfirmedIdentity(node.bls).key);
            }
        }
    }
    async applyNodeOwners(nodes) {
        const blses = nodes.filter(x => x.type === node_type_1.NodeType.validator).map(node => node.bls);
        const epoch = await this.blockService.getCurrentEpoch();
        const owners = await this.getOwners(blses, epoch);
        for (const [index, bls] of blses.entries()) {
            const node = nodes.find(node => node.bls === bls);
            if (node) {
                node.owner = owners[index];
            }
        }
    }
    async applyNodeProviders(nodes) {
        for (const node of nodes) {
            if (node.type === node_type_1.NodeType.validator) {
                const providerOwner = await this.cacheService.getRemote(cache_info_1.CacheInfo.ProviderOwner(node.owner).key);
                if (providerOwner) {
                    node.provider = node.owner;
                    node.owner = providerOwner;
                }
            }
        }
    }
    async applyNodeUnbondingPeriods(nodes) {
        const leavingNodes = nodes.filter(node => node.status === node_status_1.NodeStatus.leaving || node.status === node_status_1.NodeStatus.inactive);
        await Promise.all(leavingNodes.map(async (node) => {
            const keyUnbondPeriod = await this.keysService.getKeyUnbondPeriod(node.bls);
            node.remainingUnBondPeriod = keyUnbondPeriod === null || keyUnbondPeriod === void 0 ? void 0 : keyUnbondPeriod.remainingUnBondPeriod;
        }));
    }
    async applyNodeStakeInfo(nodes) {
        var _a, _b;
        let addresses = nodes
            .filter(({ type }) => type === node_type_1.NodeType.validator)
            .map(({ owner, provider }) => (provider ? provider : owner))
            .filter(x => x);
        addresses = addresses.distinct();
        const stakes = await this.stakeService.getStakes(addresses);
        for (const node of nodes) {
            if (node.type === 'validator') {
                let stake = (_a = stakes.find(({ bls }) => bls === node.bls)) !== null && _a !== void 0 ? _a : new stake_1.Stake();
                if (node.status === "jailed") {
                    stake = (_b = stakes.find(({ address }) => node.provider ? address === node.provider : address === node.owner)) !== null && _b !== void 0 ? _b : new stake_1.Stake();
                }
                node.stake = stake.stake;
                node.topUp = stake.topUp;
                node.locked = stake.locked;
            }
        }
    }
    async getHeartbeatValidatorsAndQueue() {
        const nodes = await this.getHeartbeatAndValidators();
        const queue = await this.getQueue();
        this.processQueuedNodes(nodes, queue);
        return nodes;
    }
    async getAllNodesRaw() {
        if (this.apiConfigService.isNodesFetchFeatureEnabled()) {
            return await this.getAllNodesFromApi();
        }
        const nodes = await this.getHeartbeatValidatorsAndQueue();
        await this.applyNodeIdentities(nodes);
        await this.applyNodeOwners(nodes);
        await this.applyNodeProviders(nodes);
        await this.applyNodeStakeInfo(nodes);
        const currentEpoch = await this.blockService.getCurrentEpoch();
        if (this.apiConfigService.isStakingV4Enabled() && currentEpoch >= this.apiConfigService.getStakingV4ActivationEpoch()) {
            const auctions = await this.gatewayService.getValidatorAuctions();
            this.processAuctions(nodes, auctions);
        }
        await this.applyNodeUnbondingPeriods(nodes);
        return nodes;
    }
    async getAllNodesFromApi() {
        try {
            const { data } = await this.apiService.get(`${this.apiConfigService.getNodesFetchServiceUrl()}/nodes`, { params: { size: 10000 } });
            return data;
        }
        catch (error) {
            this.logger.error('An unhandled error occurred when getting nodes from API');
            this.logger.error(error);
            throw error;
        }
    }
    processAuctions(nodes, auctions) {
        const minimumAuctionStake = this.stakeService.getMinimumAuctionStake(auctions);
        const dangerZoneThreshold = BigInt(minimumAuctionStake) * BigInt(105) / BigInt(100);
        for (const node of nodes) {
            let position = 1;
            for (const auction of auctions) {
                if (auction.nodes) {
                    for (const auctionNode of auction.nodes) {
                        if (node.bls === auctionNode.blsKey) {
                            node.auctioned = true;
                            node.auctionPosition = position;
                            node.auctionTopUp = auction.qualifiedTopUp;
                            node.auctionQualified = auctionNode.qualified;
                            const stakeBigInt = BigInt(node.stake);
                            const auctionTopUpBigInt = BigInt(node.auctionTopUp);
                            const qualifiedStakeBigInt = stakeBigInt + auctionTopUpBigInt;
                            node.qualifiedStake = qualifiedStakeBigInt.toString();
                        }
                        const nodeStake = node.stake || "0";
                        const nodeAuctionTopUp = node.auctionTopUp || "0";
                        const totalStake = BigInt(nodeStake) + BigInt(nodeAuctionTopUp);
                        if (node.status === node_status_1.NodeStatus.auction && node.auctionQualified && totalStake < dangerZoneThreshold) {
                            node.isInDangerZone = true;
                        }
                        position++;
                    }
                }
            }
        }
    }
    async getOwners(blses, epoch) {
        const keys = blses.map((bls) => cache_info_1.CacheInfo.OwnerByEpochAndBls(epoch, bls).key);
        const cached = await this.cacheService.batchGetManyRemote(keys);
        const owners = {};
        const missing = cached
            .map((element, index) => (element === null ? index : false))
            .filter((element) => element !== false)
            .map(element => element);
        if (missing.length) {
            for (const index of missing) {
                const bls = blses[index];
                if (!owners[bls]) {
                    const owner = await this.getBlsOwner(bls);
                    if (owner) {
                        const blses = await this.getOwnerBlses(owner);
                        for (const bls of blses) {
                            owners[bls] = owner;
                            await this.cacheService.setRemote(cache_info_1.CacheInfo.OwnerByEpochAndBls(epoch, bls).key, owner, cache_info_1.CacheInfo.OwnerByEpochAndBls(epoch, bls).ttl);
                        }
                    }
                }
            }
        }
        return blses.map((bls, index) => (missing.includes(index) ? owners[bls] : cached[index]));
    }
    async getBlsOwner(bls) {
        const auctionContractAddress = this.apiConfigService.getAuctionContractAddress();
        if (!auctionContractAddress) {
            return undefined;
        }
        const stakingContractAddress = this.apiConfigService.getStakingContractAddress();
        if (!stakingContractAddress) {
            return undefined;
        }
        const result = await this.vmQueryService.vmQuery(stakingContractAddress, 'getOwner', auctionContractAddress, [bls]);
        if (!result) {
            return undefined;
        }
        const [encodedOwnerBase64] = result;
        return sdk_nestjs_common_1.AddressUtils.bech32Encode(Buffer.from(encodedOwnerBase64, 'base64').toString('hex'));
    }
    async getOwnerBlses(owner) {
        const auctionContractAddress = this.apiConfigService.getAuctionContractAddress();
        if (!auctionContractAddress) {
            return [];
        }
        let getBlsKeysStatusListEncoded = undefined;
        try {
            getBlsKeysStatusListEncoded = await this.vmQueryService.vmQuery(auctionContractAddress, 'getBlsKeysStatus', auctionContractAddress, [sdk_nestjs_common_1.AddressUtils.bech32Decode(owner)]);
        }
        catch (error) {
            this.logger.error(`An unhandled error occurred when getting BLSes for owner '${owner}'`);
            this.logger.error(error);
            return [];
        }
        if (!getBlsKeysStatusListEncoded) {
            return [];
        }
        return getBlsKeysStatusListEncoded.reduce((result, _, index, array) => {
            if (index % 2 === 0) {
                const [blsBase64, _] = array.slice(index, index + 2);
                const bls = Buffer.from(blsBase64, 'base64').toString('hex');
                result.push(bls);
            }
            return result;
        }, []);
    }
    async getQueue() {
        const auctionContractAddress = this.apiConfigService.getAuctionContractAddress();
        if (!auctionContractAddress) {
            return [];
        }
        const stakingContractAddress = this.apiConfigService.getStakingContractAddress();
        if (!stakingContractAddress) {
            return [];
        }
        const queueEncoded = await this.vmQueryService.vmQuery(stakingContractAddress, 'getQueueRegisterNonceAndRewardAddress', auctionContractAddress);
        if (!queueEncoded) {
            return [];
        }
        return queueEncoded.reduce((result, _, index, array) => {
            if (index % 3 === 0) {
                const [blsBase64, rewardsAddressBase64, nonceBase64] = array.slice(index, index + 3);
                const bls = Buffer.from(blsBase64, 'base64').toString('hex');
                const rewardsAddressHex = Buffer.from(rewardsAddressBase64, 'base64').toString('hex');
                const rewardsAddress = sdk_nestjs_common_1.AddressUtils.bech32Encode(rewardsAddressHex);
                const nonceHex = Buffer.from(nonceBase64, 'base64').toString('hex');
                const nonce = parseInt(BigInt(nonceHex ? '0x' + nonceHex : nonceHex).toString());
                result.push({ bls, nonce, rewardsAddress, position: index / 3 + 1 });
            }
            return result;
        }, []);
    }
    async getHeartbeatAndValidators() {
        const [heartbeats, { statistics }, config,] = await Promise.all([
            this.gatewayService.getNodeHeartbeatStatus(),
            this.gatewayService.get('validator/statistics', gateway_component_request_1.GatewayComponentRequest.validatorStatistics),
            this.gatewayService.getNetworkConfig(),
        ]);
        const nodes = [];
        const blses = [...Object.keys(statistics), ...heartbeats.map((item) => item.publicKey)].distinct();
        const nodesPerShardDict = {};
        if (this.apiConfigService.isNodeSyncProgressEnabled()) {
            const shardIds = await this.protocolService.getShardIds();
            for (const shardId of shardIds) {
                const shardTrieStatistics = await this.gatewayService.getTrieStatistics(shardId);
                nodesPerShardDict[shardId] = shardTrieStatistics.accounts_snapshot_num_nodes;
            }
        }
        for (const bls of blses) {
            const heartbeat = heartbeats.find((beat) => beat.publicKey === bls) || {};
            const statistic = statistics[bls] || {};
            const item = Object.assign(Object.assign({}, heartbeat), statistic);
            const { nodeDisplayName: name, versionNumber: version, identity, tempRating, rating, ratingModifier, numLeaderSuccess: leaderSuccess, numLeaderFailure: leaderFailure, numValidatorSuccess: validatorSuccess, numValidatorFailure: validatorFailure, numValidatorIgnoredSignatures: validatorIgnoredSignatures, receivedShardID, computedShardID, peerType, isActive: online, validatorStatus, nonce, numInstances: instances, numTrieNodesReceived, } = item;
            let { shardId: shard, } = item;
            if (shard === undefined) {
                if (peerType === 'observer') {
                    shard = receivedShardID;
                }
                else {
                    shard = computedShardID;
                }
            }
            let nodeType = undefined;
            let nodeStatus = undefined;
            if (validatorStatus === 'new') {
                nodeType = node_type_1.NodeType.validator;
                nodeStatus = node_status_1.NodeStatus.new;
            }
            else if (validatorStatus === 'auction') {
                nodeType = node_type_1.NodeType.validator;
                nodeStatus = node_status_1.NodeStatus.auction;
            }
            else if (validatorStatus === 'jailed') {
                nodeType = node_type_1.NodeType.validator;
                nodeStatus = node_status_1.NodeStatus.jailed;
            }
            else if (validatorStatus && validatorStatus.includes('leaving')) {
                nodeType = node_type_1.NodeType.validator;
                nodeStatus = node_status_1.NodeStatus.leaving;
            }
            else if (validatorStatus === 'inactive') {
                nodeType = node_type_1.NodeType.validator;
                nodeStatus = node_status_1.NodeStatus.inactive;
            }
            else if (peerType === 'observer') {
                nodeType = node_type_1.NodeType.observer;
                nodeStatus = undefined;
            }
            else {
                nodeType = node_type_1.NodeType.validator;
                nodeStatus = peerType ? peerType : validatorStatus;
            }
            const node = new node_1.Node({
                bls,
                name,
                version: version ? (version.includes('-rc') || version.includes('-patch') ? version.split('-').slice(0, 2).join('-').split('/')[0] : version.split('-')[0].split('/')[0]) : '',
                identity: identity && identity !== '' ? identity.toLowerCase() : identity,
                rating: parseFloat(parseFloat(rating).toFixed(2)),
                tempRating: parseFloat(parseFloat(tempRating).toFixed(2)),
                ratingModifier: ratingModifier ? ratingModifier : 0,
                fullHistory: item.peerSubType === 1 ? true : undefined,
                shard,
                type: nodeType,
                status: nodeStatus,
                online,
                nonce,
                instances,
                owner: '',
                provider: '',
                stake: '',
                topUp: '',
                locked: '',
                leaderFailure,
                leaderSuccess,
                validatorFailure,
                validatorIgnoredSignatures,
                validatorSuccess,
                issues: [],
                position: 0,
                auctioned: undefined,
                auctionPosition: undefined,
                auctionTopUp: undefined,
                auctionQualified: undefined,
            });
            if (['queued', 'jailed'].includes(peerType)) {
                node.shard = undefined;
            }
            if (node.online === undefined) {
                node.online = false;
            }
            const nodesPerShard = nodesPerShardDict[shard];
            if (this.apiConfigService.isNodeSyncProgressEnabled() && numTrieNodesReceived > 0 && nodesPerShard > 0) {
                node.syncProgress = numTrieNodesReceived / nodesPerShard;
                if (node.syncProgress > 1) {
                    node.syncProgress = 1;
                }
            }
            node.issues = this.getIssues(node, config.drt_latest_tag_software_version);
            nodes.push(node);
        }
        return nodes;
    }
    async getAllNodesAuctions() {
        return await this.cacheService.getOrSet(cache_info_1.CacheInfo.NodesAuctions.key, async () => await this.getAllNodesAuctionsRaw(), cache_info_1.CacheInfo.NodesAuctions.ttl);
    }
    async getAllNodesAuctionsRaw() {
        const allNodes = await this.getNodes(new query_pagination_1.QueryPagination({ size: 10000 }), new node_filter_1.NodeFilter({ status: node_status_1.NodeStatus.auction }));
        const groupedNodes = allNodes.groupBy(node => (node.provider || node.owner) + ':' + (BigInt(node.stake).toString()) + (BigInt(node.topUp).toString()), true);
        const nodesWithAuctionData = [];
        for (const group of groupedNodes) {
            const node = group.values[0];
            const identity = node.identity ? await this.identitiesService.getIdentity(node.identity) : undefined;
            const nodeAuction = new node_auction_1.NodeAuction({
                identity: identity === null || identity === void 0 ? void 0 : identity.identity,
                name: identity === null || identity === void 0 ? void 0 : identity.name,
                description: identity === null || identity === void 0 ? void 0 : identity.description,
                avatar: identity === null || identity === void 0 ? void 0 : identity.avatar,
                distribution: identity === null || identity === void 0 ? void 0 : identity.distribution,
                stake: node.stake || '0',
                owner: node.owner,
                provider: node.provider,
                auctionTopUp: node.auctionTopUp || '0',
                qualifiedStake: node.qualifiedStake || '0',
                auctionValidators: group.values.filter((node) => node.auctioned).length,
                qualifiedAuctionValidators: group.values.filter((node) => node.auctionQualified === true).length,
                droppedValidators: group.values.filter((node) => node.auctionQualified === false).length,
                dangerZoneValidators: group.values.filter((node) => node.isInDangerZone).length,
            });
            if (group.values.length === 1 && !node.provider && !node.identity) {
                nodeAuction.bls = node.bls;
            }
            nodesWithAuctionData.push(nodeAuction);
        }
        return nodesWithAuctionData;
    }
    async getNodesAuctions(pagination, filter) {
        var _a;
        let nodesWithAuctionData = await this.getAllNodesAuctions();
        const sort = (_a = filter === null || filter === void 0 ? void 0 : filter.sort) !== null && _a !== void 0 ? _a : node_sort_auction_1.NodeSortAuction.qualifiedStake;
        const order = !(filter === null || filter === void 0 ? void 0 : filter.sort) && !(filter === null || filter === void 0 ? void 0 : filter.order) ? sort_order_1.SortOrder.desc : filter === null || filter === void 0 ? void 0 : filter.order;
        nodesWithAuctionData = nodesWithAuctionData.sorted(node => Number(node[sort]), node => node.qualifiedAuctionValidators === 0 ? 0 : 1, node => 0 - node.droppedValidators);
        if (order === sort_order_1.SortOrder.desc) {
            nodesWithAuctionData.reverse();
        }
        return nodesWithAuctionData.slice(pagination.from, pagination.size);
    }
    async deleteOwnersForAddressInCache(address) {
        const nodes = await this.getAllNodes();
        const epoch = await this.blockService.getCurrentEpoch();
        const keys = nodes
            .filter(x => x.owner === address)
            .map(x => cache_info_1.CacheInfo.OwnerByEpochAndBls(epoch, x.bls).key);
        for (const key of keys) {
            await this.cacheService.deleteInCache(key);
        }
        return keys;
    }
};
NodeService = NodeService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => stake_service_1.StakeService))),
    tslib_1.__param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => block_service_1.BlockService))),
    tslib_1.__param(8, (0, common_1.Inject)((0, common_1.forwardRef)(() => identities_service_1.IdentitiesService))),
    tslib_1.__metadata("design:paramtypes", [gateway_service_1.GatewayService,
        vm_query_service_1.VmQueryService,
        api_config_service_1.ApiConfigService,
        sdk_nestjs_cache_1.CacheService,
        stake_service_1.StakeService,
        block_service_1.BlockService,
        protocol_service_1.ProtocolService,
        keys_service_1.KeysService,
        identities_service_1.IdentitiesService,
        sdk_nestjs_http_1.ApiService])
], NodeService);
exports.NodeService = NodeService;
//# sourceMappingURL=node.service.js.map