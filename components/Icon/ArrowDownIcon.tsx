import SVG from "../SVG";
import { Box, styled } from "@mui/material";

export default function ArrowDownIcon() {
  return (
    <StyledWrapper>
      <StyledSVG src="/svg/arrow-down.svg" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {
    width: "fit-content",
    height: "fit-content",
  };
});

const StyledSVG = styled(SVG)(({ theme }) => {
  return {
    "& path": {
      stroke:
        theme.palette.mode === "dark"
          ? theme.palette.common.white
          : theme.palette.common.black,
    },
  };
});
