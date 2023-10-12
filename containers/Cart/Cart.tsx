import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import useSWR from "swr";
import axios from "axios.config";
import { isEmpty } from "lodash";
import { Box, Button, Container, Stack, Typography, styled } from "@mui/material";

import CartItem from "./components/CartItem";
import { NoProducts, SEO, Spacing, Title, VNDCurrency } from "@/components";

import { ROUTES } from "@/routes";
import { getSeoObject } from "@/libs";
import { useCart, useIntl } from "@/hooks";
import { CART_ITEM_TYPE } from "@/interfaces";
import { CART_ITEMS, CART_ITEMS_END_POINT } from "@/__generated__";

export interface CART_ITEMS_EXTENDS extends CART_ITEMS {
  items: CART_ITEM_TYPE[];
}

export default function Cart() {
  const router = useRouter();
  const { messages } = useIntl();
  const { cartKey, fetcher } = useCart();

  const [totalPrice, setTotalPrice] = useState(0);

  const { data, mutate } = useSWR<CART_ITEMS_EXTENDS>(CART_ITEMS_END_POINT, fetcher);

  useEffect(() => {
    if (data == undefined) return;

    const result = data.items.reduce((total, item) => {
      return total + parseFloat(item.variant_price) * item.quantity;
    }, 0);

    setTotalPrice(result);
  }, [data]);

  const handleDeleteCartItem = useCallback(async (id: number) => {
    await axios.delete(`${CART_ITEMS_END_POINT}${id}/`, {
      headers: {
        "X-Cart-Key": cartKey,
      },
    });

    mutate();
  }, []);

  const renderCartItem = useMemo(() => {
    if (data == undefined) return null;

    return data.items.map((item) => {
      return (
        <CartItem
          mutate={mutate}
          key={item.id}
          id={item.id}
          variantId={item.variant}
          price={item.variant_price}
          variantName={item.variant_name}
          productName={item.product_title}
          quantityOfProduct={item.quantity}
          onDeleteItem={() => handleDeleteCartItem(item.id)}
        />
      );
    });
  }, [data]);

  if (data == undefined) return null;

  return (
    <Container>
      <SEO {...getSeoObject(undefined)} />

      <Title>{messages["cart.bannerTitle"]}</Title>

      <Spacing spacing={2} />

      {isEmpty(data.items) ? (
        <StyledCenter>
          <NoProducts title="cart.empty" />
        </StyledCenter>
      ) : (
        <Stack gap="32px">
          <Stack gap="16px">{renderCartItem}</Stack>

          <StyledWrapperTotalPrice>
            <StyledText>{messages["cart.total"]}:</StyledText>

            <StyledTotalPrice value={totalPrice} />
          </StyledWrapperTotalPrice>

          <Stack alignItems="flex-end">
            <StyledButton
              onClick={() => {
                router.push(`/${ROUTES.checkout}`);
              }}
            >
              {messages["button.next"]}
            </StyledButton>
          </Stack>
        </Stack>
      )}
    </Container>
  );
}

const StyledWrapperTotalPrice = styled(Stack)(() => {
  return {
    gap: 40,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  };
});

const StyledText = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_large,
    fontWeight: 600,
  };
});

const StyledTotalPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.SVNPoppins,
    fontSize: 24,
    lineHeight: "32px",
    fontWeight: 600,
    letterSpacing: "-0.48px",
    color: theme.palette.primary.main,
  };
});

const StyledButton = styled(Button)(() => {
  return {
    textTransform: "capitalize",
    width: 86,
  };
});

const StyledCenter = styled(Box)(() => {
  return {
    padding: "60px 0",
  };
});
