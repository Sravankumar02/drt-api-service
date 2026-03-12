"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegationLegacyModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const vm_query_module_1 = require("../vm.query/vm.query.module");
const delegation_legacy_service_1 = require("./delegation.legacy.service");
let DelegationLegacyModule = class DelegationLegacyModule {
};
DelegationLegacyModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            vm_query_module_1.VmQueryModule,
        ],
        providers: [
            delegation_legacy_service_1.DelegationLegacyService,
        ],
        exports: [
            delegation_legacy_service_1.DelegationLegacyService,
        ],
    })
], DelegationLegacyModule);
exports.DelegationLegacyModule = DelegationLegacyModule;
//# sourceMappingURL=delegation.legacy.module.js.map