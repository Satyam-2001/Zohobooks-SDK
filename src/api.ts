import axios, {
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";

export type ZohoResponse<T = any> = T & {
  code: number;
  message: string;
};

export type PageContext<T extends Record<string, any> = {}> = T & {
  page: number;
  per_page: number;
  has_more_page: boolean;
};

export enum APIHost {
  UnitedStates = "https://www.zohoapis.com/books/v3/",
  Europe = "https://www.zohoapis.eu/books/v3/",
  India = "https://www.zohoapis.in/books/v3/",
  Australia = "https://www.zohoapis.com.au/books/v3/",
  Japan = "https://www.zohoapis.jp/books/v3/",
  Canada = "https://www.zohoapis.ca/books/v3/",
  China = "https://www.zohoapis.com.cn/books/v3/",
  SaudiArabia = "https://www.zohoapis.sa/books/v3/",
}

export interface ZohoBooksConfig {
  host: APIHost;
  refreshToken: string;
  organizationId: string;
  clientId: string;
  clientSecret: string;
  logger?: boolean;
  autoRefreshToken?: boolean; // Add auto refresh option
}

export class ZohoBooksApi {
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;
  private axiosInstance: AxiosInstance;

  constructor(private readonly config: ZohoBooksConfig) {
    this.axiosInstance = this.create();
  }

  create(endpoint: string = "") {
    const axiosInstance = axios.create({
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

  private async refreshAccessToken(): Promise<void> {
    try {
      const response = await axios.post(
        "https://accounts.zoho.in/oauth/v2/token",
        null,
        {
          params: {
            refresh_token: this.config.refreshToken,
            client_id: this.config.clientId,
            client_secret: this.config.clientSecret,
            grant_type: "refresh_token",
          },
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);
    } catch (error) {
      if (this.config.logger) {
        console.error("Failed to refresh Zoho access token:", error);
      }
      throw error;
    }
  }

  private async getAccessToken(): Promise<string> {
    if (
      !this.accessToken ||
      (this.tokenExpiry && new Date() > this.tokenExpiry)
    ) {
      await this.refreshAccessToken();
    }
    return this.accessToken as string;
  }

  private setupInterceptors(axiosInstance: AxiosInstance): void {
    // Request interceptor
    axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (this.config.autoRefreshToken !== false) {
          const token = await this.getAccessToken();
          config.headers.Authorization = `Zoho-oauthtoken ${token}`;
        }
        if (this.config.logger) {
          console.log(`Request: ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
      },
      (error) => {
        if (this.config.logger) {
          console.error("Request error:", error);
        }
        return Promise.reject(error);
      }
    );

    // Response interceptor
    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (this.config.logger) {
          console.log(`Response: ${response.status} ${response.config.url}`);
        }
        return response.data;
      },
      (error) => {
        const errorData = error.response?.data || error.message;
        if (this.config.logger) {
          console.error("API Error:", errorData);
        }
        return Promise.reject(errorData);
      }
    );
  }

  public async request<T = any>(
    config: AxiosRequestConfig
  ): Promise<ZohoResponse<T>> {
    return this.axiosInstance.request(config);
  }

  public async get<T = any>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<ZohoResponse<T>> {
    return this.request({
      method: "GET",
      url: endpoint,
      params,
    });
  }

  public async post<T = any>(
    endpoint: string,
    data?: any
  ): Promise<ZohoResponse<T>> {
    return this.request({
      method: "POST",
      url: endpoint,
      data,
    });
  }

  public async put<T = any>(
    endpoint: string,
    data?: any
  ): Promise<ZohoResponse<T>> {
    return this.request({
      method: "PUT",
      url: endpoint,
      data,
    });
  }

  public async delete<T = any>(endpoint: string): Promise<ZohoResponse<T>> {
    return this.request({
      method: "DELETE",
      url: endpoint,
    });
  }

  public async getRefreshToken(code: string) {
    try {
      const response = await axios.post(
        "https://accounts.zoho.in/oauth/v2/token",
        null,
        {
          params: {
            code: code,
            client_id: this.config.clientId,
            client_secret: this.config.clientSecret,
            grant_type: "authorization_code",
          },
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);
      return response.data;
    } catch (error) {
      if (this.config.logger) {
        console.error("Failed to refresh Zoho access token:", error);
      }
      throw error;
    }
  }
}

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
