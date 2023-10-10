import React from "react";
import { Typography, styled } from "@mui/material";
import { useIntl } from "@/hooks";

export default function NextButton() {
  const { messages } = useIntl();

  return <StyledButton>{messages["pagination.next"]}</StyledButton>;
}

const StyledButton = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    cursor: "pointer",
  };
});
