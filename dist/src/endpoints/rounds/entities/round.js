"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class Round {
    constructor(init) {
        this.blockWasProposed = false;
        this.round = 0;
        this.shard = 0;
        this.epoch = 0;
        this.timestamp = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Round.prototype, "blockWasProposed", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 9171722 }),
    tslib_1.__metadata("design:type", Number)
], Round.prototype, "round", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1 }),
    tslib_1.__metadata("design:type", Number)
], Round.prototype, "shard", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 636 }),
    tslib_1.__metadata("design:type", Number)
], Round.prototype, "epoch", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1651148112 }),
    tslib_1.__metadata("design:type", Number)
], Round.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1651148112000, required: false }),
    tslib_1.__metadata("design:type", Number)
], Round.prototype, "timestampMs", void 0);
exports.Round = Round;
//# sourceMappingURL=round.js.map