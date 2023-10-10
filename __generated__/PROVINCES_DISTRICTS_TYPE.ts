export interface PROVINCES_DISTRICTS {
  meta: Meta;
  next: string | null;
  previous: string | null;
  items: PROVINCES_DISTRICTS_ITEM_TYPE[];
}
export interface PROVINCES_DISTRICTS_ITEM_TYPE {
  code: number;
  name: string;
  province_code: number;
}
interface Meta {
  total_count: number;
}
