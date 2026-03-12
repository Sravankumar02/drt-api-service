"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountHistory = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
class AccountHistory {
    constructor(init) {
        this.address = '';
        this.balance = '';
        this.timestamp = 0;
        this.isSender = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'drt1qga7ze0l03chfgru0a32wxqf2226nzrxnyhzer9lmudqhjgy7ycq0wn4su' }),
    tslib_1.__metadata("design:type", String)
], AccountHistory.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], AccountHistory.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 10000 }),
    tslib_1.__metadata("design:type", Number)
], AccountHistory.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true, example: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], AccountHistory.prototype, "isSender", void 0);
exports.AccountHistory = AccountHistory;
//# sourceMappingURL=account.history.js.map