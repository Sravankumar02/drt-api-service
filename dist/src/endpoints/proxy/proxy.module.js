"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const plugin_module_1 = require("../../plugins/plugin.module");
const vm_query_module_1 = require("../vm.query/vm.query.module");
const gateway_proxy_controller_1 = require("./gateway.proxy.controller");
const index_proxy_controller_1 = require("./index.proxy.controller");
let ProxyModule = class ProxyModule {
};
ProxyModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            vm_query_module_1.VmQueryModule,
            plugin_module_1.PluginModule,
        ],
        controllers: [
            gateway_proxy_controller_1.GatewayProxyController,
            index_proxy_controller_1.IndexProxyController,
        ],
    })
], ProxyModule);
exports.ProxyModule = ProxyModule;
//# sourceMappingURL=proxy.module.js.map