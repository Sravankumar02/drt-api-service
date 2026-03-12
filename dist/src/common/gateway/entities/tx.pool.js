"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxPool = void 0;
class TxPool {
    constructor(init) {
        this.regularTransactions = [];
        this.smartContractResults = [];
        this.rewards = [];
        Object.assign(this, init);
    }
}
exports.TxPool = TxPool;
//# sourceMappingURL=tx.pool.js.map