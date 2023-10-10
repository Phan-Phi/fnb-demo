import { get } from "lodash";
import { Box, Container, Divider, Typography, styled } from "@mui/material";

import { SEO } from "@/components";
import { getSeoObject } from "@/libs";
import { RenderContent } from "@/compositions";
import { IPage, responseSchema } from "@/interfaces";
import { ABOUT_PAGE_TYPE_ITEM_TYPE } from "@/__generated__";
import { useCart, useIntl } from "@/hooks";
import dynamic from "next/dynamic";

const Certificate = dynamic(import("./components/Certificate"), {
  ssr: false,
});

export type AboutPageProps = IPage<[responseSchema<ABOUT_PAGE_TYPE_ITEM_TYPE>]>;

export default function About(props: AboutPageProps) {
  const { isExported } = useCart();

  const { messages } = useIntl();

  const data = get(props, "initData[0].items[0]");
  const { title, meta, last_published_at, histories } = data;

  return (
    <Container>
      <SEO {...getSeoObject(meta)} />
      <Wrapper>
        <Ttile>{title}</Ttile>
        <StyleDivider />
      </Wrapper>

      <Wrapper>
        <Ttile>{messages["about.visionMission"]}</Ttile>
        <RenderContent data={histories} />
        <StyleDivider />
      </Wrapper>

      {isExported !== null && <Certificate data={data} />}
    </Container>
  );
}

const Wrapper = styled(Box)(({ theme }) => {
  return {
    marginBottom: "3.5rem",
  };
});

const Ttile = styled(Typography)(({ theme }) => {
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
