import { BaseService } from '../../base-services/BaseService';
import HostURLs from '../../../types/strings/urls/HostURLs';
import { AxiosError } from 'axios';
import IError from '../../../types/errors/IError';
import IJWTResponse from '../../../types/dto/identity/IJWTResponse';
import { IdentityServiceResponse } from '../../../types/dto/identity/IdentityServiceResponse';
import IRegisterData from '../../../types/dto/identity/IRegisterData';
import ILoginData from '../../../types/dto/identity/ILoginData';
import { ILogout } from '../../../types/dto/identity/ILogout';
import LocalStorage from "../../../types/strings/local-storage/LocalStorage";

export class IdentityService extends BaseService {
    constructor() {
        super(HostURLs.ACCOUNT_CONTROLLER);
    }

    // Register a new user
    async register(data: IRegisterData): Promise<IdentityServiceResponse> {
        try {
            const response = await this.axios.post(HostURLs.REGISTER, data);
            return response.status === 200
                ? [response.data, null]
                : [null, { Error: response.data.error }];
        } catch (error) {
            const axiosError = error as AxiosError<IError>;
            console.error('Registration error:', axiosError.message);
            return [null, { Status: axiosError.response?.status, Error: axiosError.response?.data.Error || axiosError.message }];
        }
    }

    // Log in a user and return JWT and refresh tokens
    async login(data: ILoginData): Promise<IdentityServiceResponse> {
        try {
            const response = await this.axios.post<IJWTResponse>(HostURLs.LOGIN, data);
            return response.status === 200
                ? [response.data, null]
                : [null, { Error: 'Login failed, status code not 200' }];
        } catch (e) {
            const axiosError = e as AxiosError<IError>;
            console.error('Login error:', axiosError.message);
            return [null, { Status: axiosError.response?.status, Error: axiosError.response?.data.Error || axiosError.message }];
        }
    }

    // Log out a user by sending the refresh token
    async logout(data: ILogout): Promise<boolean> {
        try {
            const token = localStorage.getItem(LocalStorage.JWT);
            if (token) {
                this.axios.defaults.headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await this.axios.post(HostURLs.LOGOUT, data);
            console.log('Logout successful');
            return response.status === 200;
        } catch (e) {
            const axiosError = e as AxiosError<IError>;
            console.error('Logout error:', axiosError.message);
            return false;
        }
    }
}
