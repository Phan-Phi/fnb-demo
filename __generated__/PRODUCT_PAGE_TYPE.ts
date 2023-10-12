export interface PRODUCT_PAGE_TYPE {
  meta: TopLevelMeta;
  next: string | null;
  previous: string | null;
  items: PRODUCT_PAGE_TYPE_ITEM_TYPE[];
}
export interface PRODUCT_PAGE_TYPE_ITEM_TYPE {
  id: number;
  meta: ItemMeta;
  title: string;
  last_published_at: string;
  is_exported: boolean;
  images: Image[];
  unit: Unit;
  tiktok_url: string;
  description: Description[];
  first_variant_price: string;
}
interface Description {
  block_type: DescriptionBlockType;
  value: ValueClass | string;
}
type DescriptionBlockType = "content" | "embed";
interface ValueClass {
  width: string;
  height: string;
  src: string;
}
interface Image {
  block_type: ImageBlockType;
  value: string;
}
type ImageBlockType = "image";
interface ItemMeta {
  type: Type;
  detail_url: string;
  html_url: string | null;
  slug: string;
  show_in_menus: boolean;
  seo_title: string;
  search_description: string;
  first_published_at: string;
  alias_of: Parent | null;
  parent: Parent;
  locale: Locale;
  canonical_url: string;
  og_image: string | null;
}
interface Parent {
  id: number;
  meta: ParentMeta;
  title: string;
}
interface ParentMeta {
  type: Type;
  detail_url: string;
  html_url: string | null;
}
type Type = "product.ProductPage" | "product.ProductCategoryDetailPage";
type Locale = "vi" | "en";
type Unit = "" | "Đơn vị tính";
interface TopLevelMeta {
  total_count: number;
}
