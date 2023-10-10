import { object, number, string, array, InferType } from "yup";

import { BLOCK_TYPE_IMAGE, META_ITEM } from "./utils";

export let homePageSchema = object({
  id: number().required().positive().integer(),
  meta: META_ITEM,
  title: string().required(),
  last_published_at: string().required(),
  banner: string().required(),
  banner_link: string().required(),
  about_us_title: string().required(),
  about_us_content: string().required(),
  about_us_images: array(BLOCK_TYPE_IMAGE).required(),
  video_link: string().required(),
  video_cta: string().required(),
  local_image: string().required(),
  local_cta: string().required(),
  export_image: string().required(),
  export_cta: string().required(),
  banner_title: string().required(),
});

export type HomePage = InferType<typeof homePageSchema>;
