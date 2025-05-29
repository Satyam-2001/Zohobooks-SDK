import { APIHost, ZohoBooksApi, ZohoBooksConfig } from "./api";
import { Contacts } from "./resources/contacts";
import { ZohoBooksAuth } from "./auth";

export class ZohoBooks {
  private readonly api: ZohoBooksApi;
  public readonly contacts: Contacts;

  constructor(config: ZohoBooksConfig) {
    this.api = new ZohoBooksApi(config);
    this.contacts = new Contacts(this.api);
  }
}

export { APIHost, ZohoBooksApi, ZohoBooksAuth };
