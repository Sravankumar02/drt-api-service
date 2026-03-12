"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionBatchItem = void 0;
const transaction_1 = require("./transaction");
const batch_transaction_status_1 = require("./batch.transaction.status");
class TransactionBatchItem {
    constructor() {
        this.transaction = new transaction_1.Transaction();
        this.status = batch_transaction_status_1.BatchTransactionStatus.pending;
    }
}
exports.TransactionBatchItem = TransactionBatchItem;
//# sourceMappingURL=transaction.batch.item.js.map