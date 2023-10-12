export interface DEFAULT_NAME_TYPE {
  id: number;
  logo: string;
  favicon: string;
  og_image: string;
  emails: Email[];
  footer_social_icon: FooterIcon[];
  footer_ecom_icon: FooterIcon[];
  contact_icon: ContactIcon[];
  working_times: Email[];
  working_times_en: Email[];
  hotlines: Email[];
  seo_title: string;
  seo_title_en: string;
  seo_description: string;
  seo_description_en: string;
  company_name: string;
  company_name_en: string;
  tax_identification_number: string;
  address_google_map_iframe_link: string;
  address: string;
  address_en: string;
  footer_description: string;
  footer_description_en: string;
  ministry_link: string;
  site: number;
  ministry_logo: number;
}
interface ContactIcon {
  block_type: string;
  value: ContactIconValue;
}
interface ContactIconValue {
  icon: string;
  tel?: string;
  link?: string;
}
interface Email {
  block_type: string;
  value: string;
}
interface FooterIcon {
  block_type: string;
  value: FooterEcomIconValue;
}
interface FooterEcomIconValue {
  icon: string;
  link: string;
}
