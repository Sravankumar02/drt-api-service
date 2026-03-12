"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VmQueryModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const api_config_module_1 = require("../../common/api-config/api.config.module");
const gateway_module_1 = require("../../common/gateway/gateway.module");
const protocol_module_1 = require("../../common/protocol/protocol.module");
const settings_module_1 = require("../../common/settings/settings.module");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
const vm_query_service_1 = require("./vm.query.service");
let VmQueryModule = class VmQueryModule {
};
VmQueryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            dynamic_module_utils_1.DynamicModuleUtils.getCacheModule(),
            gateway_module_1.GatewayModule,
            protocol_module_1.ProtocolModule,
            api_config_module_1.ApiConfigModule,
            settings_module_1.SettingsModule,
            event_emitter_1.EventEmitterModule.forRoot({ maxListeners: 1 }),
        ],
        providers: [
            vm_query_service_1.VmQueryService,
        ],
        exports: [
            vm_query_service_1.VmQueryService,
        ],
    })
], VmQueryModule);
exports.VmQueryModule = VmQueryModule;
//# sourceMappingURL=vm.query.module.js.map