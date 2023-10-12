import SVG from "../SVG";
import React from "react";
import { Box, styled } from "@mui/material";

export default function FirstButton() {
  return (
    <StyledWrapper>
      <SVG src="/svg/firstBtn.svg" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {
    width: "fit-content",
    height: "fit-content",
    "& .svg": {
      height: 22,
    },
  };
});
