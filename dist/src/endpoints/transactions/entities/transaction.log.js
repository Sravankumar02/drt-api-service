"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionLog = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const account_assets_1 = require("../../../common/assets/entities/account.assets");
const transaction_log_event_1 = require("./transaction.log.event");
class TransactionLog {
    constructor(init) {
        this.id = undefined;
        this.address = '';
        this.addressAssets = undefined;
        this.events = [];
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Transaction log ID', type: String }),
    tslib_1.__metadata("design:type", Object)
], TransactionLog.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Transaction log address', type: String }),
    tslib_1.__metadata("design:type", String)
], TransactionLog.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Transaction address assets', type: account_assets_1.AccountAssets, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], TransactionLog.prototype, "addressAssets", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Transaction log events', type: transaction_log_event_1.TransactionLogEvent, isArray: true }),
    tslib_1.__metadata("design:type", Array)
], TransactionLog.prototype, "events", void 0);
exports.TransactionLog = TransactionLog;
//# sourceMappingURL=transaction.log.js.map