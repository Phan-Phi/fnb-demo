import React from "react";
import SVG from "../SVG";
import { Box, styled } from "@mui/material";

export default function UncheckIcon() {
  return (
    <Box>
      <StyledSVG src="/svg/checkbox.svg" />
    </Box>
  );
}

const StyledSVG = styled(SVG)(({ theme }) => {
  return {
    "& rect": {
      stroke: theme.palette.text.primary,
    },
  };
});
