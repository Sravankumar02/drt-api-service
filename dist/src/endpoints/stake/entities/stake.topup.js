"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeTopup = void 0;
class StakeTopup {
    constructor(init) {
        this.topUp = '';
        this.stake = '';
        this.locked = '';
        this.numNodes = 0;
        this.address = '';
        this.blses = [];
        Object.assign(this, init);
    }
}
exports.StakeTopup = StakeTopup;
//# sourceMappingURL=stake.topup.js.map