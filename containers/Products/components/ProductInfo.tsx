import { useMountedState } from "react-use";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import useSWR from "swr";
import { Grid, Stack, Typography, styled, Box } from "@mui/material";

import Variant from "./Variant";
import ButtonTiktok from "./ButtonTiktok";
import ButtonBuyNow from "./ButtonBuyNow";
import { RenderContent } from "@/compositions";
import { CounterInput, VNDCurrency } from "@/components";

import axios from "axios.config";
import { useCart, useIntl, useNotification } from "@/hooks";

import {
  CART_ITEMS,
  CART_ITEMS_END_POINT,
  PRODUCTS_VARIANTS_ITEM_TYPE,
  PRODUCT_PAGE_TYPE_ITEM_TYPE,
} from "@/__generated__";

type ProductInfoProps = {
  productData: PRODUCT_PAGE_TYPE_ITEM_TYPE;
  productVariantData: PRODUCTS_VARIANTS_ITEM_TYPE[];
  setVariantId: (n: number) => void;
};

type CURRENT_VARIANT_TYPE = {
  id: number;
  price: string;
  name: string;
};

export default function ProductInfo(props: ProductInfoProps) {
  const { messages } = useIntl();
  const isMounted = useMountedState();
  const { cartKey, fetcher } = useCart();
  const { enqueueSnackbar, enqueueSnackbarWithError, loading, setLoading } =
    useNotification();

  const [quantity, setQuantity] = useState(1);
  const [indexVariant, setIndexVariant] = useState(0);
  const [currentVariant, setCurrentVariant] = useState<CURRENT_VARIANT_TYPE>();

  const { productData, productVariantData, setVariantId } = props;
  const { title, tiktok_url, description, is_exported, unit } = productData;

  const { data, mutate } = useSWR<CART_ITEMS>(CART_ITEMS_END_POINT, fetcher);

  useEffect(() => {
    if (productVariantData == undefined) return;

    let newObj = {
      id: productVariantData[0].id,
      price: productVariantData[0].price,
      name: productVariantData[0].name,
    };

    setQuantity(1);
    setIndexVariant(0);
    setCurrentVariant(newObj);
    setVariantId(newObj.id);
  }, [productVariantData]);

  const handleGetCurrentVariant = useCallback(
    (index: number, obj: { id: number; price: string; name: string }) => () => {
      setIndexVariant(index);
      setCurrentVariant(obj);
      setVariantId(obj.id);
    },
    []
  );

  const handleAddToCart = useCallback(async () => {
    try {
      setLoading(true);

      if (currentVariant == undefined || data == undefined) return;

      const isExisted = data.items.some((item) => {
        return item.variant === currentVariant.id;
      });

      if (isExisted) {
        const currentCartItem = data.items.filter(
          (item) => item.variant === currentVariant.id
        );

        const idOfCartItem = currentCartItem[0].id;
        const quantityOfCartItem = currentCartItem[0].quantity;

        let updateData = {
          quantity: quantityOfCartItem + quantity,
        };

        await axios.patch(`${CART_ITEMS_END_POINT}${idOfCartItem}/`, updateData, {
          headers: {
            "X-Cart-Key": cartKey,
          },
        });
      } else {
        let data = {
          variant: currentVariant.id,
          quantity,
        };

        await axios.post(CART_ITEMS_END_POINT, data, {
          headers: {
            "X-Cart-Key": cartKey,
          },
        });
      }

      mutate();
      setQuantity(1);

      enqueueSnackbar("", { variant: "addToCart" });
    } catch (err) {
      enqueueSnackbarWithError(err);
    } finally {
      if (isMounted()) {
        setLoading(false);
      }
    }
  }, [data, currentVariant, quantity, cartKey]);

  const renderVariant = useMemo(() => {
    if (productVariantData == undefined) return null;

    return productVariantData.map((item, index) => {
      const { name, id, price } = item;

      let newObj = {
        id,
        price,
        name,
      };

      return (
        <Grid item xs={6} key={index}>
          <Variant
            onClick={handleGetCurrentVariant(index, newObj)}
            checked={index === indexVariant ? true : false}
          >
            {name}
          </Variant>
        </Grid>
      );
    });
  }, [productVariantData, indexVariant]);

  return (
    <StyledWrapper>
      <Stack gap="8px">
        <StyledTitle>{title}</StyledTitle>

        <StyledUnit> {unit || ""}</StyledUnit>

        {!is_exported && (
          <StyledPrice
            className="product-info__price"
            value={parseFloat(currentVariant?.price as string)}
          />
        )}
      </Stack>

      <Stack gap="12px">
        <StyledText className="product-detail__text">
          {messages["brands.description"]}
        </StyledText>

        <RenderContent data={description} />
      </Stack>

      <Stack gap="12px">
        <StyledText className="product-detail__text">
          {messages["brands.variant"]}
        </StyledText>

        <Grid container spacing="16px">
          {renderVariant}
        </Grid>
      </Stack>

      <Stack gap="12px">
        <StyledText className="product-detail__text">
          {messages["brands.quantity"]}
        </StyledText>

        {!is_exported && (
          <WrapperCounterInput>
            <CounterInput value={quantity} onValueChange={setQuantity} />
          </WrapperCounterInput>
        )}
      </Stack>

      <Stack flexDirection="row" gap="8px">
        <ButtonTiktok
          onClick={() => {
            if (tiktok_url == "") return;
            window.open(tiktok_url, "_blank");
          }}
        />
        <ButtonBuyNow
          loading={loading}
          isExported={is_exported}
          addToCart={handleAddToCart}
        />
      </Stack>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Stack)(() => {
  return {
    gap: 32,
  };
});

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.SVNPoppins,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: "28px",
    color: theme.palette.text.primary,
  };
});

const StyledUnit = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.RobotoSlab_small,
    fontSize: 16,
    lineHeight: "24px",
    fontWeight: 600,
    color: theme.palette.neutral.neutral700,
  };
});

const StyledPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.Roboto,
    fontSize: 28,
    lineHeight: "36px",
    fontWeight: 800,
    letterSpacing: "-0.56px",
    color: theme.palette.text.primary,
  };
});

const StyledText = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.Roboto,
    fontWeight: 600,
    color: theme.palette.text.primary,
  };
});

const WrapperCounterInput = styled(Box)(() => {
  return {
    width: "fit-content",
  };
});
