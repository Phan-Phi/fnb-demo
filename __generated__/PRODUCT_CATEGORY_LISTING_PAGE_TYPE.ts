export interface PRODUCT_CATEGORY_LISTING_PAGE_TYPE {
  meta: TopLevelMeta;
  next: string | null;
  previous: string | null;
  items: PRODUCT_CATEGORY_LISTING_PAGE_TYPE_ITEM_TYPE[];
}
export interface PRODUCT_CATEGORY_LISTING_PAGE_TYPE_ITEM_TYPE {
  id: number;
  meta: ItemMeta;
  title: string;
  last_published_at: string;
  subtitle: string;
  banner: string | null;
  detail_banner: null | string;
  detail_banner_link: string;
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
  alias_of: string | null;
  parent: Parent;
  locale: string;
  canonical_url: string;
  og_image: string | null;
}
interface Parent {
  id: number;
  meta: ParentMeta;
  title: string;
}
interface ParentMeta {
  type: string;
  detail_url: string;
  html_url: string | null;
}
interface TopLevelMeta {
  total_count: number;
}
