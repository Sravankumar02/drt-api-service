"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsValidationPipe = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
let WsValidationPipe = class WsValidationPipe extends common_1.ValidationPipe {
    constructor(options) {
        super(Object.assign({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: (errors) => new websockets_1.WsException(errors) }, options));
    }
};
WsValidationPipe = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], WsValidationPipe);
exports.WsValidationPipe = WsValidationPipe;
//# sourceMappingURL=ws-validation.pipe.js.map