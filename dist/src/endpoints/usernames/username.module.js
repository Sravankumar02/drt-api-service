"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const vm_query_module_1 = require("../vm.query/vm.query.module");
const username_service_1 = require("./username.service");
let UsernameModule = class UsernameModule {
};
UsernameModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            vm_query_module_1.VmQueryModule,
        ],
        providers: [
            username_service_1.UsernameService,
        ],
        exports: [
            username_service_1.UsernameService,
        ],
    })
], UsernameModule);
exports.UsernameModule = UsernameModule;
//# sourceMappingURL=username.module.js.map