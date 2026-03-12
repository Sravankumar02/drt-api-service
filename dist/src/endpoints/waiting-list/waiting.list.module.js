"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitingListModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const vm_query_module_1 = require("../vm.query/vm.query.module");
const waiting_list_service_1 = require("./waiting.list.service");
let WaitingListModule = class WaitingListModule {
};
WaitingListModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            vm_query_module_1.VmQueryModule,
        ],
        providers: [
            waiting_list_service_1.WaitingListService,
        ],
        exports: [
            waiting_list_service_1.WaitingListService,
        ],
    })
], WaitingListModule);
exports.WaitingListModule = WaitingListModule;
//# sourceMappingURL=waiting.list.module.js.map