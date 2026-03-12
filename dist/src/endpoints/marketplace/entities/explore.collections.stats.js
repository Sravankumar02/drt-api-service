"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExploreCollectionsStats = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class ExploreCollectionsStats {
    constructor(init) {
        this.activeLast30DaysCount = 0;
        this.verifiedCount = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], ExploreCollectionsStats.prototype, "activeLast30DaysCount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], ExploreCollectionsStats.prototype, "verifiedCount", void 0);
exports.ExploreCollectionsStats = ExploreCollectionsStats;
//# sourceMappingURL=explore.collections.stats.js.map