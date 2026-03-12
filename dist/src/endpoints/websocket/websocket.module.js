"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const websocket_service_1 = require("./websocket.service");
let WebsocketModule = class WebsocketModule {
};
WebsocketModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [
            websocket_service_1.WebsocketService,
        ],
        exports: [
            websocket_service_1.WebsocketService,
        ],
    })
], WebsocketModule);
exports.WebsocketModule = WebsocketModule;
//# sourceMappingURL=websocket.module.js.map