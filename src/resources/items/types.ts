export interface ItemLocation {
  location_id: string;
  initial_stock?: string;
  initial_stock_rate?: string;
}

export interface ItemTaxPreference {
  tax_id: number | string;
  tax_specification: "intra" | "inter" | string;
}

export interface CustomField {
  customfield_id: string;
  value: string;
}

export interface Item {
  name: string;
  rate: number;
  description?: string;
  tax_id?: number;
  locations?: ItemLocation[];
  purchase_tax_rule_id?: number;
  sales_tax_rule_id?: number;
  tax_percentage?: string; // e.g., "70%"
  sku?: string;
  product_type?: "goods" | "service" | string;
  hsn_or_sac?: string;
  sat_item_key_code?: string;
  unitkey_code?: string;
  is_taxable?: boolean;
  tax_exemption_id?: string;
  purchase_tax_exemption_id?: string;
  account_id?: string;
  avatax_tax_code?: number;
  avatax_use_code?: number;
  item_type?: string;
  purchase_description?: string;
  purchase_rate?: string;
  purchase_account_id?: string;
  inventory_account_id?: string;
  vendor_id?: string;
  reorder_level?: string;
  item_tax_preferences?: ItemTaxPreference[];
  custom_fields?: CustomField[];
}
