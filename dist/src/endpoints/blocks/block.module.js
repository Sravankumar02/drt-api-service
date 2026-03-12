"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const bls_module_1 = require("../bls/bls.module");
const identities_module_1 = require("../identities/identities.module");
const node_module_1 = require("../nodes/node.module");
const block_service_1 = require("./block.service");
let BlockModule = class BlockModule {
};
BlockModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            bls_module_1.BlsModule,
            (0, common_1.forwardRef)(() => node_module_1.NodeModule),
            (0, common_1.forwardRef)(() => identities_module_1.IdentitiesModule),
        ],
        providers: [
            block_service_1.BlockService,
        ],
        exports: [
            block_service_1.BlockService,
        ],
    })
], BlockModule);
exports.BlockModule = BlockModule;
//# sourceMappingURL=block.module.js.map