"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountUsername = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
class AccountUsername {
    constructor(init) {
        this.address = '';
        this.balance = '';
        this.rootHash = '';
        this.username = '';
        this.developerReward = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'drt1qga7ze0l03chfgru0a32wxqf2226nzrxnyhzer9lmudqhjgy7ycq0wn4su' }),
    tslib_1.__metadata("design:type", String)
], AccountUsername.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 12, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], AccountUsername.prototype, "nonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], AccountUsername.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '829LsRk/pB5HCJZTvZzkBJ8g4ca1RiBpYjLzzK61pwM=' }),
    tslib_1.__metadata("design:type", String)
], AccountUsername.prototype, "rootHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 47, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], AccountUsername.prototype, "txCount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 49, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], AccountUsername.prototype, "scrCount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'alice.numbat' }),
    tslib_1.__metadata("design:type", String)
], AccountUsername.prototype, "username", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 0, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], AccountUsername.prototype, "shard", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, default: 0 }),
    tslib_1.__metadata("design:type", String)
], AccountUsername.prototype, "developerReward", void 0);
exports.AccountUsername = AccountUsername;
//# sourceMappingURL=account.username.js.map