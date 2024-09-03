import {IRegisterInputProps} from "../../../types/props/authorization/IRegisterInputProps";
import {IRegisterProps} from "../../../types/props/authorization/IRegisterProps";
import "../../../styles/pages/login-register.scss"

const RegisterView = (props: IRegisterProps) => {

    return (
        <div className="content-wrapper">
            <form className="form-container">
                <h2>Become a user</h2>

                <ul style={{'display': props.validationErrors.length === 0 ? 'none' : '', 'paddingLeft': '0'}}>
                    <li className="error-message">
                        * {props.validationErrors.length > 0 ? props.validationErrors[0] : ''}
                    </li>
                </ul>

                <RegisterInputFields {...props} />

                <button
                    onClick={(e) => props.onSubmit(e)}
                    id="registerSubmit" className="w-100 btn btn-lg btn-primary">Register
                </button>
            </form>
        </div>
    );
}

const RegisterInputFields = (registerProps: IRegisterProps) => {
    return (
        <>
            <RegisterInput id="Input_Email" name="email" type="email"
                           autoComplete="username" placeholder="name@example.com"
                           value={registerProps.values.email} label="Email"
                           handleChange={(e) => registerProps.handleChange(e)}/>
            <RegisterInput id="Input_Password" name="password" type="password"
                           autoComplete="new-password" placeholder="password"
                           value={registerProps.values.password} label="Password"
                           handleChange={(e) => registerProps.handleChange(e)}/>
            <RegisterInput id="Input_ConfirmPassword" name="confirmPassword" type="password"
                           autoComplete="new-password" placeholder="password"
                           value={registerProps.values.confirmPassword} label="Confirm password"
                           handleChange={(e) => registerProps.handleChange(e)}/>
            <RegisterInput id="Input_FirstName" name="firstName" type="text"
                           autoComplete="firstname" placeholder="First name"
                           value={registerProps.values.firstName} label="First name"
                           handleChange={(e) => registerProps.handleChange(e)}/>
            <RegisterInput id="Input_LastName" name="lastName" type="text"
                           autoComplete="lastname" placeholder="LastName"
                           value={registerProps.values.lastName} label="Last name"
                           handleChange={(e) => registerProps.handleChange(e)}/>
        </>
    )
}

const RegisterInput = (props: IRegisterInputProps) => {
    return (
        <div className="form-floating mb-3">
            <input
                onChange={(e) => props.handleChange(e.target)}
                value={props.value}
                className="form-control"
                autoComplete={props.autoComplete}
                aria-required="true"
                placeholder={props.placeholder}
                type={props.type}
                id={props.id}
                name={props.name}
                maxLength={props.maxLength}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
};

export default RegisterView;