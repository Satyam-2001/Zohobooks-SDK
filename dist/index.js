"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZohoBooksAuth = exports.ZohoBooksApi = exports.APIHost = exports.ZohoBooks = void 0;
const api_1 = require("./api");
Object.defineProperty(exports, "APIHost", { enumerable: true, get: function () { return api_1.APIHost; } });
Object.defineProperty(exports, "ZohoBooksApi", { enumerable: true, get: function () { return api_1.ZohoBooksApi; } });
const contacts_1 = require("./resources/contacts");
const auth_1 = require("./auth");
Object.defineProperty(exports, "ZohoBooksAuth", { enumerable: true, get: function () { return auth_1.ZohoBooksAuth; } });
class ZohoBooks {
    constructor(config) {
        this.api = new api_1.ZohoBooksApi(config);
        this.contacts = new contacts_1.Contacts(this.api);
    }
}
exports.ZohoBooks = ZohoBooks;
