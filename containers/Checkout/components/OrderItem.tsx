import React from "react";

import useSWR from "swr";
import { Box, styled, Typography, Stack } from "@mui/material";

import { Image, VNDCurrency } from "@/components";
import { CARD_PRODUCT_BOX_SHADOW } from "@/constants";

import {
  PRODUCTS_VARIANTS_END_POINT,
  PRODUCTS_VARIANTS_ITEM_TYPE,
} from "@/__generated__";

type OrderItemProps = {
  id: number;
  variantId: number;
  variantName: string;
  productName: string;
  price: string;
  quantity: number;
};

export default function OrderItem(props: OrderItemProps) {
  const { id, variantId, variantName, productName, price, quantity } = props;

  const { data: dataVariant } = useSWR<PRODUCTS_VARIANTS_ITEM_TYPE>(
    `${PRODUCTS_VARIANTS_END_POINT}${variantId}`
  );

  if (dataVariant == undefined) return null;

  return (
    <StyledWrapper className="order-item">
      <StyledStack>
        <Box position="relative" width={69} height={46}>
          <Image
            alt={dataVariant.name}
            src={dataVariant.images[0].value}
            style={{ objectFit: "contain" }}
          />

          <StyledWrapperQuantity>
            <StyledQuantity>{quantity}</StyledQuantity>
          </StyledWrapperQuantity>
        </Box>

        <StyledTitle>{`${productName} - ${variantName}`}</StyledTitle>
      </StyledStack>

      <StyledPrice value={parseFloat(price) * quantity} fontWeight={600} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(({ theme }) => {
  return {
    padding: 12,
    borderRadius: 8,
    border: `0.3px solid`,
    borderColor:
      theme.palette.mode === "light"
        ? theme.palette.common.black
        : theme.palette.common.white,
    boxShadow: CARD_PRODUCT_BOX_SHADOW,

    gap: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  };
});

const StyledStack = styled(Stack)(() => {
  return {
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
  };
});

const StyledWrapperQuantity = styled(Box)(({ theme }) => {
  return {
    top: -6,
    right: -4,
    position: "absolute",

    width: 18,
    height: 18,
    borderRadius: 999,
    backgroundColor: theme.palette.primary.main,

    gap: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
});

const StyledQuantity = styled(Typography)(({ theme }) => {
  return {
    fontSize: 8,
    lineHeight: "20px",
    fontWeight: 400,
    color: theme.palette.common.white,
  };
});

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_xSmall,
    fontWeight: 600,
    width: 200,

    [theme.breakpoints.between(900, 1110)]: {
      width: 110,
    },

    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
  };
});

const StyledPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.p_medium,
    fontWeight: 600,
    color:
      theme.palette.mode === "dark"
        ? theme.palette.common.white
        : theme.palette.common.black,
  };
});
