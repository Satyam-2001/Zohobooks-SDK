import { ZohoBooksApi } from "../../api";
import { ZohoContact, ZohoContactResponse } from "./types";
export declare class Contacts {
    private readonly api;
    constructor(baseApi: ZohoBooksApi);
    create(contactData: Partial<ZohoContact>): Promise<ZohoContactResponse>;
}
