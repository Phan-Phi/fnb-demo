import { styled } from "@mui/material";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { usePopupState, bindHover, bindPopover } from "material-ui-popup-state/hooks";
import HoverPopover from "material-ui-popup-state/HoverPopover";

import { Box, Image, Link, Ratio, Stack } from "@/components";

export default function Language() {
  const { locale } = useRouter();

  const popupState = usePopupState({ variant: "popover", popupId: "selectLanguage" });

  const renderFlag = useMemo(() => {
    if (locale === "en") {
      return (
        <StyledRatio data-id="en" className="language" ratio="0" width={24} height={24}>
          <Image src="/image/en.png" alt="logo" />
        </StyledRatio>
      );
    } else if (locale === "vi") {
      return (
        <StyledRatio data-id="vi" className="language" ratio="0" width={24} height={24}>
          <Image src="/image/vi.png" alt="logo" />
        </StyledRatio>
      );
    }

    return null;
  }, [locale]);

  return (
    <StyledStack direction="row" spacing={2}>
      <Box {...bindHover(popupState)} position="relative">
        {renderFlag}
      </Box>

      <HoverPopover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        disableScrollLock={true}
      >
        <Stack spacing={0.5} padding={2}>
          <Link href="/" locale="vi">
            <StyledRatio
              data-id="vi"
              className="language"
              ratio="0"
              width={24}
              height={24}
            >
              <Image src="/image/vi.png" alt="logo" />
            </StyledRatio>
          </Link>
          <Link href="/" locale="en">
            <StyledRatio
              data-id="en"
              className="language"
              ratio="0"
              width={24}
              height={24}
            >
              <Image src="/image/en.png" alt="logo" />
            </StyledRatio>
          </Link>
        </Stack>
      </HoverPopover>
    </StyledStack>
  );
}

const StyledStack = styled(Stack)(() => {
  return {};
});

const StyledRatio = styled(Ratio)(() => {
  return { cursor: "pointer", width: "24px" };
});
