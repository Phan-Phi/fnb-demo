import { Fragment, useMemo } from "react";
import { Container, Divider, styled } from "@mui/material";

import { useMedia } from "@/hooks";
import { Box, Stack } from "@/components";

import Search from "./Search";
import DarkMode from "./DarkMode";
import Language from "./Language";
import CartHeader from "./CartHeader";
import LogoHeader from "./LogoHeader";
import MenuItemForHeader from "./MenuItemForHeader";

interface Props {
  active: boolean;
}

export default function DesktopHeader({ active }: Props) {
  const { isSmUp } = useMedia();

  const renderDarkMode_Search_Language = useMemo(() => {
    return (
      <Fragment>
        <Search active={active} />
        <DarkMode active={active} />
        <Language />
      </Fragment>
    );
  }, [isSmUp, active]);

  const renderCartHeader = useMemo(() => {
    return <CartHeader active={active} />;
  }, [active]);

  const renderMenuItemForHeader = useMemo(() => {
    return <MenuItemForHeader _active={active} />;
  }, [active]);

  return (
    <Wrapper>
      <Container>
        <WrapperContentTop variant="spaceBetweenCenter" gap={4}>
          <LogoHeader />
          <StyledStack spacing={2} direction="row" justifyContent="flex-end">
            {renderDarkMode_Search_Language}
            {renderCartHeader}
          </StyledStack>
        </WrapperContentTop>
        <StyledDivider />
        <WrapperMenuItem>{renderMenuItemForHeader}</WrapperMenuItem>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(({ theme }) => {
  return {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  };
});

const StyledDivider = styled(Divider)(({ theme }) => {
  return {
    margin: "1rem 0",
  };
});

const WrapperMenuItem = styled(Container)(({ theme }) => {
  return {
    padding: "0 !important",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  };
});

const WrapperContentTop = styled(Stack)(({ theme }) => {
  return {
    flexDirection: "row",
    alignItems: "center",
  };
});

const StyledStack = styled(Stack)(({ theme }) => {
  return {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-end",
    },
  };
});
