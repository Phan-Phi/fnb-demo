import React from "react";
import { Box, Button, ButtonProps, styled } from "@mui/material";

import { SVG } from "@/components";
import { PSEUDO_STATE } from "@/configuration";

export default function ButtonTiktok(props: ButtonProps) {
  return (
    <StyledButton variant="outlined" fullWidth={true} {...props}>
      <StyledWrapperIcon>
        <SVG src="/svg/tiktok.svg" />
      </StyledWrapperIcon>
    </StyledButton>
  );
}

const StyledWrapperIcon = styled(Box)(({ theme }) => {
  return {
    width: 16,
    height: 16,

    ["& path"]: {
      fill:
        theme.palette.mode === "light"
          ? theme.palette.common.black
          : theme.palette.common.white,
    },
  };
});

const StyledButton = styled(Button)(({ theme }) => {
  return {
    [PSEUDO_STATE.hover]: {
      opacity: "0.5",
      background: "transparent",
      borderColor:
        theme.palette.mode === "light"
          ? theme.palette.common.black
          : theme.palette.common.white,
    },
  };
});
