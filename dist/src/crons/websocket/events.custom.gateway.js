"use strict";
var EventsCustomGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsCustomGateway = void 0;
const tslib_1 = require("tslib");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const query_pagination_1 = require("../../common/entities/query.pagination");
const ws_validation_pipe_1 = require("../../utils/ws-validation.pipe");
const ws_exceptions_filter_1 = require("../../utils/ws-exceptions.filter");
const room_key_generator_1 = require("./room.key.generator");
const events_service_1 = require("../../endpoints/events/events.service");
const events_custom_subscribe_1 = require("../../endpoints/events/entities/events.custom.subscribe");
const events_filter_1 = require("../../endpoints/events/entities/events.filter");
const locking_guard_interceptor_1 = require("../../utils/locking.guard.interceptor");
let EventsCustomGateway = EventsCustomGateway_1 = class EventsCustomGateway {
    constructor(eventsService) {
        this.eventsService = eventsService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(EventsCustomGateway_1.name);
    }
    async handleCustomSubscription(client, payload) {
        const filterIdentifier = room_key_generator_1.RoomKeyGenerator.deterministicStringify(payload);
        const roomName = `${EventsCustomGateway_1.keyPrefix}${filterIdentifier}`;
        if (!client.rooms.has(roomName)) {
            await client.join(roomName);
        }
        return { status: 'success' };
    }
    async handleCustomUnsubscribe(client, payload) {
        const filterIdentifier = room_key_generator_1.RoomKeyGenerator.deterministicStringify(payload);
        const roomName = `${EventsCustomGateway_1.keyPrefix}${filterIdentifier}`;
        if (client.rooms.has(roomName)) {
            await client.leave(roomName);
        }
        return { status: 'unsubscribed' };
    }
    async pushEventsForTimestampMs(timestampMs) {
        try {
            const allEvents = await this.eventsService.getEvents(new query_pagination_1.QueryPagination({ size: 10000 }), new events_filter_1.EventsFilter({ before: timestampMs, after: timestampMs }));
            const eventsFilteredForBroadcast = new Map();
            for (const event of allEvents) {
                const roomKeys = room_key_generator_1.RoomKeyGenerator.generate(EventsCustomGateway_1.keyPrefix, event, events_custom_subscribe_1.EventsCustomSubscribePayload);
                for (const roomKey of roomKeys) {
                    if (this.server.sockets.adapter.rooms.has(roomKey)) {
                        if (!eventsFilteredForBroadcast.has(roomKey)) {
                            eventsFilteredForBroadcast.set(roomKey, []);
                        }
                        eventsFilteredForBroadcast.get(roomKey).push(event);
                    }
                }
            }
            for (const [roomName] of eventsFilteredForBroadcast) {
                this.server.to(roomName).emit("customEventUpdate", {
                    events: eventsFilteredForBroadcast.get(roomName),
                    timestampMs,
                });
            }
        }
        catch (error) {
            this.logger.error(error);
        }
    }
};
EventsCustomGateway.keyPrefix = 'custom-events-';
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", socket_io_1.Server)
], EventsCustomGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, common_1.UseInterceptors)(locking_guard_interceptor_1.LockingGuardInterceptor),
    (0, websockets_1.SubscribeMessage)('subscribeCustomEvents'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)(new ws_validation_pipe_1.WsValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket,
        events_custom_subscribe_1.EventsCustomSubscribePayload]),
    tslib_1.__metadata("design:returntype", Promise)
], EventsCustomGateway.prototype, "handleCustomSubscription", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribeCustomEvents'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)(new ws_validation_pipe_1.WsValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket,
        events_custom_subscribe_1.EventsCustomSubscribePayload]),
    tslib_1.__metadata("design:returntype", Promise)
], EventsCustomGateway.prototype, "handleCustomUnsubscribe", null);
EventsCustomGateway = EventsCustomGateway_1 = tslib_1.__decorate([
    (0, common_1.UseFilters)(ws_exceptions_filter_1.WebsocketExceptionsFilter),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, path: '/ws/subscription' }),
    tslib_1.__metadata("design:paramtypes", [events_service_1.EventsService])
], EventsCustomGateway);
exports.EventsCustomGateway = EventsCustomGateway;
//# sourceMappingURL=events.custom.gateway.js.map