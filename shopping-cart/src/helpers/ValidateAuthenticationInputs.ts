import IRegisterData from "../types/dto/identity/IRegisterData";
import Patterns from "../types/strings/patterns/Patterns";
import FormValidationErrors from "../types/strings/errors/FormValidationErrors";
import ILoginData from "../types/dto/identity/ILoginData";

export const ValidateAuthenticationInputs = (values: ILoginData | IRegisterData): string[] => {
    const validationErrors: string[] = [];

    if ('confirmPassword' in values) { // values is of type IRegisterData

        const registerProps = values as IRegisterData;

        if (registerProps.email.length === 0) validationErrors.push(FormValidationErrors.EMAIL_REQUIRED);
        if (registerProps.password.length === 0) validationErrors.push(FormValidationErrors.PASSWORD_REQUIRED);
        if (registerProps.firstName.length === 0) validationErrors.push(FormValidationErrors.FIRST_NAME_REQUIRED);
        if (registerProps.lastName.length === 0) validationErrors.push(FormValidationErrors.LAST_NAME_REQUIRED);

        const emailRegex = new RegExp(Patterns.VALID_EMAIL);
        const passwordRegex = new RegExp(Patterns.VALID_PASSWORD);

        if (!emailRegex.test(registerProps.email)) validationErrors.push(FormValidationErrors.EMAIL_INVALID);
        if (!passwordRegex.test(registerProps.password)) validationErrors.push(FormValidationErrors.WEAK_PASSWORD);

        if (registerProps.password !== registerProps.confirmPassword) validationErrors.push(FormValidationErrors.PASSWORDS_MISMATCH);
    } else if ('email' in values) { // values is of type ILoginData
        const loginProps = values as ILoginData;
        if (loginProps.email.length === 0) validationErrors.push(FormValidationErrors.EMAIL_REQUIRED);
        if (loginProps.password.length === 0) validationErrors.push(FormValidationErrors.PASSWORD_REQUIRED);
    }

    return validationErrors;
}