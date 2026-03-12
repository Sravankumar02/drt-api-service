"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
const github_service_1 = require("./github.service");
let GithubModule = class GithubModule {
};
GithubModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            dynamic_module_utils_1.DynamicModuleUtils.getApiModule(),
        ],
        providers: [
            github_service_1.GithubService,
        ],
        exports: [
            github_service_1.GithubService,
        ],
    })
], GithubModule);
exports.GithubModule = GithubModule;
//# sourceMappingURL=github.module.js.map