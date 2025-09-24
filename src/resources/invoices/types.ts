export interface InvoiceLineItem {
  item_id?: string;
  name?: string;
  description?: string;
  quantity?: number;
  product_type?: string; // "goods" | "service"
  rate?: number;
  discount_amount?: number;
  unit?: string;
  line_item_id?: string;
  item_order?: number;
  tax_id?: string;
  tax_name?: string;
  tax_percentage?: number;
  item_total?: number;
  tax_exemption_id?: string;
  item_custom_fields?: { api_name: string; value: any }[];
}

export interface CustomField {
  customfield_id: string;
  label: string;
  value: string;
}

export interface Invoice {
  invoice_id?: string;
  invoice_number?: string;
  date?: string; // yyyy-mm-dd
  due_date?: string;
  payment_terms?: number;
  payment_terms_label?: string;
  status?: string;
  currency_code?: string;
  exchange_rate?: number;
  discount?: number;
  discount_type?: string;
  customer_id: string;
  contact_persons?: string[];
  reference_number?: string;
  template_id?: string;
  line_items: InvoiceLineItem[];
  notes?: string;
  terms?: string;
  custom_fields?: CustomField[];
  is_inclusive_tax?: boolean;
  place_of_supply?: string;
  tax_total?: number;
  total?: number;
  balance?: number;
  created_time?: string;
  last_modified_time?: string;
  is_discount_before_tax?: boolean;
  adjustment?: number;
  adjustment_description?: string;
}

export interface InvoiceResponse {
  code: number;
  message: string;
  invoice: Invoice;
}

export interface InvoiceListResponse {
  code: number;
  invoices: Invoice[];
}
