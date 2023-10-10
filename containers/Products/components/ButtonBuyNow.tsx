import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { Button, styled } from "@mui/material";

import { useIntl } from "@/hooks";
import { ROUTES } from "@/routes";
import { ShoppingCartIcon } from "@/components";

type ButtonBuyNowProps = {
  isExported: boolean;
  addToCart: () => void;
  loading: boolean;
};

export default function ButtonBuyNow({
  isExported,
  addToCart,
  loading,
}: ButtonBuyNowProps) {
  const { messages } = useIntl();
  const router = useRouter();

  return (
    <Fragment>
      {isExported ? (
        <StyledButton fullWidth={true} onClick={() => router.push(`/${ROUTES.contact}`)}>
          {messages["button.contact"]}
        </StyledButton>
      ) : (
        <StyledButton
          fullWidth={true}
          isLoading={loading}
          onClick={addToCart}
          endIcon={loading ? <StyledShoppingCartIcon /> : null}
        >
          {loading ? messages["button.addedSuccessfully"] : messages["button.buyNow"]}
        </StyledButton>
      )}
    </Fragment>
  );
}

const StyledShoppingCartIcon = styled(ShoppingCartIcon)(() => {
  return {
    fill: "transparent",
  };
});

const StyledButton = styled(Button, {
  shouldForwardProp: (propName) => propName !== "isLoading",
})<{ isLoading?: boolean }>(({ isLoading }) => {
  return {
    minHeight: 43,
    textTransform: "none",

    ["& .MuiButton-endIcon"]: {
      marginTop: 2,
    },

    ...(isLoading && {
      cursor: "default",
      pointerEvents: "none",
    }),
  };
});
