import { Button, Typography, styled } from "@mui/material";

import { HomePage } from "@/interfaces";
import { useCart, useIntl, useMedia } from "@/hooks";
import { Box, Ratio, Image, ButtonBase } from "@/components";
import { EXPORT_SECTION_RATIO } from "@/constants";
import { useCallback } from "react";

type ExportSectionProps = {
  callback?: () => void;
  data: Pick<HomePage, "export_cta" | "local_cta" | "local_image" | "export_image">;
};

export default function ExportSection({ data, callback }: ExportSectionProps) {
  const { isSmDown } = useMedia();
  const { messages } = useIntl();
  const { isExported, setIsExported } = useCart();

  const handleExported = useCallback(() => {
    isExported === true ? setIsExported(false) : setIsExported(true);
  }, [isExported]);

  return (
    <Ratio ratio={isSmDown ? EXPORT_SECTION_RATIO.mobile : "1200/324"}>
      <Overlay className="overlay" />
      <Image
        src={isExported ? data.local_image : data.export_image}
        alt=""
        style={{ objectFit: "cover" }}
      />

      <Content>
        <Text>{isExported ? data.local_cta : data.export_cta}</Text>
        <StyledButton variant="contained" onClick={callback || handleExported}>
          {messages["seeMore"]}
        </StyledButton>
      </Content>
    </Ratio>
  );
}

const Content = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "100%",
    textAlign: "center",
    zIndex: 2,
  };
});

const StyledButton = styled(Button)(({ theme }) => {
  return {
    textTransform: "capitalize",
  };
});

const Text = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.SVNPoppins,
    display: "block",
    color: theme.palette.common.white,
    width: "80%",
    margin: "0 auto",
    marginBottom: "1.25rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "24px",
      lineHeight: "38.4px",
      fontWeight: "700 !important",
      marginBottom: "1rem",
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
  };
});
