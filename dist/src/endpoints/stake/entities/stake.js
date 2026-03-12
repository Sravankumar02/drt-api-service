"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stake = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class Stake {
    constructor(init) {
        this.bls = '';
        this.stake = '0';
        this.topUp = '0';
        this.locked = '0';
        this.address = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Stake.prototype, "bls", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Stake.prototype, "stake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Stake.prototype, "topUp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Stake.prototype, "locked", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Stake.prototype, "address", void 0);
exports.Stake = Stake;
//# sourceMappingURL=stake.js.map