import { Box } from "@/components";
import { Typography, styled } from "@mui/material";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function WrapperContent({ title, children }: Props) {
  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {children}
    </Wrapper>
  );
}

const Wrapper = styled(Box)(({ theme }) => {
  return {
    padding: "1rem",
    margin: "1rem 0",
    borderRadius: "0.5rem",
    background: theme.palette.background.default,
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.SVNPoppins,
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "32px",
    marginBottom: "1rem",
  };
});
