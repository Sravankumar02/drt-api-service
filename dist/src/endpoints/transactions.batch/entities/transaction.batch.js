"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionBatch = void 0;
const transaction_batch_status_1 = require("./transaction.batch.status");
class TransactionBatch {
    constructor() {
        this.id = '';
        this.groups = [];
        this.status = transaction_batch_status_1.TransactionBatchStatus.pending;
        this.sourceIp = '';
    }
    static getAddress(batch) {
        return batch.groups[0].items[0].transaction.tx.sender;
    }
}
exports.TransactionBatch = TransactionBatch;
//# sourceMappingURL=transaction.batch.js.map