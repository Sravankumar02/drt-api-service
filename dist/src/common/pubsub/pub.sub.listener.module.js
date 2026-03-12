"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubListenerModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
const pub_sub_listener_controller_1 = require("./pub.sub.listener.controller");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
let PubSubListenerModule = class PubSubListenerModule {
};
PubSubListenerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            dynamic_module_utils_1.DynamicModuleUtils.getCacheModule(),
            sdk_nestjs_common_1.LoggingModule,
        ],
        controllers: [
            pub_sub_listener_controller_1.PubSubListenerController,
        ],
        providers: [
            dynamic_module_utils_1.DynamicModuleUtils.getPubSubService(),
        ],
        exports: ['PUBSUB_SERVICE'],
    })
], PubSubListenerModule);
exports.PubSubListenerModule = PubSubListenerModule;
//# sourceMappingURL=pub.sub.listener.module.js.map