import { BoxProps, Container, Typography, styled } from "@mui/material";

import { Box, Ratio, Image } from "@/components";
import { useMedia } from "@/hooks";
import { RATIO_HOME_BANNER } from "@/constants";

interface Props {
  img: string;
  title: string;
  subTitle?: string;
  isHomePage?: boolean;
  ratio?: string;
}

interface WrapperBoxProps extends BoxProps {
  isHomePage: boolean;
}

export default function HomeBanner({
  title,
  img,
  isHomePage = false,
  ratio = "600/740",
  subTitle,
}: Props) {
  const { isSmDown, isMdDown, isMdUp } = useMedia();

  const size = isMdUp
    ? RATIO_HOME_BANNER.desktop
    : isMdDown
    ? RATIO_HOME_BANNER.tablet
    : RATIO_HOME_BANNER.mobile;

  return (
    <StyledContainer>
      <Ratio ratio={size}>
        <Overlay className="overlay" />
        {img && (
          <Image
            src={img}
            alt=""
            style={{
              objectFit: "cover",
              backgroundPosition: "center center",
              borderRadius: "1rem",
            }}
          />
        )}

        <Wrapper isHomePage={isHomePage}>
          <WrapperContent className="wrapperContent">
            <Title variant="BungeeText">{title}</Title>
            {/* {isHomePage ? (
              <Title variant="BungeeText">{title}</Title>
            ) : (
              <Headlin title={title} subTitle={subTitle} />
            )} */}
          </WrapperContent>
        </Wrapper>
      </Ratio>
    </StyledContainer>
  );
}

const Wrapper = styled(Container, {
  shouldForwardProp: (propName) => {
    return propName !== "isHomePage";
  },
})<WrapperBoxProps>(({ isHomePage }) => {
  return {
    // position: "relative",
    display: isHomePage ? "flex" : "block",
    justifyContent: "center",
  };
});

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    // padding: "0 !important",
    borderRadius: "1rem",
    // [theme.breakpoints.down("xl")]: {
    //   padding: 0,
    // },
  };
});

const WrapperContent = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: "50%",
    zIndex: 2,
    transform: "translateY(-50%)",
    "& .MuiTypography-root": {
      color: theme.palette.common.white,
    },
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    width: "100%",
    margin: "0 auto",
    color: theme.palette.common.white,
    [theme.breakpoints.down("md")]: {
      padding: 0,
      textAlign: "center",
      fontSize: "48px",
      lineHeight: "57.6px",
    },

    [theme.breakpoints.down("sm")]: {
      padding: 0,
      width: "80%",
      fontSize: "32px",
      lineHeight: "40px",
    },
  };
});

const Overlay = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "100%",
    background: "rgba(0,0,0,0.4)",
    zIndex: 1,
    borderRadius: "1rem",
  };
});
