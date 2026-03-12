"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeybaseModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const node_module_1 = require("../../endpoints/nodes/node.module");
const provider_module_1 = require("../../endpoints/providers/provider.module");
const api_config_module_1 = require("../api-config/api.config.module");
const github_module_1 = require("../github/github.module");
const persistence_module_1 = require("../persistence/persistence.module");
const keybase_service_1 = require("./keybase.service");
const assets_module_1 = require("../assets/assets.module");
let KeybaseModule = class KeybaseModule {
};
KeybaseModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => node_module_1.NodeModule),
            (0, common_1.forwardRef)(() => provider_module_1.ProviderModule),
            (0, common_1.forwardRef)(() => github_module_1.GithubModule),
            api_config_module_1.ApiConfigModule,
            persistence_module_1.PersistenceModule.forRoot(),
            assets_module_1.AssetsModule,
        ],
        providers: [
            keybase_service_1.KeybaseService,
        ],
        exports: [
            keybase_service_1.KeybaseService,
        ],
    })
], KeybaseModule);
exports.KeybaseModule = KeybaseModule;
//# sourceMappingURL=keybase.module.js.map