"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftCollectionWithRoles = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const collection_roles_1 = require("../../tokens/entities/collection.roles");
const nft_collection_1 = require("./nft.collection");
class NftCollectionWithRoles extends nft_collection_1.NftCollection {
    constructor(init) {
        super();
        this.role = new collection_roles_1.CollectionRoles();
        this.canTransfer = false;
        this.canCreate = false;
        this.canBurn = false;
        this.canAddQuantity = false;
        this.canUpdateAttributes = false;
        this.canAddUri = false;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: collection_roles_1.CollectionRoles }),
    tslib_1.__metadata("design:type", collection_roles_1.CollectionRoles)
], NftCollectionWithRoles.prototype, "role", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean }),
    tslib_1.__metadata("design:type", Boolean)
], NftCollectionWithRoles.prototype, "canTransfer", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], NftCollectionWithRoles.prototype, "canCreate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], NftCollectionWithRoles.prototype, "canBurn", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], NftCollectionWithRoles.prototype, "canAddQuantity", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], NftCollectionWithRoles.prototype, "canUpdateAttributes", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], NftCollectionWithRoles.prototype, "canAddUri", void 0);
exports.NftCollectionWithRoles = NftCollectionWithRoles;
//# sourceMappingURL=nft.collection.with.roles.js.map