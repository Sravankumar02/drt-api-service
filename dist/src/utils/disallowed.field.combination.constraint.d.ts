import { ValidatorConstraintInterface, ValidationArguments, ValidationOptions } from 'class-validator';
export declare class DisallowedFieldCombinationConstraint implements ValidatorConstraintInterface {
    validate(_value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function DisallowedFieldCombination(validationOptions?: ValidationOptions): (target: Function) => void;
