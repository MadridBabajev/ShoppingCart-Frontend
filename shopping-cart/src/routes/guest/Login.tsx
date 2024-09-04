import {ValidateAuthenticationInputs} from "../../helpers/ValidateAuthenticationInputs";
import {UseIdentityForm} from "../../helpers/custom-hooks/UseIdentityForm";
import ILoginData from "../../types/dto/identity/ILoginData";
import React from "react";
import LoginView from "./route-views/LoginView";

const Login = () => {
    const initialValues: ILoginData = {
        email: "",
        password: "",
    };

    const {
        values,
        handleChange,
        onSubmit,
        validationErrors
    } = UseIdentityForm(initialValues, ValidateAuthenticationInputs, "login");

    return (
        <LoginView
            values={values}
            handleChange={handleChange}
            onSubmit={onSubmit}
            validationErrors={validationErrors}
        />
    );
}

export default Login;