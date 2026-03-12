"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tps = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class Tps {
    constructor(init) {
        this.tps = 0;
        this.timestamp = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The number of transactions per second', type: Number, example: 10000 }),
    tslib_1.__metadata("design:type", Number)
], Tps.prototype, "tps", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The timestamp when the TPS was recorder', type: Number, example: 1704070861 }),
    tslib_1.__metadata("design:type", Number)
], Tps.prototype, "timestamp", void 0);
exports.Tps = Tps;
//# sourceMappingURL=tps.js.map