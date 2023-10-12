import { get } from "lodash";
import dynamic from "next/dynamic";
import { Box, Container, Divider, Typography, styled } from "@mui/material";

import { useCart } from "@/hooks";
import { getSeoObject } from "@/libs";
import { Banner, SEO } from "@/components";
import { IPage, responseSchema } from "@/interfaces";
import { RenderContent, RenderHTML } from "@/compositions";
import { ABOUT_PAGE_TYPE_ITEM_TYPE } from "@/__generated__";

const Certificate = dynamic(import("./components/Certificate"), {
  ssr: false,
});

export type AboutPageProps = IPage<[responseSchema<ABOUT_PAGE_TYPE_ITEM_TYPE>]>;

export default function About(props: AboutPageProps) {
  const { isExported } = useCart();

  const data = get(props, "initData[0].items[0]");
  const { title, meta, histories, subtitle, banner, vision_title, vision_description } =
    data;

  return (
    <Container>
      <SEO {...getSeoObject(meta)} />

      <Banner imgSrc={banner} title={subtitle} />

      <WrapperContent>
        <Wrapper>
          <HeadTitle>{title}</HeadTitle>
          <RenderContent data={histories} />
          <StyleDivider />
        </Wrapper>

        <Wrapper>
          <Title>{vision_title}</Title>
          <WrapperVision>
            <RenderHTML data={vision_description} />
          </WrapperVision>
          <StyleDivider />
        </Wrapper>

        {isExported !== null && <Certificate data={data} isExported={isExported} />}
      </WrapperContent>
    </Container>
  );
}

const WrapperContent = styled(Box)(({ theme }) => {
  return {
    padding: "0 1.25rem",
  };
});

const WrapperVision = styled(Box)(({ theme }) => {
  return {
    marginBottom: "1.25rem",
  };
});

const Wrapper = styled(Box)(({ theme }) => {
  return {
    marginBottom: "3.5rem",
    marginTop: "1.5rem",
  };
});

const HeadTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.SVNPoppins,
    textAlign: "left",
    textTransform: "capitalize",
    marginBottom: "1.25rem",
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.RobotoSlab_xSmall,
    textAlign: "center",
    marginBottom: "1.25rem",
  };
});

const StyleDivider = styled(Divider)(({ theme }) => {
  return {
    borderColor: theme.palette.primary.main,
    borderWidth: "0.1px",
  };
});
