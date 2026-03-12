"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftRank = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class NftRank {
    constructor(init) {
        this.identifier = '';
        this.rank = 0;
        if (init) {
            Object.assign(this, init);
        }
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], NftRank.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], NftRank.prototype, "rank", void 0);
exports.NftRank = NftRank;
//# sourceMappingURL=nft.rank.js.map