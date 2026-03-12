"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQlModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_service_1 = require("./graphql.service");
let GraphQlModule = class GraphQlModule {
};
GraphQlModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [
            graphql_service_1.GraphQlService,
        ],
        exports: [
            graphql_service_1.GraphQlService,
        ],
    })
], GraphQlModule);
exports.GraphQlModule = GraphQlModule;
//# sourceMappingURL=graphql.module.js.map