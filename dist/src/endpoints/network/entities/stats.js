"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stats = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class Stats {
    constructor(init) {
        this.accounts = 0;
        this.blocks = 0;
        this.epoch = 0;
        this.refreshRate = 0;
        this.roundsPassed = 0;
        this.roundsPerEpoch = 0;
        this.shards = 0;
        this.transactions = 0;
        this.scResults = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Stats.prototype, "accounts", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Stats.prototype, "blocks", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Stats.prototype, "epoch", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Stats.prototype, "refreshRate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Stats.prototype, "roundsPassed", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Stats.prototype, "roundsPerEpoch", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Stats.prototype, "shards", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Stats.prototype, "transactions", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Stats.prototype, "scResults", void 0);
exports.Stats = Stats;
//# sourceMappingURL=stats.js.map