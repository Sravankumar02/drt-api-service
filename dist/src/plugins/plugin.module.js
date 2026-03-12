"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const plugin_service_1 = require("../common/plugins/plugin.service");
let PluginModule = class PluginModule {
};
PluginModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [plugin_service_1.PluginService],
        exports: [plugin_service_1.PluginService],
    })
], PluginModule);
exports.PluginModule = PluginModule;
//# sourceMappingURL=plugin.module.js.map