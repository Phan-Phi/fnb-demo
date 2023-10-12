import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { Stack, Typography, styled } from "@mui/material";

import { ROUTES } from "@/routes";
import { PRODUCT_IMG_RATIO } from "@/constants";
import { ImageRatio, VNDCurrency } from "@/components";

type CardProductItemProps = {
  alt?: string;
  imageSrc: string;
  title: string;
  isHomePage?: boolean;
  price: string;
  isExported: boolean;
  id: number;
};

export default function CardProductItem(props: CardProductItemProps) {
  const { alt = "", imageSrc, title, isHomePage = false, price, isExported, id } = props;
  const router = useRouter();

  const onGoToHandler = useCallback(
    (id: number) => () => {
      if (!id) return;

      router.push(`/${ROUTES.productDetail}/${id}`);
    },
    []
  );

  return (
    <StyledWrapper onClick={onGoToHandler(id)}>
      <ImageRatio
        ratio={PRODUCT_IMG_RATIO}
        imageProps={{
          alt: alt,
          src: imageSrc,
          style: { borderRadius: isHomePage ? 20 : 20 },
        }}
      />

      {!isExported && <VNDCurrency value={parseFloat(price)} />}

      <StyledTitle>{title}</StyledTitle>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Stack)(() => {
  return {
    gap: 8,
    cursor: "pointer",
  };
});

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    color: theme.palette.text.primary,

    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    minHeight: 20 * 2,
  };
});
