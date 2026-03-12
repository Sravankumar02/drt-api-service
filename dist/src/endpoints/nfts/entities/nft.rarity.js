"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftRarity = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class NftRarity {
    constructor(init) {
        this.rank = 0;
        this.score = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], NftRarity.prototype, "rank", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], NftRarity.prototype, "score", void 0);
exports.NftRarity = NftRarity;
//# sourceMappingURL=nft.rarity.js.map