"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionTraitAttribute = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class CollectionTraitAttribute {
    constructor() {
        this.name = '';
        this.occurrenceCount = 0;
        this.occurrencePercentage = 0;
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], CollectionTraitAttribute.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], CollectionTraitAttribute.prototype, "occurrenceCount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], CollectionTraitAttribute.prototype, "occurrencePercentage", void 0);
exports.CollectionTraitAttribute = CollectionTraitAttribute;
//# sourceMappingURL=collection.trait.attribute.js.map