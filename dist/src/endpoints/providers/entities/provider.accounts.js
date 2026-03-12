"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderAccounts = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class ProviderAccounts {
    constructor(init) {
        this.address = '';
        this.stake = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, example: 'drt1qga7ze0l03chfgru0a32wxqf2226nzrxnyhzer9lmudqhjgy7ycq0wn4su' }),
    tslib_1.__metadata("design:type", String)
], ProviderAccounts.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, example: '9999109666430000000' }),
    tslib_1.__metadata("design:type", String)
], ProviderAccounts.prototype, "stake", void 0);
exports.ProviderAccounts = ProviderAccounts;
//# sourceMappingURL=provider.accounts.js.map