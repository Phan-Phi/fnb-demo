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
  about_us_content: string;
  about_us_images: AboutUsImage[];
  video_link: string;
  video_cta: string;
  local_image: string;
  local_cta: string;
  export_image: string;
  export_cta: string;
}
interface AboutUsImage {
  block_type: string;
  value: string;
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
interface TopLevelMeta {
  total_count: number;
}
