import React, { forwardRef, useCallback } from "react";
import { CustomContentProps, SnackbarContent, useSnackbar } from "notistack";

import SVG from "../SVG";
import { styled, Typography, Stack, Box } from "@mui/material";

const SnackbarError = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <StyledSnackbar ref={ref}>
        <StyledStack>
          <StyledTypography>{props.message}</StyledTypography>

          <StyledWrapperSVG onClick={handleDismiss}>
            <SVG src="/svg/close.svg" />
          </StyledWrapperSVG>
        </StyledStack>
      </StyledSnackbar>
    );
  }
);

SnackbarError.displayName = "SnackbarError";

export default SnackbarError;

const StyledSnackbar = styled(SnackbarContent)(() => {
  return {
    borderRadius: "6px",
    padding: "12px 20px",
    border: "1px solid #7F1D1D",
    backgroundColor: "#FEF2F2",
  };
});

const StyledStack = styled(Stack)(() => {
  return {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  };
});

const StyledTypography = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    fontWeight: 500,
    color: "#7F1D1D",
  };
});

const StyledWrapperSVG = styled(Box)(() => {
  return {
    width: 20,
    height: 20,
    cursor: "pointer",

    ["& path"]: {
      stroke: "#EF4444",
    },
  };
});
