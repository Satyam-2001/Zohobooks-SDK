import { ZohoBooksApi } from "../../api";
import { ZohoContact, ZohoContactResponse } from "./types";
import { EndPoint } from "../../constants/endpoints";
import { ApiClient } from "common/api-client";

export class Contacts extends ApiClient {
  constructor(baseApi: ZohoBooksApi) {
    super(baseApi, EndPoint.CONTACTS);
  }

  create(contactData: Partial<ZohoContact>): Promise<ZohoContactResponse> {
    return this.api.post("/", contactData);
  }

  list(): Promise<{ code: number; contacts: ZohoContact[] }> {
    return this.api.get("/");
  }

  get(contactId: string): Promise<ZohoContactResponse> {
    return this.api.get(`/${contactId}`);
  }

  update(
    contactId: string,
    updates: Partial<ZohoContact>
  ): Promise<ZohoContactResponse> {
    return this.api.put(`/${contactId}`, updates);
  }

  delete(contactId: string): Promise<{ code: number; message: string }> {
    return this.api.delete(`/${contactId}`);
  }

  markAsActive(contactId: string): Promise<{ code: number; message: string }> {
    return this.api.post(`/${contactId}/active`);
  }

  markAsInactive(
    contactId: string
  ): Promise<{ code: number; message: string }> {
    return this.api.post(`/${contactId}/inactive`);
  }

  enablePortalAccess(
    contactId: string
  ): Promise<{ code: number; message: string }> {
    return this.api.post(`/${contactId}/portal/enable`);
  }

  emailStatement(
    contactId: string
  ): Promise<{ code: number; message: string }> {
    return this.api.post(`/${contactId}/emailstatement`);
  }
}
