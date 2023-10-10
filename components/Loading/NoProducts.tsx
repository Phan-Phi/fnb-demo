import { Typography, styled } from "@mui/material";

import { useIntl } from "@/hooks";

type NoProductsProps = {
  title?: string;
};

export default function NoProducts({ title = "brands.empty" }: NoProductsProps) {
  const { messages } = useIntl();
  return <StyledTitle>{messages[title]}</StyledTitle>;
}

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.Roboto,
    fontSize: 28,
    lineHeight: "34px",
    fontWeight: 700,
    color: theme.palette.text.primary,
    textAlign: "center",
  };
});
