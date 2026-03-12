"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxInPoolFields = void 0;
class TxInPoolFields {
    constructor(init) {
        this.data = '';
        this.gaslimit = 0;
        this.gasprice = 0;
        this.guardian = '';
        this.guardiansignature = '';
        this.hash = '';
        this.nonce = 0;
        this.receiver = '';
        this.receivershard = 0;
        this.receiverusername = '';
        this.sender = '';
        this.sendershard = 0;
        this.signature = '';
        this.value = '';
        Object.assign(this, init);
    }
}
exports.TxInPoolFields = TxInPoolFields;
//# sourceMappingURL=tx.in.pool.fields.js.map