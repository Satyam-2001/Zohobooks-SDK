export interface Payment {
  payment_id?: string;
  payment_number?: string;
  customer_id: string;
  amount: number;
  payment_mode?: string;
  reference_number?: string;
  description?: string;
  date?: string;
  status?: string;
  currency_code?: string;
  exchange_rate?: number;
  account_id?: string;
  invoices?: {
    invoice_id: string;
    amount_applied: number;
  }[];
  custom_fields?: { customfield_id: string; value: string }[];
}

export interface PaymentResponse {
  code: number;
  message: string;
  payment: Payment;
}

export interface PaymentListResponse {
  code: number;
  payments: Payment[];
}
