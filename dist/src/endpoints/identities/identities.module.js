"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentitiesModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const keybase_module_1 = require("../../common/keybase/keybase.module");
const network_module_1 = require("../network/network.module");
const node_module_1 = require("../nodes/node.module");
const identities_service_1 = require("./identities.service");
const block_module_1 = require("../blocks/block.module");
let IdentitiesModule = class IdentitiesModule {
};
IdentitiesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => node_module_1.NodeModule),
            (0, common_1.forwardRef)(() => network_module_1.NetworkModule),
            (0, common_1.forwardRef)(() => keybase_module_1.KeybaseModule),
            (0, common_1.forwardRef)(() => block_module_1.BlockModule),
        ],
        providers: [
            identities_service_1.IdentitiesService,
        ],
        exports: [
            identities_service_1.IdentitiesService,
        ],
    })
], IdentitiesModule);
exports.IdentitiesModule = IdentitiesModule;
//# sourceMappingURL=identities.module.js.map