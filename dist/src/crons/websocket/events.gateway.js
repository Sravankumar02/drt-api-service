"use strict";
var EventsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const tslib_1 = require("tslib");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const ws_exceptions_filter_1 = require("../../utils/ws-exceptions.filter");
const ws_validation_pipe_1 = require("../../utils/ws-validation.pipe");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const events_service_1 = require("../../endpoints/events/events.service");
const events_filter_1 = require("../../endpoints/events/entities/events.filter");
const events_subscribe_1 = require("../../endpoints/events/entities/events.subscribe");
const query_pagination_1 = require("../../common/entities/query.pagination");
const room_key_generator_1 = require("./room.key.generator");
const locking_guard_interceptor_1 = require("../../utils/locking.guard.interceptor");
let EventsGateway = EventsGateway_1 = class EventsGateway {
    constructor(eventsService) {
        this.eventsService = eventsService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(EventsGateway_1.name);
    }
    async handleSubscription(client, payload) {
        const filterIdentifier = JSON.stringify(payload);
        const roomName = `${EventsGateway_1.keyPrefix}${filterIdentifier}`;
        if (!client.rooms.has(roomName)) {
            await client.join(roomName);
        }
        return { status: 'success' };
    }
    async handleUnsubscribe(client, payload) {
        const filterIdentifier = room_key_generator_1.RoomKeyGenerator.deterministicStringify(payload);
        const roomName = `${EventsGateway_1.keyPrefix}${filterIdentifier}`;
        if (client.rooms.has(roomName)) {
            await client.leave(roomName);
        }
        return { status: 'unsubscribed' };
    }
    async pushEventsForRoom(roomName) {
        if (!roomName.startsWith("events-"))
            return;
        try {
            const filterIdentifier = roomName.replace("events-", "");
            const filter = JSON.parse(filterIdentifier);
            const eventsFilter = new events_filter_1.EventsFilter({
                shard: filter.shard,
            });
            const [events, eventsCount] = await Promise.all([
                this.eventsService.getEvents(new query_pagination_1.QueryPagination({
                    from: filter.from || 0,
                    size: filter.size || 25,
                }), eventsFilter),
                this.eventsService.getEventsCount(eventsFilter),
            ]);
            this.server.to(roomName).emit("eventsUpdate", { events, eventsCount });
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async pushEvents() {
        const promises = [];
        for (const [roomName] of this.server.sockets.adapter.rooms) {
            promises.push(this.pushEventsForRoom(roomName));
        }
        await Promise.all(promises);
    }
};
EventsGateway.keyPrefix = 'events-';
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, common_1.UseInterceptors)(locking_guard_interceptor_1.LockingGuardInterceptor),
    (0, websockets_1.SubscribeMessage)('subscribeEvents'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)(new ws_validation_pipe_1.WsValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket,
        events_subscribe_1.EventsSubscribePayload]),
    tslib_1.__metadata("design:returntype", Promise)
], EventsGateway.prototype, "handleSubscription", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribeEvents'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)(new ws_validation_pipe_1.WsValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket,
        events_subscribe_1.EventsSubscribePayload]),
    tslib_1.__metadata("design:returntype", Promise)
], EventsGateway.prototype, "handleUnsubscribe", null);
EventsGateway = EventsGateway_1 = tslib_1.__decorate([
    (0, common_1.UseFilters)(ws_exceptions_filter_1.WebsocketExceptionsFilter),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, path: '/ws/subscription' }),
    tslib_1.__metadata("design:paramtypes", [events_service_1.EventsService])
], EventsGateway);
exports.EventsGateway = EventsGateway;
//# sourceMappingURL=events.gateway.js.map