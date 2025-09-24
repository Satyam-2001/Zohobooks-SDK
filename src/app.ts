import { ZohoBooksApi, ZohoBooksConfig } from "./api";
import { Contacts } from "./resources/contacts";
import { Invoices } from "./resources/invoices";
import { Payments } from "./resources/payments";
import { SalesOrders } from "./resources/sales-order";
import { Estimates } from "./resources/estimates";
import { Items } from "./resources/items";

export class ZohoBooks {
  public readonly api: ZohoBooksApi;
  public readonly contacts: Contacts;
  public readonly invoices: Invoices;
  public readonly payments: Payments;
  public readonly salesOrders: SalesOrders;
  public readonly estimates: Estimates;
  public readonly items: Items;

  constructor(config: ZohoBooksConfig) {
    this.api = new ZohoBooksApi(config);
    this.contacts = new Contacts(this.api);
    this.invoices = new Invoices(this.api);
    this.payments = new Payments(this.api);
    this.salesOrders = new SalesOrders(this.api);
    this.estimates = new Estimates(this.api);
    this.items = new Items(this.api);
  }
}
