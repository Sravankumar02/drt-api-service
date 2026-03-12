"use strict";
var TransferCustomSubscribePayload_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferCustomSubscribePayload = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const disallowed_field_combination_constraint_1 = require("../../../utils/disallowed.field.combination.constraint");
const no_empty_payload_validator_1 = require("../../../utils/no.empty.payload.validator");
let TransferCustomSubscribePayload = TransferCustomSubscribePayload_1 = class TransferCustomSubscribePayload {
    static getClassFields() {
        return ['function', 'receiver', 'sender', 'relayer', 'address', 'token'];
    }
    static getFieldsSubstitutions() {
        return {
            address: ['sender', 'receiver', 'relayer'],
        };
    }
};
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TransferCustomSubscribePayload.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TransferCustomSubscribePayload.prototype, "receiver", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TransferCustomSubscribePayload.prototype, "relayer", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TransferCustomSubscribePayload.prototype, "function", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TransferCustomSubscribePayload.prototype, "address", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TransferCustomSubscribePayload.prototype, "token", void 0);
TransferCustomSubscribePayload = TransferCustomSubscribePayload_1 = tslib_1.__decorate([
    (0, no_empty_payload_validator_1.NoEmptyPayload)({ message: `You must add at least one filter from ${TransferCustomSubscribePayload_1.getClassFields()}` }),
    (0, disallowed_field_combination_constraint_1.DisallowedFieldCombination)()
], TransferCustomSubscribePayload);
exports.TransferCustomSubscribePayload = TransferCustomSubscribePayload;
//# sourceMappingURL=transfers.custom.payload.js.map