import { useEffect, useState } from "react";
import { Typography, styled } from "@mui/material";

import { Box, Link } from "@/components";

interface Props {
  img: string;
  text: string;
  link: string;
}

interface WrapperProps {
  src: string;
  _detectBrowser: boolean;
}

export default function BannerAdvertisements({ img, text, link }: Props) {
  const [detectBrowser, setDetectBrowser] = useState<boolean>(false);

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setDetectBrowser(isSafari);
  });

  return (
    <Link href={link} target="_black">
      <Wrapper src={img} _detectBrowser={detectBrowser}>
        <Overlay className="overlay" />

        <Content>
          <Text>{text}</Text>
        </Content>
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled(Box, {
  shouldForwardProp: (propName) => {
    return propName !== "src" && propName !== "_detectBrowser";
  },
})<WrapperProps>(({ src, _detectBrowser, theme }) => {
  return {
    position: "relative",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 1,

    [theme.breakpoints.down("sm")]: {
      marginBottom: "2.5rem",
    },
  };
});

const Content = styled(Box)(({ theme }) => {
  return {
    width: "100%",
    textAlign: "center",
    padding: "11.62rem 0",

    [theme.breakpoints.down("sm")]: {
      padding: "3.75rem 0",
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
    zIndex: -1,
  };
});

const Text = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.RobotoSlab_small,
    display: "block",
    marginBottom: "1.25rem",
    color: theme.palette.common.white,

    [theme.breakpoints.down("md")]: {
      ...theme.typography.p_large,
      fontWeight: "700 !important",
      marginBottom: "1rem",
    },

    [theme.breakpoints.down("sm")]: {
      ...theme.typography.h5,
      marginBottom: 0,
    },
  };
});
