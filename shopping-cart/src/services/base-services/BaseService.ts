import axios, { AxiosInstance } from 'axios'; // Import axios as default
import EventEmitter from "events";
import LocalStorage from "../../types/strings/local-storage/LocalStorage";
import RefreshEvents from "../../types/strings/refresh-events/RefreshEvents";
import HostURLs from "../../types/strings/urls/HostURLs";
import IJWTResponse from "../../types/dto/identity/IJWTResponse";

export abstract class BaseService {
    private static readonly hostBaseURL = HostURLs.HOST_BASE_URL;
    protected axios: AxiosInstance;
    private axiosForRefresh: AxiosInstance;

    protected constructor(baseUrl: string) {
        this.axios = this.createAxiosInstance(baseUrl);
        this.axiosForRefresh = axios.create();

        this.setupRequestInterceptor();
    }

    private createAxiosInstance(baseUrl: string): AxiosInstance {
        return axios.create({
            baseURL: `${BaseService.hostBaseURL}${baseUrl}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    private setupRequestInterceptor(): void {
        this.axios.interceptors.request.use(this.handleRequest.bind(this), this.handleRequestError);
    }

    private async handleRequest(config: any): Promise<any> {
        console.log('Starting Request', JSON.stringify(config, null, 2));

        const token = localStorage.getItem(LocalStorage.JWT);
        const refreshToken = localStorage.getItem(LocalStorage.REFRESH_TOKEN);
        const expiryTime = localStorage.getItem(LocalStorage.EXPIRY);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (this.isTokenExpired(expiryTime)) {
            const newTokens = await this.refreshToken(token!, refreshToken!);
            this.updateLocalStorage(newTokens);
            JwtRefreshEvent.emit(RefreshEvents.JWT_REFRESH_EVENT, newTokens);
            config.headers.Authorization = `Bearer ${newTokens.jwt}`;
        }

        return config;
    }

    private handleRequestError(error: any): Promise<any> {
        return Promise.reject(error);
    }

    private isTokenExpired(expiryTime: string | null): boolean {
        return expiryTime ? new Date().getTime() > Number(expiryTime) : false;
    }

    private async refreshToken(token: string, refreshToken: string): Promise<IJWTResponse> {
        const response = await this.axiosForRefresh.post<IJWTResponse>(
            `${BaseService.hostBaseURL}${HostURLs.ACCOUNT_CONTROLLER}${HostURLs.REFRESH_JWT_TOKEN}`,
            { jwt: token, refreshToken } as IJWTResponse
        );
        return response.data;
    }

    private updateLocalStorage(newTokens: IJWTResponse): void {
        localStorage.setItem(LocalStorage.JWT, newTokens.jwt);
        localStorage.setItem(LocalStorage.REFRESH_TOKEN, newTokens.refreshToken);
        localStorage.setItem(LocalStorage.EXPIRY,
            String(new Date().getTime() + (newTokens.expiresIn ?? 180) * 1000));
    }
}

export const JwtRefreshEvent = new EventEmitter();
