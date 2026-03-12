"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
const gateway_module_1 = require("../gateway/gateway.module");
const indexer_module_1 = require("../indexer/indexer.module");
const protocol_service_1 = require("./protocol.service");
let ProtocolModule = class ProtocolModule {
};
ProtocolModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => gateway_module_1.GatewayModule),
            dynamic_module_utils_1.DynamicModuleUtils.getCacheModule(),
            indexer_module_1.IndexerModule.register(),
        ],
        providers: [
            protocol_service_1.ProtocolService,
        ],
        exports: [
            protocol_service_1.ProtocolService,
        ],
    })
], ProtocolModule);
exports.ProtocolModule = ProtocolModule;
//# sourceMappingURL=protocol.module.js.map