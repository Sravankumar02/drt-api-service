"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const account_assets_1 = require("../../../common/assets/entities/account.assets");
class Application {
    constructor(init) {
        this.contract = '';
        this.deployer = '';
        this.owner = '';
        this.codeHash = '';
        this.timestamp = 0;
        this.assets = undefined;
        this.balance = '0';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Application.prototype, "contract", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Application.prototype, "deployer", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Application.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Application.prototype, "codeHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Application.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: account_assets_1.AccountAssets, nullable: true, description: 'Contract assets' }),
    tslib_1.__metadata("design:type", Object)
], Application.prototype, "assets", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Application.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false }),
    tslib_1.__metadata("design:type", Number)
], Application.prototype, "txCount", void 0);
exports.Application = Application;
//# sourceMappingURL=application.js.map