"use strict";
var TransactionsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsGateway = void 0;
const tslib_1 = require("tslib");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const transaction_service_1 = require("../../endpoints/transactions/transaction.service");
const transaction_filter_1 = require("../../endpoints/transactions/entities/transaction.filter");
const query_pagination_1 = require("../../common/entities/query.pagination");
const transactions_query_options_1 = require("../../endpoints/transactions/entities/transactions.query.options");
const ws_validation_pipe_1 = require("../../utils/ws-validation.pipe");
const transaction_subscribe_1 = require("../../endpoints/transactions/entities/dtos/transaction.subscribe");
const ws_exceptions_filter_1 = require("../../utils/ws-exceptions.filter");
const common_1 = require("@nestjs/common");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const room_key_generator_1 = require("./room.key.generator");
const locking_guard_interceptor_1 = require("../../utils/locking.guard.interceptor");
let TransactionsGateway = TransactionsGateway_1 = class TransactionsGateway {
    constructor(transactionService) {
        this.transactionService = transactionService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(TransactionsGateway_1.name);
    }
    async handleSubscription(client, payload) {
        transactions_query_options_1.TransactionQueryOptions.applyDefaultOptions(payload.size || 25, {
            withScResults: payload.withScResults,
            withOperations: payload.withOperations,
            withLogs: payload.withLogs,
            withScamInfo: payload.withScamInfo,
            withUsername: payload.withUsername,
            withBlockInfo: payload.withBlockInfo,
            withActionTransferValue: payload.withActionTransferValue,
        });
        const transactionFilter = new transaction_filter_1.TransactionFilter({
            order: payload.order,
            isRelayed: payload.isRelayed,
            isScCall: payload.isScCall,
            withRelayedScresults: payload.withRelayedScresults,
        });
        transaction_filter_1.TransactionFilter.validate(transactionFilter, payload.size || 25);
        const filterIdentifier = JSON.stringify(payload);
        const roomName = `${TransactionsGateway_1.keyPrefix}${filterIdentifier}`;
        if (!client.rooms.has(roomName)) {
            await client.join(roomName);
        }
        return { status: 'success' };
    }
    async handleUnsubscribe(client, payload) {
        const filterIdentifier = room_key_generator_1.RoomKeyGenerator.deterministicStringify(payload);
        const roomName = `${TransactionsGateway_1.keyPrefix}${filterIdentifier}`;
        if (client.rooms.has(roomName)) {
            await client.leave(roomName);
        }
        return { status: 'unsubscribed' };
    }
    async pushTransactionsForRoom(roomName) {
        if (!roomName.startsWith(TransactionsGateway_1.keyPrefix))
            return;
        try {
            const filterIdentifier = roomName.replace(TransactionsGateway_1.keyPrefix, "");
            const filter = JSON.parse(filterIdentifier);
            const options = transactions_query_options_1.TransactionQueryOptions.applyDefaultOptions(filter.size || 25, {
                withScResults: filter.withScResults,
                withOperations: filter.withOperations,
                withLogs: filter.withLogs,
                withScamInfo: filter.withScamInfo,
                withUsername: filter.withUsername,
                withBlockInfo: filter.withBlockInfo,
                withActionTransferValue: filter.withActionTransferValue,
            });
            const transactionFilter = new transaction_filter_1.TransactionFilter({
                sender: filter.sender,
                receivers: filter.receiver,
                token: filter.token,
                functions: filter.functions,
                senderShard: filter.senderShard,
                receiverShard: filter.receiverShard,
                miniBlockHash: filter.miniBlockHash,
                hashes: filter.hashes,
                status: filter.status,
                before: filter.before,
                after: filter.after,
                condition: filter.condition,
                order: filter.order,
                relayer: filter.relayer,
                isRelayed: filter.isRelayed,
                isScCall: filter.isScCall,
                round: filter.round,
                withRelayedScresults: filter.withRelayedScresults,
            });
            transaction_filter_1.TransactionFilter.validate(transactionFilter, filter.size || 25);
            const [transactions, transactionsCount] = await Promise.all([
                this.transactionService.getTransactions(transactionFilter, new query_pagination_1.QueryPagination({ from: filter.from || 0, size: filter.size || 25 }), options, undefined, filter.fields || []),
                this.transactionService.getTransactionCount(transactionFilter),
            ]);
            this.server.to(roomName).emit("transactionUpdate", { transactions, transactionsCount });
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async pushTransactions() {
        const promises = [];
        for (const [roomName] of this.server.sockets.adapter.rooms) {
            promises.push(this.pushTransactionsForRoom(roomName));
        }
        await Promise.all(promises);
    }
};
TransactionsGateway.keyPrefix = 'tx-';
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", socket_io_1.Server)
], TransactionsGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, common_1.UseInterceptors)(locking_guard_interceptor_1.LockingGuardInterceptor),
    (0, websockets_1.SubscribeMessage)('subscribeTransactions'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)(new ws_validation_pipe_1.WsValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket,
        transaction_subscribe_1.TransactionSubscribePayload]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionsGateway.prototype, "handleSubscription", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribeTransactions'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)(new ws_validation_pipe_1.WsValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket,
        transaction_subscribe_1.TransactionSubscribePayload]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionsGateway.prototype, "handleUnsubscribe", null);
TransactionsGateway = TransactionsGateway_1 = tslib_1.__decorate([
    (0, common_1.UseFilters)(ws_exceptions_filter_1.WebsocketExceptionsFilter),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, path: '/ws/subscription' }),
    tslib_1.__metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionsGateway);
exports.TransactionsGateway = TransactionsGateway;
//# sourceMappingURL=transaction.gateway.js.map