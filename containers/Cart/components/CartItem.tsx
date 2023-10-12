import { useMeasure, useUpdateEffect } from "react-use";
import React, { Fragment, useMemo, useState } from "react";

import axios from "axios.config";
import useSWR, { KeyedMutator } from "swr";
import { Box, Grid, Stack, Typography, styled } from "@mui/material";

import { useCart, useMedia } from "@/hooks";
import { CART_ITEMS_EXTENDS } from "../Cart";
import { PSEUDO_STATE } from "@/configuration";
import { CounterInput, Image, SVG, VNDCurrency } from "@/components";

import {
  CART_ITEMS_END_POINT,
  PRODUCTS_VARIANTS_END_POINT,
  PRODUCTS_VARIANTS_ITEM_TYPE,
} from "@/__generated__";

type CartItemProps = {
  id: number;
  price: string;
  variantId: number;
  variantName: string;
  productName: string;
  quantityOfProduct: number;
  onDeleteItem: () => void;
  mutate: KeyedMutator<CART_ITEMS_EXTENDS>;
};

export default function CartItem(props: CartItemProps) {
  const {
    id,
    price,
    mutate,
    variantId,
    variantName,
    productName,
    onDeleteItem,
    quantityOfProduct,
  } = props;

  const { cartKey } = useCart();
  const { isSmDown } = useMedia();
  const [ref, { width }] = useMeasure();
  const [quantity, setQuantity] = useState(quantityOfProduct);

  const { data: dataVariant } = useSWR<PRODUCTS_VARIANTS_ITEM_TYPE>(() => {
    if (variantId == undefined) return;

    return `${PRODUCTS_VARIANTS_END_POINT}${variantId}`;
  });

  useUpdateEffect(() => {
    async function updateQuantity() {
      await axios.patch(
        `${CART_ITEMS_END_POINT}${id}/`,
        { quantity },
        {
          headers: {
            "X-Cart-Key": cartKey,
          },
        }
      );
      mutate();
    }
    updateQuantity();
  }, [quantity]);

  const renderLayoutCartItem = useMemo(() => {
    if (dataVariant == undefined) return null;

    if (isSmDown) {
      return (
        <StyledWrapperMobile container spacing="8px" className="cart-item__mobile">
          <Grid item xs={3}>
            <StyledCenter>
              <Box ref={ref} position="relative" width="100%" height={(width * 3) / 2}>
                <Image src={dataVariant.images[0].value} alt={dataVariant.name} />
              </Box>
            </StyledCenter>
          </Grid>

          <Grid item xs={8}>
            <StyledMiddleColumn>
              <StyledWrapperTitle>
                <StyledText className="cart-item__title">
                  {`${productName} - ${variantName}`}
                </StyledText>
              </StyledWrapperTitle>

              <StyledWrapperPrice>
                <StyledPrice
                  className="cart-item__price"
                  value={parseFloat(price)}
                  fontSize={8}
                />
              </StyledWrapperPrice>

              <StyledWrapperCounterInput>
                <CounterInput value={quantity} onValueChange={setQuantity} />
              </StyledWrapperCounterInput>

              <StyledWrapperTotalPrice>
                <StyledTotalPrice
                  className="cart-item__total-price"
                  value={quantity * parseFloat(price)}
                  fontSize={10}
                  fontWeight={600}
                />
              </StyledWrapperTotalPrice>
            </StyledMiddleColumn>
          </Grid>

          <Grid item xs={1}>
            <StyledCenter>
              <StyledWrapperSVG onClick={onDeleteItem}>
                <StyledSVG src="/svg/delete.svg" />
              </StyledWrapperSVG>
            </StyledCenter>
          </Grid>
        </StyledWrapperMobile>
      );
    } else {
      return (
        <StyledWrapper className="cart-item__desktop">
          <StyledFirstColumn className="cart-item__first-column">
            <Box position="relative" width={69} height={46}>
              <Image src={dataVariant.images[0].value} alt={dataVariant.name} />
            </Box>

            <StyledWrapperTitle>
              <StyledText className="cart-item__title">
                {`${productName} - ${variantName}`}
              </StyledText>
            </StyledWrapperTitle>
          </StyledFirstColumn>

          <StyledWrapperPrice>
            <StyledPrice
              className="cart-item__price"
              value={parseFloat(price)}
              fontSize={10}
            />
          </StyledWrapperPrice>

          <StyledWrapperCounterInput>
            <CounterInput value={quantity} onValueChange={setQuantity} />
          </StyledWrapperCounterInput>

          <StyledWrapperTotalPrice>
            <StyledTotalPrice
              className="cart-item__total-price"
              value={quantity * parseFloat(price)}
              fontWeight={600}
            />
          </StyledWrapperTotalPrice>

          <StyledWrapperSVG onClick={onDeleteItem}>
            <StyledSVG src="/svg/delete.svg" />
          </StyledWrapperSVG>
        </StyledWrapper>
      );
    }
  }, [isSmDown, dataVariant, price, quantity, variantName, productName, width]);

  return <Fragment>{renderLayoutCartItem}</Fragment>;
}

const StyledWrapper = styled(Box)(({ theme }) => {
  return {
    padding: 16,
    borderRadius: 8,
    border: `0.3px solid ${theme.palette.text.primary}`,

    gap: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    [theme.breakpoints.down("md")]: {
      gap: 20,
    },
  };
});

const StyledWrapperMobile = styled(Grid)(({ theme }) => {
  return {
    borderRadius: 8,
    padding: "8px 8px 8px 0",
    border: `0.3px solid ${theme.palette.text.primary}`,
  };
});

const StyledFirstColumn = styled(Stack)(() => {
  return {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  };
});

const StyledMiddleColumn = styled(Box)(() => {
  return {
    gap: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  };
});

const StyledWrapperCounterInput = styled(Box)(({ theme }) => {
  return {
    width: "fit-content",

    [theme.breakpoints.down("sm")]: {
      "& .counter-input": {
        height: 28,

        "& .input": {
          height: 26,
        },
      },
    },
  };
});

const StyledCenter = styled(Stack)(() => {
  return {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  };
});

const StyledText = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    fontWeight: 600,

    [theme.breakpoints.down("md")]: {
      ...theme.typography.p_xSmall,
      fontWeight: 600,
    },
  };
});

const StyledPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    color: theme.palette.text.primary,

    [theme.breakpoints.down("md")]: {
      ...theme.typography.p_xSmall,
      color: theme.palette.text.primary,
    },
  };
});

const StyledTotalPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.p_large,
    fontWeight: 600,
    color: theme.palette.text.primary,

    [theme.breakpoints.down("md")]: {
      ...theme.typography.p_small,
      fontWeight: 600,
      color: theme.palette.text.primary,
    },
  };
});

const StyledWrapperSVG = styled(Box)(() => {
  return {
    cursor: "pointer",

    [PSEUDO_STATE.hover]: {
      opacity: 0.7,
    },

    ["& div"]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

const StyledSVG = styled(SVG)(({ theme }) => {
  return {
    "& path": {
      stroke: theme.palette.text.primary,
    },
  };
});

const StyledWrapperTitle = styled(Stack)(({ theme }) => {
  return {
    width: 220,

    [theme.breakpoints.down("md")]: {
      width: 80,
    },

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  };
});

const StyledWrapperPrice = styled(Stack)(({ theme }) => {
  return {
    width: 180,

    [theme.breakpoints.up("md")]: {
      alignItems: "flex-end",
    },

    [theme.breakpoints.down("md")]: {
      width: 120,
    },

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  };
});

const StyledWrapperTotalPrice = styled(Stack)(({ theme }) => {
  return {
    width: 250,

    [theme.breakpoints.up("md")]: {
      alignItems: "flex-end",
    },

    [theme.breakpoints.down("md")]: {
      width: 200,
    },

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  };
});
