"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketPublisherService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const transaction_1 = require("../../endpoints/transactions/entities/transaction");
const transaction_action_service_1 = require("../../endpoints/transactions/transaction-action/transaction.action.service");
let WebSocketPublisherService = class WebSocketPublisherService {
    constructor(transactionActionService) {
        this.transactionActionService = transactionActionService;
        this.maxAddressesSize = 16;
    }
    async handleDisconnect(socket) {
        const { addresses, error } = this.getAddressesFromSocketQuery(socket);
        if (error) {
            socket.emit('error', error);
            return;
        }
        for (const address of addresses) {
            await socket.leave(address);
        }
    }
    async handleConnection(socket) {
        const { addresses, error } = this.getAddressesFromSocketQuery(socket);
        if (error) {
            socket.emit('error', error);
            return;
        }
        await socket.join(addresses);
    }
    async onTransactionCompleted(transaction) {
        await this.emitTransactionEvent(transaction, 'transactionCompleted');
    }
    async onTransactionPendingResults(transaction) {
        await this.emitTransactionEvent(transaction, 'transactionPendingResults');
    }
    onBatchUpdated(address, batchId, txHashes) {
        var _a;
        (_a = this.server) === null || _a === void 0 ? void 0 : _a.to(address).emit('batchUpdated', { batchId, txHashes });
    }
    async emitTransactionEvent(transaction, eventName) {
        var _a, _b, _c;
        (_a = this.server) === null || _a === void 0 ? void 0 : _a.to(transaction.sender).emit(eventName, transaction.hash);
        if (transaction.sender === transaction.receiver) {
            const actionTransaction = new transaction_1.Transaction();
            actionTransaction.sender = transaction.sender;
            actionTransaction.receiver = transaction.receiver;
            actionTransaction.data = transaction.data;
            actionTransaction.value = transaction.value;
            const metadata = await this.transactionActionService.getTransactionMetadata(actionTransaction);
            if (metadata && transaction.sender !== metadata.receiver) {
                (_b = this.server) === null || _b === void 0 ? void 0 : _b.to(metadata.receiver).emit(eventName, transaction.hash);
            }
        }
        else {
            (_c = this.server) === null || _c === void 0 ? void 0 : _c.to(transaction.receiver).emit(eventName, transaction.hash);
        }
    }
    getAddressesFromSocketQuery(socket) {
        const rawAddresses = socket.handshake.query.address;
        if (!rawAddresses) {
            return { addresses: [], error: 'Validation failed (an address is expected)' };
        }
        const addresses = rawAddresses.split(',');
        if (addresses.length > this.maxAddressesSize) {
            return { addresses: [], error: `Validation failed for 'address' (less than ${this.maxAddressesSize} comma separated values expected)` };
        }
        const distinctAddresses = addresses.distinct();
        for (const address of distinctAddresses) {
            if (!sdk_nestjs_common_1.AddressUtils.isAddressValid(address)) {
                return { addresses: [], error: `Validation failed for 'address' (a bech32 address is expected)` };
            }
        }
        return { addresses: distinctAddresses };
    }
};
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", Object)
], WebSocketPublisherService.prototype, "server", void 0);
WebSocketPublisherService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)(3099),
    tslib_1.__metadata("design:paramtypes", [transaction_action_service_1.TransactionActionService])
], WebSocketPublisherService);
exports.WebSocketPublisherService = WebSocketPublisherService;
//# sourceMappingURL=web-socket-publisher-service.js.map