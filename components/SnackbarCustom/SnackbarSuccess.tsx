import React, { forwardRef, useCallback } from "react";
import { CustomContentProps, SnackbarContent, useSnackbar } from "notistack";

import SVG from "../SVG";
import { styled, Typography, Stack, Box } from "@mui/material";

const SnackbarSuccess = forwardRef<HTMLDivElement, CustomContentProps>(
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

SnackbarSuccess.displayName = "SnackbarSuccess";

export default SnackbarSuccess;

const StyledSnackbar = styled(SnackbarContent)(() => {
  return {
    borderRadius: "6px",
    padding: "12px 20px",
    border: "1px solid #BBF7D0",
    backgroundColor: "#BBF7D0",
  };
});

const StyledStack = styled(Stack)(() => {
  return {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  };
});

const StyledTypography = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    fontWeight: 500,
    color: "#166534",
  };
});

const StyledWrapperSVG = styled(Box)(() => {
  return {
    width: 20,
    height: 20,
    cursor: "pointer",
  };
});
