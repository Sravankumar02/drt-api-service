"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_auth_1 = require("@sravankumar02/sdk-nestjs-auth");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let HealthCheckController = class HealthCheckController {
    getHello() {
        return 'hello';
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/hello"),
    (0, swagger_1.ApiOperation)({ summary: 'Health check', description: 'Returns \'hello\', used for performing health checks' }),
    (0, sdk_nestjs_auth_1.NoAuth)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", String)
], HealthCheckController.prototype, "getHello", null);
HealthCheckController = tslib_1.__decorate([
    (0, common_1.Controller)()
], HealthCheckController);
exports.HealthCheckController = HealthCheckController;
//# sourceMappingURL=health.check.controller.js.map