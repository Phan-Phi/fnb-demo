import { useEffect, useState } from "react";
import { SvgIconProps, styled } from "@mui/material";

import useThemeMode from "@/hooks/useThemeMode";
import { LightIcon, DarkIcon, Stack } from "@/components";

interface Props {
  active?: boolean | undefined;
}

interface StyledIconProps extends SvgIconProps {
  active: boolean;
}

export default function DarkMode({ active }: Props) {
  const { setMode, mode } = useThemeMode();
  const [state, setState] = useState<string>(mode);

  useEffect(() => {
    setState(mode);
  }, [mode]);

  return (
    <Wrapper
      onClick={() => {
        setMode(state === "dark" ? "light" : "dark");
      }}
    >
      {mode === "light" ? (
        <StyledLightIcon active={active ? true : false} />
      ) : (
        <StyledDarkIcon />
      )}
    </Wrapper>
  );
}

const Wrapper = styled(Stack)(() => {
  return {
    cursor: "pointer",
  };
});

const StyledLightIcon = styled(LightIcon, {
  shouldForwardProp: (propName) => {
    return propName !== "active";
  },
})<StyledIconProps>(({ theme, active }) => {
  return {
    "& path": {
      stroke: theme.palette.common.black,
    },
  };
});

const StyledDarkIcon = styled(DarkIcon)(({ theme }) => {
  return {
    "& path": {
      stroke: theme.palette.text.primary,
    },
  };
});
