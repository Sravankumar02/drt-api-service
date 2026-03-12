"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenProperties = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const dcdt_type_1 = require("../../dcdt/entities/dcdt.type");
class TokenProperties {
    constructor(init) {
        this.identifier = '';
        this.name = '';
        this.type = dcdt_type_1.DcdtType.NonFungibleDCDT;
        this.subType = undefined;
        this.owner = '';
        this.wiped = '';
        this.decimals = 0;
        this.isPaused = false;
        this.tags = [];
        this.royalties = 0;
        this.uris = [];
        this.url = '';
        this.canUpgrade = false;
        this.canMint = false;
        this.canBurn = false;
        this.canChangeOwner = false;
        this.canPause = false;
        this.canFreeze = false;
        this.canWipe = false;
        this.canAddSpecialRoles = false;
        this.canTransferNFTCreateRole = false;
        this.NFTCreateStopped = false;
        this.timestamp = 0;
        this.ownersHistory = [];
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TokenProperties.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TokenProperties.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TokenProperties.prototype, "type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Object)
], TokenProperties.prototype, "subType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TokenProperties.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TokenProperties.prototype, "wiped", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], TokenProperties.prototype, "decimals", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Boolean)
], TokenProperties.prototype, "isPaused", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Array)
], TokenProperties.prototype, "tags", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], TokenProperties.prototype, "royalties", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Array)
], TokenProperties.prototype, "uris", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TokenProperties.prototype, "url", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Boolean)
], TokenProperties.prototype, "canUpgrade", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Boolean)
], TokenProperties.prototype, "canMint", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Boolean)
], TokenProperties.prototype, "canBurn", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Boolean)
], TokenProperties.prototype, "canChangeOwner", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Boolean)
], TokenProperties.prototype, "canPause", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Boolean)
], TokenProperties.prototype, "canFreeze", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Boolean)
], TokenProperties.prototype, "canWipe", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Boolean)
], TokenProperties.prototype, "canAddSpecialRoles", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Boolean)
], TokenProperties.prototype, "canTransferNFTCreateRole", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Boolean)
], TokenProperties.prototype, "NFTCreateStopped", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], TokenProperties.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Array)
], TokenProperties.prototype, "ownersHistory", void 0);
exports.TokenProperties = TokenProperties;
//# sourceMappingURL=token.properties.js.map