"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftAccount = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const nft_1 = require("./nft");
class NftAccount extends nft_1.Nft {
    constructor(init) {
        super();
        this.balance = '';
        this.price = undefined;
        this.valueUsd = undefined;
        this.receivedAt = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 10 }),
    tslib_1.__metadata("design:type", String)
], NftAccount.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], NftAccount.prototype, "price", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], NftAccount.prototype, "valueUsd", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false, description: 'Timestamp when the NFT was received by the address' }),
    tslib_1.__metadata("design:type", Object)
], NftAccount.prototype, "receivedAt", void 0);
exports.NftAccount = NftAccount;
//# sourceMappingURL=nft.account.js.map