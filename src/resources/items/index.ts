import { ZohoBooksApi } from "../../api";
import { ApiClient } from "../../common/api-client";
import { EndPoint } from "../../constants/endpoints";
import { Item } from "./types";

export class Items extends ApiClient {
  constructor(baseApi: ZohoBooksApi) {
    super(baseApi, EndPoint.ITEMS);
  }

  create(data: Item): Promise<{ code: number; message: string; item: Item }> {
    return this.api.post("/", data);
  }
}
