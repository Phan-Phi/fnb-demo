import React, { Fragment } from "react";

import { useIntl } from "@/hooks";
import { Button, styled, CircularProgress, ButtonProps } from "@mui/material";

type LoadingButtonProps = {
  loading: boolean;
  buttonProps?: ButtonProps;
  title?: string;
};

export default function LoadingButton(props: LoadingButtonProps) {
  const { loading, buttonProps, title = "Gửi thông tin" } = props;

  const { messages } = useIntl();

  return (
    <Fragment>
      {loading ? (
        <StyledLoading startIcon={<Loading />}>
          {messages["button.processing"]}...
        </StyledLoading>
      ) : (
        <StyledButton {...buttonProps}>{title}</StyledButton>
      )}
    </Fragment>
  );
}

const Loading = () => {
  return <CircularProgress sx={{ color: "white" }} size={16} />;
};

const StyledLoading = styled(Button)(() => {
  return {
    userSelect: "none",
    pointerEvents: "none",
    textTransform: "capitalize",
  };
});

const StyledButton = styled(Button)(() => {
  return {
    textTransform: "capitalize",
  };
});
