import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Typography, styled } from "@mui/material";

import { useIntl } from "@/hooks";
import { NAVBAR_ROUTES } from "@/routes";
import { Box, Link, Stack } from "@/components";

interface TextMenuItemProps {
  activeMenu: boolean;
  scroll: boolean;
}

interface Props {
  _active: boolean;
}

export default function MenuItemForHeader({ _active }: Props) {
  const { messages } = useIntl();
  const { asPath, locale } = useRouter();
  const [active, setActive] = useState<boolean>(false);

  const renderMenuItem = useMemo(() => {
    return NAVBAR_ROUTES.map((el: any, idx: number) => {
      if (el.key === "category") {
        return (
          <StyledBox
            key={idx}
            onMouseOver={() => {
              setActive(true);
            }}
            onMouseOut={() => {
              setActive(false);
            }}
          >
            <Link href={el.link} key={idx}>
              <MenuHeaderProduct variant="centerCenter">
                <TextMenuItem
                  scroll={_active}
                  activeMenu={asPath.includes(el.key)}
                  variant="Inter_large"
                >
                  {messages[`header.${el.key}`]}
                </TextMenuItem>
              </MenuHeaderProduct>
            </Link>
          </StyledBox>
        );
      }

      return (
        <Link href={el.link} key={idx}>
          <MenuHeader variant="centerCenter">
            {asPath === "/" ? (
              <TextMenuItem
                scroll={_active}
                activeMenu={idx === 0 ? true : false}
                variant="Inter_large"
              >
                {messages[`header.${el.key}`]}
              </TextMenuItem>
            ) : (
              <TextMenuItem
                scroll={_active}
                activeMenu={asPath.includes(el.key)}
                variant="Inter_large"
              >
                {messages[`header.${el.key}`]}
              </TextMenuItem>
            )}
          </MenuHeader>
        </Link>
      );
    });
  }, [asPath, active, _active, locale]);

  return <WrapperMenuHeader columnGap={2.5}>{renderMenuItem}</WrapperMenuHeader>;
}

const StyledBox = styled(Box)(({ theme }) => {
  return {
    position: "relative",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    paddingBottom: "1rem",
  };
});

const WrapperMenuHeader = styled(Stack)(({ theme }) => {
  return {
    flexDirection: "row",
    justifyContent: "flex-start",
  };
});

const MenuHeaderProduct = styled(Stack)(({ theme }) => {
  return {
    flexDirection: "row",
    alignItems: "center",
    gap: "5px",
    "& .MuiBox-root": {
      height: "1rem",

      // "& path": {
      //   stroke: activeMenu ? theme.palette.primary.main : theme.palette.common.white,
      // },
    },

    "&:hover .MuiTypography-root ": {
      color: theme.palette.primary.main,
    },

    "&:hover path ": {
      stroke: `${theme.palette.primary.main} !important`,
    },
  };
});

const MenuHeader = styled(Stack)(({ theme }) => {
  return {
    flexDirection: "row",
    alignItems: "center",
    gap: "5px",

    "&:hover .MuiTypography-root ": {
      color: theme.palette.primary.main,
    },
  };
});

const TextMenuItem = styled(Typography, {
  shouldForwardProp: (propName) => {
    return propName !== "activeMenu" && propName !== "scroll";
  },
})<TextMenuItemProps>(({ activeMenu, theme, scroll }) => {
  return {
    color: activeMenu ? theme.palette.primary.main : theme.palette.text.primary,
    transition: "all .4s ease",
    fontWeight: 700,
    fontSize: "19px",
    lineHeight: "28px",
  };
});
