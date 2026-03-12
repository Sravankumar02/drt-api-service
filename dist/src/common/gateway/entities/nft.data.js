"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftData = void 0;
class NftData {
    constructor(init) {
        this.balance = '0';
        this.attributes = '';
        this.creator = '';
        this.name = '';
        this.nonce = 0;
        this.royalties = '';
        this.uris = [];
        this.tokenIdentifier = '';
        Object.assign(this, init);
    }
}
exports.NftData = NftData;
//# sourceMappingURL=nft.data.js.map