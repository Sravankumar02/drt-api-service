"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsSubscribePayload = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class EventsSubscribePayload {
    constructor() {
        this.from = 0;
        this.size = 25;
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    tslib_1.__metadata("design:type", Number)
], EventsSubscribePayload.prototype, "shard", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsIn)([0], { message: 'from can only be 0' }),
    tslib_1.__metadata("design:type", Number)
], EventsSubscribePayload.prototype, "from", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'minimum size is 1' }),
    (0, class_validator_1.Max)(50, { message: 'maximum size is 50' }),
    tslib_1.__metadata("design:type", Number)
], EventsSubscribePayload.prototype, "size", void 0);
exports.EventsSubscribePayload = EventsSubscribePayload;
//# sourceMappingURL=events.subscribe.js.map