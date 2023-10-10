import React, { forwardRef, useCallback } from "react";
import { styled, Typography, Stack, Box } from "@mui/material";
import { CustomContentProps, SnackbarContent, useSnackbar } from "notistack";

import SVG from "../SVG";
import Link from "../Link";
import { useIntl } from "@/hooks";

const SnackbarAddToCart = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, ...props }, ref) => {
    const { messages } = useIntl();

    const { closeSnackbar } = useSnackbar();

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <StyledSnackbar ref={ref}>
        <StyledStack>
          <StyledTypography>{messages["noti.addSuccessfully"]}</StyledTypography>

          <StyledWrapperSVG onClick={handleDismiss}>
            <SVG src="/svg/close.svg" />
          </StyledWrapperSVG>
        </StyledStack>

        <Stack gap="6px">
          <StyledDesc>{messages["noti.continueShopping"]}</StyledDesc>

          <StyledLink href="/cart">{messages["noti.goToCart"]}</StyledLink>
        </Stack>
      </StyledSnackbar>
    );
  }
);

SnackbarAddToCart.displayName = "SnackbarSuccess";

export default SnackbarAddToCart;

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
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  };
});

const StyledTypography = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    fontWeight: 700,
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

const StyledDesc = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    color: "#15803D",
  };
});

const StyledLink = styled(Link)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    fontWeight: 700,
    color: "#166534",
  };
});
