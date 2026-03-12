import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class NoEmptyPayloadConstraint implements ValidatorConstraintInterface {
    validate(_value: any, args: ValidationArguments): boolean;
    defaultMessage(_args: ValidationArguments): string;
}
export declare function NoEmptyPayload(validationOptions?: ValidationOptions): (target: Function) => void;
