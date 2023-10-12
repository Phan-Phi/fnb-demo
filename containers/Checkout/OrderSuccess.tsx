import React from "react";
import { useRouter } from "next/router";
import { Box, Button, Stack, Typography, styled } from "@mui/material";

import { ROUTES } from "@/routes";
import { getSeoObject } from "@/libs";
import { SEO, SuccessIcon } from "@/components";
import { useIntl } from "@/hooks";

export default function OrderSuccess() {
  const router = useRouter();
  const { messages } = useIntl();

  return (
    <Stack gap="40px" alignItems="center" justifyContent="center">
      <SEO {...getSeoObject(undefined)} />

      <StyledTitle>{messages["order.placedSuccess"]}</StyledTitle>

      <WrapperIcon component="span" className="pulse">
        <SuccessIcon />
      </WrapperIcon>

      <StyledDesc>{messages["order.success"]}</StyledDesc>

      <StyledButton
        onClick={() => {
          router.push(ROUTES.home);
        }}
      >
        {messages["button.backHome"]}
      </StyledButton>
    </Stack>
  );
}

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.RobotoSlab_xSmall,
    letterSpacing: "-1.04px",
    textTransform: "capitalize",
    color: theme.palette.text.primary,
  };
});

const StyledDesc = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_large,
    fontWeight: 600,
    letterSpacing: "-1.04px",
    color: theme.palette.text.primary,
  };
});

const StyledButton = styled(Button)(({ theme }) => {
  return {
    ...theme.typography.Roboto,
    color: theme.palette.common.white,
    textTransform: "capitalize",
  };
});

const WrapperIcon = styled(Box)(({ theme }) => {
  return {
    position: "relative",
    border: "6px solid",
    borderColor: theme.palette.text.primary,
    borderRadius: "100%",
    height: "6rem",
    width: "6rem",
    backgroundColor: "transparent",
    textAlign: "center",
    display: "block",
    color: theme.palette.text.primary,
    boxShadow: "0 0 17px black",
    animation: "pulsate 1s ease-out infinite",

    "& svg": {
      position: "absolute",
      top: " 50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "5rem",
      height: "5rem",
    },

    "@-webkit-keyframes pulsate": {
      "0%": {
        boxShadow: "0 0 0 0 rgba(204,169,44, 0.4)",
      },

      "70%": {
        boxShadow: "0 0 0 10px rgba(204,169,44, 0)",
      },

      "100%": {
        boxShadow: "0 0 0 0 rgba(204,169,44, 0)",
      },
    },
  };
});
