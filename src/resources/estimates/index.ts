import { ZohoBooksApi } from "../../api";
import { EndPoint } from "../../constants/endpoints";
import { ApiClient } from "common/api-client";
import { Estimate, EstimateResponse, EstimateListResponse } from "./types";

export class Estimates extends ApiClient {
  constructor(baseApi: ZohoBooksApi) {
    super(baseApi, EndPoint.ESTIMATES);
  }

  create(data: Partial<Estimate>): Promise<EstimateResponse> {
    return this.api.post("/", data);
  }

  list(): Promise<EstimateListResponse> {
    return this.api.get("/");
  }

  get(estimateId: string): Promise<EstimateResponse> {
    return this.api.get(`/${estimateId}`);
  }

  update(
    estimateId: string,
    data: Partial<Estimate>
  ): Promise<EstimateResponse> {
    return this.api.put(`/${estimateId}`, data);
  }

  delete(estimateId: string): Promise<{ code: number; message: string }> {
    return this.api.delete(`/${estimateId}`);
  }

  sendEmail(estimateId: string): Promise<{ code: number; message: string }> {
    return this.api.post(`/${estimateId}/email`);
  }

  markAsSent(estimateId: string): Promise<{ code: number; message: string }> {
    return this.api.post(`/${estimateId}/status/sent`);
  }

  convertToInvoice(estimateId: string): Promise<any> {
    return this.api.post(`/${estimateId}/convert`);
  }
}
