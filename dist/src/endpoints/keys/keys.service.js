"use strict";
var KeysService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const vm_query_service_1 = require("../vm.query/vm.query.service");
let KeysService = KeysService_1 = class KeysService {
    constructor(vmQueryService, apiConfigService) {
        this.vmQueryService = vmQueryService;
        this.apiConfigService = apiConfigService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(KeysService_1.name);
    }
    async getKeyUnbondPeriod(key) {
        const stakingContractAddress = this.apiConfigService.getStakingContractAddress();
        if (!stakingContractAddress) {
            return undefined;
        }
        try {
            const encoded = await this.vmQueryService.vmQuery(stakingContractAddress, 'getRemainingUnBondPeriod', undefined, [key]);
            if (!encoded || !encoded[0]) {
                return { remainingUnBondPeriod: 0 };
            }
            let remainingUnBondPeriod = parseInt(Buffer.from(encoded[0], 'base64').toString('ascii'));
            if (isNaN(remainingUnBondPeriod)) {
                remainingUnBondPeriod = encoded[0].length
                    ? parseInt(Buffer.from(encoded[0], 'base64').toString('hex'), 16)
                    : 0;
            }
            return { remainingUnBondPeriod };
        }
        catch (error) {
            this.logger.error(`Error when getting key unbond period for key '${key}'`);
            this.logger.error(error);
            return undefined;
        }
    }
};
KeysService = KeysService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [vm_query_service_1.VmQueryService,
        api_config_service_1.ApiConfigService])
], KeysService);
exports.KeysService = KeysService;
//# sourceMappingURL=keys.service.js.map