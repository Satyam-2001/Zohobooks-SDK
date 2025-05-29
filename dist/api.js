"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZohoBooksApi = exports.APIHost = void 0;
const axios_1 = __importDefault(require("axios"));
var APIHost;
(function (APIHost) {
    APIHost["UnitedStates"] = "https://www.zohoapis.com/books/v3/";
    APIHost["Europe"] = "https://www.zohoapis.eu/books/v3/";
    APIHost["India"] = "https://www.zohoapis.in/books/v3/";
    APIHost["Australia"] = "https://www.zohoapis.com.au/books/v3/";
    APIHost["Japan"] = "https://www.zohoapis.jp/books/v3/";
    APIHost["Canada"] = "https://www.zohoapis.ca/books/v3/";
    APIHost["China"] = "https://www.zohoapis.com.cn/books/v3/";
    APIHost["SaudiArabia"] = "https://www.zohoapis.sa/books/v3/";
})(APIHost || (exports.APIHost = APIHost = {}));
class ZohoBooksApi {
    constructor(config) {
        this.config = config;
        this.accessToken = null;
        this.tokenExpiry = null;
        this.axiosInstance = this.create();
    }
    create(endpoint = "") {
        const axiosInstance = axios_1.default.create({
            baseURL: `${this.config.host}${endpoint}`,
            headers: {
                "Content-Type": "application/json",
                "X-com-zoho-invoice-organizationid": this.config.organizationId,
            },
            params: {
                organization_id: this.config.organizationId,
            },
        });
        this.setupInterceptors(axiosInstance);
        return axiosInstance;
    }
    async refreshAccessToken() {
        try {
            const response = await axios_1.default.post("https://accounts.zoho.in/oauth/v2/token", null, {
                params: {
                    refresh_token: this.config.refreshToken,
                    client_id: this.config.clientId,
                    client_secret: this.config.clientSecret,
                    grant_type: "refresh_token",
                },
            });
            this.accessToken = response.data.access_token;
            this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);
        }
        catch (error) {
            if (this.config.logger) {
                console.error("Failed to refresh Zoho access token:", error);
            }
            throw error;
        }
    }
    async getAccessToken() {
        if (!this.accessToken ||
            (this.tokenExpiry && new Date() > this.tokenExpiry)) {
            await this.refreshAccessToken();
        }
        return this.accessToken;
    }
    setupInterceptors(axiosInstance) {
        // Request interceptor
        axiosInstance.interceptors.request.use(async (config) => {
            var _a;
            if (this.config.autoRefreshToken !== false) {
                const token = await this.getAccessToken();
                config.headers.Authorization = `Zoho-oauthtoken ${token}`;
            }
            if (this.config.logger) {
                console.log(`Request: ${(_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()} ${config.url}`);
            }
            return config;
        }, (error) => {
            if (this.config.logger) {
                console.error("Request error:", error);
            }
            return Promise.reject(error);
        });
        // Response interceptor
        axiosInstance.interceptors.response.use((response) => {
            if (this.config.logger) {
                console.log(`Response: ${response.status} ${response.config.url}`);
            }
            return response.data;
        }, (error) => {
            var _a;
            const errorData = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message;
            if (this.config.logger) {
                console.error("API Error:", errorData);
            }
            return Promise.reject(errorData);
        });
    }
    async request(config) {
        return this.axiosInstance.request(config);
    }
    async get(endpoint, params) {
        return this.request({
            method: "GET",
            url: endpoint,
            params,
        });
    }
    async post(endpoint, data) {
        return this.request({
            method: "POST",
            url: endpoint,
            data,
        });
    }
    async put(endpoint, data) {
        return this.request({
            method: "PUT",
            url: endpoint,
            data,
        });
    }
    async delete(endpoint) {
        return this.request({
            method: "DELETE",
            url: endpoint,
        });
    }
    async getRefreshToken(code) {
        try {
            const response = await axios_1.default.post("https://accounts.zoho.in/oauth/v2/token", null, {
                params: {
                    code: code,
                    client_id: this.config.clientId,
                    client_secret: this.config.clientSecret,
                    grant_type: "authorization_code",
                },
            });
            this.accessToken = response.data.access_token;
            this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);
            return response.data;
        }
        catch (error) {
            if (this.config.logger) {
                console.error("Failed to refresh Zoho access token:", error);
            }
            throw error;
        }
    }
}
exports.ZohoBooksApi = ZohoBooksApi;
// Example usage:
/*
const zohoBooks = new ZohoBooksApi({
  host: APIHost.UnitedStates,
  refreshToken: 'your_refresh_token',
  organizationId: 'your_org_id',
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  logger: true
});

// Get an invoice
const invoice = await zohoBooks.get('/invoices/123456789');

// Create a contact
const newContact = await zohoBooks.post('/contacts', {
  contact_name: 'John Doe',
  contact_type: 'customer',
  email: 'john@example.com'
});
*/
