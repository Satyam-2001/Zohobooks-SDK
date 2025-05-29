export interface SalesOrderLineItem {
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

export interface SalesOrder {
  salesorder_id?: string;
  salesorder_number?: string;
  customer_id: string;
  reference_number?: string;
  date?: string;
  status?: string;
  total?: number;
  balance?: number;
  currency_code?: string;
  exchange_rate?: number;
  line_items: SalesOrderLineItem[];
  notes?: string;
  terms?: string;
  custom_fields?: { customfield_id: string; value: string }[];
}

export interface SalesOrderResponse {
  code: number;
  message: string;
  salesorder: SalesOrder;
}

export interface SalesOrderListResponse {
  code: number;
  salesorders: SalesOrder[];
}
