"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDcdtHistory = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const account_history_1 = require("./account.history");
class AccountDcdtHistory extends account_history_1.AccountHistory {
    constructor(init) {
        super();
        this.token = '';
        this.identifier = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'WREWA-bd4d79' }),
    tslib_1.__metadata("design:type", String)
], AccountDcdtHistory.prototype, "token", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'XPACHIEVE-5a0519-01' }),
    tslib_1.__metadata("design:type", Object)
], AccountDcdtHistory.prototype, "identifier", void 0);
exports.AccountDcdtHistory = AccountDcdtHistory;
//# sourceMappingURL=account.dcdt.history.js.map