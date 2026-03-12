"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockingGuardInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const async_mutex_1 = require("async-mutex");
const websockets_1 = require("@nestjs/websockets");
const api_config_service_1 = require("../common/api-config/api.config.service");
let LockingGuardInterceptor = class LockingGuardInterceptor {
    constructor(apiConfigService) {
        this.apiConfigService = apiConfigService;
        this.locks = new Map();
    }
    intercept(context, next) {
        const client = context.switchToWs().getClient();
        const clientId = client === null || client === void 0 ? void 0 : client.id;
        if (!clientId) {
            return next.handle();
        }
        let tempMutex = this.locks.get(clientId);
        if (!tempMutex) {
            tempMutex = new async_mutex_1.Mutex();
            this.locks.set(clientId, tempMutex);
        }
        const mutex = tempMutex;
        return (0, rxjs_1.from)(mutex.acquire()).pipe((0, operators_1.switchMap)((release) => {
            try {
                const totalRoomsGlobal = client.nsp.server.sockets.adapter.rooms.size;
                const totalClientRooms = client.rooms.size;
                const maxGlobal = this.apiConfigService.getWebsocketMaxSubscriptionsPerInstance();
                const maxClient = this.apiConfigService.getWebsocketMaxSubscriptionsPerClient();
                if (totalRoomsGlobal >= maxGlobal) {
                    throw new websockets_1.WsException(`Max global subscriptions (${maxGlobal}) reached!`);
                }
                if (totalClientRooms >= maxClient + 1) {
                    throw new websockets_1.WsException(`Max client subscriptions (${maxClient}) reached!`);
                }
                return next.handle().pipe((0, operators_1.finalize)(() => {
                    release();
                    if (!mutex.isLocked()) {
                        this.locks.delete(clientId);
                    }
                }));
            }
            catch (err) {
                release();
                if (!mutex.isLocked()) {
                    this.locks.delete(clientId);
                }
                return (0, rxjs_1.throwError)(() => err);
            }
        }));
    }
};
LockingGuardInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService])
], LockingGuardInterceptor);
exports.LockingGuardInterceptor = LockingGuardInterceptor;
//# sourceMappingURL=locking.guard.interceptor.js.map