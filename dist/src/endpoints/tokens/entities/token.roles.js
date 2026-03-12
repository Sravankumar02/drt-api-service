"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRoles = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class TokenRoles {
    constructor(init) {
        this.canLocalMint = false;
        this.canLocalBurn = false;
        this.canCreate = undefined;
        this.canBurn = undefined;
        this.canAddQuantity = undefined;
        this.canUpdateAttributes = undefined;
        this.canAddUri = undefined;
        this.canTransfer = undefined;
        this.roles = [];
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TokenRoles.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], TokenRoles.prototype, "canLocalMint", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], TokenRoles.prototype, "canLocalBurn", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], TokenRoles.prototype, "canCreate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], TokenRoles.prototype, "canBurn", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], TokenRoles.prototype, "canAddQuantity", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], TokenRoles.prototype, "canUpdateAttributes", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], TokenRoles.prototype, "canAddUri", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], TokenRoles.prototype, "canTransfer", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    tslib_1.__metadata("design:type", Array)
], TokenRoles.prototype, "roles", void 0);
exports.TokenRoles = TokenRoles;
//# sourceMappingURL=token.roles.js.map