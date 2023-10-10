import React from "react";
import { Stack, styled, FormLabel } from "@mui/material";
import { useIntl } from "@/hooks";

type LabelCustomProps = {
  htmlFor: string;
  message: string;
};

const LabelCustom = ({ htmlFor, message }: LabelCustomProps) => {
  const { messages } = useIntl();

  return (
    <StyledStack className="label-custom">
      <StyledLabel title={message} htmlFor={htmlFor}>
        {message}
        <StyledSmallLabel>{messages["form.optional"]}</StyledSmallLabel>
      </StyledLabel>
    </StyledStack>
  );
};

const StyledStack = styled(Stack)(() => {
  return {
    gap: 6,
    flexDirection: "row",
    alignItems: "baseline",

    top: 4,
    position: "relative",
  };
});

const StyledLabel = styled(FormLabel)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    fontWeight: 500,

    [theme.breakpoints.down(395)]: {},
  };
});

const StyledSmallLabel = styled(FormLabel)(({ theme }) => {
  return {
    ...theme.typography.p_xSmall,
    fontStyle: "italic",
    fontWeight: "400 !important",
    position: "relative",
    top: 1,
  };
});

export default LabelCustom;
