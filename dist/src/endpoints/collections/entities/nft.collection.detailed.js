"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftCollectionDetailed = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const collection_roles_1 = require("../../tokens/entities/collection.roles");
const nft_collection_1 = require("./nft.collection");
class NftCollectionDetailed extends nft_collection_1.NftCollection {
    constructor(init) {
        super();
        this.canTransfer = undefined;
        this.roles = [];
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], NftCollectionDetailed.prototype, "canTransfer", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: collection_roles_1.CollectionRoles, isArray: true }),
    tslib_1.__metadata("design:type", Array)
], NftCollectionDetailed.prototype, "roles", void 0);
exports.NftCollectionDetailed = NftCollectionDetailed;
//# sourceMappingURL=nft.collection.detailed.js.map