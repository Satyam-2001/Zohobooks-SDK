export interface ZohoBooksAuthConfig {
    clientId: string;
    clientSecret: string;
    baseAuthUrl?: string;
}
export interface TokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    api_domain: string;
    token_type: string;
}
export interface RefreshTokenResponse extends Omit<TokenResponse, "refresh_token"> {
}
export declare class ZohoBooksAuth {
    private readonly api;
    constructor(config: ZohoBooksAuthConfig);
    getToken(params: {
        code: string;
        redirect_uri: string;
    }): Promise<TokenResponse>;
    refreshAccessToken(refreshToken: string): Promise<RefreshTokenResponse>;
}
