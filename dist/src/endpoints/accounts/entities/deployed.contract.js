"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployedContract = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const account_assets_1 = require("../../../common/assets/entities/account.assets");
class DeployedContract {
    constructor(init) {
        this.address = "";
        this.deployTxHash = "";
        this.timestamp = 0;
        this.assets = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], DeployedContract.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], DeployedContract.prototype, "deployTxHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], DeployedContract.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: account_assets_1.AccountAssets, nullable: true, required: false, description: 'Contract assets' }),
    tslib_1.__metadata("design:type", Object)
], DeployedContract.prototype, "assets", void 0);
exports.DeployedContract = DeployedContract;
//# sourceMappingURL=deployed.contract.js.map