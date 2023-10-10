import {
  Button,
  Modal,
  Typography,
  TypographyProps,
  styled,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import axiosConfig from "../../axios.config";

import { useCart } from "@/hooks";
import { Box, Stack } from "@/components";
import { CART_END_POINT } from "@/__generated__";

interface Welcome2Props {
  title: string;
  subTitle: string;
}

interface ContentButtonProps {
  textVI: string;
  textEN: string;
}

interface SubTitleProps extends TypographyProps {
  isActive?: boolean;
}

export default function ModalExport() {
  const [open, setOpen] = useState(true);
  const { setIsExported, setCartKey, cartKey } = useCart();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleExported = useCallback(() => {
    setIsExported(true);
    setOpen(false);
  }, []);

  const handleNotExported = useCallback(() => {
    setIsExported(false);
    setOpen(false);
  }, []);

  useEffect(() => {
    if (cartKey) {
      return;
    } else {
      axiosConfig
        .get(CART_END_POINT)
        .then((response) => setCartKey(response.headers["x-cart-key"]));
    }
  }, [cartKey]);

  return (
    <StyledModal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Wrapper>
        <Welcome subTitle="Chào mừng đến với" title="FNB" />
        <Welcome subTitle="Welcome to" title="FNB" />

        <SubTitle>Bạn đang quan tâm đến mặt hàng nào?</SubTitle>
        <SubTitle isActive={false}>What are you looking for?</SubTitle>

        <WrapperButton direction="row">
          <StyledButton onClick={handleExported}>
            <ContentButton textVI="Hàng Xuất Khẩu" textEN="Exported goods" />
          </StyledButton>
          <StyledButton onClick={handleNotExported}>
            <ContentButton textVI="Hàng Nội Địa" textEN="Domestic goods" />
          </StyledButton>
        </WrapperButton>
      </Wrapper>
    </StyledModal>
  );
}

const Welcome = ({ title, subTitle }: Welcome2Props) => {
  return (
    <Stack direction="row" spacing={0.8} justifyContent="center">
      <SubTitle>{subTitle}</SubTitle>
      <Title2 variant="h5">{title}</Title2>
    </Stack>
  );
};

const StyledModal = styled(Modal)(() => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});

const Wrapper = styled(Box)(({ theme }) => {
  return {
    background: "rgba(255, 255, 255, 0.9)",
    padding: "2.5rem 3rem",
    borderRadius: "0.5rem",
    textAlign: "center",
    backdropFilter: "blur(5px)",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",

    [theme.breakpoints.down("sm")]: {
      width: "85%",
      padding: "1.5rem",
    },
  };
});

const WrapperButton = styled(Stack)(({ theme }) => {
  return {
    marginTop: "2rem",
    justifyContent: "space-evenly",

    [theme.breakpoints.down("sm")]: {
      marginTop: "1.5rem",
      flexDirection: "column",
      gap: "1rem",
    },
  };
});

const Title2 = styled(Typography)(({ theme }) => {
  return {
    fontWeight: 600,
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      fontSize: "22px",
      fontWeight: 600,
    },
  };
});

const SubTitle = styled(Typography, {
  shouldForwardProp: (propName) => {
    return propName !== "isActive";
  },
})<SubTitleProps>(({ theme, isActive = true }) => {
  return {
    ...theme.typography.h5,
    fontSize: "26px",
    fontWeight: 600,
    color: isActive ? theme.palette.common.black : theme.palette.primary.main,

    [theme.breakpoints.down("sm")]: {
      fontSize: "22px",
      fontWeight: 600,
    },
  };
});

const StyledButton = styled(Button)(({ theme }) => {
  return {
    width: "185px",
    background: "none",
    border: `1.5px solid ${theme.palette.common.black}`,
    color: theme.palette.text.primary,

    "&:hover": {
      background: "none",
      border: `1.5px solid ${theme.palette.primary.main}`,
      boxShadow:
        "rgba(153, 27, 31, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    },

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  };
});

const ContentButton = ({ textVI, textEN }: ContentButtonProps) => {
  const theme = useTheme();
  return (
    <Stack>
      <Typography variant="p_medium" color={theme.palette.common.black}>
        {textVI}
      </Typography>
      <Typography variant="p_medium" color={theme.palette.primary.main}>
        {textEN}
      </Typography>
    </Stack>
  );
};
