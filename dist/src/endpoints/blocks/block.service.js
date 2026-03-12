"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const block_1 = require("./entities/block");
const block_detailed_1 = require("./entities/block.detailed");
const block_filter_1 = require("./entities/block.filter");
const query_pagination_1 = require("../../common/entities/query.pagination");
const bls_service_1 = require("../bls/bls.service");
const cache_info_1 = require("../../utils/cache.info");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const node_service_1 = require("../nodes/node.service");
const identities_service_1 = require("../identities/identities.service");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const concurrency_utils_1 = require("../../utils/concurrency.utils");
let BlockService = class BlockService {
    constructor(indexerService, cachingService, blsService, nodeService, identitiesService, apiConfigService) {
        this.indexerService = indexerService;
        this.cachingService = cachingService;
        this.blsService = blsService;
        this.nodeService = nodeService;
        this.identitiesService = identitiesService;
        this.apiConfigService = apiConfigService;
    }
    async getBlocksCount(filter) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.BlocksCount(filter).key, async () => await this.indexerService.getBlocksCount(filter), cache_info_1.CacheInfo.BlocksCount(filter).ttl);
    }
    async getBlocks(filter, queryPagination, withProposerIdentity) {
        const result = await this.indexerService.getBlocks(filter, queryPagination);
        const blocks = await Promise.all(result.map(async (item) => {
            const blockRaw = await this.computeProposerAndValidators(item);
            const block = block_1.Block.mergeWithElasticResponse(new block_1.Block(), blockRaw);
            if (blockRaw.scheduledData && blockRaw.scheduledData.rootHash) {
                block.scheduledRootHash = blockRaw.scheduledData.rootHash;
            }
            return block;
        }));
        if (withProposerIdentity === true) {
            await this.applyProposerIdentity(blocks);
        }
        return blocks;
    }
    async applyProposerIdentity(blocks) {
        const proposerBlses = blocks.map(x => x.proposer);
        const nodes = await this.nodeService.getAllNodes();
        const relevantNodes = nodes.filter(node => proposerBlses.includes(node.bls) && node.identity);
        const nodeIdentities = await concurrency_utils_1.ConcurrencyUtils.executeWithConcurrencyLimit(relevantNodes, async (node) => {
            const identity = await this.identitiesService.getIdentity(node.identity);
            return { node, identity };
        }, 25, 'Block proposer identities');
        for (const { node, identity } of nodeIdentities) {
            if (!identity) {
                continue;
            }
            for (const block of blocks) {
                if (block.proposer === node.bls) {
                    block.proposerIdentity = identity;
                }
            }
        }
    }
    async computeProposerAndValidators(item) {
        const { shardId, epoch, searchOrder, proposerBlsKey } = item, rest = tslib_1.__rest(item, ["shardId", "epoch", "searchOrder", "proposerBlsKey"]);
        let { proposer, validators } = item;
        let blses = await this.cachingService.getLocal(cache_info_1.CacheInfo.ShardAndEpochBlses(shardId, epoch).key);
        if (!blses) {
            blses = await this.blsService.getPublicKeys(shardId, epoch);
            this.cachingService.setLocal(cache_info_1.CacheInfo.ShardAndEpochBlses(shardId, epoch).key, blses, cache_info_1.CacheInfo.ShardAndEpochBlses(shardId, epoch).ttl);
        }
        if (proposerBlsKey) {
            proposer = proposerBlsKey;
        }
        else {
            proposer = blses[proposer];
        }
        if (validators) {
            validators = validators.map((index) => blses[index]);
        }
        return Object.assign(Object.assign({ shardId, epoch, validators }, rest), { proposer });
    }
    async getBlock(hash) {
        const result = await this.indexerService.getBlock(hash);
        const isChainAndromedaEnabled = this.apiConfigService.isChainAndromedaEnabled()
            && result.epoch >= this.apiConfigService.getChainAndromedaActivationEpoch();
        if (result.round > 0) {
            const publicKeys = await this.blsService.getPublicKeys(result.shardId, result.epoch);
            if (result.proposerBlsKey) {
                result.proposer = result.proposerBlsKey;
            }
            else {
                result.proposer = publicKeys[result.proposer];
            }
            if (!isChainAndromedaEnabled) {
                result.validators = result.validators.map((validator) => publicKeys[validator]);
            }
            else {
                result.validators = publicKeys;
            }
        }
        else {
            result.validators = [];
        }
        const block = block_detailed_1.BlockDetailed.mergeWithElasticResponse(new block_detailed_1.BlockDetailed(), result);
        await this.applyProposerIdentity([block]);
        return block;
    }
    async getCurrentEpoch() {
        const blocks = await this.getBlocks(new block_filter_1.BlockFilter(), new query_pagination_1.QueryPagination({ from: 0, size: 1 }));
        if (blocks.length === 0) {
            return -1;
        }
        return blocks[0].epoch;
    }
    async getLatestBlock(ttl) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.BlocksLatest(ttl).key, async () => await this.getLatestBlockRaw(), cache_info_1.CacheInfo.BlocksLatest(ttl).ttl, Math.round(cache_info_1.CacheInfo.BlocksLatest(ttl).ttl / 10));
    }
    async getLatestBlockRaw() {
        const blocks = await this.getBlocks(new block_filter_1.BlockFilter(), new query_pagination_1.QueryPagination({ from: 0, size: 1 }));
        if (blocks.length === 0) {
            return undefined;
        }
        return blocks[0];
    }
};
BlockService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => node_service_1.NodeService))),
    tslib_1.__param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => identities_service_1.IdentitiesService))),
    tslib_1.__metadata("design:paramtypes", [indexer_service_1.IndexerService,
        sdk_nestjs_cache_1.CacheService,
        bls_service_1.BlsService,
        node_service_1.NodeService,
        identities_service_1.IdentitiesService,
        api_config_service_1.ApiConfigService])
], BlockService);
exports.BlockService = BlockService;
//# sourceMappingURL=block.service.js.map