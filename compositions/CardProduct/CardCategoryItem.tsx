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

      <StyledWrapperTitle>
        <StyledTitle>{title}</StyledTitle>
      </StyledWrapperTitle>
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

const StyledWrapperTitle = styled(Box)(() => {
  return {
    zIndex: 3,
    padding: "0 16px",
    position: "absolute",
    bottom: "10%",
    width: "100%",
  };
});

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.SVNPoppins,

    textAlign: "center",
    textTransform: "capitalize",
    color: theme.palette.common.white,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    minHeight: 32 * 2,
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
