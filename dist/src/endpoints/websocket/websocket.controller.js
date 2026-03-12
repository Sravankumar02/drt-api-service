"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const websocket_config_1 = require("./entities/websocket.config");
const websocket_service_1 = require("./websocket.service");
let WebsocketController = class WebsocketController {
    constructor(websocketConfigService) {
        this.websocketConfigService = websocketConfigService;
    }
    getConfiguration() {
        return this.websocketConfigService.getConfiguration();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/config"),
    (0, swagger_1.ApiOperation)({ summary: 'Websocket configuration', description: 'Returns config used for accessing websocket on the same cluster' }),
    (0, swagger_1.ApiOkResponse)({ type: websocket_config_1.WebsocketConfig }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Websocket configuration not found' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", websocket_config_1.WebsocketConfig)
], WebsocketController.prototype, "getConfiguration", null);
WebsocketController = tslib_1.__decorate([
    (0, common_1.Controller)('websocket'),
    (0, swagger_1.ApiTags)('websocket'),
    tslib_1.__metadata("design:paramtypes", [websocket_service_1.WebsocketService])
], WebsocketController);
exports.WebsocketController = WebsocketController;
//# sourceMappingURL=websocket.controller.js.map