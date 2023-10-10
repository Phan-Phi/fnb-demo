import React from "react";
import { SVG } from "@/components";
import { Box, Button, styled } from "@mui/material";

interface VariantProps {
  checked: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function Variant(props: VariantProps) {
  const { children, checked, onClick } = props;

  return (
    <StyledVariant
      onClick={onClick}
      variant="outlined"
      endIcon={checked ? <CheckedIcon /> : null}
      checked={checked}
    >
      {children}
    </StyledVariant>
  );
}

const CheckedIcon = () => {
  return (
    <Box>
      <SVG src="/svg/active.svg" />
    </Box>
  );
};

const StyledVariant = styled(Button, {
  shouldForwardProp: (propName) => propName !== "checked",
})<{ checked: boolean }>(({ theme, checked }) => {
  return {
    width: "100%",
    minHeight: 50,
    padding: "8px 16px",

    textTransform: "none",
    border: `1px solid ${theme.palette.text.primary}`,
    backgroundColor: "transparent",

    ["& .MuiButton-endIcon"]: {
      marginTop: 4,
    },

    ...(checked && {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "transparent",

      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    }),

    [theme.breakpoints.down("sm")]: {
      minHeight: 80,
    },
  };
});
