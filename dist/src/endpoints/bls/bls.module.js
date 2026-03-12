"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const indexer_module_1 = require("../../common/indexer/indexer.module");
const bls_service_1 = require("./bls.service");
let BlsModule = class BlsModule {
};
BlsModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => indexer_module_1.IndexerModule.register()),
        ],
        providers: [
            bls_service_1.BlsService,
        ],
        exports: [
            bls_service_1.BlsService,
        ],
    })
], BlsModule);
exports.BlsModule = BlsModule;
//# sourceMappingURL=bls.module.js.map