import React from "react";
import { Typography, styled } from "@mui/material";
import { useIntl } from "@/hooks";

export default function PrevButton() {
  const { messages } = useIntl();

  return <StyledButton>{messages["pagination.previous"]}</StyledButton>;
}

const StyledButton = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    cursor: "pointer",
  };
});
