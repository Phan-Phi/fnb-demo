export interface PRODUCT_CATEGORY_DETAIL_PAGE_TYPE {
  meta: TopLevelMeta;
  next: string | null;
  previous: string | null;
  items: PRODUCT_CATEGORY_DETAIL_PAGE_TYPE_ITEM_TYPE[];
}
export interface PRODUCT_CATEGORY_DETAIL_PAGE_TYPE_ITEM_TYPE {
  id: number;
  meta: ItemMeta;
  title: string;
  last_published_at: string;
  banner: null | string;
  featured: boolean;
  on_homepage: boolean;
}
interface ItemMeta {
  type: Type;
  detail_url: string;
  html_url: string | null;
  slug: string;
  show_in_menus: boolean;
  seo_title: string;
  search_description: string;
  first_published_at: string;
  alias_of: string | null;
  parent: Parent;
  locale: Locale;
  canonical_url: string;
  og_image: string | null;
}
type Locale = "vi" | "en";
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
type Type = "product.ProductCategoryDetailPage" | "product.ProductCategoryListingPage";
interface TopLevelMeta {
  total_count: number;
}
