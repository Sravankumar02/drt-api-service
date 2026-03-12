"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketExceptionsFilter = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
let WebsocketExceptionsFilter = class WebsocketExceptionsFilter extends websockets_1.BaseWsExceptionFilter {
    catch(exception, host) {
        const client = host.switchToWs().getClient();
        const pattern = host.switchToWs().getPattern();
        const data = host.switchToWs().getData();
        const error = exception.getError();
        client.emit('error', {
            pattern,
            data,
            error,
        });
    }
};
WebsocketExceptionsFilter = tslib_1.__decorate([
    (0, common_1.Catch)(websockets_1.WsException)
], WebsocketExceptionsFilter);
exports.WebsocketExceptionsFilter = WebsocketExceptionsFilter;
//# sourceMappingURL=ws-exceptions.filter.js.map