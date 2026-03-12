"use strict";
var NetworkGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkGateway = void 0;
const tslib_1 = require("tslib");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const network_service_1 = require("../../endpoints/network/network.service");
const common_1 = require("@nestjs/common");
const ws_exceptions_filter_1 = require("../../utils/ws-exceptions.filter");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const locking_guard_interceptor_1 = require("../../utils/locking.guard.interceptor");
let NetworkGateway = NetworkGateway_1 = class NetworkGateway {
    constructor(networkService) {
        this.networkService = networkService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(NetworkGateway_1.name);
    }
    async handleSubscription(client) {
        if (!client.rooms.has('statsRoom')) {
            await client.join('statsRoom');
        }
        return { status: 'success' };
    }
    async handleUnsubscribe(client) {
        if (client.rooms.has('statsRoom')) {
            await client.leave('statsRoom');
        }
        return { status: 'unsubscribed' };
    }
    async pushStats() {
        if (this.server.sockets.adapter.rooms.has('statsRoom')) {
            try {
                const stats = await this.networkService.getStats();
                this.server.to('statsRoom').emit('statsUpdate', stats);
            }
            catch (error) {
                this.logger.error(error);
            }
        }
    }
};
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", socket_io_1.Server)
], NetworkGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, common_1.UseInterceptors)(locking_guard_interceptor_1.LockingGuardInterceptor),
    (0, websockets_1.SubscribeMessage)('subscribeStats'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket]),
    tslib_1.__metadata("design:returntype", Promise)
], NetworkGateway.prototype, "handleSubscription", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribeStats'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket]),
    tslib_1.__metadata("design:returntype", Promise)
], NetworkGateway.prototype, "handleUnsubscribe", null);
NetworkGateway = NetworkGateway_1 = tslib_1.__decorate([
    (0, common_1.UseFilters)(ws_exceptions_filter_1.WebsocketExceptionsFilter),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, path: '/ws/subscription' }),
    tslib_1.__metadata("design:paramtypes", [network_service_1.NetworkService])
], NetworkGateway);
exports.NetworkGateway = NetworkGateway;
//# sourceMappingURL=network.gateway.js.map