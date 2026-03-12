"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const bls_module_1 = require("../bls/bls.module");
const round_service_1 = require("./round.service");
const block_module_1 = require("../blocks/block.module");
let RoundModule = class RoundModule {
};
RoundModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            bls_module_1.BlsModule,
            block_module_1.BlockModule,
        ],
        providers: [
            round_service_1.RoundService,
        ],
        exports: [
            round_service_1.RoundService,
        ],
    })
], RoundModule);
exports.RoundModule = RoundModule;
//# sourceMappingURL=round.module.js.map