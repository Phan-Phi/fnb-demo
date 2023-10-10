import { InferType, number, object, string } from "yup";
import { META_ITEM } from "./utils";

export let Contact = object({
  id: number().required(),
  meta: META_ITEM,
  title: string().required(),
  last_published_at: string().required(),
  subtitle: string().required(),
  banner: string().required(),
});

export type CONTACT_PAGE_TYPE = InferType<typeof Contact>;
