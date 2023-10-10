import { useMemo } from "react";
import { useRouter } from "next/router";
import { BoxProps, Typography, styled } from "@mui/material";

import {
  Box,
  ContactIcon,
  HomeIcon,
  Image,
  NewsIcon,
  ProductIcon,
  Ratio,
  Spacing,
  Stack,
} from "@/components";
import { useIntl, useMedia } from "@/hooks";
import { NAVBAR_MOBILE_ROUTES } from "@/routes";

interface WrapperIconProps extends BoxProps {
  activeMenu: boolean;
}

const arr = [
  <HomeIcon key={0} />,
  <HomeIcon key={1} />,
  <ProductIcon key={2} />,
  <NewsIcon key={3} />,
  <ContactIcon key={4} />,
];

export default function Navigation() {
  const { isSmUp } = useMedia();

  const render = useMemo(() => {
    return NAVBAR_MOBILE_ROUTES.map((el, idx) => {
      if (idx === 1) {
        return <NavItem key={idx} variant={false} data={el} index={idx} />;
      }
      return <NavItem key={idx} data={el} index={idx} />;
    });
  }, [NAVBAR_MOBILE_ROUTES]);

  return (
    <Wrapper>
      {isSmUp && <Spacing spacing={1} />}
      <Stack direction="row" justifyContent="space-between">
        {render}
      </Stack>

      {isSmUp && <Spacing spacing={1} />}
    </Wrapper>
  );
}

const Wrapper = styled(Box)(({ theme }) => {
  return {
    position: "fixed",
    bottom: 0,
    left: 0,
    background: theme.palette.secondary.main,
    width: "100%",
    boxShadow:
      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",

    padding: "0.5rem 1rem",
    zIndex: 20,

    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  };
});

interface Props {
  data: any;
  variant?: boolean;
  index: number;
}

const NavItem = ({ data, index, variant = true }: Props) => {
  const { asPath, push } = useRouter();
  const { messages } = useIntl();

  return (
    <WrapperIcon
      activeMenu={
        asPath === "/" ? (index === 0 ? true : false) : asPath.includes(data.key)
      }
      onClick={() => {
        push(data.link);
      }}
    >
      {variant ? (
        arr[index]
      ) : (
        <Ratio ratio="0" width={24} height={24}>
          <Image src="/image/logoFNB.png" alt="" />
        </Ratio>
      )}

      <Title variant="RobotoSlab_small"> {messages[`header.${data.key}`]}</Title>
    </WrapperIcon>
  );
};

const WrapperIcon = styled(Stack, {
  shouldForwardProp: (propName) => {
    return propName !== "activeMenu";
  },
})<WrapperIconProps>(({ theme, activeMenu }) => {
  return {
    alignItems: "center",

    "& path": {
      stroke: activeMenu ? theme.palette.primary.main : theme.palette.text.primary,
    },

    "& .MuiTypography-root": {
      color: activeMenu ? theme.palette.primary.main : theme.palette.text.primary,
    },
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    fontSize: "11px",
    lineHeight: "24px",
    textTransform: "capitalize",
  };
});
