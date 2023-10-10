import React from "react";
import { Skeleton, Stack } from "@mui/material";

export default function LoadingProductItem() {
  return (
    <Stack gap={2}>
      <Skeleton variant="rectangular" height={260} />
      <Skeleton variant="rectangular" height={30} />
      <Skeleton variant="rectangular" height={20} />
    </Stack>
  );
}
