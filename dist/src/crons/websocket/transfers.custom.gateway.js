"use strict";
var TransfersCustomGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransfersCustomGateway = void 0;
const tslib_1 = require("tslib");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const transaction_filter_1 = require("../../endpoints/transactions/entities/transaction.filter");
const query_pagination_1 = require("../../common/entities/query.pagination");
const ws_validation_pipe_1 = require("../../utils/ws-validation.pipe");
const ws_exceptions_filter_1 = require("../../utils/ws-exceptions.filter");
const common_1 = require("@nestjs/common");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const room_key_generator_1 = require("./room.key.generator");
const locking_guard_interceptor_1 = require("../../utils/locking.guard.interceptor");
const transfer_service_1 = require("../../endpoints/transfers/transfer.service");
const transfers_custom_payload_1 = require("../../endpoints/websocket/entities/transfers.custom.payload");
const transactions_query_options_1 = require("../../endpoints/transactions/entities/transactions.query.options");
let TransfersCustomGateway = TransfersCustomGateway_1 = class TransfersCustomGateway {
    constructor(transferService) {
        this.transferService = transferService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(TransfersCustomGateway_1.name);
    }
    async handleCustomSubscription(client, payload) {
        const filterIdentifier = room_key_generator_1.RoomKeyGenerator.deterministicStringify(payload);
        if (!client.rooms.has(`${TransfersCustomGateway_1.keyPrefix}${filterIdentifier}`)) {
            await client.join(`${TransfersCustomGateway_1.keyPrefix}${filterIdentifier}`);
        }
        return { status: 'success' };
    }
    async handleCustomUnsubscribe(client, payload) {
        const filterIdentifier = room_key_generator_1.RoomKeyGenerator.deterministicStringify(payload);
        const roomName = `${TransfersCustomGateway_1.keyPrefix}${filterIdentifier}`;
        if (client.rooms.has(roomName)) {
            await client.leave(roomName);
        }
        return { status: 'unsubscribed' };
    }
    async pushTransfersForTimestampMs(timestampMs) {
        var _a;
        try {
            const options = new transactions_query_options_1.TransactionQueryOptions({ withScamInfo: false, withUsername: true, withBlockInfo: false, withLogs: false, withOperations: false, withActionTransferValue: false, withTxsOrder: false });
            const allTransfers = await this.transferService.getTransfers(new transaction_filter_1.TransactionFilter({ before: timestampMs, after: timestampMs, withTxsRelayedByAddress: true }), new query_pagination_1.QueryPagination({ size: 10000 }), options);
            const transfersFilteredForBroadcast = new Map();
            for (const transfer of allTransfers) {
                const roomKeys = room_key_generator_1.RoomKeyGenerator.generate(TransfersCustomGateway_1.keyPrefix, transfer, transfers_custom_payload_1.TransferCustomSubscribePayload);
                for (const roomKey of roomKeys) {
                    const substitutions = transfers_custom_payload_1.TransferCustomSubscribePayload.getFieldsSubstitutions();
                    for (const [key, substituteFields] of Object.entries(substitutions)) {
                        for (const substituteField of substituteFields) {
                            const substituteRoomKey = roomKey.replace(`"${substituteField}":`, `"${key}":`);
                            if (this.server.sockets.adapter.rooms.has(substituteRoomKey)) {
                                if (!transfersFilteredForBroadcast.has(substituteRoomKey)) {
                                    transfersFilteredForBroadcast.set(substituteRoomKey, []);
                                }
                                transfersFilteredForBroadcast.get(substituteRoomKey).push(transfer);
                            }
                        }
                    }
                    if (this.server.sockets.adapter.rooms.has(roomKey)) {
                        if (!transfersFilteredForBroadcast.has(roomKey)) {
                            transfersFilteredForBroadcast.set(roomKey, []);
                        }
                        transfersFilteredForBroadcast.get(roomKey).push(transfer);
                    }
                }
            }
            for (const [roomName] of transfersFilteredForBroadcast) {
                this.server.to(roomName).emit("customTransferUpdate", { transfers: (_a = transfersFilteredForBroadcast.get(roomName)) === null || _a === void 0 ? void 0 : _a.distinct(), timestampMs });
            }
        }
        catch (error) {
            this.logger.error(error);
        }
    }
};
TransfersCustomGateway.keyPrefix = 'custom-transfer-';
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", socket_io_1.Server)
], TransfersCustomGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, common_1.UseInterceptors)(locking_guard_interceptor_1.LockingGuardInterceptor),
    (0, websockets_1.SubscribeMessage)('subscribeCustomTransfers'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)(new ws_validation_pipe_1.WsValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket,
        transfers_custom_payload_1.TransferCustomSubscribePayload]),
    tslib_1.__metadata("design:returntype", Promise)
], TransfersCustomGateway.prototype, "handleCustomSubscription", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribeCustomTransfers'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)(new ws_validation_pipe_1.WsValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket,
        transfers_custom_payload_1.TransferCustomSubscribePayload]),
    tslib_1.__metadata("design:returntype", Promise)
], TransfersCustomGateway.prototype, "handleCustomUnsubscribe", null);
TransfersCustomGateway = TransfersCustomGateway_1 = tslib_1.__decorate([
    (0, common_1.UseFilters)(ws_exceptions_filter_1.WebsocketExceptionsFilter),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, path: '/ws/subscription' }),
    tslib_1.__metadata("design:paramtypes", [transfer_service_1.TransferService])
], TransfersCustomGateway);
exports.TransfersCustomGateway = TransfersCustomGateway;
//# sourceMappingURL=transfers.custom.gateway.js.map