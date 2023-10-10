import React from "react";
import NextProgress from "next-progress";
import { useTheme } from "@mui/material";

const Progress = () => {
  const theme = useTheme();

  return (
    <NextProgress
      color={theme.palette.primary.main}
      delay={200}
      disableSameRoute
      options={{ showSpinner: false }}
    />
  );
};

export default Progress;
