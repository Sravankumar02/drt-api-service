"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const network_module_1 = require("../network/network.module");
const node_module_1 = require("../nodes/node.module");
const vm_query_module_1 = require("../vm.query/vm.query.module");
const stake_service_1 = require("./stake.service");
const identities_module_1 = require("../identities/identities.module");
const block_module_1 = require("../blocks/block.module");
let StakeModule = class StakeModule {
};
StakeModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            vm_query_module_1.VmQueryModule,
            (0, common_1.forwardRef)(() => node_module_1.NodeModule),
            (0, common_1.forwardRef)(() => network_module_1.NetworkModule),
            (0, common_1.forwardRef)(() => identities_module_1.IdentitiesModule),
            (0, common_1.forwardRef)(() => block_module_1.BlockModule),
        ],
        providers: [
            stake_service_1.StakeService,
        ],
        exports: [
            stake_service_1.StakeService,
        ],
    })
], StakeModule);
exports.StakeModule = StakeModule;
//# sourceMappingURL=stake.module.js.map