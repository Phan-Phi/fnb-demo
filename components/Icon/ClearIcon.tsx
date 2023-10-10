import SVG from "../SVG";
import { Box, styled } from "@mui/material";

export default function ClearIcon() {
  return (
    <StyledWrapper>
      <StyledSVG src="/svg/clear.svg" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {
    width: 20,
    height: 20,
    top: -3,
    position: "relative",
  };
});

const StyledSVG = styled(SVG)(({ theme }) => {
  return {
    stroke:
      theme.palette.mode === "dark"
        ? theme.palette.common.white
        : theme.palette.common.black,
  };
});
