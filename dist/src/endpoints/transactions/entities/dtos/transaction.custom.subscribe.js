"use strict";
var TransactionCustomSubscribePayload_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionCustomSubscribePayload = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const no_empty_payload_validator_1 = require("../../../../utils/no.empty.payload.validator");
let TransactionCustomSubscribePayload = TransactionCustomSubscribePayload_1 = class TransactionCustomSubscribePayload {
    static getClassFields() {
        return ['function', 'receiver', 'sender'];
    }
};
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TransactionCustomSubscribePayload.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TransactionCustomSubscribePayload.prototype, "receiver", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TransactionCustomSubscribePayload.prototype, "function", void 0);
TransactionCustomSubscribePayload = TransactionCustomSubscribePayload_1 = tslib_1.__decorate([
    (0, no_empty_payload_validator_1.NoEmptyPayload)({ message: `You must add at least one filter from ${TransactionCustomSubscribePayload_1.getClassFields()}` })
], TransactionCustomSubscribePayload);
exports.TransactionCustomSubscribePayload = TransactionCustomSubscribePayload;
//# sourceMappingURL=transaction.custom.subscribe.js.map