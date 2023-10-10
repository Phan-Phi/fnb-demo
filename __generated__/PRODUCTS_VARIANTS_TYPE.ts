export interface PRODUCTS_VARIANTS {
  meta: Meta;
  next: string | null;
  previous: string | null;
  items: PRODUCTS_VARIANTS_ITEM_TYPE[];
}
export interface PRODUCTS_VARIANTS_ITEM_TYPE {
  id: number;
  images: Image[];
  sort_order: number;
  name: string;
  price: string;
  created: string;
  updated: string;
  product: number;
}
interface Image {
  block_type: BlockType;
  value: string;
}
type BlockType = "image";
interface Meta {
  total_count: number;
}
