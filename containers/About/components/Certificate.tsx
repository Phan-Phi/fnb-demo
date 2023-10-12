import dynamic from "next/dynamic";
import { useMeasure } from "react-use";
import { Grid, Typography, styled } from "@mui/material";
import { Fragment, useEffect, useMemo, useState } from "react";

import { useMedia } from "@/hooks";
import { Box, Divider, Image, Link, Ratio } from "@/components";
import { RenderHTML } from "@/compositions";

const PDFItem = dynamic(import("./PDFItem"), {
  ssr: false,
});

interface Props {
  data: any;
  isExported: boolean;
}

interface WrapperPDFProps {
  widthCanvas: number;
}

const size = 353 / 498;

export default function Certificate({ data, isExported }: Props) {
  const {
    export_certificates,
    local_certificates,
    certificate_title,
    certificate_description,
  } = data;

  const { isSmDown } = useMedia();
  const [ref, { width }] = useMeasure();
  const [state, setState] = useState(true);

  useEffect(() => {
    const data = isExported ? export_certificates : local_certificates;
    if (data.length === 0) setState(false);
  }, [isExported]);

  const renderPDF = useMemo(() => {
    const data = isExported ? export_certificates : local_certificates;

    if (data.length === 0) return null;

    return data.map((el: any, idx: number) => {
      const { value, block_type } = el;

      if (block_type === "document") {
        return (
          <Grid item key={idx} xs={12} sm={6} md={4}>
            <WrapperPDF
              href={isExported ? value.document : value.image}
              target="_blank"
              ref={ref}
              widthCanvas={width}
            >
              <Ratio ratio="353/498" className="pdfNe" width="100%" height={width / size}>
                <PDFItem data={isExported ? value.document : value.image} />
              </Ratio>

              <TitlePDF>{value.title}</TitlePDF>
            </WrapperPDF>
          </Grid>
        );
      }

      return (
        <Grid item key={idx} xs={12} sm={6} md={4}>
          <WrapperPDF href={value.image} target="_blank" ref={ref} widthCanvas={width}>
            <Ratio ratio="353/498" className="pdfNe" width="100%" height={width / size}>
              <Image src={value.image} alt={value.title} />
            </Ratio>

            <TitlePDF>{value.title}</TitlePDF>
          </WrapperPDF>
        </Grid>
      );
    });
  }, [local_certificates, export_certificates, isExported, width]);

  return (
    <>
      {state && (
        <Fragment>
          <Wrapper className="pdf">
            <Title>{certificate_title}</Title>
            <SubTitle>
              <WrapperCertificate>
                <RenderHTML data={certificate_description} />
              </WrapperCertificate>
            </SubTitle>
            <Grid
              container
              spacing={isSmDown ? 3 : 10}
              padding="0 2rem"
              justifyContent="center"
            >
              {renderPDF}
            </Grid>
          </Wrapper>
          <StyleDivider />
        </Fragment>
      )}
    </>
  );
}

const Wrapper = styled(Box)(({ theme }) => {
  return {
    textAlign: "center",
    marginBottom: "1rem",
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.RobotoSlab_xSmall,
    marginBottom: "1.25rem",
  };
});

const SubTitle = styled(Typography)(({ theme }) => {
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

const StyleDivider = styled(Divider)(({ theme }) => {
  return {
    borderColor: theme.palette.primary.main,
    borderWidth: "0.1px",
  };
});

const WrapperCertificate = styled(Box)(({ theme }) => {
  return {
    marginBottom: "1.25rem",
  };
});
