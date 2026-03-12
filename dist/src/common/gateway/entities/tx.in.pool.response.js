"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxInPoolResponse = void 0;
const tx_in_pool_fields_1 = require("./tx.in.pool.fields");
class TxInPoolResponse {
    constructor(init) {
        this.txFields = new tx_in_pool_fields_1.TxInPoolFields();
        Object.assign(this, init);
    }
}
exports.TxInPoolResponse = TxInPoolResponse;
//# sourceMappingURL=tx.in.pool.response.js.map