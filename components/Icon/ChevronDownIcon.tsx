import React from "react";
import SVG from "../SVG";
import { Box, styled } from "@mui/material";

export default function ChevronDownIcon() {
  return (
    <Box>
      <StyledChevronDown src="/svg/chevron-down.svg" />
    </Box>
  );
}

const StyledChevronDown = styled(SVG)(({ theme }) => {
  return {
    "& path": {
      stroke:
        theme.palette.mode === "dark"
          ? theme.palette.common.white
          : theme.palette.common.black,
    },
  };
});
