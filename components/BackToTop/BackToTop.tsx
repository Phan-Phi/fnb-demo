import { useWindowScroll } from "react-use";
import { Box, Slide, styled } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import ChevronDownIcon from "../Icon/ChevronDownIcon";

const BackToTop = () => {
  const { y } = useWindowScroll();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (y > 500 && !shouldAnimate) {
      setShouldAnimate(true);
    }

    if (y < 500 && shouldAnimate) {
      setShouldAnimate(false);
    }
  }, [y, shouldAnimate]);

  const onClickHandler = useCallback(() => {
    if (typeof window == undefined) return;

    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return (
    <Slide direction="up" in={shouldAnimate} mountOnEnter>
      <Wrapper onClick={onClickHandler}>
        <ChevronDownIcon />
      </Wrapper>
    </Slide>
  );
};
const Wrapper = styled(Box)(({ theme }) => {
  return {
    position: "fixed",
    bottom: "2rem",
    right: "1rem",
    cursor: "pointer",
    backgroundColor: theme.palette.primary.main,
    width: "2.5rem",
    height: "2.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.5rem",
    zIndex: 999,
    boxShadow: theme.shadows[5],
    transition: `${theme.transitions.duration.standard}ms`,
    ["&:hover"]: {
      opacity: 0.8,
    },
    ["& svg"]: {
      transform: "rotate(180deg)",

      "& path": {
        stroke: theme.palette.common.white,
      },
    },
  };
});

export default BackToTop;
