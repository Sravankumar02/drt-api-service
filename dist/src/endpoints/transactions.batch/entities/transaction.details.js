"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionDetails = void 0;
class TransactionDetails {
    constructor() {
        this.chainID = '';
        this.data = undefined;
        this.gasLimit = 0;
        this.gasPrice = 0;
        this.nonce = 0;
        this.receiver = '';
        this.sender = '';
        this.signature = '';
        this.value = '';
        this.version = 0;
    }
}
exports.TransactionDetails = TransactionDetails;
//# sourceMappingURL=transaction.details.js.map