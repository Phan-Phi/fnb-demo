import { Stack as MuiStack, styled, StackProps } from "@mui/material";

type VariantType = "centerCenter" | "spaceBetweenCenter";

interface ExtendedStackProps extends StackProps {
  variant?: VariantType;
}

const Stack = styled(MuiStack, {
  shouldForwardProp: (propName) => {
    return propName !== "variant";
  },
})<ExtendedStackProps>(({ variant }) => {
  return {
    ...(variant === "centerCenter" && {
      justifyContent: "center",
      alignItems: "center",
    }),
    ...(variant === "spaceBetweenCenter" && {
      justifyContent: "space-between",
      alignItems: "center",
    }),
  };
});

export default Stack;
