"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZohoBooksAuth = void 0;
const axios_1 = __importDefault(require("axios"));
class ZohoBooksAuth {
    api;
    constructor(config) {
        this.api = axios_1.default.create({
            baseURL: config.baseAuthUrl || "https://accounts.zoho.in/oauth/v2/token",
            params: {
                client_id: config.clientId,
                client_secret: config.clientSecret,
            },
        });
    }
    async getToken(params) {
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
                throw new Error(`Failed to get token: ${error.response?.data?.error || error.message}`);
            }
            throw new Error("Unknown error occurred while getting token");
        }
    }
    async refreshAccessToken(refreshToken) {
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
                throw new Error(`Failed to refresh token: ${error.response?.data?.error || error.message}`);
            }
            throw new Error("Unknown error occurred while refreshing token");
        }
    }
}
exports.ZohoBooksAuth = ZohoBooksAuth;
//# sourceMappingURL=auth.js.map