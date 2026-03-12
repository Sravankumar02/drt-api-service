"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockedAssetModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const locked_asset_service_1 = require("./locked-asset.service");
const vm_query_module_1 = require("../../endpoints/vm.query/vm.query.module");
const moa_module_1 = require("../../endpoints/moa/moa.module");
let LockedAssetModule = class LockedAssetModule {
};
LockedAssetModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            vm_query_module_1.VmQueryModule,
            moa_module_1.MoaModule.forRoot(),
        ],
        providers: [
            locked_asset_service_1.LockedAssetService,
        ],
        exports: [
            locked_asset_service_1.LockedAssetService,
        ],
    })
], LockedAssetModule);
exports.LockedAssetModule = LockedAssetModule;
//# sourceMappingURL=locked-asset.module.js.map