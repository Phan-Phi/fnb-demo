import { object, number, string, array, InferType, mixed, boolean, lazy } from "yup";

import {
  BLOCK_TYPE_CONTENT,
  BLOCK_TYPE_CONTENT_IMAGE,
  BLOCK_TYPE_EMBED,
  BLOCK_TYPE_IMAGE,
  BLOCK_TYPE_IMAGE_CONTENT,
  META_ITEM,
  META_ITEM_NEWS,
} from "./utils";
import { get } from "lodash";

export let newsListingPageSchema = object({
  id: number().required().positive().integer(),
  meta: META_ITEM_NEWS,
  title: string().required(),
  last_published_at: string().required(),
  banner: string().required(),
  subtitle: string().required(),
});

export let newsPagePageSchema = object({
  id: number().required().positive().integer(),
  meta: META_ITEM_NEWS,
  title: string().required(),
  last_published_at: string().required(),
  banner: string().required(),
  thumbnail: string().required(),
  description: string().required(),
  // content: mixed(),

  content: array().of(
    lazy((data) => {
      const blockType = get(data, "block_type");
      if (blockType === "content") return BLOCK_TYPE_CONTENT;
      if (blockType === "embed") return BLOCK_TYPE_EMBED;
      if (blockType === "image_content") return BLOCK_TYPE_IMAGE_CONTENT;
      if (blockType === "content_image") return BLOCK_TYPE_CONTENT_IMAGE;

      return BLOCK_TYPE_CONTENT;
    })
  ),

  is_on_footer: boolean().required(),
});

export let newsDetailPageSchema = object({
  id: number().required().positive().integer(),
  meta: META_ITEM_NEWS,
  title: string().required(),
  last_published_at: string().required(),
  banner: string().required(),
});

export let renderContent = array().of(
  lazy((data) => {
    const blockType = get(data, "block_type");
    if (blockType === "content") return BLOCK_TYPE_CONTENT;
    if (blockType === "embed") return BLOCK_TYPE_EMBED;
    if (blockType === "image_content") return BLOCK_TYPE_IMAGE_CONTENT;
    if (blockType === "content_image") return BLOCK_TYPE_CONTENT_IMAGE;

    return BLOCK_TYPE_CONTENT;
  })
);

export type NewsPage = InferType<typeof newsPagePageSchema>;
export type NewsDetailPage = InferType<typeof newsDetailPageSchema>;
export type NewsListingPage = InferType<typeof newsListingPageSchema>;
export type RenderContent = InferType<typeof renderContent>;
