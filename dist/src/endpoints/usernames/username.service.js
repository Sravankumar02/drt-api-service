"use strict";
var UsernameService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const cache_info_1 = require("../../utils/cache.info");
const vm_query_service_1 = require("../vm.query/vm.query.service");
const username_utils_1 = require("./username.utils");
let UsernameService = UsernameService_1 = class UsernameService {
    constructor(cachingService, apiService, apiConfigService, vmQueryService) {
        this.cachingService = cachingService;
        this.apiService = apiService;
        this.apiConfigService = apiConfigService;
        this.vmQueryService = vmQueryService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(UsernameService_1.name);
    }
    async getUsernameForAddressRaw(address) {
        var _a;
        try {
            const result = await this.apiService.get(`${this.apiConfigService.getMaiarIdUrl()}/users/api/v1/users/${address}`, undefined, async (error) => { var _a; return ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) === common_1.HttpStatus.FORBIDDEN; });
            const username = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.herotag;
            return username !== null && username !== void 0 ? username : null;
        }
        catch (error) {
            this.logger.error(error);
            this.logger.error(`Error when getting username for address '${address}'`);
            return null;
        }
    }
    async getUsernameForAddress(address) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.Username(address).key, async () => await this.getUsernameForAddressRaw(address), cache_info_1.CacheInfo.Username(address).ttl);
    }
    async getAddressForUsernameRaw(username) {
        try {
            const contract = username_utils_1.UsernameUtils.getContractAddress(username);
            const encoded = username_utils_1.UsernameUtils.encodeUsername(username);
            const [encodedAddress] = await this.vmQueryService.vmQuery(contract, 'resolve', undefined, [encoded]);
            if (encodedAddress) {
                const publicKey = sdk_nestjs_common_1.BinaryUtils.base64ToHex(encodedAddress);
                return sdk_nestjs_common_1.AddressUtils.bech32Encode(publicKey);
            }
        }
        catch (error) {
            return null;
        }
        return null;
    }
    async getAddressForUsername(username) {
        const address = await this.cachingService.getOrSet(username_utils_1.UsernameUtils.normalizeUsername(username), async () => await this.getAddressForUsernameRaw(username), sdk_nestjs_common_1.Constants.oneWeek());
        if (!address) {
            return null;
        }
        const crossCheckUsername = await this.getUsernameForAddressRaw(address);
        if (!crossCheckUsername) {
            return null;
        }
        return address;
    }
    getUsernameRedirectRoute(address, withGuardianInfo) {
        const params = {
            withGuardianInfo,
        };
        const paramArray = [];
        for (const [key, value] of Object.entries(params)) {
            if (value) {
                paramArray.push(`${key}=${value}`);
            }
        }
        let route = `/accounts/${address}`;
        if (paramArray.length > 0) {
            route += '?' + paramArray.join('&');
        }
        return route;
    }
};
UsernameService = UsernameService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        sdk_nestjs_http_1.ApiService,
        api_config_service_1.ApiConfigService,
        vm_query_service_1.VmQueryService])
], UsernameService);
exports.UsernameService = UsernameService;
//# sourceMappingURL=username.service.js.map