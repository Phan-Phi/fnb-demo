import { useIntl } from "react-intl";
import { Typography, Stack, Container, styled } from "@mui/material";

import { useMedia } from "@/hooks";

const Page404 = () => {
  const { messages } = useIntl();
  const { isSmDown } = useMedia();

  return (
    <StyledContainer>
      <StyledStack spacing={2}>
        <Typography variant={isSmDown ? "h4" : "h2"} textAlign="center">
          {messages["404message"] as string}
        </Typography>
      </StyledStack>
    </StyledContainer>
  );
};

export default Page404;

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    marginY: 5,
    display: "flex",
    justifyContent: "center",
    paddingTop: "15rem",
    [theme.breakpoints.down("md")]: {
      paddingTop: "10rem",
    },
  };
});

const StyledStack = styled(Stack)(() => {
  return {
    marginY: 5,
    display: "flex",
    justifyContent: "center",
  };
});
