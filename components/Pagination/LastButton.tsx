import SVG from "../SVG";
import React from "react";
import { Box, styled } from "@mui/material";

export default function LastButton() {
  return (
    <StyledWrapper>
      <SVG src="/svg/lastBtn.svg" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {
    width: "fit-content",
    height: "fit-content",
  };
});
