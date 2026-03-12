"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiMetricsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_metrics_service_1 = require("./api.metrics.service");
let ApiMetricsController = class ApiMetricsController {
    constructor(metricsService) {
        this.metricsService = metricsService;
    }
    async getMetrics() {
        return await this.metricsService.getMetrics();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/metrics"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ApiMetricsController.prototype, "getMetrics", null);
ApiMetricsController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [api_metrics_service_1.ApiMetricsService])
], ApiMetricsController);
exports.ApiMetricsController = ApiMetricsController;
//# sourceMappingURL=api.metrics.controller.js.map