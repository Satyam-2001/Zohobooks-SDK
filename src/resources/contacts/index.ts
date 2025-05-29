import { ZohoBooksApi } from "../../api";
import { AxiosInstance } from "axios";
import { ZohoContact, ZohoContactResponse } from "./types";
import { EndPoint } from "../../constants/endpoints";

export class Contacts {
  private readonly api: AxiosInstance;

  constructor(baseApi: ZohoBooksApi) {
    this.api = baseApi.create(EndPoint.CONTACTS);
  }

  async create(
    contactData: Partial<ZohoContact>
  ): Promise<ZohoContactResponse> {
    return this.api.post("/", contactData);
  }
}
