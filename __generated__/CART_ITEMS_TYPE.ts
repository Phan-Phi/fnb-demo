export interface CART_ITEMS {
  meta: Meta;
  next: string | null;
  previous: string | null;
  items: any[];
}
interface Meta {
  total_count: number;
}
