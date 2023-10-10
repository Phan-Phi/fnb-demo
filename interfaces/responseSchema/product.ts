import {
  META_ITEM,
  BLOCK_TYPE_IMAGE,
  BLOCK_TYPE_CONTENT,
  META_ITEM_PRODUCT,
} from "./utils";
import { InferType, array, boolean, number, object, string } from "yup";

export let ProductCategoryListing = object({
  id: number().required(),
  meta: META_ITEM,
  title: string().required(),
  subtitle: string().required(),
  last_published_at: string().required(),
  banner: string().required(),
});

export let ProductCategoryDetail = object({
  id: number().required(),
  meta: META_ITEM,
  title: string().required(),
  last_published_at: string().required(),
  banner: string().required(),
});

export let Products = object({
  id: number().required(),
  meta: META_ITEM_PRODUCT,
  title: string().required(),
  last_published_at: string().required(),
  is_exported: boolean().required(),
  images: array(BLOCK_TYPE_IMAGE).required(),
  unit: string().required(),
  description: array(BLOCK_TYPE_CONTENT).required(),
});

export let ProductVariants = object({
  id: number().required(),
  images: array(BLOCK_TYPE_IMAGE).required(),
  sort_order: number().required(),
  name: string().required(),
  price: string().required(),
  created: string().required(),
  updated: string().required(),
  product: number().required(),
});

export type PRODUCT_CATEGORY_LISTING_TYPE = InferType<typeof ProductCategoryListing>;

export type PRODUCT_CATEGORY_DETAIL = InferType<typeof ProductCategoryDetail>;

export type PRODUCTS = InferType<typeof Products>;

export type PRODUCTS_VARIANTS = InferType<typeof ProductVariants>;
