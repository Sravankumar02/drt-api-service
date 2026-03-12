"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftCollectionAccount = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const nft_collection_1 = require("./nft.collection");
class NftCollectionAccount extends nft_collection_1.NftCollection {
    constructor(init) {
        super();
        this.count = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], NftCollectionAccount.prototype, "count", void 0);
exports.NftCollectionAccount = NftCollectionAccount;
//# sourceMappingURL=nft.collection.account.js.map