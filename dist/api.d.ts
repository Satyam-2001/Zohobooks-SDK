import { AxiosInstance, AxiosRequestConfig } from "axios";
export type ZohoResponse<T = any> = T & {
    code: number;
    message: string;
};
export type PageContext<T extends Record<string, any> = {}> = T & {
    page: number;
    per_page: number;
    has_more_page: boolean;
};
export declare enum APIHost {
    UnitedStates = "https://www.zohoapis.com/books/v3/",
    Europe = "https://www.zohoapis.eu/books/v3/",
    India = "https://www.zohoapis.in/books/v3/",
    Australia = "https://www.zohoapis.com.au/books/v3/",
    Japan = "https://www.zohoapis.jp/books/v3/",
    Canada = "https://www.zohoapis.ca/books/v3/",
    China = "https://www.zohoapis.com.cn/books/v3/",
    SaudiArabia = "https://www.zohoapis.sa/books/v3/"
}
export interface ZohoBooksConfig {
    host: APIHost;
    refreshToken: string;
    organizationId: string;
    clientId: string;
    clientSecret: string;
    logger?: boolean;
    autoRefreshToken?: boolean;
}
export declare class ZohoBooksApi {
    private readonly config;
    private accessToken;
    private tokenExpiry;
    private axiosInstance;
    constructor(config: ZohoBooksConfig);
    create(endpoint?: string): AxiosInstance;
    private refreshAccessToken;
    private getAccessToken;
    private setupInterceptors;
    request<T = any>(config: AxiosRequestConfig): Promise<ZohoResponse<T>>;
    get<T = any>(endpoint: string, params?: Record<string, any>): Promise<ZohoResponse<T>>;
    post<T = any>(endpoint: string, data?: any): Promise<ZohoResponse<T>>;
    put<T = any>(endpoint: string, data?: any): Promise<ZohoResponse<T>>;
    delete<T = any>(endpoint: string): Promise<ZohoResponse<T>>;
    getRefreshToken(code: string): Promise<any>;
}
