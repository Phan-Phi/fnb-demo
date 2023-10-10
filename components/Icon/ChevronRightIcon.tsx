import { Box, styled } from "@mui/material";
import SVG from "../SVG";

export default function ChevronRightIcon() {
  return (
    <StyledWrapper>
      <SVG src="/svg/chevron-right.svg" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(({ theme }) => {
  return {
    width: "fit-content",
    height: "fit-content",

    "& .svg > div": {
      width: 16,
      height: 17,
      overflow: "hidden",
    },

    "& path": {
      stroke:
        theme.palette.mode === "light"
          ? theme.palette.common.black
          : theme.palette.common.white,
    },
  };
});
