"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountVerificationSource = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class AccountVerificationSource {
    constructor(init) {
        this.abi = '';
        this.contract = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Abi file source' }),
    tslib_1.__metadata("design:type", Object)
], AccountVerificationSource.prototype, "abi", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contract source code' }),
    tslib_1.__metadata("design:type", Object)
], AccountVerificationSource.prototype, "contract", void 0);
exports.AccountVerificationSource = AccountVerificationSource;
//# sourceMappingURL=account.verification.source.js.map