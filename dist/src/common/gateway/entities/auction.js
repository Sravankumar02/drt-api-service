"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auction = void 0;
class Auction {
    constructor(init) {
        this.owner = '';
        this.numStakedNodes = 0;
        this.totalTopUp = '0';
        this.topUpPerNode = '0';
        this.qualifiedTopUp = '0';
        this.nodes = [];
        Object.assign(this, init);
    }
}
exports.Auction = Auction;
//# sourceMappingURL=auction.js.map