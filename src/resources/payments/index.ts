import { ZohoBooksApi } from "../../api";
import { EndPoint } from "../../constants/endpoints";
import { ApiClient } from "../../common/api-client";
import { Payment, PaymentResponse, PaymentListResponse } from "./types";

export class Payments extends ApiClient {
  constructor(baseApi: ZohoBooksApi) {
    super(baseApi, EndPoint.CUSTOMER_PAYMENTS);
  }

  create(data: Partial<Payment>): Promise<PaymentResponse> {
    return this.api.post("/", data);
  }

  list(): Promise<PaymentListResponse> {
    return this.api.get("/");
  }

  get(paymentId: string): Promise<PaymentResponse> {
    return this.api.get(`/${paymentId}`);
  }

  update(paymentId: string, data: Partial<Payment>): Promise<PaymentResponse> {
    return this.api.put(`/${paymentId}`, data);
  }

  delete(paymentId: string): Promise<{ code: number; message: string }> {
    return this.api.delete(`/${paymentId}`);
  }

  refund(paymentId: string, amount: number, date: string): Promise<any> {
    return this.api.post(`/${paymentId}/refunds`, { amount, date });
  }
}
