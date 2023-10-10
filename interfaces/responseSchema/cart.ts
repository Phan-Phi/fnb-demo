import { InferType, mixed, number, object, string } from "yup";

export let CartItem = object({
  id: number().required(),
  variant: number().required(),
  order: number().required(),
  sort_order: mixed().nullable(),
  variant_name: string().required(),
  variant_unit: string().required(),
  variant_price: string().required(),
  quantity: number().required(),
  product_title: string().required(),
});

export type CART_ITEM_TYPE = InferType<typeof CartItem>;
