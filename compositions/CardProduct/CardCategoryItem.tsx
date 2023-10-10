import { useRouter } from "next/router";
import React, { useCallback } from "react";

import { isEmpty } from "lodash";
import { Box, Typography, styled } from "@mui/material";

import { ImageRatio } from "@/components";
import { CATEGORY_IMG_GRADIENT, CATEGORY_IMG_RATIO } from "@/constants";

type CardCategoryItemProps = {
  alt?: string;
  imageSrc: string;
  title: string;
  href: string;
  isHomePage?: boolean;
};

export default function CardCategoryItem(props: CardCategoryItemProps) {
  const { alt = "", imageSrc, title, href, isHomePage = false } = props;

  const router = useRouter();

  const goToHandler = useCallback(
    (href: string) => () => {
      if (isEmpty(href)) return;

      router.push(href);
    },
    []
  );

  return (
    <StyledWrapperCardCategoryItem onClick={goToHandler(href)} isHomePage={isHomePage}>
      <ImageRatio
        ratio={CATEGORY_IMG_RATIO}
        imageProps={{
          alt: alt,
          src: imageSrc || "",
          style: { objectFit: "cover" },
        }}
      />

      <StyledOverLay />

      <StyledTitle>{title}</StyledTitle>
    </StyledWrapperCardCategoryItem>
  );
}

const StyledWrapperCardCategoryItem = styled(Box, {
  shouldForwardProp: (propName) => propName !== "isHomePage",
})<{ isHomePage: boolean }>(({ isHomePage }) => {
  return {
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
    borderRadius: isHomePage ? 16 : 4,
  };
});

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    zIndex: 3,
    left: "50%",
    bottom: "20%",
    position: "absolute",
    transform: "translateX(-50%)",

    ...theme.typography.SVNPoppins,

    textAlign: "center",
    textTransform: "capitalize",
    color: theme.palette.common.white,
  };
});

const StyledOverLay = styled(Box)(() => {
  return {
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 2,
    width: "100%",
    position: "absolute",
    background: CATEGORY_IMG_GRADIENT,
  };
});
