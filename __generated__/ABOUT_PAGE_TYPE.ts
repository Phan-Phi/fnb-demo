export interface ABOUT_PAGE_TYPE {
  meta: TopLevelMeta;
  next: string | null;
  previous: string | null;
  items: ABOUT_PAGE_TYPE_ITEM_TYPE[];
}
export interface ABOUT_PAGE_TYPE_ITEM_TYPE {
  id: number;
  meta: ItemMeta;
  title: string;
  last_published_at: string;
  subtitle: string;
  banner: string | null;
  histories: History[];
  vision_title: string;
  vision_description: string;
  certificate_title: string;
  certificate_description: string;
  local_certificates: LocalCertificate[];
  export_certificates: any[];
}
interface History {
  block_type: string;
  value: ValueValue | string;
}
interface ValueValue {
  width: string;
  height: string;
  src: string;
}
interface LocalCertificate {
  block_type: string;
  value: LocalCertificateValue;
}
interface LocalCertificateValue {
  title: string;
  image: string;
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
