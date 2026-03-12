"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegationModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const node_module_1 = require("../nodes/node.module");
const vm_query_module_1 = require("../vm.query/vm.query.module");
const delegation_service_1 = require("./delegation.service");
let DelegationModule = class DelegationModule {
};
DelegationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            vm_query_module_1.VmQueryModule,
            node_module_1.NodeModule,
        ],
        providers: [
            delegation_service_1.DelegationService,
        ],
        exports: [
            delegation_service_1.DelegationService,
        ],
    })
], DelegationModule);
exports.DelegationModule = DelegationModule;
//# sourceMappingURL=delegation.module.js.map