"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class Tag {
    constructor(init) {
        this.tag = '';
        this.count = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, example: 'sunny' }),
    tslib_1.__metadata("design:type", String)
], Tag.prototype, "tag", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, example: 46135 }),
    tslib_1.__metadata("design:type", Object)
], Tag.prototype, "count", void 0);
exports.Tag = Tag;
//# sourceMappingURL=tag.js.map