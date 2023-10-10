import { LoadingButton as MuiLoadingButton, LoadingButtonProps } from "@mui/lab";

import { styled } from "@mui/material";

const NewsLoadingButton = (props: LoadingButtonProps) => {
  return <StyledLoadingButton {...props} />;
};

const StyledLoadingButton = styled(MuiLoadingButton)(({ theme }) => {
  return {
    textTransform: "capitalize",
    whiteSpace: "nowrap",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
  };
});

export default NewsLoadingButton;
