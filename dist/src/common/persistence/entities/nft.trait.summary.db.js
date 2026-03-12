"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftTraitSummaryDb = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let NftTraitSummaryDb = class NftTraitSummaryDb {
    constructor() {
        this.identifier = '';
    }
};
tslib_1.__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", String)
], NftTraitSummaryDb.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], NftTraitSummaryDb.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('json'),
    tslib_1.__metadata("design:type", Object)
], NftTraitSummaryDb.prototype, "traitTypes", void 0);
NftTraitSummaryDb = tslib_1.__decorate([
    (0, typeorm_1.Entity)('nft_trait_summaries')
], NftTraitSummaryDb);
exports.NftTraitSummaryDb = NftTraitSummaryDb;
//# sourceMappingURL=nft.trait.summary.db.js.map