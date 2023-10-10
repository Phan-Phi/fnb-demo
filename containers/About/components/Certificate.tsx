import { useMemo } from "react";
import { useMeasure } from "react-use";
import { Grid, Typography, styled } from "@mui/material";
const PDFItem = dynamic(import("./PDFItem"), {
  ssr: false,
});

import { useMedia } from "@/hooks";
import { Box, Link, Ratio } from "@/components";
import dynamic from "next/dynamic";

interface Props {
  data: any;
}

interface WrapperPDFProps {
  widthCanvas: number;
}

const size = 353 / 498;

export default function Certificate({ data }: Props) {
  const {
    export_certificates,
    local_certificates,
    certificate_title,
    certificate_subtitle,
  } = data;

  const { isSmDown } = useMedia();
  const [ref, { width }] = useMeasure();

  const renderPDF = useMemo(() => {
    const data = local_certificates;
    // const data = true ? export_certificates : local_certificates;

    if (data.length === 0) return;
    return data.map((el: any, idx: number) => {
      const { value } = el;
      return (
        <Grid item key={idx} xs={12} sm={6} md={4}>
          <WrapperPDF
            href={false ? value.document : value.image}
            target="_blank"
            ref={ref}
            widthCanvas={width}
          >
            <Ratio ratio="353/498" className="pdfNe" width="100%" height={width / size}>
              <PDFItem data={false ? value.document : value.image} />
            </Ratio>

            <TitlePDF>{value.title}</TitlePDF>
          </WrapperPDF>
        </Grid>
      );
    });
  }, [local_certificates, export_certificates, width]);

  return (
    <Wrapper>
      <Ttile>{certificate_title}</Ttile>
      <Subttile>{certificate_subtitle}</Subttile>

      <Grid
        container
        spacing={isSmDown ? 3 : 10}
        padding="0 2rem"
        justifyContent="center"
      >
        {renderPDF}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(({ theme }) => {
  return {
    textAlign: "center",
  };
});

const Ttile = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.RobotoSlab_xSmall,
  };
});

const Subttile = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_large,
  };
});

const TitlePDF = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.Roboto,
    fontSize: "18px",
    lineHeight: "28px",
    marginTop: "20px",
    fontWeight: 800,
    color: theme.palette.primary.main,
    textTransform: "capitalize",
  };
});

const WrapperPDF = styled(Link, {
  shouldForwardProp: (propName) => {
    return propName !== "widthCanvas";
  },
})<WrapperPDFProps>(({ theme, widthCanvas }) => {
  return {
    textAlign: "center",
    marginTop: "20px",

    "& .react-pdf__Document": {
      position: "absolute",
      top: 0,
      bottom: 0,
    },

    "& canvas, .react-pdf__Page": {
      width: "100% !important",
      height: "100% !important",
    },
    "& .react-pdf__Page__textContent , .react-pdf__Page__annotations": {
      display: "none !important",
    },

    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  };
});
