"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyUnbondPeriod = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class KeyUnbondPeriod {
    constructor(init) {
        this.remainingUnBondPeriod = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 10 }),
    tslib_1.__metadata("design:type", Number)
], KeyUnbondPeriod.prototype, "remainingUnBondPeriod", void 0);
exports.KeyUnbondPeriod = KeyUnbondPeriod;
//# sourceMappingURL=key.unbond.period.js.map