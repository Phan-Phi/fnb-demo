import { useEvent } from "react-use";
import { styled } from "@mui/material";
import { useCallback, useState } from "react";

import { Box } from "@/components";
import DesktopHeader from "./components/DesktopHeader";
// import AppBarHeader from "./components/AppBarHeader";
import { useRouter } from "next/router";

interface WrapperProps {
  scroll: boolean;
  asPath: string;
}

export default function Header() {
  const { asPath } = useRouter();
  const [scroll, setScroll] = useState<boolean>(false);

  const _scroll = useCallback(() => {
    const { scrollY } = window;

    if (scrollY > 30) setScroll(true);
    if (scrollY < 30) setScroll(false);
  }, []);

  useEvent("scroll", _scroll, global.window, { capture: true });
  return (
    <Wrapper scroll={scroll} asPath={asPath}>
      <DesktopHeader active={scroll} />
      {/* <AppBarHeader active={scroll} /> */}
    </Wrapper>
  );
}

const Wrapper = styled(Box, {
  shouldForwardProp: (propName) => {
    return propName !== "scroll" && propName !== "asPath";
  },
})<WrapperProps>(({ theme, scroll, asPath }) => {
  return {
    position: "fixed",
    top: 0,
    left: "50%",
    width: "100%",
    zIndex: 10,
    padding: "1rem 0 0 0",
    transition: "1s ease",
    transform: "translateX(-50%)",
    backdropFilter: scroll ? "blur(5px)" : "blur(0)",
    boxShadow: scroll ? "rgba(0, 0, 0, 0.24) 0px 3px 8px" : "none",

    ...(theme.palette.mode === "dark" && {
      background: scroll
        ? "rgba(21, 22, 25, 0.8)"
        : asPath !== "/"
        ? ""
        : theme.palette.background.default,
    }),

    ...(theme.palette.mode === "light" && {
      background: scroll
        ? "rgba(255, 255, 255, 0.8)"
        : asPath !== "/"
        ? ""
        : theme.palette.background.default,
    }),

    [theme.breakpoints.down("sm")]: {
      padding: "1rem 0 0 0",
    },
  };
});
