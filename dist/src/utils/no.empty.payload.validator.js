"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoEmptyPayload = exports.NoEmptyPayloadConstraint = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
let NoEmptyPayloadConstraint = class NoEmptyPayloadConstraint {
    validate(_value, args) {
        const object = args.object;
        if (!object) {
            return false;
        }
        return Object.keys(object).some((key) => {
            const propertyValue = object[key];
            return propertyValue !== undefined && propertyValue !== null;
        });
    }
    defaultMessage(_args) {
        return 'Payload cannot be empty. At least one property must be provided.';
    }
};
NoEmptyPayloadConstraint = tslib_1.__decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], NoEmptyPayloadConstraint);
exports.NoEmptyPayloadConstraint = NoEmptyPayloadConstraint;
function NoEmptyPayload(validationOptions) {
    return function (target) {
        (0, class_validator_1.registerDecorator)({
            target: target,
            propertyName: '',
            options: validationOptions,
            constraints: [],
            validator: NoEmptyPayloadConstraint,
        });
    };
}
exports.NoEmptyPayload = NoEmptyPayload;
//# sourceMappingURL=no.empty.payload.validator.js.map