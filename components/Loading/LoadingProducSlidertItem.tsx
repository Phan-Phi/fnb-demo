import { Skeleton, Stack } from "@mui/material";

import { useMedia } from "@/hooks";

export default function LoadingProductSliderItem() {
  const { isMdDown, isSmDown } = useMedia();

  if (isMdDown) {
    return (
      <Stack gap={2}>
        <Skeleton variant="rectangular" height={280} />
        <Skeleton variant="rectangular" height={30} />
        <Skeleton variant="rectangular" height={20} />
      </Stack>
    );
  } else if (isSmDown) {
    return (
      <Stack gap={2}>
        <Skeleton variant="rectangular" height={280} />
        <Skeleton variant="rectangular" height={30} />
        <Skeleton variant="rectangular" height={20} />
      </Stack>
    );
  }

  return (
    <Stack gap={2}>
      <Skeleton variant="rectangular" height={280} />
      <Skeleton variant="rectangular" height={30} />
      <Skeleton variant="rectangular" height={20} />
    </Stack>
  );
}
