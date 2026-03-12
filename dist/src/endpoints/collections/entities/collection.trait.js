"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionTrait = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const collection_trait_attribute_1 = require("./collection.trait.attribute");
class CollectionTrait {
    constructor() {
        this.name = '';
        this.occurrenceCount = 0;
        this.occurrencePercentage = 0;
        this.attributes = [];
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], CollectionTrait.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], CollectionTrait.prototype, "occurrenceCount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], CollectionTrait.prototype, "occurrencePercentage", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: collection_trait_attribute_1.CollectionTraitAttribute, isArray: true }),
    tslib_1.__metadata("design:type", Array)
], CollectionTrait.prototype, "attributes", void 0);
exports.CollectionTrait = CollectionTrait;
//# sourceMappingURL=collection.trait.js.map