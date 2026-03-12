"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const round_1 = require("./entities/round");
const round_detailed_1 = require("./entities/round.detailed");
const bls_service_1 = require("../bls/bls.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const block_service_1 = require("../blocks/block.service");
let RoundService = class RoundService {
    constructor(indexerService, blsService, apiConfigService, blockService) {
        this.indexerService = indexerService;
        this.blsService = blsService;
        this.apiConfigService = apiConfigService;
        this.blockService = blockService;
    }
    async getRoundCount(filter) {
        return await this.indexerService.getRoundCount(filter);
    }
    async getRounds(filter) {
        const epoch = filter.epoch ? filter.epoch : await this.blockService.getCurrentEpoch();
        const isAndromedaEnabled = this.apiConfigService.isChainAndromedaEnabled()
            && epoch >= this.apiConfigService.getChainAndromedaActivationEpoch();
        if (isAndromedaEnabled) {
            filter.validator = undefined;
        }
        const result = await this.indexerService.getRounds(filter);
        for (const item of result) {
            item.shard = item.shardId;
        }
        return result.map((item) => sdk_nestjs_http_1.ApiUtils.mergeObjects(new round_1.Round(), item));
    }
    async getRound(shard, round) {
        const result = await this.indexerService.getRound(shard, round);
        const epoch = sdk_nestjs_common_1.RoundUtils.roundToEpoch(round);
        const publicKeys = await this.blsService.getPublicKeys(shard, epoch);
        const isChainAndromedaEnabled = this.apiConfigService.isChainAndromedaEnabled()
            && epoch >= this.apiConfigService.getChainAndromedaActivationEpoch();
        result.shard = result.shardId;
        if (!isChainAndromedaEnabled) {
            result.signers = result.signersIndexes.map((index) => publicKeys[index]);
        }
        else {
            result.signers = publicKeys;
        }
        return sdk_nestjs_http_1.ApiUtils.mergeObjects(new round_detailed_1.RoundDetailed(), result);
    }
};
RoundService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [indexer_service_1.IndexerService,
        bls_service_1.BlsService,
        api_config_service_1.ApiConfigService,
        block_service_1.BlockService])
], RoundService);
exports.RoundService = RoundService;
//# sourceMappingURL=round.service.js.map