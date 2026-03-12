"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../common/api-config/api.config.service");
let WebsocketService = class WebsocketService {
    constructor(apiConfigService) {
        this.apiConfigService = apiConfigService;
    }
    getConfiguration() {
        return {
            url: this.apiConfigService.getSocketUrl(),
        };
    }
};
WebsocketService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService])
], WebsocketService);
exports.WebsocketService = WebsocketService;
//# sourceMappingURL=websocket.service.js.map