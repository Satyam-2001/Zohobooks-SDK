<p align="center">
  <img src="https://www.zoho.com/books/images/new/books-product-logo-black.svg" alt="Zoho Books Logo" width="300"/>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/zohobooks-sdk">
    <img src="https://img.shields.io/npm/v/zohobooks-sdk.svg" alt="npm version">
  </a>
  <a href="https://github.com/Satyam-2001/Zohobooks-SDK/actions">
    <img src="https://github.com/Satyam-2001/Zohobooks-SDK/workflows/CI/badge.svg" alt="Build Status">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  </a>
</p>

A **TypeScript-first** SDK for seamless interaction with the Zoho Books API. Designed for Node.js environments with full type safety and modern async/await support.

## ✨ Features

- **Full TypeScript Support** - Type-safe API interactions with auto-completion
- **Global API Host Options** - Support for all Zoho Books regions (US, EU, India, etc.)
- **Automatic Token Management** - Handles OAuth token refresh automatically
- **Modular API Structure** - Organized resources (Contacts, Invoices, Items etc.)
- **Axios-based Client** - With interceptors for error handling and logging
- **Comprehensive Documentation** - JSDoc comments and type definitions

## 📦 Installation

Install the package using your preferred package manager:

```bash
# Using pnpm (recommended)
pnpm add zohobooks-sdk

# Using npm
npm install zohobooks-sdk

# Using yarn
yarn add zohobooks-sdk
```

## ⚡ Quick Start

### Initialization

```typescript
import { ZohoBooks, APIHost } from "zohobooks-sdk";

const zohoBooks = new ZohoBooks({
  host: APIHost.India, // Choose from available regions
  clientId: "1000.XXXXXX", // From Zoho Developer Console
  clientSecret: "1632...8a5f13", // From Zoho Developer Console
  organizationId: "1234567", // Your Zoho Books Organization ID
  refreshToken: "1000.XXXXXXX.XXXXXX", // OAuth refresh token
  logger: true, // Optional: Enable request/response logging
});
```

### Basic Usage Examples

#### Create a Contact

```typescript
const newContact = await zohoBooks.contacts.create({
  contact_name: "Acme Corp",
  company_name: "Acme Corporation",
  contact_type: "customer",
  email: "contact@acme.com",
  billing_address: {
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
});
```

#### Create an Invoice

```typescript
const invoice = await zohoBooks.invoices.create({
  customer_id: "460000000026049",
  date: "2023-11-15",
  line_items: [
    {
      name: "Annual Subscription",
      description: "Premium Plan (Yearly)",
      rate: 299,
      quantity: 1,
    },
  ],
});
```

## 📚 API Resources

The SDK provides access to all major Zoho Books API resources:

| Resource      | Methods Available                                    |
| ------------- | ---------------------------------------------------- |
| Contacts      | `create`, `get`, `update`, `list`, `delete`          |
| Invoices      | `create`, `get`, `update`, `list`, `delete`, `email` |
| Estimates     | `create`, `get`, `update`, `list`, `delete`          |
| Items         | `create`, `get`, `update`, `list`, `delete`          |
| Organizations | `get`, `list`                                        |
| Payments      | `create`, `get`, `list`, `delete`                    |
| ...and more   | Full list in documentation                           |

## 🔐 Authentication

The SDK handles OAuth 2.0 authentication automatically. You'll need to:

1. Register your app in the [Zoho Developer Console](https://api-console.zoho.com)
2. Generate a refresh token (see [Zoho OAuth docs](https://www.zoho.com/books/api/v3/#oauth))
3. Provide these credentials during initialization

## 🌐 Region Support

Choose from these available API hosts:

```typescript
enum APIHost {
  UnitedStates = "https://www.zohoapis.com/books/v3",
  Europe = "https://www.zohoapis.eu/books/v3",
  India = "https://www.zohoapis.in/books/v3",
  Australia = "https://www.zohoapis.com.au/books/v3",
  Japan = "https://www.zohoapis.jp/books/v3",
  China = "https://www.zohoapis.com.cn/books/v3",
}
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Links

- [Zoho Books API Documentation](https://www.zoho.com/books/api/v3/)
- [Zoho Developer Console](https://api-console.zoho.com)
- [Report an Issue](https://github.com/Satyam-2001/Zohobooks-SDK/issues)
