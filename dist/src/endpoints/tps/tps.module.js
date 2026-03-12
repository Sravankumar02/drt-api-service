"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TpsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const tps_service_1 = require("./tps.service");
let TpsModule = class TpsModule {
};
TpsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            tps_service_1.TpsService,
        ],
        exports: [
            tps_service_1.TpsService,
        ],
    })
], TpsModule);
exports.TpsModule = TpsModule;
//# sourceMappingURL=tps.module.js.map