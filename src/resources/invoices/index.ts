import { ZohoBooksApi } from "../../api";
import { EndPoint } from "../../constants/endpoints";
import { ApiClient } from "../../common/api-client";
import { Invoice, InvoiceResponse, InvoiceListResponse } from "./types";

export class Invoices extends ApiClient {
  constructor(baseApi: ZohoBooksApi) {
    super(baseApi, EndPoint.INVOICES);
  }

  create(data: Partial<Invoice>): Promise<InvoiceResponse> {
    return this.api.post("/", data);
  }

  list(): Promise<InvoiceListResponse> {
    return this.api.get("/");
  }

  get(
    invoiceId: string,
    options: { accept?: "pdf" | "json" | "html" } = {}
  ): Promise<InvoiceResponse> {
    return this.api.get(`/${invoiceId}`);
  }

  update(invoiceId: string, data: Partial<Invoice>): Promise<InvoiceResponse> {
    return this.api.put(`/${invoiceId}`, data);
  }

  delete(invoiceId: string): Promise<{ code: number; message: string }> {
    return this.api.delete(`/${invoiceId}`);
  }

  markAsSent(invoiceId: string): Promise<{ code: number; message: string }> {
    return this.api.post(`/${invoiceId}/status/sent`);
  }

  void(invoiceId: string): Promise<{ code: number; message: string }> {
    return this.api.post(`/${invoiceId}/status/void`);
  }

  submitForApproval(
    invoiceId: string
  ): Promise<{ code: number; message: string }> {
    return this.api.post(`/${invoiceId}/submit`);
  }

  approve(invoiceId: string): Promise<{ code: number; message: string }> {
    return this.api.post(`/${invoiceId}/approve`);
  }
}
