"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftRarities = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const nft_rarity_1 = require("./nft.rarity");
class NftRarities {
    constructor(init) {
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: nft_rarity_1.NftRarity }),
    tslib_1.__metadata("design:type", Object)
], NftRarities.prototype, "statistical", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: nft_rarity_1.NftRarity }),
    tslib_1.__metadata("design:type", Object)
], NftRarities.prototype, "trait", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: nft_rarity_1.NftRarity }),
    tslib_1.__metadata("design:type", Object)
], NftRarities.prototype, "jaccardDistances", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: nft_rarity_1.NftRarity }),
    tslib_1.__metadata("design:type", Object)
], NftRarities.prototype, "openRarity", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: nft_rarity_1.NftRarity }),
    tslib_1.__metadata("design:type", Object)
], NftRarities.prototype, "custom", void 0);
exports.NftRarities = NftRarities;
//# sourceMappingURL=nft.rarities.js.map