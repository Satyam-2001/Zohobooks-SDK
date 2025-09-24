import { ZohoBooksApi } from "../../api";
import { EndPoint } from "../../constants/endpoints";
import { ApiClient } from "../../common/api-client";
import {
  SalesOrder,
  SalesOrderResponse,
  SalesOrderListResponse,
} from "./types";

export class SalesOrders extends ApiClient {
  constructor(baseApi: ZohoBooksApi) {
    super(baseApi, EndPoint.SALES_ORDER);
  }

  create(data: Partial<SalesOrder>): Promise<SalesOrderResponse> {
    return this.api.post("/", data);
  }

  list(): Promise<SalesOrderListResponse> {
    return this.api.get("/");
  }

  get(salesOrderId: string): Promise<SalesOrderResponse> {
    return this.api.get(`/${salesOrderId}`);
  }

  update(
    salesOrderId: string,
    data: Partial<SalesOrder>
  ): Promise<SalesOrderResponse> {
    return this.api.put(`/${salesOrderId}`, data);
  }

  delete(salesOrderId: string): Promise<{ code: number; message: string }> {
    return this.api.delete(`/${salesOrderId}`);
  }

  markAsConfirmed(
    salesOrderId: string
  ): Promise<{ code: number; message: string }> {
    return this.api.post(`/${salesOrderId}/status/confirmed`);
  }

  convertToInvoice(salesOrderId: string): Promise<any> {
    return this.api.post(`/${salesOrderId}/convert`);
  }
}
