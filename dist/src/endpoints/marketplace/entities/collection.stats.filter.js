"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionStatsFilters = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class CollectionStatsFilters {
    constructor(init) {
        this.identifier = '';
        this.marketplaceKey = '';
        this.paymentToken = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], CollectionStatsFilters.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], CollectionStatsFilters.prototype, "marketplaceKey", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], CollectionStatsFilters.prototype, "paymentToken", void 0);
exports.CollectionStatsFilters = CollectionStatsFilters;
//# sourceMappingURL=collection.stats.filter.js.map