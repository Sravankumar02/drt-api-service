"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenWithRoles = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const token_1 = require("./token");
const token_roles_1 = require("./token.roles");
class TokenWithRoles extends token_1.Token {
    constructor(init) {
        super();
        this.role = new token_roles_1.TokenRoles();
        this.canLocalMint = false;
        this.canLocalBurn = false;
        this.canCreate = undefined;
        this.canAddQuantity = undefined;
        this.canUpdateAttributes = undefined;
        this.canAddUri = undefined;
        this.canTransfer = false;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: token_roles_1.TokenRoles }),
    tslib_1.__metadata("design:type", token_roles_1.TokenRoles)
], TokenWithRoles.prototype, "role", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TokenWithRoles.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], TokenWithRoles.prototype, "canLocalMint", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], TokenWithRoles.prototype, "canLocalBurn", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], TokenWithRoles.prototype, "canCreate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], TokenWithRoles.prototype, "canAddQuantity", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], TokenWithRoles.prototype, "canUpdateAttributes", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], TokenWithRoles.prototype, "canAddUri", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], TokenWithRoles.prototype, "canTransfer", void 0);
exports.TokenWithRoles = TokenWithRoles;
//# sourceMappingURL=token.with.roles.js.map