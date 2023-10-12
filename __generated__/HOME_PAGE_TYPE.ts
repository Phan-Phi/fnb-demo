export interface HOME_PAGE_TYPE {
  meta: TopLevelMeta;
  next: string | null;
  previous: string | null;
  items: HOME_PAGE_TYPE_ITEM_TYPE[];
}
export interface HOME_PAGE_TYPE_ITEM_TYPE {
  id: number;
  meta: ItemMeta;
  title: string;
  last_published_at: string;
  banner: string;
  banner_link: string;
  banner_title: string;
  advertisements: Advertisement[];
  local_image: string;
  local_cta: string;
  export_image: string;
  export_cta: string;
  unique_selling_point_title: string;
  unique_selling_point_subtitle: string;
  unique_selling_point_images: UniqueSellingPointImage[];
}
interface Advertisement {
  block_type: string;
  value: AdvertisementValue;
}
interface AdvertisementValue {
  video_link?: string;
  video_cta?: string;
  video_background?: string;
  banner?: string;
  banner_cta?: string;
  banner_link?: string;
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
  parent: string | null;
  locale: string;
  canonical_url: string;
  og_image: string | null;
}
interface UniqueSellingPointImage {
  block_type: string;
  value: UniqueSellingPointImageValue;
}
interface UniqueSellingPointImageValue {
  title: string;
  subtitle: string;
  image: string;
}
interface TopLevelMeta {
  total_count: number;
}
