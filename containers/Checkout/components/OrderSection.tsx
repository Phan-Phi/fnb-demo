import React, { useEffect, useMemo } from "react";

import useSWR from "swr";
import { styled, Stack } from "@mui/material";

import OrderItem from "./OrderItem";

import { useCart } from "@/hooks";
import { CART_ITEM_TYPE } from "@/interfaces";
import { CART_ITEMS, CART_ITEMS_END_POINT } from "@/__generated__";

type OrderSectionProps = {
  setTotalPrice: (n: number) => void;
};

interface CART_ITEMS_EXTENDS extends CART_ITEMS {
  items: CART_ITEM_TYPE[];
}

export default function OrderSection({ setTotalPrice }: OrderSectionProps) {
  const { fetcher } = useCart();

  const { data } = useSWR<CART_ITEMS_EXTENDS>(CART_ITEMS_END_POINT, fetcher);

  useEffect(() => {
    if (data == undefined) return;

    const result = data.items.reduce((total, item) => {
      return total + parseFloat(item.variant_price) * item.quantity;
    }, 0);

    setTotalPrice(result);
  }, [data]);

  const renderOrderItem = useMemo(() => {
    if (data == undefined) return null;

    return data.items.map((item, index) => {
      return (
        <OrderItem
          key={index}
          id={item.id}
          variantId={item.variant}
          variantName={item.variant_name}
          productName={item.product_title}
          price={item.variant_price}
          quantity={item.quantity}
        />
      );
    });
  }, [data]);

  return <StyledWrapper className="order-section">{renderOrderItem}</StyledWrapper>;
}

const StyledWrapper = styled(Stack)(() => {
  return {
    gap: 16,
  };
});
