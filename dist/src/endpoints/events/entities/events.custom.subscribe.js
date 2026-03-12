"use strict";
var EventsCustomSubscribePayload_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsCustomSubscribePayload = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const no_empty_payload_validator_1 = require("../../../utils/no.empty.payload.validator");
let EventsCustomSubscribePayload = EventsCustomSubscribePayload_1 = class EventsCustomSubscribePayload {
    static getClassFields() {
        return ['address', 'identifier', 'logAddress'];
    }
};
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EventsCustomSubscribePayload.prototype, "address", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EventsCustomSubscribePayload.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EventsCustomSubscribePayload.prototype, "logAddress", void 0);
EventsCustomSubscribePayload = EventsCustomSubscribePayload_1 = tslib_1.__decorate([
    (0, no_empty_payload_validator_1.NoEmptyPayload)({ message: `You must add at least one filter from ${EventsCustomSubscribePayload_1.getClassFields()}` })
], EventsCustomSubscribePayload);
exports.EventsCustomSubscribePayload = EventsCustomSubscribePayload;
//# sourceMappingURL=events.custom.subscribe.js.map