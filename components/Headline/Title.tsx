import { Typography, TypographyProps, styled } from "@mui/material";

export default function Title({ children, ...restProps }: TypographyProps) {
  return <StyledTitle {...restProps}>{children}</StyledTitle>;
}

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.SVNPoppins,

    textTransform: "capitalize",
    color: theme.palette.text.primary,
  };
});
