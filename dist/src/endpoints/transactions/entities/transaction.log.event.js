"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionLogEvent = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const account_assets_1 = require("../../../common/assets/entities/account.assets");
class TransactionLogEvent {
    constructor(init) {
        this.address = '';
        this.addressAssets = undefined;
        this.identifier = '';
        this.topics = [];
        this.data = '';
        this.order = 0;
        this.additionalData = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionLogEvent.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: account_assets_1.AccountAssets, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], TransactionLogEvent.prototype, "addressAssets", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionLogEvent.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Array)
], TransactionLogEvent.prototype, "topics", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], TransactionLogEvent.prototype, "data", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], TransactionLogEvent.prototype, "order", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Object)
], TransactionLogEvent.prototype, "additionalData", void 0);
exports.TransactionLogEvent = TransactionLogEvent;
//# sourceMappingURL=transaction.log.event.js.map