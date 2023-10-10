export interface NEWS_PAGE_TYPE {
  meta: TopLevelMeta;
  next: string | null;
  previous: string | null;
  items: NEWS_PAGE_TYPE_ITEM_TYPE[];
}
export interface NEWS_PAGE_TYPE_ITEM_TYPE {
  id: number;
  meta: ItemMeta;
  title: string;
  last_published_at: string;
  banner: string | null;
  thumbnail: string | null;
  description: string;
  content: Content[];
  is_on_footer: boolean;
}
interface Content {
  block_type: BlockType;
  value: ValueClass | string;
}
type BlockType = "content" | "image_content" | "content_image" | "embed";
interface ValueClass {
  image?: string;
  content?: string;
  width?: string;
  height?: string;
  src?: string;
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
