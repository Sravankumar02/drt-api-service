"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockedAssetService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../api-config/api.config.service");
const vm_query_service_1 = require("../../endpoints/vm.query/vm.query.service");
const cache_info_1 = require("../../utils/cache.info");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const token_helpers_1 = require("../../utils/token.helpers");
const gateway_service_1 = require("../gateway/gateway.service");
const moa_settings_service_1 = require("../../endpoints/moa/moa.settings.service");
const unlock_milestone_model_1 = require("./entities/unlock.milestone.model");
const sdk_exchange_1 = require("@terradharitri/sdk-exchange");
let LockedAssetService = class LockedAssetService {
    constructor(apiConfigService, vmQueryService, cachingService, gatewayService, moaSettingsService) {
        this.apiConfigService = apiConfigService;
        this.vmQueryService = vmQueryService;
        this.cachingService = cachingService;
        this.gatewayService = gatewayService;
        this.moaSettingsService = moaSettingsService;
    }
    async getLkmoaUnlockSchedule(identifier, attributes) {
        const lockedTokenIds = await this.getLockedTokens();
        if (!lockedTokenIds) {
            return undefined;
        }
        if (!lockedTokenIds.lkmoa || !identifier.startsWith(lockedTokenIds.lkmoa)) {
            return undefined;
        }
        const extendedAttributesActivationNonce = await this.getExtendedAttributesActivationNonce();
        const withActivationNonce = token_helpers_1.TokenHelpers.tokenNonce(identifier) >= extendedAttributesActivationNonce;
        const lockedAssetAttributes = sdk_exchange_1.LockedAssetAttributes.fromAttributes(withActivationNonce, attributes);
        if (!lockedAssetAttributes.unlockSchedule) {
            return undefined;
        }
        return await this.getUnlockMilestones(lockedAssetAttributes.unlockSchedule, withActivationNonce);
    }
    async getXmoaUnlockEpoch(identifier, attributes) {
        const lockedTokenIds = await this.getLockedTokens();
        if (!lockedTokenIds) {
            return undefined;
        }
        if (!lockedTokenIds.xmoa || !identifier.startsWith(lockedTokenIds.xmoa)) {
            return undefined;
        }
        const decodedAttributes = sdk_exchange_1.LockedTokenAttributes.fromAttributes(attributes);
        return decodedAttributes.unlockEpoch;
    }
    async getExtendedAttributesActivationNonce() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.ExtendedAttributesActivationNonce.key, async () => await this.getExtendedAttributesActivationNonceRaw(), cache_info_1.CacheInfo.ExtendedAttributesActivationNonce.ttl);
    }
    async getExtendedAttributesActivationNonceRaw() {
        const settings = await this.moaSettingsService.getSettings();
        if (!settings) {
            return 0;
        }
        const [encoded] = await this.vmQueryService.vmQuery(settings.lockedAssetContract, 'getExtendedAttributesActivationNonce', undefined, []);
        if (!encoded) {
            return 0;
        }
        const nonce = Buffer.from(encoded, 'base64').toString('hex');
        return parseInt(nonce, 16);
    }
    async getInitEpoch() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.InitEpoch.key, async () => await this.getInitEpochRaw(), sdk_nestjs_common_1.Constants.oneWeek(), cache_info_1.CacheInfo.InitEpoch.ttl);
    }
    async getInitEpochRaw() {
        const settings = await this.moaSettingsService.getSettings();
        if (!settings) {
            return 0;
        }
        const [encoded] = await this.vmQueryService.vmQuery(settings.lockedAssetContract, 'getInitEpoch', undefined, []);
        if (!encoded) {
            return 0;
        }
        const epoch = Buffer.from(encoded, 'base64').toString('hex');
        return parseInt(epoch, 16);
    }
    async getLockedTokens() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.LockedTokenIDs.key, async () => await this.getLockedTokensRaw(), cache_info_1.CacheInfo.LockedTokenIDs.ttl);
    }
    async getLockedTokensRaw() {
        const settings = await this.moaSettingsService.getSettings();
        if (!settings) {
            return {
                lkmoa: '',
                xmoa: '',
            };
        }
        return {
            lkmoa: settings.lockedAssetIdentifier,
            xmoa: settings.lockedAssetIdentifierV2,
        };
    }
    async getUnlockMilestones(unlockSchedule, withActivationNonce) {
        const unlockMilestones = [];
        const aggregatedMilestones = {};
        const PRECISION_EX_INCREASE = 1000;
        for (const unlockMilestone of unlockSchedule) {
            const epoch = unlockMilestone.epoch.toNumber();
            const percent = withActivationNonce ? unlockMilestone.percent.div(PRECISION_EX_INCREASE) : unlockMilestone.percent;
            let remainingEpochs = await this.getRemainingEpochs(epoch);
            remainingEpochs = remainingEpochs > 0 ? remainingEpochs : 0;
            if (!aggregatedMilestones[remainingEpochs]) {
                aggregatedMilestones[remainingEpochs] = 0;
            }
            aggregatedMilestones[remainingEpochs] += percent.toNumber();
        }
        for (const epoch of Object.keys(aggregatedMilestones)) {
            const milestone = new unlock_milestone_model_1.UnlockMileStoneModel({
                remainingEpochs: Number(epoch),
                percent: aggregatedMilestones[Number(epoch)],
            });
            unlockMilestones.push(milestone);
        }
        return unlockMilestones;
    }
    async getRemainingEpochs(unlockEpoch) {
        const [currentEpoch, unlockStartEpoch] = await Promise.all([
            this.getCurrentEpochCached(),
            this.getMonthStartEpoch(unlockEpoch),
        ]);
        if (unlockEpoch <= unlockStartEpoch && unlockEpoch <= currentEpoch) {
            return 0;
        }
        else {
            return unlockStartEpoch + 30 - currentEpoch;
        }
    }
    async getMonthStartEpoch(unlockEpoch) {
        const initEpoch = await this.getInitEpoch();
        return unlockEpoch - ((unlockEpoch - initEpoch) % 30);
    }
    async getCurrentEpochCached() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.CurrentEpoch.key, async () => await this.getCurrentEpoch(), sdk_nestjs_common_1.Constants.oneMinute(), cache_info_1.CacheInfo.CurrentEpoch.ttl);
    }
    async getCurrentEpoch() {
        const metaChainShard = this.apiConfigService.getMetaChainShardId();
        const res = await this.gatewayService.getNetworkStatus(metaChainShard);
        return res.drt_epoch_number;
    }
};
LockedAssetService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        vm_query_service_1.VmQueryService,
        sdk_nestjs_cache_1.CacheService,
        gateway_service_1.GatewayService,
        moa_settings_service_1.MoaSettingsService])
], LockedAssetService);
exports.LockedAssetService = LockedAssetService;
//# sourceMappingURL=locked-asset.service.js.map