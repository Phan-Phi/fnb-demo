export interface PROVINCES_DISTRICTS_WARDS {
  meta: Meta;
  next: string | null;
  previous: string | null;
  items: PROVINCES_DISTRICTS_WARDS_ITEM_TYPE[];
}
export interface PROVINCES_DISTRICTS_WARDS_ITEM_TYPE {
  code: number;
  name: string;
  district_code: number;
}
interface Meta {
  total_count: number;
}
