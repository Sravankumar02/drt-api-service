"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PpuMetadata = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class PpuMetadata {
    constructor(init) {
        this.lastBlock = 0;
        this.fast = 0;
        this.faster = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last processed block number',
        example: 47428477,
    }),
    tslib_1.__metadata("design:type", Number)
], PpuMetadata.prototype, "lastBlock", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Price per unit for standard (medium priority) transactions',
        example: 20000000,
    }),
    tslib_1.__metadata("design:type", Number)
], PpuMetadata.prototype, "fast", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Price per unit for fast (high priority) transactions',
        example: 40000000,
    }),
    tslib_1.__metadata("design:type", Number)
], PpuMetadata.prototype, "faster", void 0);
exports.PpuMetadata = PpuMetadata;
//# sourceMappingURL=ppu.metadata.js.map