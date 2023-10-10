export interface CART {
  id: number;
  created: string;
  updated: string;
  customer_name: string;
  customer_phone_number: string;
  customer_email: string;
  customer_address: string;
  customer_province: number;
  customer_district: number;
  customer_ward: number;
  customer_note: string;
  requested_export_tax: boolean;
  export_tax_name: string;
  export_tax_phone_number: string;
  export_tax_email: string;
  export_tax_company_name: string;
  export_tax_identification_number: string;
  export_tax_address: string;
  status: number;
}
