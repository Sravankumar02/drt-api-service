"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftSupply = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class NftSupply {
    constructor(init) {
        this.supply = '0';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, default: '1' }),
    tslib_1.__metadata("design:type", String)
], NftSupply.prototype, "supply", void 0);
exports.NftSupply = NftSupply;
//# sourceMappingURL=nft.supply.js.map