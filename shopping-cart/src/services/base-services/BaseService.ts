import Axios, { AxiosInstance } from 'axios';
import EventEmitter from 'events';
import LocalStorage from '../../types/strings/local-storage/LocalStorage';
import HostURLs from '../../types/strings/urls/HostURLs';
import {Navigations} from "../../types/navigations/Navigations";

export abstract class BaseService {
    private static hostBaseURL = HostURLs.API_BASE_URL;  // Base URL for API

    protected axios: AxiosInstance;  // Axios instance for general API calls
    private axiosForRefresh: AxiosInstance;  // Separate Axios instance for refresh token requests

    protected constructor(baseUrl: string) {
        this.axios = Axios.create();
        this.axiosForRefresh = Axios.create();

        // Set the base URL for the axios instance.
        this.axios.defaults.baseURL = BaseService.hostBaseURL + baseUrl;
        this.axios.defaults.headers.common['Content-Type'] = 'application/json';

        // Interceptor to handle token refresh if the JWT has expired.
        this.axios.interceptors.request.use(async (config) => {
            const token = localStorage.getItem(LocalStorage.JWT);
            const expiryTime = localStorage.getItem(LocalStorage.EXPIRY);

            if (token) {
                // Check if the JWT token has expired
                if (expiryTime && new Date().getTime() > Number(expiryTime)) {
                    try {
                        // Token has expired, attempt to refresh it using the refresh token
                        const refreshToken = localStorage.getItem(LocalStorage.REFRESH_TOKEN);
                        const response = await this.axiosForRefresh.post(
                            `${BaseService.hostBaseURL}${HostURLs.ACCOUNT_CONTROLLER}${HostURLs.REFRESH_JWT_TOKEN}`,
                            { jwt: token, refreshToken }  // Pass the current JWT and refresh token
                        );
                        const newJwt = response.data.jwt;

                        // Store the new JWT and refresh token in localStorage
                        localStorage.setItem(LocalStorage.JWT, newJwt);
                        localStorage.setItem(LocalStorage.REFRESH_TOKEN, response.data.refreshToken);
                        localStorage.setItem(LocalStorage.EXPIRY, String(new Date().getTime() + response.data.expiresIn * 1000));

                        // Update the request with the new JWT in the Authorization header
                        config.headers.Authorization = `Bearer ${newJwt}`;
                    } catch (error) {
                        console.error("Token refresh failed", error);
                        window.location.replace(`https://localhost/${Navigations.LOGIN}`);
                    }
                } else {
                    // If token is still valid, attach it to the request headers
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        });
    }
}

// Event emitter to trigger JWT refresh
export const JwtRefreshEvent = new EventEmitter();