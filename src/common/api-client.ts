import { ZohoBooksApi } from "api";
import { AxiosInstance } from "axios";

export abstract class ApiClient {
  public readonly api: AxiosInstance;

  constructor(baseApi: ZohoBooksApi, endPoint: string) {
    this.api = baseApi.create(endPoint);
  }
}
