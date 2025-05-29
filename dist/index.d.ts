import { APIHost, ZohoBooksApi, ZohoBooksConfig } from "./api";
import { Contacts } from "./resources/contacts";
import { ZohoBooksAuth } from "./auth";
export declare class ZohoBooks {
    private readonly api;
    readonly contacts: Contacts;
    constructor(config: ZohoBooksConfig);
}
export { APIHost, ZohoBooksApi, ZohoBooksAuth };
