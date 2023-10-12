export interface PAGES {
  meta: TopLevelMeta;
  next: string | null;
  previous: string | null;
  items: PAGES_ITEM_TYPE[];
}
export interface PAGES_ITEM_TYPE {
  id: number;
  meta: ItemMeta;
  title: string;
  last_published_at: string;
}
interface ItemMeta {
  type: string;
  detail_url: string;
  html_url: string | null;
  slug: string;
  show_in_menus: boolean;
  seo_title: string;
  search_description: string;
  first_published_at: string;
  alias_of: AliasOf | null;
  parent: AliasOf | null;
  locale: Locale;
}
interface AliasOf {
  id: number;
  meta: AliasOfMeta;
  title: string;
}
interface AliasOfMeta {
  type: Type;
  detail_url: string;
  html_url: string | null;
}
type Type =
  | "product.ProductPage"
  | "home.HomePage"
  | "news.NewsCategoryListingPage"
  | "news.NewsCategoryDetailPage"
  | "product.ProductCategoryListingPage"
  | "product.ProductCategoryDetailPage";
type Locale = "vi" | "en";
interface TopLevelMeta {
  total_count: number;
}
