"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiMetricsModule = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_monitoring_1 = require("@sravankumar02/sdk-nestjs-monitoring");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const api_metrics_service_1 = require("./api.metrics.service");
let ApiMetricsModule = class ApiMetricsModule {
};
ApiMetricsModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            sdk_nestjs_monitoring_1.MetricsModule,
            event_emitter_1.EventEmitterModule.forRoot({ maxListeners: 1 }),
        ],
        providers: [
            api_metrics_service_1.ApiMetricsService,
        ],
        exports: [
            api_metrics_service_1.ApiMetricsService,
        ],
    })
], ApiMetricsModule);
exports.ApiMetricsModule = ApiMetricsModule;
//# sourceMappingURL=api.metrics.module.js.map