"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaTokenChart = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class MoaTokenChart {
    constructor(init) {
        this.timestamp = 0;
        this.value = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], MoaTokenChart.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], MoaTokenChart.prototype, "value", void 0);
exports.MoaTokenChart = MoaTokenChart;
//# sourceMappingURL=moa.token.chart.js.map