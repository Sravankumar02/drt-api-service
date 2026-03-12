"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketConfig = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class WebsocketConfig {
    constructor() {
        this.url = '';
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], WebsocketConfig.prototype, "url", void 0);
exports.WebsocketConfig = WebsocketConfig;
//# sourceMappingURL=websocket.config.js.map