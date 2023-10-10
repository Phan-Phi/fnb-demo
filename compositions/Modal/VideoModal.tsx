import { useCallback, useState } from "react";
import { Button, Modal, Typography, styled } from "@mui/material";

import { Box, Stack } from "@/components";
import { getIdYoutube } from "@/libs";

interface Props {
  open: boolean;
}

export default function VideoModal() {
  const [open, setOpen] = useState(true);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Wrapper>
        <Title variant="p_large">Chào mừng đến với Đen Đỏ</Title>

        {/* <YouTube
          videoId={getIdYoutube(data) as string}
          opts={{
            width: "100%",
            height: "100%",
            ...(activeAutoPlay && {
              playerVars: {
                autoplay: 1,
              },
            }),
          }}
        /> */}
      </Wrapper>
    </StyledModal>
  );
}

const StyledModal = styled(Modal)(() => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});

const Wrapper = styled(Box)(({ theme }) => {
  return {
    background: theme.palette.secondary.main,
    padding: "2.5rem",
    borderRadius: "0.5rem",
  };
});

const WrapperButton = styled(Stack)(() => {
  return {
    marginTop: "2.5rem",
    justifyContent: "space-evenly",
  };
});

const Title = styled(Typography)(() => {
  return { fontWeight: 600 };
});

const SubTitle = styled(Typography)(() => {
  return {
    fontWeight: 700,
  };
});

const StyledButton = styled(Button)(() => {
  return {
    width: "160px",
  };
});
