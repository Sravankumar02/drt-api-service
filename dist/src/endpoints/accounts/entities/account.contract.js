"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountContract = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const account_assets_1 = require("../../../common/assets/entities/account.assets");
class AccountContract {
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
], AccountContract.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], AccountContract.prototype, "deployTxHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], AccountContract.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: account_assets_1.AccountAssets, nullable: true, description: 'Contract assets' }),
    tslib_1.__metadata("design:type", Object)
], AccountContract.prototype, "assets", void 0);
exports.AccountContract = AccountContract;
//# sourceMappingURL=account.contract.js.map