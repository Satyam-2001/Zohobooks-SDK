"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contacts = void 0;
const endpoints_1 = require("../../constants/endpoints");
class Contacts {
    api;
    constructor(baseApi) {
        this.api = baseApi.create(endpoints_1.EndPoint.CONTACTS);
    }
    async create(contactData) {
        return this.api.post("/", contactData);
    }
}
exports.Contacts = Contacts;
//# sourceMappingURL=index.js.map