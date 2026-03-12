"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionRoles = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class CollectionRoles {
    constructor(init) {
        this.address = undefined;
        this.canCreate = false;
        this.canBurn = false;
        this.canAddQuantity = false;
        this.canUpdateAttributes = false;
        this.canAddUri = false;
        this.canTransfer = undefined;
        this.roles = [];
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], CollectionRoles.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], CollectionRoles.prototype, "canCreate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], CollectionRoles.prototype, "canBurn", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], CollectionRoles.prototype, "canAddQuantity", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], CollectionRoles.prototype, "canUpdateAttributes", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], CollectionRoles.prototype, "canAddUri", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Object)
], CollectionRoles.prototype, "canTransfer", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    tslib_1.__metadata("design:type", Array)
], CollectionRoles.prototype, "roles", void 0);
exports.CollectionRoles = CollectionRoles;
//# sourceMappingURL=collection.roles.js.map