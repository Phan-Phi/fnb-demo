import SVG from "../SVG";
import { Box, styled } from "@mui/material";

export default function TickIcon() {
  return (
    <Box>
      <StyledTickSVG src="/svg/tick.svg" />
    </Box>
  );
}

const StyledTickSVG = styled(SVG)(({ theme }) => {
  return {
    "& path": {
      fill:
        theme.palette.mode === "dark"
          ? theme.palette.common.white
          : theme.palette.common.black,
    },
  };
});
