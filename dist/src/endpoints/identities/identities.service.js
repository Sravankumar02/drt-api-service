"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentitiesService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
const cache_info_1 = require("../../utils/cache.info");
const network_service_1 = require("../network/network.service");
const node_service_1 = require("../nodes/node.service");
const nodes_infos_1 = require("../providers/entities/nodes.infos");
const identity_1 = require("./entities/identity");
const identity_detailed_1 = require("./entities/identity.detailed");
const stake_info_1 = require("./entities/stake.info");
const node_type_1 = require("../nodes/entities/node.type");
const node_status_1 = require("../nodes/entities/node.status");
const identity_sort_criteria_1 = require("./entities/identity.sort.criteria");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const block_service_1 = require("../blocks/block.service");
let IdentitiesService = class IdentitiesService {
    constructor(nodeService, cacheService, networkService, apiConfigService, blockService) {
        this.nodeService = nodeService;
        this.cacheService = cacheService;
        this.networkService = networkService;
        this.apiConfigService = apiConfigService;
        this.blockService = blockService;
    }
    async getIdentity(identifier) {
        const identities = await this.getAllIdentities();
        return identities.find(x => x.identity === identifier);
    }
    async getIdentityAvatar(identifier) {
        const identity = await this.getIdentity(identifier);
        return identity ? identity.avatar : undefined;
    }
    async getIdentities(queryPagination, ids, sort) {
        const { from, size } = queryPagination;
        let identities = await this.getAllIdentities();
        if (ids.length > 0) {
            identities = identities.filter(x => x.identity && ids.includes(x.identity));
        }
        if (sort && sort.length > 0) {
            identities = identities.sort((a, b) => this.compareWithCriteria(a, b, sort, 0));
        }
        return identities.slice(from, from + size);
    }
    compareWithCriteria(a, b, criteria, currentIndex) {
        var _a, _b, _c, _d, _e, _f;
        if (currentIndex >= criteria.length) {
            return 0;
        }
        const currentCriterion = criteria[currentIndex];
        let comparison;
        switch (currentCriterion) {
            case identity_sort_criteria_1.IdentitySortCriteria.validators:
                comparison = ((_a = b.validators) !== null && _a !== void 0 ? _a : 0) - ((_b = a.validators) !== null && _b !== void 0 ? _b : 0);
                break;
            case identity_sort_criteria_1.IdentitySortCriteria.stake:
                comparison = Number((_c = b.stake) !== null && _c !== void 0 ? _c : '0') - Number((_d = a.stake) !== null && _d !== void 0 ? _d : '0');
                break;
            case identity_sort_criteria_1.IdentitySortCriteria.locked:
                comparison = Number((_e = b.locked) !== null && _e !== void 0 ? _e : '0') - Number((_f = a.locked) !== null && _f !== void 0 ? _f : '0');
                break;
            default:
                comparison = 0;
        }
        if (comparison === 0 && currentIndex < criteria.length - 1) {
            return this.compareWithCriteria(a, b, criteria, currentIndex + 1);
        }
        return comparison;
    }
    async getAllIdentities() {
        return await this.cacheService.getOrSet(cache_info_1.CacheInfo.Identities.key, async () => await this.getAllIdentitiesRaw(), cache_info_1.CacheInfo.Identities.ttl);
    }
    computeTotalStakeAndTopUp(nodes) {
        let totalStake = BigInt(0);
        let totalTopUp = BigInt(0);
        nodes.forEach((node) => {
            if (node.type == 'validator') {
                if (node.stake) {
                    totalStake += BigInt(node.stake);
                }
                if (node.topUp) {
                    totalTopUp += BigInt(node.topUp);
                }
            }
        });
        const nodesInfo = new nodes_infos_1.NodesInfos();
        nodesInfo.numNodes = nodes.length;
        nodesInfo.stake = totalStake.toString();
        nodesInfo.topUp = totalTopUp.toString();
        const totalLocked = totalStake + totalTopUp;
        nodesInfo.locked = totalLocked.toString();
        return nodesInfo;
    }
    getStakeDistributionForIdentity(locked, identity) {
        const distribution = identity.nodes.reduce((accumulator, current) => {
            const stake = current.stake ? BigInt(current.stake) : BigInt(0);
            const topUp = current.topUp ? BigInt(current.topUp) : BigInt(0);
            if (current.provider) {
                if (!accumulator[current.provider]) {
                    accumulator[current.provider] = BigInt(0);
                }
                accumulator[current.provider] += stake + topUp;
            }
            else {
                if (!accumulator.direct) {
                    accumulator.direct = BigInt(0);
                }
                accumulator.direct += stake + topUp;
            }
            return accumulator;
        }, {});
        Object.keys(distribution).forEach((key) => {
            if (locked) {
                distribution[key] = Number((BigInt(100) * distribution[key]) / locked) / 100;
            }
            else {
                distribution[key] = null;
            }
        });
        if (distribution && Object.keys(distribution).length > 1) {
            const first = Object.keys(distribution)[0];
            const rest = Object.keys(distribution)
                .slice(1)
                .reduce((accumulator, current) => (accumulator += distribution[current]), 0);
            distribution[first] = parseFloat((1 - rest).toFixed(2));
        }
        for (const key of Object.keys(distribution)) {
            if (distribution[key] === 0) {
                delete distribution[key];
            }
        }
        return distribution;
    }
    getStakeInfoForIdentity(identity, totalLocked, currentEpoch) {
        var _a;
        const nodes = (_a = identity.nodes) !== null && _a !== void 0 ? _a : [];
        const stake = nodes.sumBigInt(x => BigInt(x.stake ? x.stake : '0'));
        const topUp = nodes.sumBigInt(x => BigInt(x.topUp ? x.topUp : '0'));
        const locked = stake + topUp;
        const stakePercent = totalLocked > 0 ? (locked * BigInt(10000)) / totalLocked : 0;
        const qualifiedAuctionNodes = nodes.filter(x => x.type === node_type_1.NodeType.validator && x.status === node_status_1.NodeStatus.auction && x.auctionQualified === true);
        const unqualifiedAuctionNodes = nodes.filter(x => x.type === node_type_1.NodeType.validator && x.status === node_status_1.NodeStatus.auction && x.auctionQualified === false);
        const isStakingV4ActivationEpoch = this.apiConfigService.isStakingV4Enabled() && currentEpoch === this.apiConfigService.getStakingV4ActivationEpoch();
        const stakeInfo = new stake_info_1.StakeInfo({
            score: nodes.sum(x => x.ratingModifier),
            stake: stake.toString(),
            topUp: topUp.toString(),
            locked: locked.toString(),
            stakePercent: parseFloat(stakePercent.toString()) / 100,
            providers: nodes.map(x => x.provider).filter(provider => !!provider).distinct(),
            distribution: this.getStakeDistributionForIdentity(locked, identity),
            validators: nodes.filter(x => x.type === node_type_1.NodeType.validator && x.status !== node_status_1.NodeStatus.inactive).length,
            queued: nodes.filter(x => x.type === node_type_1.NodeType.validator && x.status === node_status_1.NodeStatus.queued).length,
            auctioned: isStakingV4ActivationEpoch ? qualifiedAuctionNodes.length + unqualifiedAuctionNodes.length : unqualifiedAuctionNodes.length,
        });
        stakeInfo.sort = stakeInfo.locked && stakeInfo.locked !== '0' ? parseInt(stakeInfo.locked.slice(0, -18)) : 0;
        return stakeInfo;
    }
    async getAllIdentitiesRaw() {
        const nodes = await this.nodeService.getAllNodes();
        const distinctIdentities = nodes.filter(x => x.identity).map(x => x.identity).distinct();
        const identitiesDetailed = [];
        const keybaseIdentities = await this.cacheService.get(cache_info_1.CacheInfo.IdentityProfilesKeybases.key);
        for (const identity of distinctIdentities) {
            if (!identity) {
                continue;
            }
            const keybaseIdentity = keybaseIdentities === null || keybaseIdentities === void 0 ? void 0 : keybaseIdentities.find(item => item.identity === identity);
            if (keybaseIdentity && keybaseIdentity.identity) {
                const identityDetailed = new identity_detailed_1.IdentityDetailed();
                identityDetailed.avatar = keybaseIdentity.avatar;
                identityDetailed.description = keybaseIdentity.description;
                identityDetailed.identity = keybaseIdentity.identity;
                identityDetailed.location = keybaseIdentity.location;
                identityDetailed.name = keybaseIdentity.name;
                identityDetailed.twitter = keybaseIdentity.twitter;
                identityDetailed.website = keybaseIdentity.website;
                identitiesDetailed.push(identityDetailed);
            }
        }
        for (const node of nodes) {
            const found = identitiesDetailed.find((identityDetailed) => identityDetailed.identity == node.identity);
            if (found && node.identity && !!node.identity) {
                if (!found.nodes) {
                    found.nodes = [];
                }
                found.nodes.push(node);
                if (!found.name) {
                    found.name = node.bls;
                }
            }
            else {
                const identityDetailed = new identity_detailed_1.IdentityDetailed();
                identityDetailed.name = node.bls;
                identityDetailed.nodes = [node];
                identitiesDetailed.push(identityDetailed);
            }
        }
        const { locked: totalLocked } = this.computeTotalStakeAndTopUp(nodes);
        const { baseApr, topUpApr } = await this.networkService.getApr();
        const currentEpoch = await this.blockService.getCurrentEpoch();
        let identities = identitiesDetailed.map((identityDetailed) => {
            var _a, _b, _c, _d;
            if (identityDetailed.nodes && identityDetailed.nodes.length) {
                const identity = new identity_1.Identity();
                identity.identity = identityDetailed.identity;
                identity.avatar = identityDetailed.avatar;
                identity.description = identityDetailed.description;
                identity.name = identityDetailed.name;
                identity.website = identityDetailed.website;
                identity.twitter = identityDetailed.twitter;
                identity.location = identityDetailed.location;
                const stakeInfo = this.getStakeInfoForIdentity(identityDetailed, BigInt(parseInt(totalLocked)), currentEpoch);
                identity.score = stakeInfo.score;
                identity.validators = stakeInfo.validators;
                identity.stake = stakeInfo.stake;
                identity.topUp = stakeInfo.topUp;
                identity.locked = stakeInfo.locked;
                identity.distribution = stakeInfo.distribution;
                identity.providers = stakeInfo.providers;
                identity.stakePercent = stakeInfo.stakePercent;
                if (identity.stake && identity.topUp) {
                    const stakeReturn = new bignumber_js_1.default(identity.stake.slice(0, -18)).multipliedBy(new bignumber_js_1.default(baseApr));
                    const topUpReturn = identity.topUp !== '0' ? new bignumber_js_1.default(identity.topUp.slice(0, -18)).multipliedBy(new bignumber_js_1.default(topUpApr)) : new bignumber_js_1.default(0);
                    const annualReturn = stakeReturn.plus(topUpReturn).multipliedBy(((_a = identity.validators) !== null && _a !== void 0 ? _a : 0) - ((_b = stakeInfo.queued) !== null && _b !== void 0 ? _b : 0) - ((_c = stakeInfo.auctioned) !== null && _c !== void 0 ? _c : 0)).dividedBy((_d = identity.validators) !== null && _d !== void 0 ? _d : 0);
                    const aprStr = new bignumber_js_1.default(annualReturn).multipliedBy(100).div(identity.locked.slice(0, -18)).toString();
                    identity.apr = Number(aprStr).toRounded(2);
                }
                return identity;
            }
            return new identity_1.Identity();
        });
        identities = identities
            .filter((identity) => { var _a; return identity && ((_a = identity.validators) !== null && _a !== void 0 ? _a : 0) > 0; });
        identities = identities.sortedDescending(identity => { var _a; return (_a = identity.validators) !== null && _a !== void 0 ? _a : 0; });
        for (const [index, identity] of identities.entries()) {
            if (identity) {
                identity.rank = index + 1;
                if (identity.avatar) {
                    identity.avatar = this.processIdentityAvatar(identity.avatar);
                }
            }
        }
        return identities;
    }
    processIdentityAvatar(avatar) {
        return avatar;
    }
};
IdentitiesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => node_service_1.NodeService))),
    tslib_1.__param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => network_service_1.NetworkService))),
    tslib_1.__param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => block_service_1.BlockService))),
    tslib_1.__metadata("design:paramtypes", [node_service_1.NodeService,
        sdk_nestjs_cache_1.CacheService,
        network_service_1.NetworkService,
        api_config_service_1.ApiConfigService,
        block_service_1.BlockService])
], IdentitiesService);
exports.IdentitiesService = IdentitiesService;
//# sourceMappingURL=identities.service.js.map