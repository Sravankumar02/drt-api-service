"use strict";
var TransactionsCustomGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsCustomGateway = void 0;
const tslib_1 = require("tslib");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const transaction_service_1 = require("../../endpoints/transactions/transaction.service");
const transaction_filter_1 = require("../../endpoints/transactions/entities/transaction.filter");
const query_pagination_1 = require("../../common/entities/query.pagination");
const ws_validation_pipe_1 = require("../../utils/ws-validation.pipe");
const ws_exceptions_filter_1 = require("../../utils/ws-exceptions.filter");
const common_1 = require("@nestjs/common");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const transaction_custom_subscribe_1 = require("../../endpoints/transactions/entities/dtos/transaction.custom.subscribe");
const room_key_generator_1 = require("./room.key.generator");
const locking_guard_interceptor_1 = require("../../utils/locking.guard.interceptor");
let TransactionsCustomGateway = TransactionsCustomGateway_1 = class TransactionsCustomGateway {
    constructor(transactionService) {
        this.transactionService = transactionService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(TransactionsCustomGateway_1.name);
    }
    async handleCustomSubscription(client, payload) {
        const filterIdentifier = room_key_generator_1.RoomKeyGenerator.deterministicStringify(payload);
        if (!client.rooms.has(`${TransactionsCustomGateway_1.keyPrefix}${filterIdentifier}`)) {
            await client.join(`${TransactionsCustomGateway_1.keyPrefix}${filterIdentifier}`);
        }
        return { status: 'success' };
    }
    async handleCustomUnsubscribe(client, payload) {
        const filterIdentifier = room_key_generator_1.RoomKeyGenerator.deterministicStringify(payload);
        const roomName = `${TransactionsCustomGateway_1.keyPrefix}${filterIdentifier}`;
        if (client.rooms.has(roomName)) {
            await client.leave(roomName);
        }
        return { status: 'unsubscribed' };
    }
    async pushTransactionsForTimestampMs(timestampMs) {
        try {
            const allTransactions = await this.transactionService.getTransactions(new transaction_filter_1.TransactionFilter({ before: timestampMs, after: timestampMs }), new query_pagination_1.QueryPagination({ size: 10000 }));
            const txFilteredForBroadcast = new Map();
            for (const transaction of allTransactions) {
                const roomKeys = room_key_generator_1.RoomKeyGenerator.generate(TransactionsCustomGateway_1.keyPrefix, transaction, transaction_custom_subscribe_1.TransactionCustomSubscribePayload);
                for (const roomKey of roomKeys) {
                    if (this.server.sockets.adapter.rooms.has(roomKey)) {
                        if (!txFilteredForBroadcast.has(roomKey)) {
                            txFilteredForBroadcast.set(roomKey, []);
                        }
                        txFilteredForBroadcast.get(roomKey).push(transaction);
                    }
                }
            }
            for (const [roomName] of txFilteredForBroadcast) {
                this.server.to(roomName).emit("customTransactionUpdate", { transactions: txFilteredForBroadcast.get(roomName), timestampMs });
            }
        }
        catch (error) {
            this.logger.error(error);
        }
    }
};
TransactionsCustomGateway.keyPrefix = 'custom-tx-';
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", socket_io_1.Server)
], TransactionsCustomGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, common_1.UseInterceptors)(locking_guard_interceptor_1.LockingGuardInterceptor),
    (0, websockets_1.SubscribeMessage)('subscribeCustomTransactions'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)(new ws_validation_pipe_1.WsValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket,
        transaction_custom_subscribe_1.TransactionCustomSubscribePayload]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionsCustomGateway.prototype, "handleCustomSubscription", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribeCustomTransactions'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)(new ws_validation_pipe_1.WsValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket,
        transaction_custom_subscribe_1.TransactionCustomSubscribePayload]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionsCustomGateway.prototype, "handleCustomUnsubscribe", null);
TransactionsCustomGateway = TransactionsCustomGateway_1 = tslib_1.__decorate([
    (0, common_1.UseFilters)(ws_exceptions_filter_1.WebsocketExceptionsFilter),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, path: '/ws/subscription' }),
    tslib_1.__metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionsCustomGateway);
exports.TransactionsCustomGateway = TransactionsCustomGateway;
//# sourceMappingURL=transaction.custom.gateway.js.map