import { APIHost, ZohoBooksApi, ZohoBooksConfig } from "./api";
import { Contacts } from "./resources/contacts";
import { ZohoBooksAuth } from "./auth";
import { Invoices } from "resources/invoices";

export class ZohoBooks {
  private readonly api: ZohoBooksApi;
  public readonly contacts: Contacts;
  public readonly invoices: Invoices;

  constructor(config: ZohoBooksConfig) {
    this.api = new ZohoBooksApi(config);
    this.contacts = new Contacts(this.api);
    this.invoices = new Invoices(this.api);
  }
}

export { APIHost, ZohoBooksApi, ZohoBooksAuth };
