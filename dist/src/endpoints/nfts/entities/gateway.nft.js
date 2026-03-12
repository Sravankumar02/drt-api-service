"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayNft = void 0;
class GatewayNft {
    constructor(init) {
        this.attributes = '';
        this.balance = '0';
        this.creator = '';
        this.hash = '';
        this.name = '';
        this.nonce = 0;
        this.royalties = '0';
        this.tokenIdentifier = '';
        this.uris = [];
        Object.assign(this, init);
    }
}
exports.GatewayNft = GatewayNft;
//# sourceMappingURL=gateway.nft.js.map