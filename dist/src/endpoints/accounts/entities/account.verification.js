"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountVerification = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const account_verification_source_1 = require("./account.verification.source");
const account_verification_status_1 = require("./account.verification.status");
class AccountVerification {
    constructor(init) {
        this.codeHash = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Source code hash' }),
    tslib_1.__metadata("design:type", String)
], AccountVerification.prototype, "codeHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Source code of contract', type: account_verification_source_1.AccountVerificationSource, required: false }),
    tslib_1.__metadata("design:type", Object)
], AccountVerification.prototype, "source", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Verifier process status', enum: account_verification_status_1.AccountVerificationStatus }),
    tslib_1.__metadata("design:type", String)
], AccountVerification.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File hash for IPFS', required: false }),
    tslib_1.__metadata("design:type", String)
], AccountVerification.prototype, "ipfsFileHash", void 0);
exports.AccountVerification = AccountVerification;
//# sourceMappingURL=account.verification.js.map