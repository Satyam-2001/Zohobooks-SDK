export interface Address {
  attention?: string;
  address?: string;
  street2?: string;
  state_code?: string;
  city?: string;
  state?: string;
  zip?: number;
  country?: string;
  fax?: string;
  phone?: string;
}

export interface ZohoContact {
  contact_id: number;
  contact_name: string;
  customer_name: string;
  company_name: string;
  has_transaction: boolean;
  contact_type: "customer" | "vendor" | string;
  customer_sub_type: "business" | "individual" | string;
  credit_limit: number;
  phone: string;
  is_portal_enabled: boolean;
  language_code: string;
  is_taxable: boolean;
  tax_id: number;
  tds_tax_id: string;
  tax_name: string;
  tax_percentage: number;
  tax_authority_id: number;
  tax_exemption_id: number;
  tax_authority_name: string;
  tax_exemption_code: string;
  place_of_contact: string;
  gst_no: string;
  vat_treatment: string;
  tax_treatment: string;
  tax_exemption_certificate_number: string;
  tax_regime: "general_legal_person" | string;
  legal_name: string;
  is_tds_registered: boolean;
  gst_treatment: "business_gst" | "unregistered_business" | string;
  is_linked_with_zohocrm: boolean;
  website: string;
  owner_id: number;
  primary_contact_id: number;
  payment_terms: number;
  payment_terms_label: string;
  currency_id: number;
  currency_code: string;
  currency_symbol: string;
  opening_balances: {
    location_id: string;
    exchange_rate: number;
    opening_balance_amount: number;
  }[];
  location_id: string;
  location_name: string;
  outstanding_receivable_amount: number;
  outstanding_receivable_amount_bcy: number;
  unused_credits_receivable_amount: number;
  unused_credits_receivable_amount_bcy: number;
  status: "active" | "inactive" | string;
  payment_reminder_enabled: boolean;
  custom_fields: {
    index: number;
    value: string;
    label: string;
  }[];
  billing_address: Address;
  shipping_address: Address;
  facebook?: string;
  twitter?: string;
  contact_persons: {
    contact_person_id?: number;
    salutation?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    mobile?: string;
    designation?: string;
    department?: string;
    skype?: string;
    is_primary_contact?: boolean;
    enable_portal?: boolean;
  }[];
  default_templates: {
    invoice_template_id: number;
    estimate_template_id: number;
    creditnote_template_id: number;
    purchaseorder_template_id: number;
    salesorder_template_id: number;
    retainerinvoice_template_id: number;
    paymentthankyou_template_id: number;
    retainerinvoice_paymentthankyou_template_id: number;
    invoice_email_template_id: number;
    estimate_email_template_id: number;
    creditnote_email_template_id: number;
    purchaseorder_email_template_id: number;
    salesorder_email_template_id: number;
    retainerinvoice_email_template_id: number;
    paymentthankyou_email_template_id: number;
    retainerinvoice_paymentthankyou_email_template_id: number;
  };
  notes: string;
  created_time: string;
  last_modified_time: string;
}

export interface ZohoContactResponse {
  code: number;
  message: string;
  contact: ZohoContact;
}

export interface ZohoContactListResponse {
  code: number;
  message: string;
  contacts: ZohoContact[];
  page_context: {
    page: number;
    per_page: number;
    has_more_page: boolean;
    report_name: string;
    applied_filter: string;
    sort_column: string;
    sort_order: string;
  };
}

export interface ZohoContactQueryData {
  phone_startwith?: string;
  phone_contains?: string;
  contact_name_contains?: string;
  contact_name_startswith?: string;
}
