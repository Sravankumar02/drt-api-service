"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const keybase_module_1 = require("../../common/keybase/keybase.module");
const identities_module_1 = require("../identities/identities.module");
const node_module_1 = require("../nodes/node.module");
const vm_query_module_1 = require("../vm.query/vm.query.module");
const provider_service_1 = require("./provider.service");
let ProviderModule = class ProviderModule {
};
ProviderModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => keybase_module_1.KeybaseModule),
            (0, common_1.forwardRef)(() => node_module_1.NodeModule),
            vm_query_module_1.VmQueryModule,
            (0, common_1.forwardRef)(() => identities_module_1.IdentitiesModule),
        ],
        providers: [
            provider_service_1.ProviderService,
        ],
        exports: [
            provider_service_1.ProviderService,
        ],
    })
], ProviderModule);
exports.ProviderModule = ProviderModule;
//# sourceMappingURL=provider.module.js.map