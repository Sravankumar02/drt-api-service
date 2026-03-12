"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
const account_assets_1 = require("../../../common/assets/entities/account.assets");
class Account {
    constructor(init) {
        this.address = '';
        this.balance = '';
        this.nonce = 0;
        this.timestampMs = 0;
        this.timestamp = 0;
        this.shard = 0;
        this.ownerAddress = undefined;
        this.assets = undefined;
        this.ownerAssets = undefined;
        this.transfersLast24h = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Account bech32 address', example: 'drt1qga7ze0l03chfgru0a32wxqf2226nzrxnyhzer9lmudqhjgy7ycq0wn4su' }),
    tslib_1.__metadata("design:type", String)
], Account.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions({ description: 'Account current balance' })),
    tslib_1.__metadata("design:type", String)
], Account.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Account current nonce', example: 42 }),
    tslib_1.__metadata("design:type", Number)
], Account.prototype, "nonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Timestamp in milliseconds of the block where the account was first indexed', example: 1676979360000 }),
    tslib_1.__metadata("design:type", Number)
], Account.prototype, "timestampMs", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Timestamp in seconds of the block where the account was first indexed', example: 1676979360 }),
    tslib_1.__metadata("design:type", Number)
], Account.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'The shard ID allocated to the account', example: 0 }),
    tslib_1.__metadata("design:type", Number)
], Account.prototype, "shard", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Current owner address', required: false }),
    tslib_1.__metadata("design:type", Object)
], Account.prototype, "ownerAddress", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: account_assets_1.AccountAssets, nullable: true, description: 'Account assets', required: false }),
    tslib_1.__metadata("design:type", Object)
], Account.prototype, "assets", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Specific property flag for smart contract', type: Number, required: false }),
    tslib_1.__metadata("design:type", Object)
], Account.prototype, "deployedAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The contract deploy transaction hash', required: false }),
    tslib_1.__metadata("design:type", Object)
], Account.prototype, "deployTxHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: account_assets_1.AccountAssets, nullable: true, description: 'Account assets', required: false }),
    tslib_1.__metadata("design:type", Object)
], Account.prototype, "ownerAssets", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Specific property flag for smart contract', type: Boolean, required: false }),
    tslib_1.__metadata("design:type", Boolean)
], Account.prototype, "isVerified", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The number of transactions performed on this account' }),
    tslib_1.__metadata("design:type", Number)
], Account.prototype, "txCount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The number of smart contract results of this account' }),
    tslib_1.__metadata("design:type", Number)
], Account.prototype, "scrCount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Transfers in the last 24 hours', required: false }),
    tslib_1.__metadata("design:type", Object)
], Account.prototype, "transfersLast24h", void 0);
exports.Account = Account;
//# sourceMappingURL=account.js.map