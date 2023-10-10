import React from "react";
import { CustomArrowProps } from "react-slick";

import { styled } from "@mui/material";
import { Box, SVG } from "@/components";

export default function PrevArrow(props: CustomArrowProps) {
  const { className, onClick } = props;

  return (
    <StyledWrapper className={className} onClick={onClick}>
      <StyledSVG src="/svg/prevArrow.svg" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(({ theme }) => {
  return {
    ["&::before"]: {
      display: "none",
    },

    ["&.slick-prev"]: {
      top: "138%",
      left: "42%",
      transform: "translate(0, 0)",

      [theme.breakpoints.down("sm")]: {
        left: "35%",
      },
    },
  };
});

const StyledSVG = styled(SVG)(({ theme }) => {
  return {
    ["& path"]: {
      stroke:
        theme.palette.mode === "dark"
          ? theme.palette.common.white
          : theme.palette.common.black,
    },
  };
});
