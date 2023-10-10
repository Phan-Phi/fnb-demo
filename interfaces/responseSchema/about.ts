import { object, number, string, array, InferType } from "yup";

import {
  BLOCK_TYPE_CONTENT,
  BLOCK_TYPE_DOCUMENT,
  BLOCK_TYPE_EMBED,
  META_ITEM,
} from "./utils";

export let aboutPageSchema = object({
  id: number().required().positive().integer(),
  meta: META_ITEM,
  title: string().required(),
  banner: string().required(),
  certificate_title: string().required(),
  certificate_subtitle: string().required(),
  subtitle: string().required(),
  last_published_at: string().required(),
  histories: array(BLOCK_TYPE_CONTENT).required(),
  visions: array(BLOCK_TYPE_CONTENT).required(),
  local_certificates: array(BLOCK_TYPE_DOCUMENT).required(),
  export_certificates: array(BLOCK_TYPE_DOCUMENT).required(),
});

export type AboutPage = InferType<typeof aboutPageSchema>;
