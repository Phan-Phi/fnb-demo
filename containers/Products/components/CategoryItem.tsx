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
  id: number;
};

export default function CategoryItem(props: CategoryItemProps) {
  const { alt = "", href, imageSrc, title, id } = props;
  const router = useRouter();

  const onGoToHandler = useCallback(
    (href: string) => () => {
      const routerId = router.query.id as string;

      if (parseInt(routerId) === id) return;

      router.push(href);
    },
    [router.query.id, id]
  );

  return (
    <StyledWrapper onClick={onGoToHandler(href)}>
      <StyledWrapperImg>
        <Image src={imageSrc} alt={alt} style={{ objectFit: "cover" }} />
        <StyledOverLay />
      </StyledWrapperImg>

      <StyledTitle isActive={parseInt(router.query.id as string) === id}>
        {title}
      </StyledTitle>
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

const StyledTitle = styled(Typography, {
  shouldForwardProp: (propName) => propName !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive }) => {
  return {
    ...theme.typography.p_medium,
    fontWeight: 600,
    lineHeight: "20px",
    textTransform: "capitalize",
    color: isActive ? theme.palette.primary.main : theme.palette.text.primary,

    overflow: "hidden",
    WebkitLineClamp: 2,
    userSelect: "none",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
  };
});
