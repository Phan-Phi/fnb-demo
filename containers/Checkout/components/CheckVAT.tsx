import React, { useCallback } from "react";

import {
  Box,
  Stack,
  styled,
  Checkbox,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { useIntl } from "@/hooks";

type CheckVATProps = {
  checkVAT: boolean;
  onOpenVAT: () => void;
};

export default function CheckVAT(props: CheckVATProps) {
  const { checkVAT, onOpenVAT } = props;

  const handleCheckVAT = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onOpenVAT();
  }, []);

  return (
    <StyledWrapper>
      <FormControlLabel
        label={<Label />}
        control={<Checkbox checked={checkVAT} onChange={handleCheckVAT} />}
      />
    </StyledWrapper>
  );
}

const Label = () => {
  const { messages } = useIntl();

  return (
    <Stack gap="4px" sx={{ userSelect: "none" }}>
      <StyledLabel>{messages["form.titleVAT"]}</StyledLabel>
      <StyledSubLabel>{messages["form.subTitleVAT"]}</StyledSubLabel>
    </Stack>
  );
};

const StyledLabel = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_medium,
    fontWeight: 600,
  };
});

const StyledSubLabel = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
  };
});

const StyledWrapper = styled(Box)(() => {
  return {
    gap: 16,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  };
});
