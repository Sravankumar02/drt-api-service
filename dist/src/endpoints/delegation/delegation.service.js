"use strict";
var DelegationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegationService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const vm_query_service_1 = require("../vm.query/vm.query.service");
const node_service_1 = require("../nodes/node.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const cache_info_1 = require("../../utils/cache.info");
const account_delegation_1 = require("../stake/entities/account.delegation");
let DelegationService = DelegationService_1 = class DelegationService {
    constructor(vmQueryService, apiConfigService, cachingService, nodeService, apiService) {
        this.vmQueryService = vmQueryService;
        this.apiConfigService = apiConfigService;
        this.cachingService = cachingService;
        this.nodeService = nodeService;
        this.apiService = apiService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(DelegationService_1.name);
    }
    async getDelegation() {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.Delegation.key, async () => await this.getDelegationRaw(), cache_info_1.CacheInfo.Delegation.ttl);
    }
    async getDelegationRaw() {
        let minDelegation = "0";
        const delegationManagerAddress = this.apiConfigService.getDelegationManagerContractAddress();
        if (delegationManagerAddress) {
            const configsBase64 = await this.vmQueryService.vmQuery(delegationManagerAddress, 'getContractConfig');
            const minDelegationHex = Buffer.from(configsBase64.pop(), 'base64').toString('hex');
            minDelegation = BigInt(minDelegationHex ? '0x' + minDelegationHex : '0').toString();
        }
        const nodes = await this.nodeService.getAllNodes();
        let providerAddresses = nodes.map(node => node.provider ? node.provider : node.owner);
        providerAddresses = providerAddresses.distinct();
        const { stake, topUp } = nodes.reduce((accumulator, { stake, topUp }) => {
            accumulator.stake += stake ? BigInt(stake) : BigInt(0);
            accumulator.topUp += topUp ? BigInt(topUp) : BigInt(0);
            return accumulator;
        }, {
            stake: BigInt(0),
            topUp: BigInt(0),
        });
        return {
            stake: stake.toString(),
            topUp: topUp.toString(),
            locked: (stake + topUp).toString(),
            minDelegation,
        };
    }
    async getDelegationForAddress(address) {
        try {
            const { data } = await this.apiService.get(`${this.apiConfigService.getDelegationUrl()}/accounts/${address}/delegations`);
            return data.map((delegation) => {
                var _a;
                return new account_delegation_1.AccountDelegation(Object.assign(Object.assign({}, delegation), { userUndelegatedList: (_a = delegation.userUndelegatedList) !== null && _a !== void 0 ? _a : [] }));
            });
        }
        catch (error) {
            this.logger.error(`Error when getting account delegation details for address ${address}`);
            this.logger.error(error);
            throw error;
        }
    }
};
DelegationService = DelegationService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [vm_query_service_1.VmQueryService,
        api_config_service_1.ApiConfigService,
        sdk_nestjs_cache_1.CacheService,
        node_service_1.NodeService,
        sdk_nestjs_http_1.ApiService])
], DelegationService);
exports.DelegationService = DelegationService;
//# sourceMappingURL=delegation.service.js.map