"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftMediaDb = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let NftMediaDb = class NftMediaDb {
    constructor() {
        this.id = '';
    }
};
tslib_1.__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", String)
], NftMediaDb.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], NftMediaDb.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('json'),
    tslib_1.__metadata("design:type", Object)
], NftMediaDb.prototype, "content", void 0);
NftMediaDb = tslib_1.__decorate([
    (0, typeorm_1.Entity)('nft_media'),
    (0, typeorm_1.Index)(['id'], { unique: true })
], NftMediaDb);
exports.NftMediaDb = NftMediaDb;
//# sourceMappingURL=nft.media.db.js.map