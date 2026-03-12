"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisallowedFieldCombination = exports.DisallowedFieldCombinationConstraint = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
let DisallowedFieldCombinationConstraint = class DisallowedFieldCombinationConstraint {
    validate(_value, args) {
        const object = args.object;
        if (typeof object.constructor.getFieldsSubstitutions !== 'function') {
            return true;
        }
        const substitutions = object.constructor.getFieldsSubstitutions();
        for (const [mainField, conflictingFields] of Object.entries(substitutions)) {
            if (object[mainField] !== undefined && object[mainField] !== null) {
                const hasConflict = conflictingFields.some((field) => object[field] !== undefined && object[field] !== null);
                if (hasConflict) {
                    return false;
                }
            }
        }
        return true;
    }
    defaultMessage(args) {
        const object = args.object;
        if (typeof object.constructor.getFieldsSubstitutions !== 'function') {
            return 'Validation error';
        }
        const substitutions = object.constructor.getFieldsSubstitutions();
        for (const [mainField, conflictingFields] of Object.entries(substitutions)) {
            if (object[mainField]) {
                const conflicts = conflictingFields.filter((field) => object[field] !== undefined && object[field] !== null);
                if (conflicts.length > 0) {
                    return `You cannot provide '${mainField}' simultaneously with: ${conflicts.join(', ')}.`;
                }
            }
        }
        return 'Mutual exclusivity validation failed.';
    }
};
DisallowedFieldCombinationConstraint = tslib_1.__decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'disallowedFieldCombination', async: false })
], DisallowedFieldCombinationConstraint);
exports.DisallowedFieldCombinationConstraint = DisallowedFieldCombinationConstraint;
function DisallowedFieldCombination(validationOptions) {
    return function (target) {
        (0, class_validator_1.registerDecorator)({
            name: 'disallowedFieldCombination',
            target: target,
            propertyName: '',
            options: validationOptions,
            constraints: [],
            validator: DisallowedFieldCombinationConstraint,
        });
    };
}
exports.DisallowedFieldCombination = DisallowedFieldCombination;
//# sourceMappingURL=disallowed.field.combination.constraint.js.map