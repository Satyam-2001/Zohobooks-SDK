export interface EstimateLineItem {
  item_id?: string;
  name?: string;
  description?: string;
  quantity?: number;
  rate?: number;
  discount_amount?: number;
  tax_name?: string;
  tax_percentage?: number;
  line_item_id?: string;
}

export interface Estimate {
  estimate_id?: string;
  estimate_number?: string;
  customer_id: string;
  reference_number?: string;
  date?: string;
  expiry_date?: string;
  status?: string;
  total?: number;
  balance?: number;
  currency_code?: string;
  exchange_rate?: number;
  line_items: EstimateLineItem[];
  notes?: string;
  terms?: string;
  custom_fields?: { customfield_id: string; value: string }[];
}

export interface EstimateResponse {
  code: number;
  message: string;
  estimate: Estimate;
}

export interface EstimateListResponse {
  code: number;
  estimates: Estimate[];
}
