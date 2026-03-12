"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionHandler = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const ws_exceptions_filter_1 = require("../../utils/ws-exceptions.filter");
let ConnectionHandler = class ConnectionHandler {
    afterInit(__server) { }
    handleDisconnect(_client) { }
    handleConnection(client, ..._args) {
        client.setMaxListeners(16);
    }
    hasSubscriptionsWithPrefixes(prefixes) {
        const rooms = this.server.sockets.adapter.rooms;
        for (const roomName of rooms.keys()) {
            if (prefixes.some(prefix => roomName.startsWith(prefix))) {
                return true;
            }
        }
        return false;
    }
};
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", socket_io_1.Server)
], ConnectionHandler.prototype, "server", void 0);
ConnectionHandler = tslib_1.__decorate([
    (0, common_1.UseFilters)(ws_exceptions_filter_1.WebsocketExceptionsFilter),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, path: '/ws/subscription' })
], ConnectionHandler);
exports.ConnectionHandler = ConnectionHandler;
//# sourceMappingURL=connection.handler.js.map