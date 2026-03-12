"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootTestModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const api_config_service_1 = require("../common/api-config/api.config.service");
const graphql_service_1 = require("../common/graphql/graphql.service");
let RootTestModule = class RootTestModule {
};
RootTestModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [graphql_service_1.GraphQlService, api_config_service_1.ApiConfigService, config_1.ConfigService],
        exports: [graphql_service_1.GraphQlService],
    })
], RootTestModule);
exports.RootTestModule = RootTestModule;
//# sourceMappingURL=root-test.module.js.map