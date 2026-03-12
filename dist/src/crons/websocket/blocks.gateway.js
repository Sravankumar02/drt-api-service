"use strict";
var BlocksGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlocksGateway = void 0;
const tslib_1 = require("tslib");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const block_service_1 = require("../../endpoints/blocks/block.service");
const block_filter_1 = require("../../endpoints/blocks/entities/block.filter");
const query_pagination_1 = require("../../common/entities/query.pagination");
const block_subscribe_1 = require("../../endpoints/blocks/entities/block.subscribe");
const common_1 = require("@nestjs/common");
const ws_exceptions_filter_1 = require("../../utils/ws-exceptions.filter");
const ws_validation_pipe_1 = require("../../utils/ws-validation.pipe");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const locking_guard_interceptor_1 = require("../../utils/locking.guard.interceptor");
let BlocksGateway = BlocksGateway_1 = class BlocksGateway {
    constructor(blockService) {
        this.blockService = blockService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(BlocksGateway_1.name);
    }
    async handleSubscription(client, payload) {
        const filterIdentifier = JSON.stringify(payload);
        const roomName = `${BlocksGateway_1.keyPrefix}${filterIdentifier}`;
        if (!client.rooms.has(roomName)) {
            await client.join(roomName);
        }
        return { status: 'success' };
    }
    async handleUnsubscribe(client, payload) {
        const filterIdentifier = JSON.stringify(payload);
        const roomName = `${BlocksGateway_1.keyPrefix}${filterIdentifier}`;
        if (client.rooms.has(roomName)) {
            await client.leave(roomName);
        }
        return { status: 'unsubscribed' };
    }
    async pushBlocksForRoom(roomName) {
        if (!roomName.startsWith(BlocksGateway_1.keyPrefix))
            return;
        try {
            const filterIdentifier = roomName.replace(BlocksGateway_1.keyPrefix, "");
            const filter = JSON.parse(filterIdentifier);
            const blockFilter = new block_filter_1.BlockFilter({
                shard: filter.shard,
                order: filter.order,
            });
            const [blocks, blocksCount] = await Promise.all([
                this.blockService.getBlocks(blockFilter, new query_pagination_1.QueryPagination({ from: filter.from, size: filter.size }), filter.withProposerIdentity),
                this.blockService.getBlocksCount(blockFilter),
            ]);
            this.server.to(roomName).emit("blocksUpdate", { blocks, blocksCount });
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async pushBlocks() {
        const promises = [];
        for (const [roomName] of this.server.sockets.adapter.rooms) {
            promises.push(this.pushBlocksForRoom(roomName));
        }
        await Promise.all(promises);
    }
};
BlocksGateway.keyPrefix = 'blocks-';
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", socket_io_1.Server)
], BlocksGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, common_1.UseInterceptors)(locking_guard_interceptor_1.LockingGuardInterceptor),
    (0, websockets_1.SubscribeMessage)('subscribeBlocks'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)(new ws_validation_pipe_1.WsValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket,
        block_subscribe_1.BlockSubscribePayload]),
    tslib_1.__metadata("design:returntype", Promise)
], BlocksGateway.prototype, "handleSubscription", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribeBlocks'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)(new ws_validation_pipe_1.WsValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket,
        block_subscribe_1.BlockSubscribePayload]),
    tslib_1.__metadata("design:returntype", Promise)
], BlocksGateway.prototype, "handleUnsubscribe", null);
BlocksGateway = BlocksGateway_1 = tslib_1.__decorate([
    (0, common_1.UseFilters)(ws_exceptions_filter_1.WebsocketExceptionsFilter),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, path: '/ws/subscription' }),
    tslib_1.__metadata("design:paramtypes", [block_service_1.BlockService])
], BlocksGateway);
exports.BlocksGateway = BlocksGateway;
//# sourceMappingURL=blocks.gateway.js.map