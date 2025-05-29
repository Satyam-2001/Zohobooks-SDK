"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZohoBooksAuth = void 0;
const axios_1 = __importDefault(require("axios"));
class ZohoBooksAuth {
    constructor(config) {
        this.api = axios_1.default.create({
            baseURL: config.baseAuthUrl || "https://accounts.zoho.in/oauth/v2/token",
            params: {
                client_id: config.clientId,
                client_secret: config.clientSecret,
            },
        });
    }
    /**
     * Exchange authorization code for access token
     * @param params Object containing code and redirect_uri
     * @returns Promise with TokenResponse
     */
    async getToken(params) {
        var _a, _b;
        try {
            const response = await this.api.post("", null, {
                params: {
                    ...params,
                    grant_type: "authorization_code",
                },
            });
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw new Error(`Failed to get token: ${((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || error.message}`);
            }
            throw new Error("Unknown error occurred while getting token");
        }
    }
    /**
     * Refresh access token using refresh token
     * @param refreshToken The refresh token
     * @returns Promise with RefreshTokenResponse
     */
    async refreshAccessToken(refreshToken) {
        var _a, _b;
        try {
            const response = await this.api.post("", null, {
                params: {
                    refresh_token: refreshToken,
                    grant_type: "refresh_token",
                },
            });
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw new Error(`Failed to refresh token: ${((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || error.message}`);
            }
            throw new Error("Unknown error occurred while refreshing token");
        }
    }
}
exports.ZohoBooksAuth = ZohoBooksAuth;
