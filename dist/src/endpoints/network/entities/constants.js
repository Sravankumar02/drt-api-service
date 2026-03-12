"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkConstants = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class NetworkConstants {
    constructor(init) {
        this.chainId = '';
        this.gasPerDataByte = 0;
        this.minGasLimit = 0;
        this.minGasPrice = 0;
        this.minTransactionVersion = 0;
        this.gasPriceModifier = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The chain identifier' }),
    tslib_1.__metadata("design:type", String)
], NetworkConstants.prototype, "chainId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Gas per data byte' }),
    tslib_1.__metadata("design:type", Number)
], NetworkConstants.prototype, "gasPerDataByte", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Minimum gas limit' }),
    tslib_1.__metadata("design:type", Number)
], NetworkConstants.prototype, "minGasLimit", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Minimum gas price' }),
    tslib_1.__metadata("design:type", Number)
], NetworkConstants.prototype, "minGasPrice", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Minimum transaction version' }),
    tslib_1.__metadata("design:type", Number)
], NetworkConstants.prototype, "minTransactionVersion", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Gas price modifier' }),
    tslib_1.__metadata("design:type", String)
], NetworkConstants.prototype, "gasPriceModifier", void 0);
exports.NetworkConstants = NetworkConstants;
//# sourceMappingURL=constants.js.map