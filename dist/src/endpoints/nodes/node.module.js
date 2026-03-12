"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const keybase_module_1 = require("../../common/keybase/keybase.module");
const block_module_1 = require("../blocks/block.module");
const provider_module_1 = require("../providers/provider.module");
const stake_module_1 = require("../stake/stake.module");
const vm_query_module_1 = require("../vm.query/vm.query.module");
const node_service_1 = require("./node.service");
const keys_module_1 = require("../keys/keys.module");
const identities_module_1 = require("../identities/identities.module");
let NodeModule = class NodeModule {
};
NodeModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => keybase_module_1.KeybaseModule),
            (0, common_1.forwardRef)(() => provider_module_1.ProviderModule),
            vm_query_module_1.VmQueryModule,
            (0, common_1.forwardRef)(() => block_module_1.BlockModule),
            (0, common_1.forwardRef)(() => stake_module_1.StakeModule),
            (0, common_1.forwardRef)(() => keys_module_1.KeysModule),
            (0, common_1.forwardRef)(() => identities_module_1.IdentitiesModule),
        ],
        providers: [
            node_service_1.NodeService,
        ],
        exports: [
            node_service_1.NodeService,
        ],
    })
], NodeModule);
exports.NodeModule = NodeModule;
//# sourceMappingURL=node.module.js.map