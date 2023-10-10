import useSWR from "swr";
import { useEffect, useState } from "react";
import { Badge, styled } from "@mui/material";

import { useCart } from "@/hooks";
// import { CART_ITEM_API } from "@/apis";
import { useRouter } from "next/router";
import { Box, CartIcon } from "@/components";
import { CART_ITEM_TYPE, responseSchema } from "@/interfaces";
import { CART_ITEMS, CART_ITEMS_END_POINT } from "@/__generated__";

interface Props {
  active: boolean;
}

export default function CartHeader({ active }: Props) {
  const router = useRouter();

  const { fetcher } = useCart();

  const [totalPrice, setTotalPrice] = useState(0);

  const { data } = useSWR<responseSchema<CART_ITEMS>>(CART_ITEMS_END_POINT, fetcher);

  useEffect(() => {
    if (data == undefined) return;

    setTotalPrice(data.meta.total_count);
  }, [data]);

  return (
    <WrapperCart
      onClick={() => {
        router.push("/cart");
      }}
      active={active}
    >
      <Badge color="secondary" badgeContent={totalPrice} max={99} showZero>
        <CartIcon />
      </Badge>
    </WrapperCart>
  );
}

const WrapperCart = styled(Box, {
  shouldForwardProp: (propName) => {
    return propName !== "scroll" && propName !== "active";
  },
})<Props>(({ theme, active }) => {
  return {
    cursor: "pointer",
    "& path": {
      stroke: theme.palette.text.primary,
    },
  };
});
