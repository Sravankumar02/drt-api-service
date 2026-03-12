"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegationLegacyService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const vm_query_service_1 = require("../vm.query/vm.query.service");
const delegation_legacy_1 = require("./entities/delegation.legacy");
const account_delegation_legacy_1 = require("./entities/account.delegation.legacy");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const cache_info_1 = require("../../utils/cache.info");
let DelegationLegacyService = class DelegationLegacyService {
    constructor(vmQueryService, apiConfigService, cachingService) {
        this.vmQueryService = vmQueryService;
        this.apiConfigService = apiConfigService;
        this.cachingService = cachingService;
    }
    async getDelegation() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.DelegationLegacy.key, async () => await this.getDelegationRaw(), cache_info_1.CacheInfo.DelegationLegacy.ttl);
    }
    async getDelegationRaw() {
        const delegationContractAddress = this.apiConfigService.getDelegationContractAddress();
        if (!delegationContractAddress) {
            return new delegation_legacy_1.DelegationLegacy();
        }
        const [totalStakeByTypeEncoded, numUsersEncoded] = await Promise.all([
            this.vmQueryService.vmQuery(delegationContractAddress, 'getTotalStakeByType'),
            this.vmQueryService.vmQuery(delegationContractAddress, 'getNumUsers'),
        ]);
        const [totalWithdrawOnlyStake, totalWaitingStake, totalActiveStake, totalUnstakedStake, totalDeferredPaymentStake,] = totalStakeByTypeEncoded.map((encoded) => this.numberDecode(encoded));
        const numUsers = Number(this.numberDecode(numUsersEncoded[0]));
        return {
            totalWithdrawOnlyStake,
            totalWaitingStake,
            totalActiveStake,
            totalUnstakedStake,
            totalDeferredPaymentStake,
            numUsers,
        };
    }
    async getDelegationForAddress(address) {
        const delegationContractAddress = this.apiConfigService.getDelegationContractAddress();
        if (!delegationContractAddress) {
            return new account_delegation_legacy_1.AccountDelegationLegacy();
        }
        const publicKey = sdk_nestjs_common_1.AddressUtils.bech32Decode(address);
        const [userStakeByTypeEncoded, claimableRewardsEncoded] = await Promise.all([
            this.vmQueryService.vmQuery(delegationContractAddress, 'getUserStakeByType', undefined, [publicKey]),
            this.vmQueryService.vmQuery(delegationContractAddress, 'getClaimableRewards', undefined, [publicKey]),
        ]);
        const [userWithdrawOnlyStake, userWaitingStake, userActiveStake, userUnstakedStake, userDeferredPaymentStake,] = userStakeByTypeEncoded ? userStakeByTypeEncoded.map((encoded) => this.numberDecode(encoded)) :
            ['0', '0', '0', '0', '0'];
        const claimableRewards = claimableRewardsEncoded ? this.numberDecode(claimableRewardsEncoded[0]) : '0';
        return {
            userWithdrawOnlyStake,
            userWaitingStake,
            userActiveStake,
            userUnstakedStake,
            userDeferredPaymentStake,
            claimableRewards,
        };
    }
    numberDecode(encoded) {
        const hex = Buffer.from(encoded, 'base64').toString('hex');
        return BigInt(hex ? '0x' + hex : hex).toString();
    }
};
DelegationLegacyService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [vm_query_service_1.VmQueryService,
        api_config_service_1.ApiConfigService,
        sdk_nestjs_cache_1.CacheService])
], DelegationLegacyService);
exports.DelegationLegacyService = DelegationLegacyService;
//# sourceMappingURL=delegation.legacy.service.js.map