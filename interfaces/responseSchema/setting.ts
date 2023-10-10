import { array, InferType, mixed, number, object, string } from "yup";

import {
  BLOCK_TYPE_EMAIL,
  BLOCK_TYPE_SOCIAL_ICON,
  BLOCK_TYPE_WORKING_TIME,
  BLOCK_TYPE_HOTLINES,
  CONTACT_ICON,
  BLOCK_TYPE_SEARCH_BAR_PLACEHOLDER,
  BLOCK_TYPE_ECOM_ICON,
} from "./utils";

export let SettingSchema = object({
  id: number().required(),
  logo: string().required(),
  favicon: string().required(),
  og_image: string().required(),
  emails: array(BLOCK_TYPE_EMAIL).required(),
  footer_social_icon: array(BLOCK_TYPE_SOCIAL_ICON).required(),
  //   contact_icon: array(CONTACT_ICON).required(),
  contact_icon: mixed(),
  working_times: array(BLOCK_TYPE_WORKING_TIME).required(),
  working_times_en: array(BLOCK_TYPE_WORKING_TIME).required(),
  hotlines: array(BLOCK_TYPE_HOTLINES).required(),
  seo_title: string().required(),
  seo_title_en: string().required(),
  seo_description: string().required(),
  seo_description_en: string().required(),
  company_name: string().required(),
  company_name_en: string().required(),
  tax_identification_number: string().required(),
  address_google_map_iframe_link: string().required(),
  address: string().required(),
  address_en: string().required(),
  website: string().required(),
  notification_order_subject: string().required(),
  notification_order_template: string().required(),
  footer_description: string().required(),
  footer_description_en: string().required(),
  site: number().required(),
  search_bar_placeholders: array(BLOCK_TYPE_SEARCH_BAR_PLACEHOLDER).required(),
  search_bar_placeholders_en: array(BLOCK_TYPE_SEARCH_BAR_PLACEHOLDER).required(),
  footer_ecom_icon: array(BLOCK_TYPE_ECOM_ICON).required(),
});

export type SETTING_ITEM = InferType<typeof SettingSchema>;
