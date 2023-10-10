import { forwardRef } from "react";
import { Box as MuiBox, styled, BoxProps } from "@mui/material";

type VariantType = "centerCenter" | "spaceBetweenCenter";

export interface ExtendedBoxProps extends BoxProps {
  variant?: VariantType;
}

const Box = forwardRef<HTMLDivElement | undefined, ExtendedBoxProps>(function Box(
  props,
  ref
) {
  return <StyledBox {...props} ref={ref} />;
});

const StyledBox = styled(MuiBox, {
  shouldForwardProp: (propName) => {
    return propName !== "variant";
  },
})<ExtendedBoxProps>(({ variant }) => {
  return {
    ...(variant === "centerCenter" && {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),
    ...(variant === "spaceBetweenCenter" && {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }),
  };
});

export default Box;
