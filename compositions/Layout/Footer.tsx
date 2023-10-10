import { Container, Typography, styled } from "@mui/material";

import { useSetting } from "@/hooks";
import { useRouter } from "next/router";
import { Box, Divider, Link } from "@/components";

import FooterContent from "./components/FooterContent";
import FooterSocial from "./components/FooterSocial";

interface WrapperProps {
  asPath: string;
}

export default function Footer() {
  const { asPath } = useRouter();
  const setting = useSetting();

  return (
    <Wrapper asPath={asPath}>
      <StyledContainer>
        {setting && <FooterSocial dataSetting={setting} />}
        <StyledDivider />
        <FooterContent />
      </StyledContainer>

      <WrapperPowered>
        <Powered>
          Powered by{" "}
          <LinkPowered href="https://t-solution.vn" target="_blank">
            T-Solution
          </LinkPowered>
        </Powered>
      </WrapperPowered>
    </Wrapper>
  );
}

const Wrapper = styled(Container, {
  shouldForwardProp: (propName) => {
    return propName !== "asPath";
  },
})<WrapperProps>(({ theme, asPath }) => {
  return {
    padding: "0 !important",
    ...(theme.palette.mode === "dark" && {
      background: asPath !== "/" ? "" : theme.palette.background.default,
    }),

    ...(theme.palette.mode === "light" && {
      background: asPath !== "/" ? "" : theme.palette.background.default,
    }),
  };
});

const WrapperPowered = styled(Box)(({ theme }) => {
  return {
    textAlign: "center",
    background: theme.palette.primary.main,
    padding: "0.5rem 0",
    [theme.breakpoints.down("md")]: {
      marginBottom: "5rem",
    },

    [theme.breakpoints.down("sm")]: {
      marginBottom: "4rem",
    },
  };
});

const StyledDivider = styled(Divider)(() => {
  return { margin: "2.5rem 0" };
});

const StyledContainer = styled(Container)(() => {
  return { margin: "2.5rem auto" };
});

const LinkPowered = styled(Link)(() => {
  return { display: "inline", color: "white" };
});

const Powered = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_xSmall,
    fontWeight: 400,
    color: theme.palette.common.white,
  };
});
