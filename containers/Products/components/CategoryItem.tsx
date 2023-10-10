import React, { useCallback } from "react";
import { useRouter } from "next/router";

import { Box, Stack, Typography, styled } from "@mui/material";

import { Image } from "@/components";
import { CATEGORY_IMG_GRADIENT } from "@/constants";

type CategoryItemProps = {
  href: string;
  imageSrc: string;
  alt?: string;
  title: string;
};

export default function CategoryItem(props: CategoryItemProps) {
  const { alt = "", href, imageSrc, title } = props;
  const router = useRouter();

  const onGoToHandler = useCallback(
    (href: string) => () => {
      router.push(href, href, {
        scroll: false,
      });
    },
    []
  );

  return (
    <StyledWrapper onClick={onGoToHandler(href)}>
      <StyledWrapperImg>
        <Image src={imageSrc} alt={alt} style={{ objectFit: "cover" }} />
        <StyledOverLay />
      </StyledWrapperImg>

      <StyledTitle>{title}</StyledTitle>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Stack)(() => {
  return {
    gap: 8,
    cursor: "pointer",
    flexDirection: "row",
    alignItems: "center",
  };
});

const StyledWrapperImg = styled(Box)(() => {
  return {
    width: 40,
    height: 40,
    minWidth: 40,
    borderRadius: 4,
    overflow: "hidden",
    position: "relative",
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

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_medium,
    fontWeight: 600,
    lineHeight: "20px",
    color: theme.palette.text.primary,
    textTransform: "capitalize",

    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
  };
});
