import IRegisterData from "../../types/dto/identity/IRegisterData";
import React from "react";
import {ValidateAuthenticationInputs} from "../../helpers/ValidateAuthenticationInputs";
import {UseIdentityForm} from "../../helpers/custom-hooks/UseIdentityForm";
import RegisterView from "./route-views/RegisterView";

const Register = () => {
    const initialValues: IRegisterData = {
        password: "",
        confirmPassword: "",
        email: "",
        firstName: "",
        lastName: "",
    };

    const {
        values,
        handleChange,
        onSubmit,
        validationErrors
    } = UseIdentityForm(initialValues, ValidateAuthenticationInputs, "register");

    return (
        <RegisterView
            values={values as IRegisterData}
            handleChange={handleChange}
            onSubmit={onSubmit}
            validationErrors={validationErrors}
        />
    );
}
export default Register;