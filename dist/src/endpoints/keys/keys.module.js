"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const vm_query_module_1 = require("../vm.query/vm.query.module");
const keys_service_1 = require("./keys.service");
let KeysModule = class KeysModule {
};
KeysModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            vm_query_module_1.VmQueryModule,
        ],
        providers: [
            keys_service_1.KeysService,
        ],
        exports: [
            keys_service_1.KeysService,
        ],
    })
], KeysModule);
exports.KeysModule = KeysModule;
//# sourceMappingURL=keys.module.js.map