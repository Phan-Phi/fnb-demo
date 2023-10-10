export interface PROVINCES {
  meta: Meta;
  next: string | null;
  previous: string | null;
  items: PROVINCES_ITEM_TYPE[];
}
export interface PROVINCES_ITEM_TYPE {
  code: number;
  name: string;
}
interface Meta {
  total_count: number;
}
