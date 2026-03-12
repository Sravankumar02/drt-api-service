"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkConfig = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class NetworkConfig {
    constructor(init) {
        this.roundsPassed = 0;
        this.roundsPerEpoch = 0;
        this.roundDuration = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The number of rounds passed' }),
    tslib_1.__metadata("design:type", Object)
], NetworkConfig.prototype, "roundsPassed", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The number of rounds per epoch' }),
    tslib_1.__metadata("design:type", Object)
], NetworkConfig.prototype, "roundsPerEpoch", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The duration of a round' }),
    tslib_1.__metadata("design:type", Object)
], NetworkConfig.prototype, "roundDuration", void 0);
exports.NetworkConfig = NetworkConfig;
//# sourceMappingURL=network.config.js.map