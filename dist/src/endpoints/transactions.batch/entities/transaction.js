"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const transaction_details_1 = require("./transaction.details");
class Transaction {
    constructor() {
        this.tx = new transaction_details_1.TransactionDetails();
        this.hash = '';
        this.data = '';
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map