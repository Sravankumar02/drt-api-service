"use strict";
var StakeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const vm_query_service_1 = require("../vm.query/vm.query.service");
const node_status_1 = require("../nodes/entities/node.status");
const node_type_1 = require("../nodes/entities/node.type");
const node_service_1 = require("../nodes/node.service");
const stake_1 = require("./entities/stake");
const stake_topup_1 = require("./entities/stake.topup");
const network_service_1 = require("../network/network.service");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const cache_info_1 = require("../../utils/cache.info");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_2 = require("@sravankumar02/sdk-nestjs-common");
const provider_stake_1 = require("./entities/provider.stake");
const identities_service_1 = require("../identities/identities.service");
const global_stake_1 = require("./entities/global.stake");
const validator_info_result_1 = require("./entities/validator.info.result");
const node_filter_1 = require("../nodes/entities/node.filter");
const block_service_1 = require("../blocks/block.service");
let StakeService = StakeService_1 = class StakeService {
    constructor(cachingService, vmQueryService, apiConfigService, nodeService, gatewayService, networkService, identitiesService, blockService) {
        this.cachingService = cachingService;
        this.vmQueryService = vmQueryService;
        this.apiConfigService = apiConfigService;
        this.nodeService = nodeService;
        this.gatewayService = gatewayService;
        this.networkService = networkService;
        this.identitiesService = identitiesService;
        this.blockService = blockService;
        this.logger = new sdk_nestjs_common_2.OriginLogger(StakeService_1.name);
    }
    async getGlobalStake() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.GlobalStake.key, async () => await this.getGlobalStakeRaw(), cache_info_1.CacheInfo.GlobalStake.ttl);
    }
    async getGlobalStakeRaw() {
        const validators = await this.getValidators();
        const economics = await this.gatewayService.getNetworkEconomics();
        const totalBaseStaked = economics.drt_total_base_staked_value;
        const totalTopUp = economics.drt_total_top_up_value;
        const totalStaked = BigInt(BigInt(totalBaseStaked) + BigInt(totalTopUp)).toString();
        const totalObservers = await this.nodeService.getNodeCount(new node_filter_1.NodeFilter({ type: node_type_1.NodeType.observer }));
        const currentEpoch = await this.blockService.getCurrentEpoch();
        if (!this.apiConfigService.isStakingV4Enabled() || currentEpoch < this.apiConfigService.getStakingV4ActivationEpoch()) {
            const queueSize = await this.nodeService.getNodeCount(new node_filter_1.NodeFilter({ status: node_status_1.NodeStatus.queued }));
            return new global_stake_1.GlobalStake({
                totalValidators: validators.totalValidators,
                activeValidators: validators.activeValidators,
                totalObservers,
                queueSize,
                totalStaked,
            });
        }
        const auctions = await this.gatewayService.getValidatorAuctions();
        const minimumAuctionQualifiedTopUp = this.getMinimumAuctionTopUp(auctions);
        const minimumAuctionQualifiedStake = this.getMinimumAuctionStake(auctions);
        const auctionValidators = await this.nodeService.getNodeCount(new node_filter_1.NodeFilter({ auctioned: true }));
        const qualifiedAuctionValidators = await this.nodeService.getNodeCount(new node_filter_1.NodeFilter({ isQualified: true }));
        const nakamotoCoefficient = await this.getNakamotoCoefficient();
        const dangerZoneValidators = await this.nodeService.getNodeCount(new node_filter_1.NodeFilter({ isAuctionDangerZone: true, isQualified: true }));
        const eligibleValidators = await this.nodeService.getNodeCount(new node_filter_1.NodeFilter({ status: node_status_1.NodeStatus.eligible }));
        const waitingValidators = await this.nodeService.getNodeCount(new node_filter_1.NodeFilter({ status: node_status_1.NodeStatus.waiting }));
        const allStakedNodes = validators.totalValidators + validators.inactiveValidators;
        return new global_stake_1.GlobalStake(Object.assign(Object.assign({}, validators), { allStakedNodes,
            totalStaked,
            totalObservers,
            minimumAuctionQualifiedTopUp,
            minimumAuctionQualifiedStake,
            auctionValidators,
            qualifiedAuctionValidators,
            nakamotoCoefficient,
            eligibleValidators,
            waitingValidators,
            dangerZoneValidators }));
    }
    async getValidators() {
        const stakingContractAddress = this.apiConfigService.getStakingContractAddress();
        if (!stakingContractAddress) {
            return new validator_info_result_1.ValidatorInfoResult({
                totalValidators: 0,
                activeValidators: 0,
            });
        }
        const nodes = await this.nodeService.getAllNodes();
        const validators = nodes.filter(x => x.type === node_type_1.NodeType.validator);
        const { totalValidators, inactiveValidators } = await this.getTotalAndInactiveValidators(validators);
        const activeValidators = validators.filter(node => { var _a; return [node_status_1.NodeStatus.eligible, node_status_1.NodeStatus.waiting].includes((_a = node.status) !== null && _a !== void 0 ? _a : node_status_1.NodeStatus.unknown) && node.online === true; });
        return new validator_info_result_1.ValidatorInfoResult({
            totalValidators: totalValidators,
            activeValidators: activeValidators.length,
            inactiveValidators: inactiveValidators,
        });
    }
    async getTotalAndInactiveValidators(validators) {
        if (!this.apiConfigService.isStakingV4Enabled()) {
            return this.getTotalAndInactiveValidatorsBeforeStakingV4(validators);
        }
        const currentEpoch = await this.blockService.getCurrentEpoch();
        const activationStep1Epoch = this.apiConfigService.getStakingV4ActivationEpoch();
        const activationStep2Epoch = activationStep1Epoch + 1;
        if (currentEpoch < activationStep1Epoch) {
            return this.getTotalAndInactiveValidatorsBeforeStakingV4(validators);
        }
        else if (currentEpoch < activationStep2Epoch) {
            return await this.getTotalAndInactiveValidatorsDuringStakingV4(validators);
        }
        else {
            return await this.getTotalAndInactiveValidatorsAfterStakingV4(validators);
        }
    }
    getTotalAndInactiveValidatorsBeforeStakingV4(validators) {
        const totalValidators = validators.filter(node => { var _a; return [node_status_1.NodeStatus.eligible, node_status_1.NodeStatus.waiting].includes((_a = node.status) !== null && _a !== void 0 ? _a : node_status_1.NodeStatus.unknown); });
        const queuedValidators = validators.filter(node => node.status === node_status_1.NodeStatus.queued);
        return {
            totalValidators: totalValidators.length,
            inactiveValidators: queuedValidators.length,
        };
    }
    async getTotalAndInactiveValidatorsDuringStakingV4(validators) {
        const inactiveValidatorsCount = await this.nodeService.getNodeCount(new node_filter_1.NodeFilter({ isAuctioned: true }));
        const totalValidators = validators.filter(node => { var _a; return [node_status_1.NodeStatus.eligible, node_status_1.NodeStatus.waiting].includes((_a = node.status) !== null && _a !== void 0 ? _a : node_status_1.NodeStatus.unknown); });
        return {
            totalValidators: totalValidators.length,
            inactiveValidators: inactiveValidatorsCount,
        };
    }
    async getTotalAndInactiveValidatorsAfterStakingV4(nodes) {
        const qualifiedNodesCount = await this.nodeService.getNodeCount(new node_filter_1.NodeFilter({ isAuctioned: true, isQualified: true }));
        const inactiveValidatorsCount = await this.nodeService.getNodeCount(new node_filter_1.NodeFilter({ isAuctioned: true, isQualified: false }));
        const totalValidators = nodes.filter(node => { var _a; return [node_status_1.NodeStatus.eligible, node_status_1.NodeStatus.waiting].includes((_a = node.status) !== null && _a !== void 0 ? _a : node_status_1.NodeStatus.unknown); });
        return {
            totalValidators: totalValidators.length + qualifiedNodesCount,
            inactiveValidators: inactiveValidatorsCount,
        };
    }
    async getStakes(addresses) {
        const stakesForAddressesNodes = await this.getAllStakesForNodes(addresses);
        const allStakesForAddresses = [];
        for (const stake of stakesForAddressesNodes) {
            const blses = stake.blses;
            if (!blses) {
                this.logger.error(`Cannot find blses for address stake '${stake.address}'`);
            }
            for (const bls of blses) {
                const nodeStake = sdk_nestjs_http_1.ApiUtils.mergeObjects(new stake_1.Stake(), stake);
                nodeStake.bls = bls;
                allStakesForAddresses.push(nodeStake);
            }
        }
        return allStakesForAddresses;
    }
    async getAllStakesForNode(address) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.StakeTopup(address).key, async () => await this.getAllStakesForAddressNodesRaw(address), cache_info_1.CacheInfo.StakeTopup(address).ttl);
    }
    async getAllStakesForNodes(addresses) {
        return await this.cachingService.batchProcess(addresses, address => cache_info_1.CacheInfo.StakeTopup(address).key, async (address) => await this.getAllStakesForAddressNodesRaw(address), cache_info_1.CacheInfo.StakeTopup('').ttl);
    }
    async getAllStakesForAddressNodesRaw(address) {
        if (!address) {
            return new stake_topup_1.StakeTopup();
        }
        const auctionContractAddress = this.apiConfigService.getAuctionContractAddress();
        if (!auctionContractAddress) {
            return new stake_topup_1.StakeTopup();
        }
        let response;
        try {
            response = await this.vmQueryService.vmQuery(auctionContractAddress, 'getTotalStakedTopUpStakedBlsKeys', auctionContractAddress, [sdk_nestjs_common_1.AddressUtils.bech32Decode(address)]);
        }
        catch (error) {
            this.logger.log(`Unexpected error when trying to get stake informations from contract for address '${address}'`);
            this.logger.log(error);
            response = undefined;
        }
        if (!response) {
            return {
                topUp: '0',
                stake: '0',
                locked: '0',
                numNodes: 0,
                address,
                blses: [],
            };
        }
        const [topUpBase64, stakedBase64, numNodesBase64, ...blsesBase64] = response || [];
        const topUpHex = Buffer.from(topUpBase64, 'base64').toString('hex');
        const totalTopUp = BigInt(topUpHex ? '0x' + topUpHex : topUpHex);
        const stakedHex = Buffer.from(stakedBase64, 'base64').toString('hex');
        const totalStaked = BigInt(stakedHex ? '0x' + stakedHex : stakedHex) - totalTopUp;
        const totalLocked = totalStaked + totalTopUp;
        const numNodesHex = Buffer.from(numNodesBase64, 'base64').toString('hex');
        const numNodes = BigInt(numNodesHex ? '0x' + numNodesHex : numNodesHex);
        const blses = blsesBase64.map((nodeBase64) => Buffer.from(nodeBase64, 'base64').toString('hex'));
        if (totalStaked.toString() === '0' && numNodes.toString() === '0') {
            return {
                topUp: '0',
                stake: '0',
                locked: '0',
                numNodes: parseInt(numNodes.toString()),
                address,
                blses,
            };
        }
        else {
            const topUp = String(totalTopUp / numNodes);
            const stake = String(totalStaked / numNodes);
            const locked = String(totalLocked / numNodes);
            return {
                topUp,
                stake,
                locked,
                numNodes: parseInt(numNodes.toString()),
                address,
                blses,
            };
        }
    }
    async getStakeForAddress(address) {
        const auctionContractAddress = this.apiConfigService.getAuctionContractAddress();
        if (!auctionContractAddress) {
            return new provider_stake_1.ProviderStake({
                totalStaked: '0',
            });
        }
        const hexAddress = sdk_nestjs_common_1.AddressUtils.bech32Decode(address);
        const [totalStakedEncoded, unStakedTokensListEncoded] = await Promise.all([
            this.vmQueryService.vmQuery(auctionContractAddress, 'getTotalStaked', address),
            this.vmQueryService.vmQuery(auctionContractAddress, 'getUnStakedTokensList', address, [hexAddress]),
        ]);
        const data = {
            totalStaked: '0',
            unstakedTokens: undefined,
        };
        if (totalStakedEncoded) {
            data.totalStaked = Buffer.from(totalStakedEncoded[0], 'base64').toString('ascii');
        }
        if (unStakedTokensListEncoded) {
            data.unstakedTokens = unStakedTokensListEncoded.reduce((result, _, index, array) => {
                if (index % 2 === 0) {
                    const [encodedAmount, encodedEpochs] = array.slice(index, index + 2);
                    const amountHex = Buffer.from(encodedAmount, 'base64').toString('hex');
                    const amount = BigInt(amountHex ? '0x' + amountHex : amountHex).toString();
                    const epochsHex = Buffer.from(encodedEpochs, 'base64').toString('hex');
                    const epochs = parseInt(BigInt(epochsHex ? '0x' + epochsHex : epochsHex).toString());
                    result.push({ amount, epochs });
                }
                return result;
            }, []);
            const networkConfig = await this.networkService.getNetworkConfig();
            for (const element of data.unstakedTokens) {
                element.expires = element.epochs
                    ? sdk_nestjs_common_1.RoundUtils.getExpires(element.epochs, networkConfig.roundsPassed, networkConfig.roundsPerEpoch, networkConfig.roundDuration)
                    : undefined;
                delete element.epochs;
            }
        }
        return data;
    }
    getMinimumAuctionTopUp(auctions) {
        if (auctions.length === 0) {
            return undefined;
        }
        let minimumAuctionTopUp = undefined;
        for (const auction of auctions) {
            if (auction.nodes) {
                for (const auctionNode of auction.nodes) {
                    if (auctionNode.qualified === true && (!minimumAuctionTopUp || BigInt(minimumAuctionTopUp) > BigInt(auction.qualifiedTopUp))) {
                        minimumAuctionTopUp = auction.qualifiedTopUp;
                    }
                }
            }
        }
        return minimumAuctionTopUp;
    }
    getMinimumAuctionStake(auctions) {
        const MINIMUM_STAKE_AMOUNT = 2500000000000000000000;
        const minimumAuctionTopUp = this.getMinimumAuctionTopUp(auctions);
        const baseStake = BigInt(MINIMUM_STAKE_AMOUNT);
        const topUp = minimumAuctionTopUp ? BigInt(minimumAuctionTopUp) : BigInt(0);
        return (baseStake + topUp).toString();
    }
    async getNakamotoCoefficient() {
        var _a;
        const identities = await this.identitiesService.getAllIdentities();
        const sortedIdentities = identities.sortedDescending(x => { var _a; return (_a = x.validators) !== null && _a !== void 0 ? _a : 0; });
        const totalValidators = await this.getValidators();
        const threshold = Math.ceil((totalValidators).totalValidators * 0.33);
        let cumulativeValidators = 0;
        let nakamotoCoefficient = 0;
        for (const identity of sortedIdentities) {
            cumulativeValidators += (_a = identity.validators) !== null && _a !== void 0 ? _a : 0;
            nakamotoCoefficient++;
            if (cumulativeValidators > threshold) {
                break;
            }
        }
        return nakamotoCoefficient;
    }
};
StakeService = StakeService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => node_service_1.NodeService))),
    tslib_1.__param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => network_service_1.NetworkService))),
    tslib_1.__param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => identities_service_1.IdentitiesService))),
    tslib_1.__param(7, (0, common_1.Inject)((0, common_1.forwardRef)(() => block_service_1.BlockService))),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        vm_query_service_1.VmQueryService,
        api_config_service_1.ApiConfigService,
        node_service_1.NodeService,
        gateway_service_1.GatewayService,
        network_service_1.NetworkService,
        identities_service_1.IdentitiesService,
        block_service_1.BlockService])
], StakeService);
exports.StakeService = StakeService;
//# sourceMappingURL=stake.service.js.map