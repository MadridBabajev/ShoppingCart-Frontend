import {IRegisterInputProps} from "../../../types/props/authorization/IRegisterInputProps";
import {ILoginProps} from "../../../types/props/authorization/ILoginProps";
import "../../../styles/pages/login-register.scss"

const LoginView = (props: ILoginProps) => {

    return (
        <div className="content-wrapper">
            <form className="form-container">
                <h2>Login</h2>

                <ul style={{'display': props.validationErrors.length === 0 ? 'none' : '', 'paddingLeft': '0'}}>
                    <li className="error-message">
                        * {props.validationErrors.length > 0 ? props.validationErrors[0] : ''}
                    </li>
                </ul>

                <LoginInputFields {...props} />

                <button
                    onClick={(e) => props.onSubmit(e)}
                    id="loginSubmit" className="w-100 btn btn-lg btn-primary">Login
                </button>
            </form>
        </div>
    );
}

const LoginInputFields = (loginProps: ILoginProps) => {
    return (
        <>
            <LoginInput id="Input_Email" name="email" type="email"
                        autoComplete="username" placeholder="name@example.com"
                        value={loginProps.values.email} label="Email"
                        handleChange={(e) => loginProps.handleChange(e)}/>
            <LoginInput id="Input_Password" name="password" type="password"
                        autoComplete="current-password" placeholder="password"
                        value={loginProps.values.password} label="Password"
                        handleChange={(e) => loginProps.handleChange(e)}/>
        </>
    )
}

const LoginInput = (props: IRegisterInputProps) => {
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

export default LoginView;