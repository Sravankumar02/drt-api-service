"use strict";
var PoolGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolGateway = void 0;
const tslib_1 = require("tslib");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const ws_exceptions_filter_1 = require("../../utils/ws-exceptions.filter");
const ws_validation_pipe_1 = require("../../utils/ws-validation.pipe");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const pool_service_1 = require("../../endpoints/pool/pool.service");
const pool_filter_1 = require("../../endpoints/pool/entities/pool.filter");
const query_pagination_1 = require("../../common/entities/query.pagination");
const pool_subscribe_1 = require("../../endpoints/pool/entities/pool.subscribe");
const room_key_generator_1 = require("./room.key.generator");
const locking_guard_interceptor_1 = require("../../utils/locking.guard.interceptor");
let PoolGateway = PoolGateway_1 = class PoolGateway {
    constructor(poolService) {
        this.poolService = poolService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(PoolGateway_1.name);
    }
    async handleSubscription(client, payload) {
        const filterIdentifier = room_key_generator_1.RoomKeyGenerator.deterministicStringify(payload);
        const roomName = `${PoolGateway_1.keyPrefix}${filterIdentifier}`;
        if (!client.rooms.has(roomName)) {
            await client.join(roomName);
        }
        return { status: 'success' };
    }
    async handleUnsubscribe(client, payload) {
        const filterIdentifier = room_key_generator_1.RoomKeyGenerator.deterministicStringify(payload);
        const roomName = `${PoolGateway_1.keyPrefix}${filterIdentifier}`;
        if (client.rooms.has(roomName)) {
            await client.leave(roomName);
        }
        return { status: 'unsubscribed' };
    }
    async pushPoolForRoom(roomName) {
        if (!roomName.startsWith("pool-"))
            return;
        try {
            const filterIdentifier = roomName.replace("pool-", "");
            const filter = JSON.parse(filterIdentifier);
            const poolFilter = new pool_filter_1.PoolFilter({
                type: filter.type,
            });
            const [pool, poolCount] = await Promise.all([
                this.poolService.getPool(new query_pagination_1.QueryPagination({
                    from: filter.from,
                    size: filter.size,
                }), poolFilter),
                this.poolService.getPoolCount(poolFilter),
            ]);
            this.server.to(roomName).emit("poolUpdate", { pool, poolCount });
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async pushPool() {
        const promises = [];
        for (const [roomName] of this.server.sockets.adapter.rooms) {
            promises.push(this.pushPoolForRoom(roomName));
        }
        await Promise.all(promises);
    }
};
PoolGateway.keyPrefix = 'pool-';
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", socket_io_1.Server)
], PoolGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, common_1.UseInterceptors)(locking_guard_interceptor_1.LockingGuardInterceptor),
    (0, websockets_1.SubscribeMessage)('subscribePool'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)(new ws_validation_pipe_1.WsValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket,
        pool_subscribe_1.PoolSubscribePayload]),
    tslib_1.__metadata("design:returntype", Promise)
], PoolGateway.prototype, "handleSubscription", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribePool'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)(new ws_validation_pipe_1.WsValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket,
        pool_subscribe_1.PoolSubscribePayload]),
    tslib_1.__metadata("design:returntype", Promise)
], PoolGateway.prototype, "handleUnsubscribe", null);
PoolGateway = PoolGateway_1 = tslib_1.__decorate([
    (0, common_1.UseFilters)(ws_exceptions_filter_1.WebsocketExceptionsFilter),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, path: '/ws/subscription' }),
    tslib_1.__metadata("design:paramtypes", [pool_service_1.PoolService])
], PoolGateway);
exports.PoolGateway = PoolGateway;
//# sourceMappingURL=pool.gateway.js.map