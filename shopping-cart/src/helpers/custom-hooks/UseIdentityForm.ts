import LocalStorage from "../../types/strings/local-storage/LocalStorage";
import {notificationManager} from "../NotificationManager";
import {useContext, useState} from "react";
import IJWTResponse from "../../types/dto/identity/IJWTResponse";
import {IdentityService} from "../../services/app-services/Identity/IdentityService";
import JwtContext from "../../types/context/jwt-context/JwtContext";
import {useNavigate} from "react-router-dom";
import ILoginData from "../../types/dto/identity/ILoginData";
import IRegisterData from "../../types/dto/identity/IRegisterData";
import {IdentityServiceResponse} from "../../types/dto/identity/IdentityServiceResponse";
import {Navigations} from "../../types/navigations/Navigations";
import {NotificationMessages} from "../../types/strings/notifications/NotificationMessages";
import {MouseEvent} from "react";

type InitialValuesType = ILoginData | IRegisterData;
type ValidateInputsFunction = (values: ILoginData | IRegisterData) => string[];
type SubmitFunctionType = "login" | "register";

export const UseIdentityForm = (
    initialValues: InitialValuesType,
    validateInputs: ValidateInputsFunction,
    submitFunction: SubmitFunctionType
) => {
    const navigate = useNavigate();
    const {setJwtResponse} = useContext(JwtContext);
    const identityService = new IdentityService();
    const [jwtData, setJwtData] = useState<IJWTResponse | undefined>();

    const [values, setInput] = useState(initialValues);
    const [validationErrors, setValidationErrors] = useState([] as string[]);

    // Handler for form inputs changes
    const handleChange = (target: EventTarget & HTMLInputElement) => {
        const value = target.value;
        setInput({ ...values, [target.name]: value });
    }

    const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        // Checks for errors and, if there are any, adds them to a list
        const errors = validateInputs(values);
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors([]);

        // Sends a request to the correct API endpoint (login, register)
        let response: IdentityServiceResponse | undefined;
        if (submitFunction === 'login') {
            response = await identityService.login(values as ILoginData);
        } else if (submitFunction === 'register') {
            response = await identityService.register(values as IRegisterData);
        }

        // If there was no response, or it contains error, do not proceed with authorization
        if (!response) {
            setValidationErrors(["Error while authenticating"]);
            return;
        }

        const [jwtData, error] = response;

        if (error) {
            setValidationErrors([error.Error || "Unknown error"]);
            return;
        }

        // Lastly, authorize the user by setting the jwt token to context and the local storage
        if (jwtData) {
            setJwtData(jwtData);
            setJwtResponse!(jwtData);

            localStorage.setItem(LocalStorage.JWT, jwtData.jwt);
            localStorage.setItem(LocalStorage.REFRESH_TOKEN, jwtData.refreshToken);

            const expiryTime = Date.now() + ((jwtData.expiresIn ?? 1) * 1000);
            localStorage.setItem(LocalStorage.EXPIRY, String(expiryTime));

            // Once authorized, the user gets redirected
            notificationManager.showSuccessNotification(NotificationMessages.USER_AUTHORIZED);
            navigate(Navigations.SHOP_CART, { state: { jwtData } });
        }
    }

    return {
        values,
        jwtData,
        handleChange,
        onSubmit,
        validationErrors
    }
}