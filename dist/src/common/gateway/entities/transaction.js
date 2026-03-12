"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(init) {
        this.type = '';
        this.processingTypeOnSource = '';
        this.processingTypeOnDestination = '';
        this.hash = '';
        this.nonce = 0;
        this.round = 0;
        this.epoch = 0;
        this.value = '';
        this.receiver = '';
        this.receiverUsername = '';
        this.sender = '';
        this.senderUsername = '';
        this.gasPrice = 0;
        this.gasLimit = 0;
        this.gasUsed = 0;
        this.fee = 0;
        this.data = '';
        this.status = '';
        this.signature = '';
        this.sourceShard = 0;
        this.destinationShard = 0;
        this.blockNonce = 0;
        this.blockHash = '';
        this.notarizedAtSourceInMetaNonce = 0;
        this.NotarizedAtSourceInMetaHash = '';
        this.notarizedAtDestinationInMetaNonce = 0;
        this.notarizedAtDestinationInMetaHash = '';
        this.miniblockType = '';
        this.miniblockHash = '';
        this.hyperblockNonce = 0;
        this.timestamp = 0;
        this.guardian = '';
        this.guardianSignature = '';
        this.logs = undefined;
        this.receipt = undefined;
        this.smartContractResults = undefined;
        this.relayerAddress = '';
        this.relayerSignature = '';
        Object.assign(this, init);
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map