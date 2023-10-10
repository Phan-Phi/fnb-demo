import { ErrorBoundary } from "react-error-boundary";
import { Container, styled, Typography, useTheme } from "@mui/material";

import { useIntl, useMedia } from "@/hooks";

type ErrorBoundaryWrapperProps = {
  children?: React.ReactNode;
};

const ErrorBoundaryWrapper = ({ children }: ErrorBoundaryWrapperProps) => {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
};

function ErrorFallback() {
  const { messages } = useIntl();
  const { isSmDown } = useMedia();
  const theme = useTheme();

  return (
    <Wrapper>
      <Typography
        variant={isSmDown ? "h4" : "h2"}
        color={theme.palette.primary.main}
        textAlign="center"
      >
        {messages["errorMessage"]}
      </Typography>
    </Wrapper>
  );
}
const Wrapper = styled(Container)(() => {
  return {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
});

export default ErrorBoundaryWrapper;
