"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxPoolGatewayResponse = void 0;
const tx_pool_1 = require("./tx.pool");
class TxPoolGatewayResponse {
    constructor(init) {
        this.txPool = new tx_pool_1.TxPool();
        Object.assign(this, init);
    }
}
exports.TxPoolGatewayResponse = TxPoolGatewayResponse;
//# sourceMappingURL=tx.pool.gateway.response.js.map