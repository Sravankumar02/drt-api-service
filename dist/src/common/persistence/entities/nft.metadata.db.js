"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftMetadataDb = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let NftMetadataDb = class NftMetadataDb {
    constructor() {
        this.id = '';
    }
};
tslib_1.__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", String)
], NftMetadataDb.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], NftMetadataDb.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('json'),
    tslib_1.__metadata("design:type", Object)
], NftMetadataDb.prototype, "content", void 0);
NftMetadataDb = tslib_1.__decorate([
    (0, typeorm_1.Entity)('nft_metadata'),
    (0, typeorm_1.Index)(['id'], { unique: true })
], NftMetadataDb);
exports.NftMetadataDb = NftMetadataDb;
//# sourceMappingURL=nft.metadata.db.js.map