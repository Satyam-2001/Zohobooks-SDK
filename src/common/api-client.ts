import { AxiosInstance } from "axios";
import { ZohoBooksApi } from "../api";

export abstract class ApiClient {
  public readonly api: AxiosInstance;

  constructor(baseApi: ZohoBooksApi, endPoint: string) {
    this.api = baseApi.create(endPoint);
  }
}
