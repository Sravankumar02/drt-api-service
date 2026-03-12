"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniBlockModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mini_block_service_1 = require("./mini.block.service");
let MiniBlockModule = class MiniBlockModule {
};
MiniBlockModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [
            mini_block_service_1.MiniBlockService,
        ],
        exports: [
            mini_block_service_1.MiniBlockService,
        ],
    })
], MiniBlockModule);
exports.MiniBlockModule = MiniBlockModule;
//# sourceMappingURL=miniblock.module.js.map