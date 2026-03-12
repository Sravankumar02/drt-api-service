"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DcdtLockedAccount = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class DcdtLockedAccount {
    constructor(init) {
        this.address = '';
        this.name = undefined;
        this.balance = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], DcdtLockedAccount.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], DcdtLockedAccount.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", Object)
], DcdtLockedAccount.prototype, "balance", void 0);
exports.DcdtLockedAccount = DcdtLockedAccount;
//# sourceMappingURL=dcdt.locked.account.js.map