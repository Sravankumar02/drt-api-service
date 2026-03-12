"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountKey = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
class AccountKey {
    constructor(init) {
        this.blsKey = '';
        this.stake = '';
        this.topUp = '';
        this.status = '';
        this.rewardAddress = '';
        this.queueIndex = undefined;
        this.queueSize = undefined;
        this.remainingUnBondPeriod = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '2ef384d4d38bf3aad5cef34ce6eab047fba6d52b9735dbfdf7591289ed9c26ac7e816c9bb56ebf4f09129f045860f401275a91009befb4dc8ddc24ea4bc597290bd916b9f984c2a415ec9b2cfbc4a09de42c032314e6a21e69daf76302fcaa99' }),
    tslib_1.__metadata("design:type", String)
], AccountKey.prototype, "blsKey", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], AccountKey.prototype, "stake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], AccountKey.prototype, "topUp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'online' }),
    tslib_1.__metadata("design:type", String)
], AccountKey.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'drt1qga7ze0l03chfgru0a32wxqf2226nzrxnyhzer9lmudqhjgy7ycq0wn4su' }),
    tslib_1.__metadata("design:type", String)
], AccountKey.prototype, "rewardAddress", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, example: '2' }),
    tslib_1.__metadata("design:type", Object)
], AccountKey.prototype, "queueIndex", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, example: '100' }),
    tslib_1.__metadata("design:type", Object)
], AccountKey.prototype, "queueSize", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 10 }),
    tslib_1.__metadata("design:type", Object)
], AccountKey.prototype, "remainingUnBondPeriod", void 0);
exports.AccountKey = AccountKey;
//# sourceMappingURL=account.key.js.map