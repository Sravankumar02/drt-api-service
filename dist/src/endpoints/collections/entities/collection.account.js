"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionAccount = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class CollectionAccount {
    constructor(init) {
        this.address = '';
        this.balance = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'drt1qga7ze0l03chfgru0a32wxqf2226nzrxnyhzer9lmudqhjgy7ycq0wn4su' }),
    tslib_1.__metadata("design:type", String)
], CollectionAccount.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, default: '1' }),
    tslib_1.__metadata("design:type", String)
], CollectionAccount.prototype, "balance", void 0);
exports.CollectionAccount = CollectionAccount;
//# sourceMappingURL=collection.account.js.map