"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnlockMileStoneModel = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class UnlockMileStoneModel {
    constructor(init) {
        this.remainingEpochs = 0;
        this.percent = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Remaining epochs until unlock can be performed', example: 42 }),
    tslib_1.__metadata("design:type", Number)
], UnlockMileStoneModel.prototype, "remainingEpochs", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Percent of token unlockable after the epochs pass', example: 42 }),
    tslib_1.__metadata("design:type", Number)
], UnlockMileStoneModel.prototype, "percent", void 0);
exports.UnlockMileStoneModel = UnlockMileStoneModel;
//# sourceMappingURL=unlock.milestone.model.js.map