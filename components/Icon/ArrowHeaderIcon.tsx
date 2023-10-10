import { useRouter } from "next/router";
import { Box, BoxProps, styled } from "@mui/material";

import SVG from "../SVG";
import useThemeMode from "@/hooks/useThemeMode";

interface Props {
  scroll: boolean;
  activeMenu: boolean;
  _asPath: boolean;
}
interface StyledBoxProps extends BoxProps {
  activeMenu: boolean;
  scroll: boolean;
  _asPath: boolean;
}

const defaultStyle = { width: "fit-content", height: "fit-content" };

export default function ArrowHeaderIcon({ scroll, activeMenu, _asPath }: Props) {
  return (
    <StyledWrapper scroll={scroll} activeMenu={activeMenu} _asPath={_asPath}>
      <StyledSVG src="/svg/arrow-down.svg" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box, {
  shouldForwardProp: (propName) => {
    return propName !== "activeMenu" && propName !== "scroll" && propName !== "_asPath";
  },
})<StyledBoxProps>(({ theme, activeMenu, scroll, _asPath }) => {
  const router = useRouter();

  if (_asPath) {
    if (theme.palette.mode === "light") {
      return {
        ...defaultStyle,
        "& path": {
          stroke: activeMenu
            ? theme.palette.primary.main
            : scroll
            ? theme.palette.common.white
            : theme.palette.common.black,
        },
      };
    } else {
      return {
        ...defaultStyle,
        "& path": {
          stroke: activeMenu
            ? theme.palette.primary.main
            : scroll
            ? theme.palette.common.white
            : theme.palette.common.white,
        },
      };
    }
  } else {
    return {
      ...defaultStyle,
      "& path": {
        stroke: activeMenu ? theme.palette.primary.main : theme.palette.common.white,
      },
    };
  }
});

const StyledSVG = styled(SVG)(({ theme }) => {
  return {};
});
