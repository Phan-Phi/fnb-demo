import YouTube from "react-youtube";
import { useCallback, useEffect, useState } from "react";
import { Modal, Typography, styled } from "@mui/material";

import { Box, Image, Stack, VideoIcon } from "@/components";
import { getIdYoutube } from "@/libs";

interface Props {
  img: string;
  text: string;
  video: string;
}

interface WrapperProps {
  src: string;
  _detectBrowser: boolean;
}

interface PropsVideo {
  video: string;
}

export default function VideoSection({ img, text, video }: Props) {
  const [open, setOpen] = useState(false);
  const [detectBrowser, setDetectBrowser] = useState<boolean>(false);

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setDetectBrowser(isSafari);
  });

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Wrapper src={img} _detectBrowser={detectBrowser}>
      <Overlay className="overlay" />

      <Content>
        <WrapperVideo onClick={() => setOpen(true)}>
          <VideoIcon />
        </WrapperVideo>

        <Text>{text}</Text>
      </Content>

      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <WrapperModal>
          <YouTube
            videoId={getIdYoutube(video) as string}
            opts={{
              width: "100%",
              height: "100%",

              playerVars: {
                autoplay: 1,
              },
            }}
          />
        </WrapperModal>
      </StyledModal>
    </Wrapper>
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
    backgroundAttachment: _detectBrowser ? "none" : "fixed",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 1,

    marginBottom: "1rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2.5rem",
    },
  };
});

const Content = styled(Box)(({ theme }) => {
  return {
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%,-50%)",
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

const StyledModal = styled(Modal)(() => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});

const WrapperModal = styled(Box)(({ theme }) => {
  return {
    width: "60%",
    height: "60%",
    "& div": {
      height: "100%",
    },
    [theme.breakpoints.down("md")]: {
      width: "70%",
      height: "40%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      height: "30%",
    },
  };
});

const WrapperVideo = styled(Stack)(({ theme }) => {
  return {
    cursor: "pointer",
    width: "80px",
    height: "80px",
    background: theme.palette.primary.main,
    borderRadius: "100%",
    margin: "0 auto",
    justifyContent: "center",
    alignItems: "center",
    transition: " all .4s ease",
    "&:hover ": {
      background: theme.palette.primary.light,
    },
    "& svg": {
      width: "35px",
      height: "35px",
      color: theme.palette.common.white,
    },
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

// const Video = ({ video }: PropsVideo) => {
//   const youtubeThumbnail = require("youtube-thumbnail");
//   const thumbnail = youtubeThumbnail(video);

//   return <Image src={thumbnail.high.url} alt="" style={{ borderRadius: "5px" }} />;
// };
