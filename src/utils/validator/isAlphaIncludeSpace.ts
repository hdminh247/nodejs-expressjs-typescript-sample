import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

export function IsAlphaIncludeSpace(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsAlphaIncludeSpaceFormatConstraint
        });
    };
}

@ValidatorConstraint({ name: "IsAlphaIncludeSpace" })
export class IsAlphaIncludeSpaceFormatConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        const nameRegex = /^[A-Za-z ]+$/;

        if (!value) {
            return false
        }

        value = value.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');

        return !!nameRegex.exec(value)

    }

}