"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitingListService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const cache_info_1 = require("../../utils/cache.info");
const vm_query_service_1 = require("../vm.query/vm.query.service");
let WaitingListService = class WaitingListService {
    constructor(vmQueryService, apiConfigService, cachingService) {
        this.vmQueryService = vmQueryService;
        this.apiConfigService = apiConfigService;
        this.cachingService = cachingService;
    }
    async getWaitingList(queryPagination) {
        const { from, size } = queryPagination;
        let waitingList = await this.getFullWaitingList();
        waitingList = waitingList.slice(from, from + size);
        return waitingList;
    }
    async getWaitingListForAddress(address) {
        const fullWaitingList = await this.getFullWaitingList();
        return fullWaitingList.filter(x => x.address === address);
    }
    async getWaitingListCount() {
        const fullWaitingList = await this.getFullWaitingList();
        return fullWaitingList.length;
    }
    async getFullWaitingList() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.FullWaitingList.key, async () => await this.getFullWaitingListRaw(), cache_info_1.CacheInfo.FullWaitingList.ttl);
    }
    async getFullWaitingListRaw() {
        const delegationContractAddress = this.apiConfigService.getDelegationContractAddress();
        if (!delegationContractAddress) {
            return [];
        }
        const fullWaitingListEncoded = await this.vmQueryService.vmQuery(delegationContractAddress, 'getFullWaitingList');
        const fullWaitingList = fullWaitingListEncoded.reduce((result, _, index, array) => {
            if (index % 3 === 0) {
                const [publicKeyEncoded, valueEncoded, nonceEncoded] = array.slice(index, index + 3);
                const publicKey = Buffer.from(publicKeyEncoded, 'base64').toString('hex');
                const address = sdk_nestjs_common_1.AddressUtils.bech32Encode(publicKey);
                const value = sdk_nestjs_common_1.NumberUtils.numberDecode(valueEncoded);
                const nonce = parseInt(sdk_nestjs_common_1.NumberUtils.numberDecode(nonceEncoded));
                const waitingList = { address, value, nonce, rank: 0 };
                result.push(waitingList);
            }
            return result;
        }, []);
        for (const [index, waitingListItem] of fullWaitingList.entries()) {
            waitingListItem.rank = index + 1;
        }
        return fullWaitingList;
    }
};
WaitingListService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [vm_query_service_1.VmQueryService,
        api_config_service_1.ApiConfigService,
        sdk_nestjs_cache_1.CacheService])
], WaitingListService);
exports.WaitingListService = WaitingListService;
//# sourceMappingURL=waiting.list.service.js.map