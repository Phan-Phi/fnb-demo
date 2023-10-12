import { useCallback } from "react";
import { useRouter } from "next/router";
import { Box, Typography, styled } from "@mui/material";

import Image from "../Image";
import Ratio from "../Box/Ratio";
import { useMedia } from "@/hooks";

import {
  HERO_RATIO_MOBILE,
  HERO_RATIO_TABLET,
  HERO_RATIO_DESKTOP,
  CATEGORY_IMG_GRADIENT,
} from "@/constants";

type BannerProps = {
  imgSrc: string | null | undefined;
  title?: string;
  href?: string;
};

export default function Banner({ imgSrc, title, href }: BannerProps) {
  const router = useRouter();
  const { isMdDown, isMdUp } = useMedia();

  const size = isMdUp
    ? HERO_RATIO_DESKTOP
    : isMdDown
    ? HERO_RATIO_TABLET
    : HERO_RATIO_MOBILE;

  const onGoToHandler = useCallback(
    (href: string) => () => {
      if (href == undefined || href == "") return;

      router.push(href);
    },
    []
  );

  return (
    <StyledWrapper onClick={onGoToHandler(href as string)} href={href as string}>
      {imgSrc && (
        <Ratio ratio={size}>
          <StyledOverLay className="overlay" />

          <Image
            alt=""
            src={imgSrc}
            style={{ objectFit: "cover", backgroundPosition: "center center" }}
          />

          {title && <StyledTitle>{title}</StyledTitle>}
        </Ratio>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box, {
  shouldForwardProp: (propName) => propName !== "href",
})<{ href: string }>(({ href }) => {
  return {
    borderRadius: 16,
    overflow: "hidden",
    ...(href && {
      cursor: "pointer",
    }),
  };
});

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.SVNPoppins,
    fontSize: 40,
    lineHeight: "48px",
    fontWeight: 700,
    letterSpacing: "-0.8px",
    color: theme.palette.common.white,

    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 3,
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
