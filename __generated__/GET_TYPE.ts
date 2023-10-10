interface META_TYPE {
  total_count: number;
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

interface META_ITEM_TYPE {
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
